const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Rslcgh1234$',
        database: 'company_db'
    },
    console.log('Connected to the company_db database.')
);

let departmentChoices = [];
let roleTitles = [];
let employeeNames = [];
let departmentId;
let roleId;
let managerId;
let employeeId;

function mainMenu(){
inquirer.prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
    }
]).then (answers => {
    if (answers.options === 'View All Departments') {
        viewDepartments();
    } else if (answers.options === 'View All Roles') {
        viewRoles();
    } else if (answers.options === 'View All Employees') {
        viewEmployees();
    } else if (answers.options === 'Add a Department') {
        addDepartment();
    } else if (answers.options === 'Add a Role') {
        addRole();
    } else if (answers.options === 'Add an Employee') {
        addEmployee();
    } else if (answers.options === 'Update an Employee Role') {
        updateEmployeeRole();
    } else if (answers.options === 'Exit') {
        console.log('Goodbye.');
        db.end();
        return;
    }
});
}

function viewDepartments() {
    db.query('SELECT * FROM department', function(err, results) {
        if (err) {
            console.error(err);
        }
        console.table(results);
        mainMenu();
    });
}

function viewRoles() {
    db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id', function(err, results) {
        if (err) {
            console.error(err);
        }
        console.table(results);
        mainMenu();
    });
}

function viewEmployees() {
    db.query('SELECT e.id, e.first_name, e.last_name, r.title AS title, d.name AS department, r.salary AS salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id', function(err, results) {
        if (err) {
            console.error(err);
        }
        console.table(results);
        mainMenu();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]).then(answers => {
        db.query('INSERT INTO department(name) VALUES(?)',[answers.department], function(err, results) {
            console.log('Department added.');
        });
        mainMenu();
    });
}

function addRole() {
    db.query('SELECT name FROM department', function(err, results) {
        if (err) {
            console.error(err);
            return;
        }
    departmentChoices = results.map(department => department.name);

        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: departmentChoices
            }
        ]).then(answers => {

            db.query('SELECT id FROM department WHERE name = ?', [answers.department], function(err, results) {
                if (err) {
                console.error(err);
                }
            departmentId=results[0].id;

                db.query('INSERT INTO role(title, salary, department_id) VALUES(?,?,?)',[answers.title, answers.salary, departmentId], function(err, results) {
                    if (err) {
                    console.error(err);
                    } else {
                    console.log('Role added.');
                    }
                });
                mainMenu();
            });
        });
    });
}

function addEmployee() {
    db.query('SELECT title FROM role', function(err, results) {
        roleTitles = results.map(role => role.title);
    

    db.query('SELECT first_name, last_name FROM employee', function(err, results) {
        employeeNames = results.map(employee => employee.first_name + ' ' + employee.last_name);
    

        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee?',
                choices: roleTitles
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the manager of the employee?',
                choices: employeeNames
            }
        ]).then(answers => {
            db.query('SELECT id FROM role WHERE title = ?', [answers.role], function(err, results) {
                if (err) {
                    console.error(err);
                }
            roleId=results[0].id;

            db.query('SELECT id FROM employee WHERE CONCAT (first_name," ",last_name) = ?', [answers.manager], function(err, results) {
                if (err) {
                    console.error(err);
                }
            managerId=results[0].id;

                db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)',[answers.first_name, answers.last_name, roleId, managerId], function(err, results) {
                console.log('Employee added.');
                });
            mainMenu();
            });
            });
        });
    });
    });
}

function updateEmployeeRole() {
    db.query('SELECT title FROM role', function(err, results) {
        roleTitles = results.map(role => role.title);
    

    db.query('SELECT first_name, last_name FROM employee', function(err, results) {
        employeeNames = results.map(employee => employee.first_name + ' ' + employee.last_name);

        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?',
                choices: employeeNames
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the new role of the employee?',
                choices: roleTitles
            }
        ]).then(answers => {
            db.query('SELECT id FROM role WHERE title = ?', [answers.role], function(err, results) {
                if (err) {
                    console.error(err);
                }
            roleId=results[0].id;

            db.query('SELECT id FROM employee WHERE CONCAT (first_name," ",last_name) = ?', [answers.employee], function(err, results) {
                if (err) {
                    console.error(err);
                }
            employeeId=results[0].id;

                db.query('UPDATE employee SET role_id = ? WHERE employee.id = ?', [roleId, employeeId], function(err, results) {
                    console.log('Employee role updated.');
                });
            mainMenu();
            });
            });
        });
    });
    });
}

mainMenu();






