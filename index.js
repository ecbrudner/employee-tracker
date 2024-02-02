const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log('Connected to the company_db database.')
);

prompt([
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
    prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]).then(answers => {
        db.query('INSERT INTO department(name) VALUES(answer.department)', function(err, results) {
            console.log('Department added.');
        });
    });
}



