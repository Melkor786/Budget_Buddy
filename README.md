# BudgetBuddy

### An Expense Tracking MERN Website


## Overview
**BudgetBuddy** is a feature-rich expense tracking application built on the MERN stack. It allows users to seamlessly manage their income, expenses, and bills, keeping track of day-to-day transactions and recurring expenses. The application integrates Google OAuth for easy authentication, provides insightful expense reports, and notifies users of upcoming bills to help them better manage their finances.

## Features
- **User Authentication**:
  - Secure login and registration with bcrypt hashing and JWT for secure session management.
  - Google OAuth integration for quick and easy access.

- **Dark Theme**:  
  - Offers a dark mode for an improved user experience, especially during night-time usage.

- **Record Daily Transactions**:
  - Allows users to enter daily expenses, specifying the amount and category (e.g., food, shopping, gifts).

- **Expense Reports Visualization**:
  - Utilizes charts.js to create visually appealing and intuitive expense reports, enabling users to quickly understand their spending patterns.

- **Recurring Bill Notifications**:
  - Notifies users about recurring bills and due transactions in advance, implemented using node-cron and node-mailer.

- **Transaction History**:
  - Enables users to review their past transactions, helping them stay aware of their spending habits over time.

## Tech Stack
- **Frontend**:
  - HTML, CSS, ReactJS
  
- **Backend**:
  - NodeJS, ExpressJS

- **Database**:
  - MongoDB, Mongoose for object modeling

- **Additional Libraries & Tools**:
  - **bcrypt** for secure password hashing
  - **JWT** for secure token-based authentication
  - **Google OAuth** for simplified user login
  - **chart.js** for generating dynamic charts
  - **node-cron** and **node-mailer** for automated notifications

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Melkor786/BudgetBuddy.git

2. Navigate to the project directory:
    ```bash
   cd BudgetBuddy

3. Install the dependencies for both frontend and backend:
    ```bash
    npm install
    cd backend
    npm install

4. Add Envirnment Variables
  
5. Start the Frontend:
    ```bash
   npm start
    
6. Start the Backend: 
   ```bash
      cd backend
      npm start

## ScreenShots

![Login Page](<Screenshot (31).png>)

![Dashboard](<Screenshot (27).png>)

![Incomes](<Screenshot (28).png>)

![Expenses](<Screenshot (29).png>)

![Bills](<Screenshot (30).png>)
