-- =========================================================================
-- NEXUS RETAIL OPERATIONS MANAGEMENT SUITE - SEED DATA
-- 10 Departments, 200 Employees, Inventory, Transactions & Sample Duties
-- =========================================================================

-- 1. SEED DEPARTMENTS
INSERT INTO departments (name, code, zone) VALUES
('Apparel & Fashion', 'APP', 'North Wing #42'),
('Electronics & Gadgets', 'ELE', 'South Atrium'),
('Logistics & Bay Storage', 'LOG', 'Storage Bay B'),
('Customer Relations', 'CRM', 'Central Mall HQ'),
('Security & Safety', 'SEC', 'West Gallery'),
('Facilities & Maintenance', 'FAC', 'Service Core A'),
('Food & Beverage', 'FNB', 'Food Court Deck'),
('Cashier & Front End', 'POS', 'East Promenade'),
('Beauty & Cosmetics', 'BTY', 'North Wing #42'),
('Home Goods & Furniture', 'HGF', 'Upper Mezzanine'),
('Executive Operations', 'EXE', 'Central Mall HQ')
ON CONFLICT (code) DO NOTHING;

-- 2. SEED 200 EMPLOYEES
DO $$
DECLARE
  v_dept_id UUID;
BEGIN

  SELECT id INTO v_dept_id FROM departments WHERE code = 'EXE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-0001', 'Marcus Vance', 'admin@nexus.com', 'Global Administrator', 5, v_dept_id, 'Central Mall HQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKSgqOhip-FBpGhGxiH_p3xkjhxsk3PP2VO6IGwn9PSyLusBEUkgw6evs1p0mAX4naSSp_htp8N8deYgLX2qkNuBz_euEwpwPPD_C7FEVU3h6-cFvXeyrS1zZRrhaDC2mZilSquCjUp0An5W9mC553moCWm57K_QsXn9RcOkzH1FV53yaDg0ce1g7EsukiDU-9Fy-hHVH5YZHw-g7R8_FAfCtKXRUcUiZGA5tEBzJJFhBDFDJEcnCw', 'MV', '1234', TRUE, 'Jan 15, 2019'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'EXE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-0002', 'Victoria Stone', 'v.stone@nexusretail.com', 'VP Retail Operations', 5, v_dept_id, 'Central Mall HQ',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', 'VS', '1234', TRUE, 'May 10, 2020'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-8492', 'Elena Rodriguez', 'e.rodriguez@nexusretail.com', 'Senior Sales Associate & Floor Lead', 3, v_dept_id, 'North Wing #42',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCSy1JbUL5EHLhUSq8T2TP-nxMlEbEub9YzHHTfuoYoS7r_OInuKon5Y3btmVGcZx939OM0OSKVXIiE6xlFNw_VaZ51zI6AQsAdFTyNlxkGfznYfVX---VEIieISxwt_ATd9yuxqcPQrm2X_WSq3aOD-wZfaEuY1azLRJaw90ELG92UZK-syldymQKKs95hUMo6-QdGaT21IyeehJgHFVEA8aqPls9RyWeVAvBhtYknb5wJ19k45v0X', 'ER', '1234', TRUE, 'Oct 12, 2021'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-3401', 'David Chen', 'd.chen@nexusretail.com', 'Inventory Operations Specialist', 2, v_dept_id, 'Storage Bay B',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBy2xEe2XngudVkETnuUqbHnByXcJQqYENFFek-6XrOgnfAyfcGG_ZTB0LnCeHbZvQLOmeZX2_IkhfHSKjNqHAD_eX58tVEfD412GFJ3Qf4tB6vnB74OrF-PRG0g1CNatntoQvh7Q8hkbF6SkaoQM27tVGwz_R2szIgAqDrbDHzkNjg-CEvTiRNg0q6SI1cK__O7XHGRhSuJSAK-kQ26WIUAD88KSy49tDqXdcXD0aSJp-m3sHZsHC7', 'DC', '1234', TRUE, 'Mar 04, 2022'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-7712', 'Sarah Jenkins', 's.jenkins@nexusretail.com', 'Customer Experience Lead', 3, v_dept_id, 'South Atrium',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCT-BEtrJIqSrrSuRv72V0Mz6dVWZ-YTROUXxG70gj31hVZ4O0bEd4Pc7Yslj_V0pZh4jT2ccgRlojx8Qwn9KA8Mp8XMlof1y7dFFt5YQ2ApLTgFkHwE8iMwBeMUJFTt8fvwydG7y61MZp0Hvu9WfqdsRLgy5TjhhlJu5HmjKKUr3u6QppaeK71-Li19pgna0FxbiUe497tyZ9LoGPQMlemjkL_RcwwsBrN_qOe6L1jMFb-TsvnVRXo', 'SJ', '1234', FALSE, 'Aug 19, 2022'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-9920', 'Marcus Thorne', 'm.thorne@nexusretail.com', 'Mall Security Lead', 3, v_dept_id, 'West Gallery',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB53ZHJNsRwuEOo42TueHQHHwFFqRQWcBbh6hmgJG-5W4Al0cszV3p-1zccIjwuiG-eZunPKo8dOgDTcQfsfqdbVEoxp5kFGXMqFmatiLrr8PFdftVXrooDhXfSNW0flXnrP-YKmvKJF11JylvLuFvr9Lm28cvpz7UtjB7ezdWmAuv5Ua3t9Dr5c_BlBJxvCYWMtoVYxduR-UseW4BijMcbo6boPW0kDfmAwGhbnhPYMxzTrqfuWy3I', 'MT', '1234', TRUE, 'Nov 01, 2020'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1044', 'Anita Jones', 'a.jones@nexusretail.com', 'Retail Merchandising Associate', 1, v_dept_id, 'East Promenade',
    '', 'AJ', '1234', TRUE, 'Sep 01, 2026'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-2000', 'Liam Vance', 'liam.vance@nexusretail.com', 'Logistics Operations Manager', 4, v_dept_id, 'Storage Bay B',
    '', 'LV', '1234', TRUE, 'Jan 10, 2021'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-2001', 'Sophia Bennett', 'sophia.bennett@nexusretail.com', 'Customer Service Operations Manager', 4, v_dept_id, 'Central Mall HQ',
    '', 'SB', '1234', TRUE, 'Jan 10, 2021'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-2002', 'Darius Sterling', 'darius.sterling@nexusretail.com', 'Security & Facilities Manager', 4, v_dept_id, 'West Gallery',
    '', 'DS', '1234', TRUE, 'Jan 10, 2021'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-2003', 'Chloe Dupont', 'chloe.dupont@nexusretail.com', 'Apparel & Styling Floor Manager', 4, v_dept_id, 'North Wing #42',
    '', 'CD', '1234', TRUE, 'Jan 10, 2021'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-2004', 'Mateo Alvarez', 'mateo.alvarez@nexusretail.com', 'Consumer Tech Floor Manager', 4, v_dept_id, 'South Atrium',
    '', 'MA', '1234', TRUE, 'Jan 10, 2021'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-2005', 'Olivia Chang', 'olivia.chang@nexusretail.com', 'Front End & POS Operations Manager', 4, v_dept_id, 'East Promenade',
    '', 'OC', '1234', TRUE, 'Jan 10, 2021'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1001', 'James Smith', 'james.smith@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'JS', '1234', FALSE, '2022-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1002', 'Mary Johnson', 'mary.johnson@nexusretail.com', 'Mobile Device Consultant', 2, v_dept_id, 'South Atrium',
    '', 'MJ', '1234', TRUE, '2023-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1003', 'Robert Williams', 'robert.williams@nexusretail.com', 'Forklift & Bay Operator', 1, v_dept_id, 'Storage Bay B',
    '', 'RW', '1234', TRUE, '2024-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1004', 'Patricia Brown', 'patricia.brown@nexusretail.com', 'Information Desk Host', 2, v_dept_id, 'Central Mall HQ',
    '', 'PB', '1234', FALSE, '2025-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1005', 'John Jones', 'john.jones@nexusretail.com', 'Loss Prevention Specialist', 1, v_dept_id, 'West Gallery',
    '', 'JJ', '1234', TRUE, '2022-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1006', 'Jennifer Garcia', 'jennifer.garcia@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'JG', '1234', TRUE, '2023-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1007', 'Michael Miller', 'michael.miller@nexusretail.com', 'Kitchen Sanitation Host', 1, v_dept_id, 'Food Court Deck',
    '', 'MM', '1234', FALSE, '2024-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1008', 'Linda Davis', 'linda.davis@nexusretail.com', 'Customer Cash Coordinator', 2, v_dept_id, 'East Promenade',
    '', 'LD', '1234', TRUE, '2025-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1009', 'David Rodriguez', 'david.rodriguez@nexusretail.com', 'Fragrance Consultant', 1, v_dept_id, 'North Wing #42',
    '', 'DR', '1234', TRUE, '2022-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1010', 'Elizabeth Martinez', 'elizabeth.martinez@nexusretail.com', 'Furniture Stock Specialist', 1, v_dept_id, 'Upper Mezzanine',
    '', 'EM', '1234', FALSE, '2023-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1011', 'William Hernandez', 'william.hernandez@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'WH', '1234', TRUE, '2024-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1012', 'Barbara Lopez', 'barbara.lopez@nexusretail.com', 'Hardware Support Associate', 2, v_dept_id, 'South Atrium',
    '', 'BL', '1234', TRUE, '2025-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1013', 'Richard Gonzalez', 'richard.gonzalez@nexusretail.com', 'Inventory Stocker', 1, v_dept_id, 'Storage Bay B',
    '', 'RG', '1234', FALSE, '2022-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1014', 'Susan Wilson', 'susan.wilson@nexusretail.com', 'Guest Services Lead', 2, v_dept_id, 'Central Mall HQ',
    '', 'SW', '1234', TRUE, '2023-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1015', 'Joseph Anderson', 'joseph.anderson@nexusretail.com', 'Surveillance Operator', 1, v_dept_id, 'West Gallery',
    '', 'JA', '1234', TRUE, '2024-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1016', 'Jessica Thomas', 'jessica.thomas@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'JT', '1234', FALSE, '2025-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1017', 'Thomas Taylor', 'thomas.taylor@nexusretail.com', 'Barista Specialist', 1, v_dept_id, 'Food Court Deck',
    '', 'TT', '1234', TRUE, '2022-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1018', 'Sarah Moore', 'sarah.moore@nexusretail.com', 'POS Float Specialist', 2, v_dept_id, 'East Promenade',
    '', 'SM', '1234', TRUE, '2023-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1019', 'Charles Jackson', 'charles.jackson@nexusretail.com', 'Cosmetics Lead', 1, v_dept_id, 'North Wing #42',
    '', 'CJ', '1234', FALSE, '2024-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1020', 'Karen Martin', 'karen.martin@nexusretail.com', 'Display Coordinator', 1, v_dept_id, 'Upper Mezzanine',
    '', 'KM', '1234', TRUE, '2025-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1021', 'Christopher Lee', 'christopher.lee@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'CL', '1234', TRUE, '2022-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1022', 'Lisa Perez', 'lisa.perez@nexusretail.com', 'Mobile Device Consultant', 2, v_dept_id, 'South Atrium',
    '', 'LP', '1234', FALSE, '2023-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1023', 'Daniel Thompson', 'daniel.thompson@nexusretail.com', 'Forklift & Bay Operator', 1, v_dept_id, 'Storage Bay B',
    '', 'DT', '1234', TRUE, '2024-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1024', 'Nancy White', 'nancy.white@nexusretail.com', 'Information Desk Host', 2, v_dept_id, 'Central Mall HQ',
    '', 'NW', '1234', TRUE, '2025-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1025', 'Matthew Harris', 'matthew.harris@nexusretail.com', 'Loss Prevention Specialist', 1, v_dept_id, 'West Gallery',
    '', 'MH', '1234', FALSE, '2022-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1026', 'Betty Sanchez', 'betty.sanchez@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'BS', '1234', TRUE, '2023-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1027', 'Anthony Clark', 'anthony.clark@nexusretail.com', 'Kitchen Sanitation Host', 1, v_dept_id, 'Food Court Deck',
    '', 'AC', '1234', TRUE, '2024-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1028', 'Sandra Ramirez', 'sandra.ramirez@nexusretail.com', 'Customer Cash Coordinator', 2, v_dept_id, 'East Promenade',
    '', 'SR', '1234', FALSE, '2025-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1029', 'Mark Lewis', 'mark.lewis@nexusretail.com', 'Fragrance Consultant', 1, v_dept_id, 'North Wing #42',
    '', 'ML', '1234', TRUE, '2022-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1030', 'Margaret Robinson', 'margaret.robinson@nexusretail.com', 'Furniture Stock Specialist', 1, v_dept_id, 'Upper Mezzanine',
    '', 'MR', '1234', TRUE, '2023-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1031', 'Donald Walker', 'donald.walker@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'DW', '1234', FALSE, '2024-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1032', 'Ashley Young', 'ashley.young@nexusretail.com', 'Hardware Support Associate', 2, v_dept_id, 'South Atrium',
    '', 'AY', '1234', TRUE, '2025-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1033', 'Steven Allen', 'steven.allen@nexusretail.com', 'Inventory Stocker', 1, v_dept_id, 'Storage Bay B',
    '', 'SA', '1234', TRUE, '2022-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1034', 'Kimberly King', 'kimberly.king@nexusretail.com', 'Guest Services Lead', 2, v_dept_id, 'Central Mall HQ',
    '', 'KK', '1234', FALSE, '2023-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1035', 'Paul Wright', 'paul.wright@nexusretail.com', 'Surveillance Operator', 1, v_dept_id, 'West Gallery',
    '', 'PW', '1234', TRUE, '2024-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1036', 'Emily Scott', 'emily.scott@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'ES', '1234', TRUE, '2025-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1037', 'Andrew Torres', 'andrew.torres@nexusretail.com', 'Barista Specialist', 1, v_dept_id, 'Food Court Deck',
    '', 'AT', '1234', FALSE, '2022-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1038', 'Donna Nguyen', 'donna.nguyen@nexusretail.com', 'POS Float Specialist', 2, v_dept_id, 'East Promenade',
    '', 'DN', '1234', TRUE, '2023-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1039', 'Joshua Hill', 'joshua.hill@nexusretail.com', 'Cosmetics Lead', 1, v_dept_id, 'North Wing #42',
    '', 'JH', '1234', TRUE, '2024-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1040', 'Michelle Flores', 'michelle.flores@nexusretail.com', 'Display Coordinator', 1, v_dept_id, 'Upper Mezzanine',
    '', 'MF', '1234', FALSE, '2025-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1041', 'Kenneth Green', 'kenneth.green@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'KG', '1234', TRUE, '2022-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1042', 'Carol Adams', 'carol.adams@nexusretail.com', 'Mobile Device Consultant', 2, v_dept_id, 'South Atrium',
    '', 'CA', '1234', TRUE, '2023-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1043', 'Kevin Nelson', 'kevin.nelson@nexusretail.com', 'Forklift & Bay Operator', 1, v_dept_id, 'Storage Bay B',
    '', 'KN', '1234', FALSE, '2024-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1044', 'Amanda Baker', 'amanda.baker@nexusretail.com', 'Information Desk Host', 2, v_dept_id, 'Central Mall HQ',
    '', 'AB', '1234', TRUE, '2025-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1045', 'Brian Hall', 'brian.hall@nexusretail.com', 'Loss Prevention Specialist', 1, v_dept_id, 'West Gallery',
    '', 'BH', '1234', TRUE, '2022-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1046', 'Dorothy Rivera', 'dorothy.rivera@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'DR', '1234', FALSE, '2023-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1047', 'George Campbell', 'george.campbell@nexusretail.com', 'Kitchen Sanitation Host', 1, v_dept_id, 'Food Court Deck',
    '', 'GC', '1234', TRUE, '2024-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1048', 'Melissa Mitchell', 'melissa.mitchell@nexusretail.com', 'Customer Cash Coordinator', 2, v_dept_id, 'East Promenade',
    '', 'MM', '1234', TRUE, '2025-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1049', 'Timothy Carter', 'timothy.carter@nexusretail.com', 'Fragrance Consultant', 1, v_dept_id, 'North Wing #42',
    '', 'TC', '1234', FALSE, '2022-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1050', 'Deborah Roberts', 'deborah.roberts@nexusretail.com', 'Furniture Stock Specialist', 1, v_dept_id, 'Upper Mezzanine',
    '', 'DR', '1234', TRUE, '2023-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1051', 'Ronald Smith', 'ronald.smith@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'RS', '1234', TRUE, '2024-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1052', 'Stephanie Johnson', 'stephanie.johnson@nexusretail.com', 'Hardware Support Associate', 2, v_dept_id, 'South Atrium',
    '', 'SJ', '1234', FALSE, '2025-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1053', 'Edward Williams', 'edward.williams@nexusretail.com', 'Inventory Stocker', 1, v_dept_id, 'Storage Bay B',
    '', 'EW', '1234', TRUE, '2022-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1054', 'Rebecca Brown', 'rebecca.brown@nexusretail.com', 'Guest Services Lead', 2, v_dept_id, 'Central Mall HQ',
    '', 'RB', '1234', TRUE, '2023-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1055', 'Jason Jones', 'jason.jones@nexusretail.com', 'Surveillance Operator', 1, v_dept_id, 'West Gallery',
    '', 'JJ', '1234', FALSE, '2024-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1056', 'Sharon Garcia', 'sharon.garcia@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'SG', '1234', TRUE, '2025-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1057', 'Jeffrey Miller', 'jeffrey.miller@nexusretail.com', 'Barista Specialist', 1, v_dept_id, 'Food Court Deck',
    '', 'JM', '1234', TRUE, '2022-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1058', 'Laura Davis', 'laura.davis@nexusretail.com', 'POS Float Specialist', 2, v_dept_id, 'East Promenade',
    '', 'LD', '1234', FALSE, '2023-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1059', 'Ryan Rodriguez', 'ryan.rodriguez@nexusretail.com', 'Cosmetics Lead', 1, v_dept_id, 'North Wing #42',
    '', 'RR', '1234', TRUE, '2024-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1060', 'Cynthia Martinez', 'cynthia.martinez@nexusretail.com', 'Display Coordinator', 1, v_dept_id, 'Upper Mezzanine',
    '', 'CM', '1234', TRUE, '2025-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1061', 'Jacob Hernandez', 'jacob.hernandez@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'JH', '1234', FALSE, '2022-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1062', 'Kathleen Lopez', 'kathleen.lopez@nexusretail.com', 'Mobile Device Consultant', 2, v_dept_id, 'South Atrium',
    '', 'KL', '1234', TRUE, '2023-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1063', 'Gary Gonzalez', 'gary.gonzalez@nexusretail.com', 'Forklift & Bay Operator', 1, v_dept_id, 'Storage Bay B',
    '', 'GG', '1234', TRUE, '2024-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1064', 'Amy Wilson', 'amy.wilson@nexusretail.com', 'Information Desk Host', 2, v_dept_id, 'Central Mall HQ',
    '', 'AW', '1234', FALSE, '2025-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1065', 'Nicholas Anderson', 'nicholas.anderson@nexusretail.com', 'Loss Prevention Specialist', 1, v_dept_id, 'West Gallery',
    '', 'NA', '1234', TRUE, '2022-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1066', 'Angela Thomas', 'angela.thomas@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'AT', '1234', TRUE, '2023-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1067', 'Eric Taylor', 'eric.taylor@nexusretail.com', 'Kitchen Sanitation Host', 1, v_dept_id, 'Food Court Deck',
    '', 'ET', '1234', FALSE, '2024-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1068', 'Shirley Moore', 'shirley.moore@nexusretail.com', 'Customer Cash Coordinator', 2, v_dept_id, 'East Promenade',
    '', 'SM', '1234', TRUE, '2025-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1069', 'Jonathan Jackson', 'jonathan.jackson@nexusretail.com', 'Fragrance Consultant', 1, v_dept_id, 'North Wing #42',
    '', 'JJ', '1234', TRUE, '2022-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1070', 'Anna Martin', 'anna.martin@nexusretail.com', 'Furniture Stock Specialist', 1, v_dept_id, 'Upper Mezzanine',
    '', 'AM', '1234', FALSE, '2023-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1071', 'Stephen Lee', 'stephen.lee@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'SL', '1234', TRUE, '2024-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1072', 'Brenda Perez', 'brenda.perez@nexusretail.com', 'Hardware Support Associate', 2, v_dept_id, 'South Atrium',
    '', 'BP', '1234', TRUE, '2025-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1073', 'Larry Thompson', 'larry.thompson@nexusretail.com', 'Inventory Stocker', 1, v_dept_id, 'Storage Bay B',
    '', 'LT', '1234', FALSE, '2022-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1074', 'Pamela White', 'pamela.white@nexusretail.com', 'Guest Services Lead', 2, v_dept_id, 'Central Mall HQ',
    '', 'PW', '1234', TRUE, '2023-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1075', 'Justin Harris', 'justin.harris@nexusretail.com', 'Surveillance Operator', 1, v_dept_id, 'West Gallery',
    '', 'JH', '1234', TRUE, '2024-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1076', 'Emma Sanchez', 'emma.sanchez@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'ES', '1234', FALSE, '2025-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1077', 'Scott Clark', 'scott.clark@nexusretail.com', 'Barista Specialist', 1, v_dept_id, 'Food Court Deck',
    '', 'SC', '1234', TRUE, '2022-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1078', 'Nicole Ramirez', 'nicole.ramirez@nexusretail.com', 'POS Float Specialist', 2, v_dept_id, 'East Promenade',
    '', 'NR', '1234', TRUE, '2023-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1079', 'Brandon Lewis', 'brandon.lewis@nexusretail.com', 'Cosmetics Lead', 1, v_dept_id, 'North Wing #42',
    '', 'BL', '1234', FALSE, '2024-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1080', 'Helen Robinson', 'helen.robinson@nexusretail.com', 'Display Coordinator', 1, v_dept_id, 'Upper Mezzanine',
    '', 'HR', '1234', TRUE, '2025-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1081', 'Benjamin Walker', 'benjamin.walker@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'BW', '1234', TRUE, '2022-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1082', 'Samantha Young', 'samantha.young@nexusretail.com', 'Mobile Device Consultant', 2, v_dept_id, 'South Atrium',
    '', 'SY', '1234', FALSE, '2023-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1083', 'Samuel Allen', 'samuel.allen@nexusretail.com', 'Forklift & Bay Operator', 1, v_dept_id, 'Storage Bay B',
    '', 'SA', '1234', TRUE, '2024-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1084', 'Katherine King', 'katherine.king@nexusretail.com', 'Information Desk Host', 2, v_dept_id, 'Central Mall HQ',
    '', 'KK', '1234', TRUE, '2025-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1085', 'Gregory Wright', 'gregory.wright@nexusretail.com', 'Loss Prevention Specialist', 1, v_dept_id, 'West Gallery',
    '', 'GW', '1234', FALSE, '2022-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1086', 'Christine Scott', 'christine.scott@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'CS', '1234', TRUE, '2023-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1087', 'Alexander Torres', 'alexander.torres@nexusretail.com', 'Kitchen Sanitation Host', 1, v_dept_id, 'Food Court Deck',
    '', 'AT', '1234', TRUE, '2024-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1088', 'Debra Nguyen', 'debra.nguyen@nexusretail.com', 'Customer Cash Coordinator', 2, v_dept_id, 'East Promenade',
    '', 'DN', '1234', FALSE, '2025-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1089', 'Frank Hill', 'frank.hill@nexusretail.com', 'Fragrance Consultant', 1, v_dept_id, 'North Wing #42',
    '', 'FH', '1234', TRUE, '2022-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1090', 'Rachel Flores', 'rachel.flores@nexusretail.com', 'Furniture Stock Specialist', 1, v_dept_id, 'Upper Mezzanine',
    '', 'RF', '1234', TRUE, '2023-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1091', 'Patrick Green', 'patrick.green@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'PG', '1234', FALSE, '2024-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1092', 'Carolyn Adams', 'carolyn.adams@nexusretail.com', 'Hardware Support Associate', 2, v_dept_id, 'South Atrium',
    '', 'CA', '1234', TRUE, '2025-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1093', 'Raymond Nelson', 'raymond.nelson@nexusretail.com', 'Inventory Stocker', 1, v_dept_id, 'Storage Bay B',
    '', 'RN', '1234', TRUE, '2022-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1094', 'Janet Baker', 'janet.baker@nexusretail.com', 'Guest Services Lead', 2, v_dept_id, 'Central Mall HQ',
    '', 'JB', '1234', FALSE, '2023-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1095', 'Jack Hall', 'jack.hall@nexusretail.com', 'Surveillance Operator', 1, v_dept_id, 'West Gallery',
    '', 'JH', '1234', TRUE, '2024-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1096', 'Maria Rivera', 'maria.rivera@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'MR', '1234', TRUE, '2025-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1097', 'Dennis Campbell', 'dennis.campbell@nexusretail.com', 'Barista Specialist', 1, v_dept_id, 'Food Court Deck',
    '', 'DC', '1234', FALSE, '2022-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1098', 'Heather Mitchell', 'heather.mitchell@nexusretail.com', 'POS Float Specialist', 2, v_dept_id, 'East Promenade',
    '', 'HM', '1234', TRUE, '2023-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1099', 'Jerry Carter', 'jerry.carter@nexusretail.com', 'Cosmetics Lead', 1, v_dept_id, 'North Wing #42',
    '', 'JC', '1234', TRUE, '2024-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1100', 'Diane Roberts', 'diane.roberts@nexusretail.com', 'Display Coordinator', 1, v_dept_id, 'Upper Mezzanine',
    '', 'DR', '1234', FALSE, '2025-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1101', 'James Johnson', 'james.johnson@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'JJ', '1234', TRUE, '2022-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1102', 'Mary Williams', 'mary.williams@nexusretail.com', 'Mobile Device Consultant', 2, v_dept_id, 'South Atrium',
    '', 'MW', '1234', TRUE, '2023-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1103', 'Robert Brown', 'robert.brown@nexusretail.com', 'Forklift & Bay Operator', 1, v_dept_id, 'Storage Bay B',
    '', 'RB', '1234', FALSE, '2024-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1104', 'Patricia Jones', 'patricia.jones@nexusretail.com', 'Information Desk Host', 2, v_dept_id, 'Central Mall HQ',
    '', 'PJ', '1234', TRUE, '2025-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1105', 'John Garcia', 'john.garcia@nexusretail.com', 'Loss Prevention Specialist', 1, v_dept_id, 'West Gallery',
    '', 'JG', '1234', TRUE, '2022-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1106', 'Jennifer Miller', 'jennifer.miller@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'JM', '1234', FALSE, '2023-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1107', 'Michael Davis', 'michael.davis@nexusretail.com', 'Kitchen Sanitation Host', 1, v_dept_id, 'Food Court Deck',
    '', 'MD', '1234', TRUE, '2024-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1108', 'Linda Rodriguez', 'linda.rodriguez@nexusretail.com', 'Customer Cash Coordinator', 2, v_dept_id, 'East Promenade',
    '', 'LR', '1234', TRUE, '2025-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1109', 'David Martinez', 'david.martinez@nexusretail.com', 'Fragrance Consultant', 1, v_dept_id, 'North Wing #42',
    '', 'DM', '1234', FALSE, '2022-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1110', 'Elizabeth Hernandez', 'elizabeth.hernandez@nexusretail.com', 'Furniture Stock Specialist', 1, v_dept_id, 'Upper Mezzanine',
    '', 'EH', '1234', TRUE, '2023-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1111', 'William Lopez', 'william.lopez@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'WL', '1234', TRUE, '2024-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1112', 'Barbara Gonzalez', 'barbara.gonzalez@nexusretail.com', 'Hardware Support Associate', 2, v_dept_id, 'South Atrium',
    '', 'BG', '1234', FALSE, '2025-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1113', 'Richard Wilson', 'richard.wilson@nexusretail.com', 'Inventory Stocker', 1, v_dept_id, 'Storage Bay B',
    '', 'RW', '1234', TRUE, '2022-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1114', 'Susan Anderson', 'susan.anderson@nexusretail.com', 'Guest Services Lead', 2, v_dept_id, 'Central Mall HQ',
    '', 'SA', '1234', TRUE, '2023-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1115', 'Joseph Thomas', 'joseph.thomas@nexusretail.com', 'Surveillance Operator', 1, v_dept_id, 'West Gallery',
    '', 'JT', '1234', FALSE, '2024-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1116', 'Jessica Taylor', 'jessica.taylor@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'JT', '1234', TRUE, '2025-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1117', 'Thomas Moore', 'thomas.moore@nexusretail.com', 'Barista Specialist', 1, v_dept_id, 'Food Court Deck',
    '', 'TM', '1234', TRUE, '2022-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1118', 'Sarah Jackson', 'sarah.jackson@nexusretail.com', 'POS Float Specialist', 2, v_dept_id, 'East Promenade',
    '', 'SJ', '1234', FALSE, '2023-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1119', 'Charles Martin', 'charles.martin@nexusretail.com', 'Cosmetics Lead', 1, v_dept_id, 'North Wing #42',
    '', 'CM', '1234', TRUE, '2024-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1120', 'Karen Lee', 'karen.lee@nexusretail.com', 'Display Coordinator', 1, v_dept_id, 'Upper Mezzanine',
    '', 'KL', '1234', TRUE, '2025-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1121', 'Christopher Perez', 'christopher.perez@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'CP', '1234', FALSE, '2022-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1122', 'Lisa Thompson', 'lisa.thompson@nexusretail.com', 'Mobile Device Consultant', 2, v_dept_id, 'South Atrium',
    '', 'LT', '1234', TRUE, '2023-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1123', 'Daniel White', 'daniel.white@nexusretail.com', 'Forklift & Bay Operator', 1, v_dept_id, 'Storage Bay B',
    '', 'DW', '1234', TRUE, '2024-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1124', 'Nancy Harris', 'nancy.harris@nexusretail.com', 'Information Desk Host', 2, v_dept_id, 'Central Mall HQ',
    '', 'NH', '1234', FALSE, '2025-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1125', 'Matthew Sanchez', 'matthew.sanchez@nexusretail.com', 'Loss Prevention Specialist', 1, v_dept_id, 'West Gallery',
    '', 'MS', '1234', TRUE, '2022-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1126', 'Betty Clark', 'betty.clark@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'BC', '1234', TRUE, '2023-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1127', 'Anthony Ramirez', 'anthony.ramirez@nexusretail.com', 'Kitchen Sanitation Host', 1, v_dept_id, 'Food Court Deck',
    '', 'AR', '1234', FALSE, '2024-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1128', 'Sandra Lewis', 'sandra.lewis@nexusretail.com', 'Customer Cash Coordinator', 2, v_dept_id, 'East Promenade',
    '', 'SL', '1234', TRUE, '2025-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1129', 'Mark Robinson', 'mark.robinson@nexusretail.com', 'Fragrance Consultant', 1, v_dept_id, 'North Wing #42',
    '', 'MR', '1234', TRUE, '2022-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1130', 'Margaret Walker', 'margaret.walker@nexusretail.com', 'Furniture Stock Specialist', 1, v_dept_id, 'Upper Mezzanine',
    '', 'MW', '1234', FALSE, '2023-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1131', 'Donald Young', 'donald.young@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'DY', '1234', TRUE, '2024-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1132', 'Ashley Allen', 'ashley.allen@nexusretail.com', 'Hardware Support Associate', 2, v_dept_id, 'South Atrium',
    '', 'AA', '1234', TRUE, '2025-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1133', 'Steven King', 'steven.king@nexusretail.com', 'Inventory Stocker', 1, v_dept_id, 'Storage Bay B',
    '', 'SK', '1234', FALSE, '2022-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1134', 'Kimberly Wright', 'kimberly.wright@nexusretail.com', 'Guest Services Lead', 2, v_dept_id, 'Central Mall HQ',
    '', 'KW', '1234', TRUE, '2023-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1135', 'Paul Scott', 'paul.scott@nexusretail.com', 'Surveillance Operator', 1, v_dept_id, 'West Gallery',
    '', 'PS', '1234', TRUE, '2024-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1136', 'Emily Torres', 'emily.torres@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'ET', '1234', FALSE, '2025-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1137', 'Andrew Nguyen', 'andrew.nguyen@nexusretail.com', 'Barista Specialist', 1, v_dept_id, 'Food Court Deck',
    '', 'AN', '1234', TRUE, '2022-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1138', 'Donna Hill', 'donna.hill@nexusretail.com', 'POS Float Specialist', 2, v_dept_id, 'East Promenade',
    '', 'DH', '1234', TRUE, '2023-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1139', 'Joshua Flores', 'joshua.flores@nexusretail.com', 'Cosmetics Lead', 1, v_dept_id, 'North Wing #42',
    '', 'JF', '1234', FALSE, '2024-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1140', 'Michelle Green', 'michelle.green@nexusretail.com', 'Display Coordinator', 1, v_dept_id, 'Upper Mezzanine',
    '', 'MG', '1234', TRUE, '2025-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1141', 'Kenneth Adams', 'kenneth.adams@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'KA', '1234', TRUE, '2022-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1142', 'Carol Nelson', 'carol.nelson@nexusretail.com', 'Mobile Device Consultant', 2, v_dept_id, 'South Atrium',
    '', 'CN', '1234', FALSE, '2023-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1143', 'Kevin Baker', 'kevin.baker@nexusretail.com', 'Forklift & Bay Operator', 1, v_dept_id, 'Storage Bay B',
    '', 'KB', '1234', TRUE, '2024-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1144', 'Amanda Hall', 'amanda.hall@nexusretail.com', 'Information Desk Host', 2, v_dept_id, 'Central Mall HQ',
    '', 'AH', '1234', TRUE, '2025-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1145', 'Brian Rivera', 'brian.rivera@nexusretail.com', 'Loss Prevention Specialist', 1, v_dept_id, 'West Gallery',
    '', 'BR', '1234', FALSE, '2022-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1146', 'Dorothy Campbell', 'dorothy.campbell@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'DC', '1234', TRUE, '2023-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1147', 'George Mitchell', 'george.mitchell@nexusretail.com', 'Kitchen Sanitation Host', 1, v_dept_id, 'Food Court Deck',
    '', 'GM', '1234', TRUE, '2024-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1148', 'Melissa Carter', 'melissa.carter@nexusretail.com', 'Customer Cash Coordinator', 2, v_dept_id, 'East Promenade',
    '', 'MC', '1234', FALSE, '2025-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1149', 'Timothy Roberts', 'timothy.roberts@nexusretail.com', 'Fragrance Consultant', 1, v_dept_id, 'North Wing #42',
    '', 'TR', '1234', TRUE, '2022-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1150', 'Deborah Smith', 'deborah.smith@nexusretail.com', 'Furniture Stock Specialist', 1, v_dept_id, 'Upper Mezzanine',
    '', 'DS', '1234', TRUE, '2023-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1151', 'Ronald Johnson', 'ronald.johnson@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'RJ', '1234', FALSE, '2024-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1152', 'Stephanie Williams', 'stephanie.williams@nexusretail.com', 'Hardware Support Associate', 2, v_dept_id, 'South Atrium',
    '', 'SW', '1234', TRUE, '2025-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1153', 'Edward Brown', 'edward.brown@nexusretail.com', 'Inventory Stocker', 1, v_dept_id, 'Storage Bay B',
    '', 'EB', '1234', TRUE, '2022-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1154', 'Rebecca Jones', 'rebecca.jones@nexusretail.com', 'Guest Services Lead', 2, v_dept_id, 'Central Mall HQ',
    '', 'RJ', '1234', FALSE, '2023-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1155', 'Jason Garcia', 'jason.garcia@nexusretail.com', 'Surveillance Operator', 1, v_dept_id, 'West Gallery',
    '', 'JG', '1234', TRUE, '2024-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1156', 'Sharon Miller', 'sharon.miller@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'SM', '1234', TRUE, '2025-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1157', 'Jeffrey Davis', 'jeffrey.davis@nexusretail.com', 'Barista Specialist', 1, v_dept_id, 'Food Court Deck',
    '', 'JD', '1234', FALSE, '2022-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1158', 'Laura Rodriguez', 'laura.rodriguez@nexusretail.com', 'POS Float Specialist', 2, v_dept_id, 'East Promenade',
    '', 'LR', '1234', TRUE, '2023-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1159', 'Ryan Martinez', 'ryan.martinez@nexusretail.com', 'Cosmetics Lead', 1, v_dept_id, 'North Wing #42',
    '', 'RM', '1234', TRUE, '2024-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1160', 'Cynthia Hernandez', 'cynthia.hernandez@nexusretail.com', 'Display Coordinator', 1, v_dept_id, 'Upper Mezzanine',
    '', 'CH', '1234', FALSE, '2025-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1161', 'Jacob Lopez', 'jacob.lopez@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'JL', '1234', TRUE, '2022-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1162', 'Kathleen Gonzalez', 'kathleen.gonzalez@nexusretail.com', 'Mobile Device Consultant', 2, v_dept_id, 'South Atrium',
    '', 'KG', '1234', TRUE, '2023-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1163', 'Gary Wilson', 'gary.wilson@nexusretail.com', 'Forklift & Bay Operator', 1, v_dept_id, 'Storage Bay B',
    '', 'GW', '1234', FALSE, '2024-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1164', 'Amy Anderson', 'amy.anderson@nexusretail.com', 'Information Desk Host', 2, v_dept_id, 'Central Mall HQ',
    '', 'AA', '1234', TRUE, '2025-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1165', 'Nicholas Thomas', 'nicholas.thomas@nexusretail.com', 'Loss Prevention Specialist', 1, v_dept_id, 'West Gallery',
    '', 'NT', '1234', TRUE, '2022-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1166', 'Angela Taylor', 'angela.taylor@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'AT', '1234', FALSE, '2023-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1167', 'Eric Moore', 'eric.moore@nexusretail.com', 'Kitchen Sanitation Host', 1, v_dept_id, 'Food Court Deck',
    '', 'EM', '1234', TRUE, '2024-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1168', 'Shirley Jackson', 'shirley.jackson@nexusretail.com', 'Customer Cash Coordinator', 2, v_dept_id, 'East Promenade',
    '', 'SJ', '1234', TRUE, '2025-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1169', 'Jonathan Martin', 'jonathan.martin@nexusretail.com', 'Fragrance Consultant', 1, v_dept_id, 'North Wing #42',
    '', 'JM', '1234', FALSE, '2022-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1170', 'Anna Lee', 'anna.lee@nexusretail.com', 'Furniture Stock Specialist', 1, v_dept_id, 'Upper Mezzanine',
    '', 'AL', '1234', TRUE, '2023-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1171', 'Stephen Perez', 'stephen.perez@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'SP', '1234', TRUE, '2024-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1172', 'Brenda Thompson', 'brenda.thompson@nexusretail.com', 'Hardware Support Associate', 2, v_dept_id, 'South Atrium',
    '', 'BT', '1234', FALSE, '2025-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1173', 'Larry White', 'larry.white@nexusretail.com', 'Inventory Stocker', 1, v_dept_id, 'Storage Bay B',
    '', 'LW', '1234', TRUE, '2022-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1174', 'Pamela Harris', 'pamela.harris@nexusretail.com', 'Guest Services Lead', 2, v_dept_id, 'Central Mall HQ',
    '', 'PH', '1234', TRUE, '2023-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1175', 'Justin Sanchez', 'justin.sanchez@nexusretail.com', 'Surveillance Operator', 1, v_dept_id, 'West Gallery',
    '', 'JS', '1234', FALSE, '2024-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1176', 'Emma Clark', 'emma.clark@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'EC', '1234', TRUE, '2025-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1177', 'Scott Ramirez', 'scott.ramirez@nexusretail.com', 'Barista Specialist', 1, v_dept_id, 'Food Court Deck',
    '', 'SR', '1234', TRUE, '2022-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'POS';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1178', 'Nicole Lewis', 'nicole.lewis@nexusretail.com', 'POS Float Specialist', 2, v_dept_id, 'East Promenade',
    '', 'NL', '1234', FALSE, '2023-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'BTY';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1179', 'Brandon Robinson', 'brandon.robinson@nexusretail.com', 'Cosmetics Lead', 1, v_dept_id, 'North Wing #42',
    '', 'BR', '1234', TRUE, '2024-08-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'HGF';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1180', 'Helen Walker', 'helen.walker@nexusretail.com', 'Display Coordinator', 1, v_dept_id, 'Upper Mezzanine',
    '', 'HW', '1234', TRUE, '2025-09-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'APP';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1181', 'Benjamin Young', 'benjamin.young@nexusretail.com', 'Apparel Team Lead', 3, v_dept_id, 'North Wing #42',
    '', 'BY', '1234', FALSE, '2022-01-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'ELE';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1182', 'Samantha Allen', 'samantha.allen@nexusretail.com', 'Mobile Device Consultant', 2, v_dept_id, 'South Atrium',
    '', 'SA', '1234', TRUE, '2023-02-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'LOG';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1183', 'Samuel King', 'samuel.king@nexusretail.com', 'Forklift & Bay Operator', 1, v_dept_id, 'Storage Bay B',
    '', 'SK', '1234', TRUE, '2024-03-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'CRM';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1184', 'Katherine Wright', 'katherine.wright@nexusretail.com', 'Information Desk Host', 2, v_dept_id, 'Central Mall HQ',
    '', 'KW', '1234', FALSE, '2025-04-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1185', 'Gregory Scott', 'gregory.scott@nexusretail.com', 'Loss Prevention Specialist', 1, v_dept_id, 'West Gallery',
    '', 'GS', '1234', TRUE, '2022-05-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FAC';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1186', 'Christine Torres', 'christine.torres@nexusretail.com', 'Facilities Team Lead', 3, v_dept_id, 'Service Core A',
    '', 'CT', '1234', TRUE, '2023-06-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

  SELECT id INTO v_dept_id FROM departments WHERE code = 'FNB';
  INSERT INTO employees (
    employee_code, name, email, role_title, rank, department_id, zone, avatar_url, initials, pin_hash, is_clocked_in, hire_date
  ) VALUES (
    'NEX-1187', 'Alexander Nguyen', 'alexander.nguyen@nexusretail.com', 'Kitchen Sanitation Host', 1, v_dept_id, 'Food Court Deck',
    '', 'AN', '1234', FALSE, '2024-07-15'
  ) ON CONFLICT (employee_code) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    rank = EXCLUDED.rank,
    is_clocked_in = EXCLUDED.is_clocked_in;

