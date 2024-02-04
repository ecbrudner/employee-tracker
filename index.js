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

inquirer.prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
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
    };
});

function viewDepartments() {
    db.query('SELECT * FROM department', function(err, results) {
        console.table(results);
    });
}

function viewRoles() {
    db.query('SELECT * FROM role', function(err, results) {
        console.table(results);
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employee', function(err, results) {
        console.table(results);
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
    });
}

function addRole() {
    db.query('SELECT name FROM department', function(err, results) {
        const departmentChoices = results.map(department => department.name);
    });
    
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
        db.query('INSERT INTO role(title, salary, department_id) VALUES(? ? ?)',[answers.title, answers.salary, answers.department_id], function(err, results) {
            console.log('Role added.');
        });
    });
}

function addEmployee() {
    db.query('SELECT title FROM role', function(err, results) {
        const roleTitles = results.map(role => role.title);
    });

    db.query('SELECT first_name, last_name FROM employee', function(err, results) {
        const managerNames = results.map(employee => employee.first_name + ' ' + employee.last_name);
    });

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
            choices: managerNames
        }
    ]).then(answers => {
        db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(? ? ? ?)',[answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function(err, results) {
            console.log('Employee added.');
        });
    });
}

function updateEmployeeRole() {
    db.query('SELECT first_name, last_name FROM employee', function(err, results) {
        const employeeNames = results.map(employee => employee.first_name + ' ' + employee.last_name);
    });

    db.query('SELECT title FROM role', function(err, results) {
        const roleTitles = results.map(role => role.title);
    });

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
        db.query('UPDATE employee SET role_id = answers.role_id WHERE first_name = answers.first_name AND last_name = answers.last_name', function(err, results) {
            console.log('Employee role updated.');
        });
    });
}






