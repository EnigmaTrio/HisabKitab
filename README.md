# HisabKitab

## Project Overview

HisabKitab is a simple and easy-to-use app designed to help people manage their money better, inspired by Tony Stark’s (Iron Man’s) efficient planning skills. The app allows users to keep track of their daily expenses, set budgets, save money toward goals, and plan for emergencies—all in one place.

With a straightforward and user-friendly design, the app lets users log their expenses, see clear visuals of their spending habits, and receive reminders for upcoming bills. It’s perfect for anyone who wants to improve their budgeting, whether they’re saving up for something special or just want to keep their finances in check.

## Key Features

1. ### Login and Signup
    •Secure access to your own account.
2. ### Expense Logging
    •Record daily expenses in different categories (e.g., food, shopping).
3. ### Budget Planning
    •Set budgets based on spending habits to avoid overspending.
4. ### Visual Reports
    •View your spending in simple, visual formats.
5. ### Savings Tracking
    •Monitor savings progress to reach financial goals.
6. ### Export Reports
    •Download your expense data for offline access.

## Tech Stack

**Frontend:** React, Bootstrap, Tailwind CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB

## Installation

### Frontend

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EnigmaTrio/HisabKitab.git

2. **Install dependencies:**
   ```bash
   npm install
3. **Start the server:**
   ```bash
   npm start

### Backend 

1. **Install backend dependencies:**
   ```bash
   cd backend
   npm install

2. **Create Environment File**
   ```bash
   cd Backend
   touch .env

3. **Edit Environment Variables**
   To run this project, you will need to add your mongodb config of database like this to your .env file and secret key for jwt
   `JWS_SECRET`
   `MONGO_URI`

4. **Run the Backend Server**
   ```bash
   node index.js