END $$;

-- 3. SEED INVENTORY
INSERT INTO inventory (sku, name, category, stock_level, max_capacity, reorder_threshold, unit_price) VALUES
('EL-OM-27', 'OLED Monitor 27"', 'Electronics', 145, 200, 15, 349.99),
('FA-WP-L', 'Winter Parka - L', 'Fashion', 12, 80, 20, 129.50),
('EL-WE-P', 'Wireless Earbuds Pro', 'Electronics', 0, 150, 25, 89.99),
('HG-EC-B', 'Ergo Office Chair', 'Home Goods', 45, 60, 10, 219.00),
('HG-CTL-W', 'Ceramic Table Lamp', 'Home Goods', 28, 50, 10, 64.00),
('FA-MWS-M', 'Merino Wool Sweater', 'Fashion', 8, 50, 15, 95.00),
('EL-SVD-1', 'Smart Video Doorbell', 'Electronics', 62, 100, 20, 119.99),
('HG-CLD-K', 'Cotton Linen Duvet Set', 'Home Goods', 19, 40, 10, 85.00)
ON CONFLICT (sku) DO NOTHING;

-- 4. SEED FINANCIAL TRANSACTIONS
INSERT INTO financial_transactions (description, category, transaction_type, amount, status, transaction_date) VALUES
('Tenant Lease Payment - Zara', 'Revenue', 'revenue', 12500.00, 'Completed', CURRENT_DATE - INTERVAL '1 day'),
('Facility Maintenance - HVAC Services', 'Maintenance', 'expense', 3420.00, 'Completed', CURRENT_DATE - INTERVAL '2 days'),
('East Wing Lighting Retrofit', 'Utilities', 'expense', 1850.00, 'Pending', CURRENT_DATE - INTERVAL '3 days'),
('Anchor Tenant Lease - Apple Store', 'Revenue', 'revenue', 28500.00, 'Completed', CURRENT_DATE - INTERVAL '4 days'),
('Bi-Weekly Security Contractor Payroll', 'Payroll', 'expense', 8400.00, 'Completed', CURRENT_DATE - INTERVAL '5 days'),
('Food Court Concession Royalty', 'Revenue', 'revenue', 6720.00, 'Completed', CURRENT_DATE - INTERVAL '6 days');
