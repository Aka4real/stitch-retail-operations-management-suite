-- =========================================================================
-- NEXUS RETAIL OPERATIONS MANAGEMENT SUITE
-- Initial Schema & RLS Security Migration
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
DO $$ BEGIN
  CREATE TYPE duty_status_enum AS ENUM ('Assigned', 'In Progress', 'Pending Approval', 'Approved', 'Rework Requested');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE duty_priority_enum AS ENUM ('Low', 'Normal', 'High', 'Critical');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE escalation_urgency_enum AS ENUM ('Normal', 'Urgent', 'Critical');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE escalation_target_enum AS ENUM ('team_lead', 'manager');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE escalation_status_enum AS ENUM ('Open', 'In Review', 'Resolved');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE attendance_action_enum AS ENUM ('CLOCK_IN', 'CLOCK_OUT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE transaction_type_enum AS ENUM ('revenue', 'expense');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 1. DEPARTMENTS
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  zone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EMPLOYEES ROSTER (200 Staff members, Ranks 1 to 5)
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  employee_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role_title TEXT NOT NULL,
  rank INT NOT NULL CHECK (rank BETWEEN 1 AND 5),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  zone TEXT NOT NULL,
  avatar_url TEXT,
  initials TEXT NOT NULL,
  pin_hash TEXT NOT NULL,
  permissions TEXT[] DEFAULT '{}',
  is_clocked_in BOOLEAN DEFAULT FALSE,
  clock_in_time TIME,
  hire_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employees_auth_user ON employees(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_employees_rank ON employees(rank);
CREATE INDEX IF NOT EXISTS idx_employees_dept ON employees(department_id);
CREATE INDEX IF NOT EXISTS idx_employees_clocked ON employees(is_clocked_in);

-- 3. SHIFT ATTENDANCE LOGS
CREATE TABLE IF NOT EXISTS attendance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  action_type attendance_action_enum NOT NULL,
  zone TEXT NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_attendance_employee ON attendance_logs(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_time ON attendance_logs(recorded_at DESC);

-- 4. MULTI-STAFF DUTIES
CREATE TABLE IF NOT EXISTS duties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  zone TEXT NOT NULL,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  team_lead_id UUID NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  priority duty_priority_enum DEFAULT 'Normal',
  status duty_status_enum DEFAULT 'Assigned',
  due_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES employees(id) ON DELETE SET NULL,
  rework_notes TEXT,
  created_by UUID REFERENCES employees(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_duties_lead ON duties(team_lead_id);
CREATE INDEX IF NOT EXISTS idx_duties_status ON duties(status);
CREATE INDEX IF NOT EXISTS idx_duties_dept ON duties(department_id);

-- 5. DUTY ASSIGNEES (Many-to-Many Crew Members)
CREATE TABLE IF NOT EXISTS duty_assignees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  duty_id UUID NOT NULL REFERENCES duties(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  is_team_lead BOOLEAN DEFAULT FALSE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(duty_id, employee_id)
);

CREATE INDEX IF NOT EXISTS idx_duty_assignees_duty ON duty_assignees(duty_id);
CREATE INDEX IF NOT EXISTS idx_duty_assignees_emp ON duty_assignees(employee_id);

-- 6. DUTY CHECKLIST SUB-TASKS
CREATE TABLE IF NOT EXISTS duty_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  duty_id UUID NOT NULL REFERENCES duties(id) ON DELETE CASCADE,
  task_label TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_by UUID REFERENCES employees(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_checklists_duty ON duty_checklists(duty_id);

-- 7. FLOOR ESCALATIONS
CREATE TABLE IF NOT EXISTS escalations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  target_recipient escalation_target_enum NOT NULL,
  urgency escalation_urgency_enum DEFAULT 'Normal',
  category TEXT NOT NULL,
  zone TEXT NOT NULL,
  description TEXT NOT NULL,
  status escalation_status_enum DEFAULT 'Open',
  resolved_by UUID REFERENCES employees(id) ON DELETE SET NULL,
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_escalations_status ON escalations(status);
CREATE INDEX IF NOT EXISTS idx_escalations_author ON escalations(author_id);

-- 8. NOTIFICATIONS TRAY
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  target_min_rank INT DEFAULT 1,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_rank ON notifications(target_min_rank);

-- 9. INVENTORY
CREATE TABLE IF NOT EXISTS inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  stock_level INT NOT NULL DEFAULT 0,
  max_capacity INT NOT NULL DEFAULT 100,
  reorder_threshold INT NOT NULL DEFAULT 15,
  unit_price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  status TEXT GENERATED ALWAYS AS (
    CASE 
      WHEN stock_level = 0 THEN 'Out of Stock'
      WHEN stock_level <= reorder_threshold THEN 'Reorder Now'
      ELSE 'In Stock'
    END
  ) STORED,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. FINANCIAL TRANSACTIONS
CREATE TABLE IF NOT EXISTS financial_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  transaction_type transaction_type_enum NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT DEFAULT 'Completed',
  transaction_date DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES employees(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. AUDIT TRAILS
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES employees(id) ON DELETE SET NULL,
  actor_name TEXT NOT NULL,
  action TEXT NOT NULL,
  target_entity TEXT NOT NULL,
  detail TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_time ON audit_logs(created_at DESC);

-- =========================================================================
-- AUTOMATED TRIGGERS
-- =========================================================================

-- Trigger 1: Auto-Alert Managers on Clock-In
CREATE OR REPLACE FUNCTION notify_manager_on_clock_in()
RETURNS TRIGGER AS $$
DECLARE
  v_emp RECORD;
BEGIN
  IF NEW.action_type = 'CLOCK_IN' THEN
    SELECT name, role_title, zone INTO v_emp FROM employees WHERE id = NEW.employee_id;
    
    INSERT INTO notifications (
      target_min_rank,
      title,
      message,
      type,
      metadata
    ) VALUES (
      4,
      v_emp.name || ' Clocked In',
      v_emp.role_title || ' clocked in for shift at ' || TO_CHAR(NEW.recorded_at, 'HH12:MI AM') || ' [' || v_emp.zone || ']',
      'clock_in',
      jsonb_build_object('employee_id', NEW.employee_id, 'zone', v_emp.zone)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_attendance_clock_in_alert ON attendance_logs;
CREATE TRIGGER trg_attendance_clock_in_alert
AFTER INSERT ON attendance_logs
FOR EACH ROW EXECUTE FUNCTION notify_manager_on_clock_in();

-- Trigger 2: Auto-Alert Managers on Duty Completion
CREATE OR REPLACE FUNCTION notify_manager_on_duty_submit()
RETURNS TRIGGER AS $$
DECLARE
  v_lead_name TEXT;
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status AND NEW.status = 'Pending Approval' THEN
    SELECT name INTO v_lead_name FROM employees WHERE id = NEW.team_lead_id;

    INSERT INTO notifications (
      target_min_rank,
      title,
      message,
      type,
      metadata
    ) VALUES (
      4,
      'Duty Completed: Pending Approval',
      'Team Lead ' || COALESCE(v_lead_name, 'Staff') || ' submitted "' || NEW.title || '" for manager sign-off.',
      'duty_submitted',
      jsonb_build_object('duty_id', NEW.id, 'lead_id', NEW.team_lead_id)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_duty_pending_approval ON duties;
CREATE TRIGGER trg_duty_pending_approval
AFTER UPDATE OF status ON duties
FOR EACH ROW EXECUTE FUNCTION notify_manager_on_duty_submit();

-- Trigger 3: Audit Trail on Manager Sign-Off
CREATE OR REPLACE FUNCTION audit_manager_sign_off()
RETURNS TRIGGER AS $$
DECLARE
  v_mgr_name TEXT;
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status AND NEW.status = 'Approved' THEN
    SELECT name INTO v_mgr_name FROM employees WHERE id = NEW.approved_by;

    INSERT INTO audit_logs (
      actor_id,
      actor_name,
      action,
      target_entity,
      detail
    ) VALUES (
      NEW.approved_by,
      COALESCE(v_mgr_name, 'Operations Manager') || ' (Manager)',
      'Duty Sign-Off Executed',
      NEW.title,
      'Approved operational clearance for shift duty in ' || NEW.zone
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_duty_signoff_audit ON duties;
CREATE TRIGGER trg_duty_signoff_audit
AFTER UPDATE OF status ON duties
FOR EACH ROW EXECUTE FUNCTION audit_manager_sign_off();

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

CREATE OR REPLACE FUNCTION is_manager()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM employees 
    WHERE auth_user_id = (SELECT auth.uid()) AND rank >= 4
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE duties ENABLE ROW LEVEL SECURITY;
ALTER TABLE duty_assignees ENABLE ROW LEVEL SECURITY;
ALTER TABLE duty_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Departments
CREATE POLICY "Departments are viewable by all staff" ON departments FOR SELECT USING (true);

-- Employees
CREATE POLICY "Employees are viewable by all staff" ON employees FOR SELECT USING (true);
CREATE POLICY "Managers can insert/update employees" ON employees FOR ALL USING (is_manager());

-- Attendance
CREATE POLICY "Staff can view own attendance; managers see all" ON attendance_logs FOR SELECT
  USING (is_manager() OR employee_id = (SELECT id FROM employees WHERE auth_user_id = (SELECT auth.uid())));
CREATE POLICY "Staff can log punch clock" ON attendance_logs FOR INSERT
  WITH CHECK (employee_id = (SELECT id FROM employees WHERE auth_user_id = (SELECT auth.uid())) OR is_manager());

-- Duties
CREATE POLICY "Staff view assigned duties; managers see all" ON duties FOR SELECT
  USING (
    is_manager() OR
    team_lead_id = (SELECT id FROM employees WHERE auth_user_id = (SELECT auth.uid())) OR
    EXISTS (
      SELECT 1 FROM duty_assignees 
      WHERE duty_id = duties.id AND employee_id = (SELECT id FROM employees WHERE auth_user_id = (SELECT auth.uid()))
    )
  );

CREATE POLICY "Managers can dispatch duties" ON duties FOR INSERT WITH CHECK (is_manager());

CREATE POLICY "Team leads and managers can update duties" ON duties FOR UPDATE
  USING (
    is_manager() OR
    team_lead_id = (SELECT id FROM employees WHERE auth_user_id = (SELECT auth.uid()))
  );

-- Duty Assignees
CREATE POLICY "View duty assignees" ON duty_assignees FOR SELECT USING (true);
CREATE POLICY "Managers can manage assignees" ON duty_assignees FOR ALL USING (is_manager());

-- Duty Checklists
CREATE POLICY "Assignees can view and update checklists" ON duty_checklists FOR ALL
  USING (
    is_manager() OR
    EXISTS (
      SELECT 1 FROM duty_assignees 
      WHERE duty_id = duty_checklists.duty_id AND employee_id = (SELECT id FROM employees WHERE auth_user_id = (SELECT auth.uid()))
    )
  );

-- Escalations
CREATE POLICY "Staff view own escalations; managers see all" ON escalations FOR SELECT
  USING (
    is_manager() OR
    author_id = (SELECT id FROM employees WHERE auth_user_id = (SELECT auth.uid()))
  );
CREATE POLICY "Staff can submit escalations" ON escalations FOR INSERT WITH CHECK (true);
CREATE POLICY "Managers can update/resolve escalations" ON escalations FOR UPDATE USING (is_manager());

-- Notifications
CREATE POLICY "Notifications access" ON notifications FOR SELECT
  USING (
    recipient_id = (SELECT id FROM employees WHERE auth_user_id = (SELECT auth.uid())) OR
    (recipient_id IS NULL AND (SELECT rank FROM employees WHERE auth_user_id = (SELECT auth.uid())) >= target_min_rank)
  );

-- Inventory (Public for floor check)
CREATE POLICY "Inventory viewable by all staff" ON inventory FOR SELECT USING (true);
CREATE POLICY "Managers can update inventory" ON inventory FOR ALL USING (is_manager());

-- Cloaked Tables (Non-managers get 0 rows)
CREATE POLICY "Managers only for financial transactions" ON financial_transactions FOR SELECT USING (is_manager());
CREATE POLICY "Managers only for audit logs" ON audit_logs FOR SELECT USING (is_manager());
