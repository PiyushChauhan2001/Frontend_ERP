const DB_KEY_PREFIX = "ems_mock_v2_";

const getTodayStr = () => new Date().toISOString().slice(0, 10);
const getCurrentTimeStr = () => new Date().toTimeString().slice(0, 8);

function loadStorage(key, defaultData) {
  try {
    const data = localStorage.getItem(DB_KEY_PREFIX + key);
    if (!data) {
      localStorage.setItem(DB_KEY_PREFIX + key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(data);
  } catch {
    return defaultData;
  }
}

function saveStorage(key, data) {
  try {
    localStorage.setItem(DB_KEY_PREFIX + key, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save to localStorage", err);
  }
}

const INITIAL_DEPARTMENTS = [
  { id: 1, name: "Human Resources" },
  { id: 2, name: "Engineering" },
  { id: 3, name: "Product & Design" },
  { id: 4, name: "Marketing & Sales" },
];

const INITIAL_LEAVE_TYPES = [
  { id: 1, name: "Annual Leave" },
  { id: 2, name: "Sick Leave" },
  { id: 3, name: "Casual Leave" },
  { id: 4, name: "Maternity/Paternity Leave" },
];

const INITIAL_EMPLOYEES = [
  {
    id: 1,
    employee_id: "EMP001",
    user: {
      id: 1,
      username: "admin",
      first_name: "Admin",
      last_name: "User",
      email: "admin@meridian.com",
      role: "ADMIN",
    },
    department: 1,
    department_name: "Human Resources",
    designation: "HR Director",
    status: "ACTIVE",
    phone: "+1 555-0101",
    address: "100 Corporate Way, Suite 400",
    date_of_joining: "2022-01-15",
    date_of_birth: "1985-04-12",
    salary: "125000.00",
  },
  {
    id: 2,
    employee_id: "EMP002",
    user: {
      id: 2,
      username: "hr_manager",
      first_name: "Sarah",
      last_name: "Jenkins",
      email: "s.jenkins@meridian.com",
      role: "HR",
    },
    department: 1,
    department_name: "Human Resources",
    designation: "HR Specialist",
    status: "ACTIVE",
    phone: "+1 555-0102",
    address: "204 Birch Street",
    date_of_joining: "2022-06-01",
    date_of_birth: "1991-08-23",
    salary: "85000.00",
  },
  {
    id: 3,
    employee_id: "EMP003",
    user: {
      id: 3,
      username: "alex_dev",
      first_name: "Alex",
      last_name: "Rivera",
      email: "a.rivera@meridian.com",
      role: "EMPLOYEE",
    },
    department: 2,
    department_name: "Engineering",
    designation: "Senior Frontend Engineer",
    status: "ACTIVE",
    phone: "+1 555-0103",
    address: "512 Tech Avenue",
    date_of_joining: "2023-02-10",
    date_of_birth: "1994-11-05",
    salary: "110000.00",
  },
  {
    id: 4,
    employee_id: "EMP004",
    user: {
      id: 4,
      username: "morgan_design",
      first_name: "Morgan",
      last_name: "Lee",
      email: "m.lee@meridian.com",
      role: "EMPLOYEE",
    },
    department: 3,
    department_name: "Product & Design",
    designation: "Lead UX Designer",
    status: "ACTIVE",
    phone: "+1 555-0104",
    address: "88 Creative Blvd",
    date_of_joining: "2023-05-18",
    date_of_birth: "1992-03-30",
    salary: "105000.00",
  },
  {
    id: 5,
    employee_id: "EMP005",
    user: {
      id: 5,
      username: "david_qa",
      first_name: "David",
      last_name: "Chen",
      email: "d.chen@meridian.com",
      role: "EMPLOYEE",
    },
    department: 2,
    department_name: "Engineering",
    designation: "QA Engineer",
    status: "ON_LEAVE",
    phone: "+1 555-0105",
    address: "42 Quality Drive",
    date_of_joining: "2023-09-01",
    date_of_birth: "1995-07-14",
    salary: "90000.00",
  },
];

const INITIAL_ATTENDANCE = [
  {
    id: 1,
    employee: 3,
    employee_name: "Alex Rivera",
    employee_code: "EMP003",
    date: getTodayStr(),
    check_in: "09:05:12",
    check_out: null,
    status: "PRESENT",
  },
  {
    id: 2,
    employee: 2,
    employee_name: "Sarah Jenkins",
    employee_code: "EMP002",
    date: getTodayStr(),
    check_in: "08:55:00",
    check_out: null,
    status: "PRESENT",
  },
  {
    id: 3,
    employee: 1,
    employee_name: "Admin User",
    employee_code: "EMP001",
    date: getTodayStr(),
    check_in: "08:45:22",
    check_out: null,
    status: "PRESENT",
  },
];

const INITIAL_LEAVES = [
  {
    id: 1,
    employee: 3,
    employee_name: "Alex Rivera",
    employee_code: "EMP003",
    leave_type: 1,
    leave_type_name: "Annual Leave",
    start_date: "2026-10-10",
    end_date: "2026-10-15",
    total_days: 5,
    reason: "Vacation trip",
    status: "PENDING",
  },
  {
    id: 2,
    employee: 5,
    employee_name: "David Chen",
    employee_code: "EMP005",
    leave_type: 2,
    leave_type_name: "Sick Leave",
    start_date: "2026-09-28",
    end_date: "2026-10-02",
    total_days: 5,
    reason: "Medical recovery",
    status: "APPROVED",
  },
  {
    id: 3,
    employee: 4,
    employee_name: "Morgan Lee",
    employee_code: "EMP004",
    leave_type: 3,
    leave_type_name: "Casual Leave",
    start_date: "2026-10-01",
    end_date: "2026-10-01",
    total_days: 1,
    reason: "Personal work",
    status: "PENDING",
  },
];

function getLoggedInUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getLoggedInEmployee() {
  const user = getLoggedInUser();
  const employees = loadStorage("employees", INITIAL_EMPLOYEES);
  if (!user) return employees[0];
  return (
    employees.find((e) => e.user.id === user.id || e.user.username === user.username) || {
      id: user.id || 1,
      employee_id: "EMP" + String(user.id || 1).padStart(3, "0"),
      user,
      department_name: "General",
      designation: "Team Member",
      status: "ACTIVE",
    }
  );
}

const asyncWrap = (data) => Promise.resolve({ data });

export const authApi = {
  login: async (username, _password) => {
    const employees = loadStorage("employees", INITIAL_EMPLOYEES);
    const existingEmp = employees.find(
      (e) => e.user.username.toLowerCase() === (username || "").toLowerCase()
    );

    let user;
    if (existingEmp) {
      user = existingEmp.user;
    } else if ((username || "").toLowerCase().includes("emp")) {
      user = {
        id: 3,
        username: username || "alex_dev",
        first_name: "Alex",
        last_name: "Rivera",
        email: "a.rivera@meridian.com",
        role: "EMPLOYEE",
      };
    } else {
      user = {
        id: 1,
        username: username || "admin",
        first_name: "Admin",
        last_name: "User",
        email: "admin@meridian.com",
        role: "ADMIN",
      };
    }

    return asyncWrap({
      access: "mock_jwt_access_token",
      refresh: "mock_jwt_refresh_token",
      user,
    });
  },

  logout: async () => {
    return asyncWrap({ detail: "Successfully logged out." });
  },
};

export const employeesApi = {
  list: async (params = {}) => {
    let employees = loadStorage("employees", INITIAL_EMPLOYEES);
    if (params.search) {
      const q = params.search.toLowerCase();
      employees = employees.filter(
        (e) =>
          e.employee_id.toLowerCase().includes(q) ||
          e.user.first_name.toLowerCase().includes(q) ||
          e.user.last_name.toLowerCase().includes(q) ||
          e.designation.toLowerCase().includes(q)
      );
    }
    const count = employees.length;
    const results = params.page_size ? employees.slice(0, params.page_size) : employees;
    return asyncWrap({ count, results });
  },

  me: async () => {
    const emp = getLoggedInEmployee();
    return asyncWrap(emp);
  },

  get: async (id) => {
    const employees = loadStorage("employees", INITIAL_EMPLOYEES);
    const emp = employees.find((e) => e.id === Number(id)) || employees[0];
    return asyncWrap(emp);
  },

  create: async (payload) => {
    const employees = loadStorage("employees", INITIAL_EMPLOYEES);
    const departments = loadStorage("departments", INITIAL_DEPARTMENTS);
    const newId = Date.now();

    const deptObj = departments.find((d) => String(d.id) === String(payload.department));

    const newEmp = {
      id: newId,
      employee_id: payload.employee_id || `EMP${newId.toString().slice(-3)}`,
      user: {
        id: newId,
        username: payload.username,
        first_name: payload.first_name,
        last_name: payload.last_name || "",
        email: payload.email,
        role: payload.role || "EMPLOYEE",
      },
      department: payload.department ? Number(payload.department) : null,
      department_name: deptObj ? deptObj.name : "—",
      designation: payload.designation,
      phone: payload.phone || "",
      address: payload.address || "",
      date_of_joining: payload.date_of_joining,
      date_of_birth: payload.date_of_birth || "",
      salary: payload.salary || "0.00",
      status: payload.status || "ACTIVE",
    };

    employees.unshift(newEmp);
    saveStorage("employees", employees);
    return asyncWrap(newEmp);
  },

  update: async (id, payload) => {
    let employees = loadStorage("employees", INITIAL_EMPLOYEES);
    const departments = loadStorage("departments", INITIAL_DEPARTMENTS);
    const index = employees.findIndex((e) => e.id === Number(id));

    if (index !== -1) {
      const existing = employees[index];
      const deptObj = departments.find((d) => String(d.id) === String(payload.department));

      const updated = {
        ...existing,
        ...payload,
        department: payload.department ? Number(payload.department) : null,
        department_name: deptObj ? deptObj.name : existing.department_name,
      };

      employees[index] = updated;
      saveStorage("employees", employees);
      return asyncWrap(updated);
    }
    return asyncWrap(payload);
  },

  remove: async (id) => {
    let employees = loadStorage("employees", INITIAL_EMPLOYEES);
    employees = employees.filter((e) => e.id !== Number(id));
    saveStorage("employees", employees);
    return asyncWrap({ ok: true });
  },

  departments: async () => {
    const departments = loadStorage("departments", INITIAL_DEPARTMENTS);
    return asyncWrap({ count: departments.length, results: departments });
  },

  createDepartment: async (payload) => {
    const departments = loadStorage("departments", INITIAL_DEPARTMENTS);
    const newDept = { id: Date.now(), name: payload.name };
    departments.push(newDept);
    saveStorage("departments", departments);
    return asyncWrap(newDept);
  },
};

export const attendanceApi = {
  list: async (params = {}) => {
    let attendance = loadStorage("attendance", INITIAL_ATTENDANCE);
    if (params.date) {
      attendance = attendance.filter((r) => r.date === params.date);
    }
    const count = attendance.length;
    const results = params.page_size ? attendance.slice(0, params.page_size) : attendance;
    return asyncWrap({ count, results });
  },

  myHistory: async (params = {}) => {
    let attendance = loadStorage("attendance", INITIAL_ATTENDANCE);
    const emp = getLoggedInEmployee();
    attendance = attendance.filter((r) => r.employee === emp.id || r.employee_code === emp.employee_id);

    if (params.date) {
      attendance = attendance.filter((r) => r.date === params.date);
    }
    const count = attendance.length;
    const results = params.page_size ? attendance.slice(0, params.page_size) : attendance;
    return asyncWrap({ count, results });
  },

  checkIn: async () => {
    const attendance = loadStorage("attendance", INITIAL_ATTENDANCE);
    const emp = getLoggedInEmployee();
    const today = getTodayStr();
    const now = getCurrentTimeStr();

    let record = attendance.find(
      (r) => r.date === today && (r.employee === emp.id || r.employee_code === emp.employee_id)
    );

    if (record) {
      record.check_in = now;
      record.status = "PRESENT";
    } else {
      record = {
        id: Date.now(),
        employee: emp.id,
        employee_name: `${emp.user.first_name} ${emp.user.last_name}`.trim(),
        employee_code: emp.employee_id,
        date: today,
        check_in: now,
        check_out: null,
        status: "PRESENT",
      };
      attendance.unshift(record);
    }

    saveStorage("attendance", attendance);
    return asyncWrap(record);
  },

  checkOut: async () => {
    const attendance = loadStorage("attendance", INITIAL_ATTENDANCE);
    const emp = getLoggedInEmployee();
    const today = getTodayStr();
    const now = getCurrentTimeStr();

    let record = attendance.find(
      (r) => r.date === today && (r.employee === emp.id || r.employee_code === emp.employee_id)
    );

    if (record) {
      record.check_out = now;
    } else {
      record = {
        id: Date.now(),
        employee: emp.id,
        employee_name: `${emp.user.first_name} ${emp.user.last_name}`.trim(),
        employee_code: emp.employee_id,
        date: today,
        check_in: "09:00:00",
        check_out: now,
        status: "PRESENT",
      };
      attendance.unshift(record);
    }

    saveStorage("attendance", attendance);
    return asyncWrap(record);
  },

  update: async (id, payload) => {
    const attendance = loadStorage("attendance", INITIAL_ATTENDANCE);
    const index = attendance.findIndex((r) => r.id === Number(id));
    if (index !== -1) {
      attendance[index] = { ...attendance[index], ...payload };
      saveStorage("attendance", attendance);
      return asyncWrap(attendance[index]);
    }
    return asyncWrap(payload);
  },
};

export const leavesApi = {
  list: async (params = {}) => {
    let leaves = loadStorage("leaves", INITIAL_LEAVES);
    if (params.status) {
      leaves = leaves.filter((l) => l.status === params.status);
    }
    const count = leaves.length;
    const results = params.page_size ? leaves.slice(0, params.page_size) : leaves;
    return asyncWrap({ count, results });
  },

  myRequests: async (params = {}) => {
    let leaves = loadStorage("leaves", INITIAL_LEAVES);
    const emp = getLoggedInEmployee();
    leaves = leaves.filter((l) => l.employee === emp.id || l.employee_code === emp.employee_id);

    if (params.status) {
      leaves = leaves.filter((l) => l.status === params.status);
    }
    const count = leaves.length;
    const results = params.page_size ? leaves.slice(0, params.page_size) : leaves;
    return asyncWrap({ count, results });
  },

  types: async () => {
    const leaveTypes = loadStorage("leave_types", INITIAL_LEAVE_TYPES);
    return asyncWrap({ count: leaveTypes.length, results: leaveTypes });
  },

  apply: async (payload) => {
    const leaves = loadStorage("leaves", INITIAL_LEAVES);
    const leaveTypes = loadStorage("leave_types", INITIAL_LEAVE_TYPES);
    const emp = getLoggedInEmployee();

    const typeObj = leaveTypes.find((t) => String(t.id) === String(payload.leave_type));

    let totalDays = 1;
    if (payload.start_date && payload.end_date) {
      const d1 = new Date(payload.start_date);
      const d2 = new Date(payload.end_date);
      const diffTime = Math.abs(d2 - d1);
      totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
    }

    const newLeave = {
      id: Date.now(),
      employee: emp.id,
      employee_name: `${emp.user.first_name} ${emp.user.last_name}`.trim(),
      employee_code: emp.employee_id,
      leave_type: Number(payload.leave_type),
      leave_type_name: typeObj ? typeObj.name : "Leave",
      start_date: payload.start_date,
      end_date: payload.end_date,
      total_days: totalDays,
      reason: payload.reason,
      status: "PENDING",
    };

    leaves.unshift(newLeave);
    saveStorage("leaves", leaves);
    return asyncWrap(newLeave);
  },

  cancel: async (id) => {
    const leaves = loadStorage("leaves", INITIAL_LEAVES);
    const record = leaves.find((l) => l.id === Number(id));
    if (record) {
      record.status = "CANCELLED";
      saveStorage("leaves", leaves);
      return asyncWrap(record);
    }
    return asyncWrap({ id });
  },

  review: async (id, action, _comment) => {
    const leaves = loadStorage("leaves", INITIAL_LEAVES);
    const record = leaves.find((l) => l.id === Number(id));
    if (record) {
      record.status = action === "APPROVE" ? "APPROVED" : "REJECTED";
      saveStorage("leaves", leaves);
      return asyncWrap(record);
    }
    return asyncWrap({ id });
  },
};
