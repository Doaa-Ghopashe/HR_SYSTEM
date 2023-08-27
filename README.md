# HRSYSTEM
This project aims to efficiently manage employees by providing functionalities to add and update employee data, as well as accurately record their attendance according to their schedule.

# Technologies
- Angular framework;
- Node JS;
- MongoDB;

# Control Flow
The control flow of the system begins with the employee logging in. Upon login, the system verifies the entered email and password. If the credentials are correct, the employee is redirected to the dashboard. If the credentials are incorrect, the employee remains on the same page.

Once the employee is logged in, they can navigate to the employees page. On this page, they can view a list of all employees in the system. They have several options:

1. Add Employee: By clicking on the "Add Employee" button, the employee is directed to the add employee page. Here, they are presented with a form where they can enter the required data for the new employee. The form includes validation checks, such as ensuring that the first name and last name are between 3 to 10 characters in length, and that the password is at least 8 characters long and includes a combination of uppercase letters, lowercase letters, and numbers. Once the entered data passes these validations, the employee is successfully stored in the system.

1. Edit Employee: By clicking on the "Edit" button next to an employee's details, the employee is taken to the edit page. Here, they can modify the existing data of the employee.

1. Attendance Schedule: Clicking on the "Attendance Schedule" button allows the employee to access the schedule page. On this page, a table is displayed with columns representing the days of the current month. Each row corresponds to an employee. The "Status" column allows the employee to indicate whether the employee is present, absent, or late on a particular day. If the employee is present, the start time of their work automatically matches the start of their shift, which is also displayed in a separate column. If the employee is absent, the start time is set accordingly. If the employee is late, the start time can be manually entered by the employee. The end time column is available for the employee to enter the end time, except in the case of an absence where it is pre-determined. Additionally, there is a button at the top of the page that allows the employee to select the desired month and year to view the schedule for a specific period.
