# Fund Flow

Fund Flow is an earning and expense management project that allows users to independently monitor and manage their finances.

## Features

### Authentication
* **Registration**: create a new account with username (unique), email (unique) and password.
* Send a welcome email to the user.
* **Login**: access your personal profile with email and password.
* **Edit account**: update username and/or password.
* Send a notification email to the user to report the change in data.
* **Delete account**: permanently remove your personal account.
* Send a notification email to the user to confirm the deletion of the account.
* **Forgot password**: if you do not remember your password, you can create a new one during login.
* Generate an OTP and send it via email to complete the password reset.

### Earning/Expense Management
* **Input Earning/Expense Source**: Add new earning/expense sources by specifying the name and type (fixed or variable).
* **Edit Earning/Expense Source**: Update the details of existing earning/expense sources.
* **Delete Earning/Expense Source**: Remove existing earning/expense sources.

### Earning/Expense Management
* **Add Earning/Expense**: Record a new earning or expense by indicating the description, amount, date and source.
* **Edit Earning/Expense**: Update an existing earning or expense, including the amount (the system automatically updates the totals).
* **Delete Earning/Expense**: Remove existing earning or expenses (the system automatically updates the totals).
* **Automatic Calculations**: The system automatically calculates monthly and yearly totals.

## Technologies used
* **Backend**: NestJS
* **Database**: MongoDB

## Upcoming features
* Add account verification functionality.

## Test the APIs
To test the project APIs, you can use as a base url: **https://fund-flow.onrender.com**
