# Expense-calculator
I couldn't be bother to set up a google sheets so I did the next best thing....

## 📊 Overview

A modern, full-featured expense tracking application built with React and Firebase. Track your daily expenses, manage subscriptions, categorize spending with custom tags, and visualize your financial data with interactive charts.

## ✨ Features

- **🔐 User Authentication** - Secure login and registration with Firebase Auth
- **💰 Expense Tracking** - Add, edit, and delete expenses with categories and dates
- **🏷️ Custom Tags** - Create and manage your own expense categories
- **📈 Data Visualization** - Interactive charts to analyze spending patterns
- **🔄 Subscription Management** - Track recurring payments and subscriptions
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **🔍 Search & Filter** - Find expenses quickly with search functionality
- **📅 Monthly Views** - Filter expenses by month for better organization

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Expense-calculator/expense-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Add your Firebase configuration to `src/firebase.js`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: CSS3 with custom components
- **Backend**: Firebase (Authentication, Firestore)
- **Charts**: Recharts
- **Icons**: React Icons
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Modals/         # Modal components
│   ├── AddExpenseForm.js
│   ├── DashboardRefactored.js
│   ├── Charts.js
│   ├── ExpenseList.js
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.js
├── firebase.js         # Firebase configuration
└── App.js             # Main application component
```

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## 📱 Usage

1. **Register/Login** - Create an account or sign in
2. **Add Expenses** - Use the form to add new expenses with categories
3. **Manage Tags** - Create custom categories for better organization
4. **Track Subscriptions** - Add recurring payments and subscriptions
5. **View Charts** - Analyze your spending patterns with interactive charts
6. **Search & Filter** - Find specific expenses or filter by month

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and Firebase
- Icons provided by React Icons
- Charts powered by Recharts
