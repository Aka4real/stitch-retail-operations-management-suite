/**
 * Nexus Retail Operations Management Suite
 * Supabase Client Adapter & Realtime Engine
 * Project Ref: msxzgkfgboeqxjajqtmh
 */

(function(window) {
  const DEFAULT_SUPABASE_URL = 'https://msxzgkfgboeqxjajqtmh.supabase.co';
  const DEFAULT_ANON_KEY = localStorage.getItem('nexus_supabase_anon_key') || '';

  class RetailSupabaseService {
    constructor() {
      this.url = DEFAULT_SUPABASE_URL;
      this.anonKey = DEFAULT_ANON_KEY;
      this.client = null;
      this.isConnected = false;
      this.realtimeChannels = [];
      this.initClient();
    }

    initClient() {
      if (window.supabase && typeof window.supabase.createClient === 'function' && this.anonKey) {
        try {
          this.client = window.supabase.createClient(this.url, this.anonKey);
          this.isConnected = true;
          console.log('[Supabase] Initialized client for project:', this.url);
          this.setupRealtimeListeners();
        } catch(err) {
          console.warn('[Supabase] Client init failed, using local storage fallback:', err.message);
          this.isConnected = false;
        }
      } else {
        this.isConnected = false;
        if (!this.anonKey) {
          console.info('[Supabase] Anon key not set. To connect directly, call RetailSupabase.setAnonKey("your-key")');
        }
      }
    }

    setAnonKey(key) {
      if (!key) return;
      this.anonKey = key.trim();
      localStorage.setItem('nexus_supabase_anon_key', this.anonKey);
      this.initClient();
      if (this.isConnected) {
        this.syncAllFromDB();
      }
    }

    // --- REALTIME SUBSCRIPTIONS ---
    setupRealtimeListeners() {
      if (!this.client) return;

      // 1. Shift Attendance & Clock-In Alert Channel
      const attendanceChannel = this.client
        .channel('realtime-attendance')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'attendance_logs' }, (payload) => {
          console.log('[Realtime] Attendance event received:', payload.new);
          if (typeof renderShiftAttendanceFeed === 'function') renderShiftAttendanceFeed();
          if (typeof updateNotificationBadge === 'function') updateNotificationBadge();
        })
        .subscribe();
      this.realtimeChannels.push(attendanceChannel);

      // 2. Duties & Approvals Channel
      const dutiesChannel = this.client
        .channel('realtime-duties')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'duties' }, (payload) => {
          console.log('[Realtime] Duty event received:', payload);
          if (typeof renderMyDutiesList === 'function') renderMyDutiesList();
          if (typeof renderPendingApprovals === 'function') renderPendingApprovals();
          if (typeof updateNotificationBadge === 'function') updateNotificationBadge();
        })
        .subscribe();
      this.realtimeChannels.push(dutiesChannel);

      // 3. Floor Escalations Channel
      const escalationsChannel = this.client
        .channel('realtime-escalations')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'escalations' }, (payload) => {
          console.log('[Realtime] Escalation event received:', payload);
          if (typeof renderMyEscalationsList === 'function') renderMyEscalationsList();
          if (typeof renderManagerEscalations === 'function') renderManagerEscalations();
        })
        .subscribe();
      this.realtimeChannels.push(escalationsChannel);
    }

    // --- DATA FETCHING ---
    async syncAllFromDB() {
      if (!this.isConnected) return false;
      try {
        await Promise.all([
          this.fetchEmployees(),
          this.fetchDuties(),
          this.fetchEscalations()
        ]);
        return true;
      } catch(e) {
        console.error('[Supabase] Failed syncing records:', e);
        return false;
      }
    }

    async fetchEmployees() {
      if (!this.isConnected) return null;
      const { data, error } = await this.client
        .from('employees')
        .select('*')
        .order('rank', { ascending: false });

      if (error) {
        console.error('[Supabase] Error fetching employees:', error.message);
        return null;
      }
      if (Array.isArray(data) && data.length > 0) {
        console.log(`[Supabase] Synced ${data.length} employees from database.`);
        // Map database records to AppState
        AppState.employees = data.map(dbEmp => ({
          id: dbEmp.employee_code,
          dbId: dbEmp.id,
          name: dbEmp.name,
          role: dbEmp.role_title,
          rank: dbEmp.rank,
          department: dbEmp.zone || 'Apparel & Fashion',
          zone: dbEmp.zone,
          email: dbEmp.email,
          pin: '1234',
          avatar: dbEmp.avatar_url,
          initials: dbEmp.initials,
          permissions: dbEmp.permissions || [],
          clockedIn: dbEmp.is_clocked_in,
          clockInTime: dbEmp.clock_in_time || '08:00 AM',
          hireDate: dbEmp.hire_date
        }));
        AppState.saveState();
        if (typeof renderHR === 'function') renderHR();
        if (typeof updateSessionUI === 'function') updateSessionUI();
        return AppState.employees;
      }
      return null;
    }

    async fetchDuties() {
      if (!this.isConnected) return null;
      const { data, error } = await this.client
        .from('duties')
        .select(`
          id, title, zone, priority, status, due_at, rework_notes,
          team_lead:team_lead_id (employee_code, name),
          assignees:duty_assignees (employee:employee_id (employee_code, name, role_title), is_team_lead),
          checklists:duty_checklists (id, task_label, is_completed, sort_order)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[Supabase] Error fetching duties:', error.message);
        return null;
      }
      return data;
    }

    async fetchEscalations() {
      if (!this.isConnected) return null;
      const { data, error } = await this.client
        .from('escalations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[Supabase] Error fetching escalations:', error.message);
        return null;
      }
      return data;
    }

    // --- MUTATIONS ---
    async recordClockAction(employeeCode, actionType, zone) {
      if (!this.isConnected) return;
      const emp = AppState.employees.find(e => e.id === employeeCode);
      if (!emp || !emp.dbId) return;

      // 1. Insert into attendance_logs (triggers notification alert in DB)
      await this.client.from('attendance_logs').insert({
        employee_id: emp.dbId,
        action_type: actionType,
        zone: zone || emp.zone || 'North Wing #42'
      });

      // 2. Update employee clocked status
      await this.client.from('employees').update({
        is_clocked_in: actionType === 'CLOCK_IN',
        clock_in_time: actionType === 'CLOCK_IN' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
      }).eq('id', emp.dbId);
    }

    async submitDutySignOff(dutyId, managerCode) {
      if (!this.isConnected) return;
      await this.client.from('duties').update({
        status: 'Approved',
        approved_at: new Date().toISOString()
      }).eq('id', dutyId);
    }
  }

  window.RetailSupabase = new RetailSupabaseService();
})(window);
