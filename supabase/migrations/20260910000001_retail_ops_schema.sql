-- =========================================================================
-- NEXUS RETAIL OPERATIONS MANAGEMENT SUITE
-- Isolated Namespaced Schema (nexus_* prefix)
-- Safe to run in existing database alongside other applications
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Isolated Enums
DO $$ BEGIN
  CREATE TYPE nexus_duty_status_enum AS ENUM ('Assigned', 'In Progress', 'Pending Approval', 'Approved', 'Rework Requested');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE nexus_duty_priority_enum AS ENUM ('Low', 'Normal', 'High', 'Critical');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE nexus_escalation_urgency_enum AS ENUM ('Normal', 'Urgent', 'Critical');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE nexus_escalation_target_enum AS ENUM ('team_lead', 'manager');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE nexus_escalation_status_enum AS ENUM ('Open', 'In Review', 'Resolved');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE nexus_attendance_action_enum AS ENUM ('CLOCK_IN', 'CLOCK_OUT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE nexus_transaction_type_enum AS ENUM ('revenue', 'expense');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 1. DEPARTMENTS
CREATE TABLE IF NOT EXISTS nexus_departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  zone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EMPLOYEES ROSTER (200 Staff members, Ranks 1 to 5)
CREATE TABLE IF NOT EXISTS nexus_employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  employee_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role_title TEXT NOT NULL,
  rank INT NOT NULL CHECK (rank BETWEEN 1 AND 5),
  department_id UUID NOT NULL REFERENCES nexus_departments(id) ON DELETE RESTRICT,
  zone TEXT NOT NULL,
  avatar_url TEXT,
  initials TEXT NOT NULL,
  pin_hash TEXT NOT NULL,
  permissions TEXT[] DEFAULT '{}',
  is_clocked_in BOOLEAN DEFAULT FALSE,
  clock_in_time TIME,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'On Leave', 'Terminated')),
  termination_reason TEXT,
  terminated_at TIMESTAMPTZ,
  hire_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nexus_employees_auth ON nexus_employees(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_nexus_employees_rank ON nexus_employees(rank);
CREATE INDEX IF NOT EXISTS idx_nexus_employees_dept ON nexus_employees(department_id);
CREATE INDEX IF NOT EXISTS idx_nexus_employees_clocked ON nexus_employees(is_clocked_in);
CREATE INDEX IF NOT EXISTS idx_nexus_employees_status ON nexus_employees(status);

-- 3. SHIFT ATTENDANCE LOGS
CREATE TABLE IF NOT EXISTS nexus_attendance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES nexus_employees(id) ON DELETE CASCADE,
  action_type nexus_attendance_action_enum NOT NULL,
  zone TEXT NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nexus_attendance_emp ON nexus_attendance_logs(employee_id);
CREATE INDEX IF NOT EXISTS idx_nexus_attendance_time ON nexus_attendance_logs(recorded_at DESC);

-- 4. MULTI-STAFF DUTIES
CREATE TABLE IF NOT EXISTS nexus_duties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  zone TEXT NOT NULL,
  department_id UUID REFERENCES nexus_departments(id) ON DELETE SET NULL,
  team_lead_id UUID REFERENCES nexus_employees(id) ON DELETE SET NULL,
  priority nexus_duty_priority_enum DEFAULT 'Normal',
  status nexus_duty_status_enum DEFAULT 'Assigned',
  due_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES nexus_employees(id) ON DELETE SET NULL,
  rework_notes TEXT,
  created_by UUID REFERENCES nexus_employees(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nexus_duties_lead ON nexus_duties(team_lead_id);
CREATE INDEX IF NOT EXISTS idx_nexus_duties_status ON nexus_duties(status);
CREATE INDEX IF NOT EXISTS idx_nexus_duties_dept ON nexus_duties(department_id);

-- 5. DUTY ASSIGNEES (Many-to-Many Crew Members)
CREATE TABLE IF NOT EXISTS nexus_duty_assignees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  duty_id UUID NOT NULL REFERENCES nexus_duties(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES nexus_employees(id) ON DELETE CASCADE,
  is_team_lead BOOLEAN DEFAULT FALSE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(duty_id, employee_id)
);

CREATE INDEX IF NOT EXISTS idx_nexus_duty_assignees_duty ON nexus_duty_assignees(duty_id);
CREATE INDEX IF NOT EXISTS idx_nexus_duty_assignees_emp ON nexus_duty_assignees(employee_id);

-- 6. DUTY CHECKLIST SUB-TASKS
CREATE TABLE IF NOT EXISTS nexus_duty_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  duty_id UUID NOT NULL REFERENCES nexus_duties(id) ON DELETE CASCADE,
  task_label TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_by UUID REFERENCES nexus_employees(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nexus_checklists_duty ON nexus_duty_checklists(duty_id);

-- 7. FLOOR ESCALATIONS
CREATE TABLE IF NOT EXISTS nexus_escalations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES nexus_employees(id) ON DELETE CASCADE,
  target_recipient nexus_escalation_target_enum NOT NULL,
  urgency nexus_escalation_urgency_enum DEFAULT 'Normal',
  category TEXT NOT NULL,
  zone TEXT NOT NULL,
  description TEXT NOT NULL,
  status nexus_escalation_status_enum DEFAULT 'Open',
  resolved_by UUID REFERENCES nexus_employees(id) ON DELETE SET NULL,
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nexus_escalations_status ON nexus_escalations(status);
CREATE INDEX IF NOT EXISTS idx_nexus_escalations_author ON nexus_escalations(author_id);

-- 8. NOTIFICATIONS TRAY
CREATE TABLE IF NOT EXISTS nexus_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID REFERENCES nexus_employees(id) ON DELETE CASCADE,
  target_min_rank INT DEFAULT 1,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nexus_notif_recipient ON nexus_notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_nexus_notif_rank ON nexus_notifications(target_min_rank);

-- 9. INVENTORY
CREATE TABLE IF NOT EXISTS nexus_inventory (
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
CREATE TABLE IF NOT EXISTS nexus_financial_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  transaction_type nexus_transaction_type_enum NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT DEFAULT 'Completed',
  transaction_date DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES nexus_employees(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. AUDIT TRAILS
CREATE TABLE IF NOT EXISTS nexus_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES nexus_employees(id) ON DELETE SET NULL,
  actor_name TEXT NOT NULL,
  action TEXT NOT NULL,
  target_entity TEXT NOT NULL,
  detail TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nexus_audit_time ON nexus_audit_logs(created_at DESC);

-- =========================================================================
-- AUTOMATED TRIGGERS
-- =========================================================================

-- Trigger 1: Auto-Alert Managers on Clock-In
CREATE OR REPLACE FUNCTION nexus_notify_manager_on_clock_in()
RETURNS TRIGGER AS $$
DECLARE
  v_emp RECORD;
BEGIN
  IF NEW.action_type = 'CLOCK_IN' THEN
    SELECT name, role_title, zone INTO v_emp FROM nexus_employees WHERE id = NEW.employee_id;
    
    INSERT INTO nexus_notifications (
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

DROP TRIGGER IF EXISTS trg_nexus_attendance_clock_in ON nexus_attendance_logs;
CREATE TRIGGER trg_nexus_attendance_clock_in
AFTER INSERT ON nexus_attendance_logs
FOR EACH ROW EXECUTE FUNCTION nexus_notify_manager_on_clock_in();

-- Trigger 2: Auto-Alert Managers on Duty Completion
CREATE OR REPLACE FUNCTION nexus_notify_manager_on_duty_submit()
RETURNS TRIGGER AS $$
DECLARE
  v_lead_name TEXT;
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status AND NEW.status = 'Pending Approval' THEN
    SELECT name INTO v_lead_name FROM nexus_employees WHERE id = NEW.team_lead_id;

    INSERT INTO nexus_notifications (
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

DROP TRIGGER IF EXISTS trg_nexus_duty_pending_approval ON nexus_duties;
CREATE TRIGGER trg_nexus_duty_pending_approval
AFTER UPDATE OF status ON nexus_duties
FOR EACH ROW EXECUTE FUNCTION nexus_notify_manager_on_duty_submit();

-- Trigger 3: Audit Trail on Manager Sign-Off
CREATE OR REPLACE FUNCTION nexus_audit_manager_sign_off()
RETURNS TRIGGER AS $$
DECLARE
  v_mgr_name TEXT;
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status AND NEW.status = 'Approved' THEN
    SELECT name INTO v_mgr_name FROM nexus_employees WHERE id = NEW.approved_by;

    INSERT INTO nexus_audit_logs (
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

DROP TRIGGER IF EXISTS trg_nexus_duty_signoff_audit ON nexus_duties;
CREATE TRIGGER trg_nexus_duty_signoff_audit
AFTER UPDATE OF status ON nexus_duties
FOR EACH ROW EXECUTE FUNCTION nexus_audit_manager_sign_off();

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

CREATE OR REPLACE FUNCTION nexus_is_manager()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM nexus_employees 
    WHERE auth_user_id = (SELECT auth.uid()) AND rank >= 4
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

ALTER TABLE nexus_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_duties ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_duty_assignees ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_duty_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_audit_logs ENABLE ROW LEVEL SECURITY;

-- Departments
CREATE POLICY "nexus_departments_viewable" ON nexus_departments FOR SELECT USING (true);

-- Employees
CREATE POLICY "nexus_employees_viewable" ON nexus_employees FOR SELECT USING (true);
CREATE POLICY "nexus_employees_manager_all" ON nexus_employees FOR ALL USING (nexus_is_manager());

-- Attendance
CREATE POLICY "nexus_attendance_view" ON nexus_attendance_logs FOR SELECT
  USING (nexus_is_manager() OR employee_id = (SELECT id FROM nexus_employees WHERE auth_user_id = (SELECT auth.uid())));
CREATE POLICY "nexus_attendance_insert" ON nexus_attendance_logs FOR INSERT
  WITH CHECK (employee_id = (SELECT id FROM nexus_employees WHERE auth_user_id = (SELECT auth.uid())) OR nexus_is_manager());

-- Duties
CREATE POLICY "nexus_duties_view" ON nexus_duties FOR SELECT
  USING (
    nexus_is_manager() OR
    team_lead_id = (SELECT id FROM nexus_employees WHERE auth_user_id = (SELECT auth.uid())) OR
    EXISTS (
      SELECT 1 FROM nexus_duty_assignees 
      WHERE duty_id = nexus_duties.id AND employee_id = (SELECT id FROM nexus_employees WHERE auth_user_id = (SELECT auth.uid()))
    )
  );

CREATE POLICY "nexus_duties_dispatch" ON nexus_duties FOR INSERT WITH CHECK (nexus_is_manager());

CREATE POLICY "nexus_duties_update" ON nexus_duties FOR UPDATE
  USING (
    nexus_is_manager() OR
    team_lead_id = (SELECT id FROM nexus_employees WHERE auth_user_id = (SELECT auth.uid()))
  );

-- Duty Assignees
CREATE POLICY "nexus_assignees_view" ON nexus_duty_assignees FOR SELECT USING (true);
CREATE POLICY "nexus_assignees_manage" ON nexus_duty_assignees FOR ALL USING (nexus_is_manager());

-- Duty Checklists
CREATE POLICY "nexus_checklists_manage" ON nexus_duty_checklists FOR ALL
  USING (
    nexus_is_manager() OR
    EXISTS (
      SELECT 1 FROM nexus_duty_assignees 
      WHERE duty_id = nexus_duty_checklists.duty_id AND employee_id = (SELECT id FROM nexus_employees WHERE auth_user_id = (SELECT auth.uid()))
    )
  );

-- Escalations
CREATE POLICY "nexus_escalations_view" ON nexus_escalations FOR SELECT
  USING (
    nexus_is_manager() OR
    author_id = (SELECT id FROM nexus_employees WHERE auth_user_id = (SELECT auth.uid()))
  );
CREATE POLICY "nexus_escalations_submit" ON nexus_escalations FOR INSERT WITH CHECK (true);
CREATE POLICY "nexus_escalations_resolve" ON nexus_escalations FOR UPDATE USING (nexus_is_manager());

-- Notifications
CREATE POLICY "nexus_notifications_view" ON nexus_notifications FOR SELECT
  USING (
    recipient_id = (SELECT id FROM nexus_employees WHERE auth_user_id = (SELECT auth.uid())) OR
    (recipient_id IS NULL AND (SELECT rank FROM nexus_employees WHERE auth_user_id = (SELECT auth.uid())) >= target_min_rank)
  );

-- Inventory (Public for floor check)
CREATE POLICY "nexus_inventory_view" ON nexus_inventory FOR SELECT USING (true);
CREATE POLICY "nexus_inventory_manage" ON nexus_inventory FOR ALL USING (nexus_is_manager());

-- Cloaked Tables (Non-managers get 0 rows)
CREATE POLICY "nexus_financials_manager_only" ON nexus_financial_transactions FOR SELECT USING (nexus_is_manager());
CREATE POLICY "nexus_audit_manager_only" ON nexus_audit_logs FOR SELECT USING (nexus_is_manager());

-- =========================================================================
-- TABLE 12: nexus_shift_schedules (Weekly Workforce Roster)
-- =========================================================================
CREATE TABLE IF NOT EXISTS nexus_shift_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES nexus_employees(id) ON DELETE CASCADE,
  department_name TEXT NOT NULL,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  shift_type TEXT NOT NULL CHECK (shift_type IN ('Morning', 'Midday', 'Evening')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Swap Requested', 'Trade Approved', 'Completed', 'Absent')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE nexus_shift_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "nexus_shift_schedules_view" ON nexus_shift_schedules FOR SELECT USING (true);
CREATE POLICY "nexus_shift_schedules_manage" ON nexus_shift_schedules FOR ALL USING (nexus_is_manager());

-- =========================================================================
-- TABLE 13: nexus_shift_swaps (Peer-to-Peer Trades with Manager Sign-off)
-- =========================================================================
CREATE TABLE IF NOT EXISTS nexus_shift_swaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID NOT NULL REFERENCES nexus_employees(id) ON DELETE CASCADE,
  target_coworker_id UUID NOT NULL REFERENCES nexus_employees(id) ON DELETE CASCADE,
  shift_date TEXT NOT NULL,
  shift_description TEXT NOT NULL,
  trade_reason TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'Pending Coworker' CHECK (status IN ('Pending Coworker', 'Pending Manager', 'Approved', 'Declined')),
  approved_by UUID REFERENCES nexus_employees(id) ON DELETE SET NULL,
  authorized_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE nexus_shift_swaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "nexus_shift_swaps_view" ON nexus_shift_swaps FOR SELECT USING (true);
CREATE POLICY "nexus_shift_swaps_insert" ON nexus_shift_swaps FOR INSERT WITH CHECK (true);
CREATE POLICY "nexus_shift_swaps_update" ON nexus_shift_swaps FOR UPDATE USING (true);

-- =========================================================================
-- TABLE 14: nexus_break_compliance_logs (Meal & Rest Labor Law Tracker)
-- =========================================================================
CREATE TABLE IF NOT EXISTS nexus_break_compliance_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES nexus_employees(id) ON DELETE CASCADE,
  break_type TEXT NOT NULL CHECK (break_type IN ('15m Rest', '30m Meal')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  allocated_duration_mins INT NOT NULL,
  actual_duration_mins INT,
  compliance_status TEXT NOT NULL DEFAULT 'Compliant' CHECK (compliance_status IN ('Compliant', 'Overstay', '5h Meal Breach', 'Unrecorded')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE nexus_break_compliance_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "nexus_breaks_view" ON nexus_break_compliance_logs FOR SELECT USING (true);
CREATE POLICY "nexus_breaks_manage" ON nexus_break_compliance_logs FOR ALL USING (true);
