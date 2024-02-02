INSERT INTO department (id, name) 
VALUES (1, 'Operations'),
       (2, 'Engineering'),
       (3, 'Marketing'),
       (4, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES (1,'Ops Manager', 100000, 1),
       (2,'Product Manager', 90000, 2),
       (3,'Cheif Marketing Officer', 120000, 3),
       (4,'Lawyer', 120000, 4),
       (5,'Office Coordinator', 50000, 1),
       (6,'Software Engineer', 80000, 2),
       (7,'SEO Specialist', 70000, 3),
       (8,'Paralegal', 60000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Sophie', 'May', 1, NULL),
       (2, 'Natalia', 'Ruiz', 2, NULL),
       (3, 'Gwen', 'Peters', 3, NULL),
       (4, 'Jane', 'Doe', 4, NULL),
       (5, 'Sam', 'Wilson', 5, 1),
       (6, 'Max', 'Jones', 6, 2),
       (7, 'Carl', 'Smith', 7, 3),
       (8, 'Jack', 'Doe', 8, 4);