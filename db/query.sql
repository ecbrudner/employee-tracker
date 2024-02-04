-- view all departments
SELECT * FROM department;

-- view all roles, including department name
SELECT role.id, role.title, department.name AS department, role.salary
FROM role
JOIN department ON role.department_id = department.id;

-- view all employees
SELECT
    e.id,
    e.first_name,
    e.last_name,
    r.title AS title,
    d.name AS department,
    r.salary AS salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM
    employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- add a department
INSERT INTO department (name) 
VALUES ('XXX');

-- add a role
INSERT INTO role (title, salary, department_id)
VALUES ('XXX', 100000, 1);

-- add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('XXX', 'XXX', 1, NULL);

-- update an employee role
UPDATE employee
SET role_id = 1
WHERE employee.id = 1;

-- get department_id from department name
SELECT id FROM department WHERE name = 'XXX';

-- get role_id from role title
SELECT id FROM role WHERE title = 'XXX';

-- get employee_id from employee name
SELECT id FROM employee WHERE CONCAT (first_name, ' ', last_name) = 'XXX XXX';