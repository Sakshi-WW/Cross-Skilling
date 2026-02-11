# FinShark Frontend

A modern, responsive React application for managing stock portfolios with a sleek blue and green color scheme representing trust and wealth.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Stock Management**: Browse, filter, and sort stocks with pagination
- **Portfolio Tracking**: Add/remove stocks and track your investments
- **Comments System**: Share insights and read community thoughts on stocks
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Real-time Updates**: Seamless integration with backend APIs

## Tech Stack

- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash npm install
```

2. Start the development server:
```bash
npm start
```

The app will run on [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## API Configuration

The app connects to the backend API at `http://localhost:5065/api`. Update this in `/src/services/api.js` if your backend runs on a different port.

## Color Scheme

- **Primary (Blue)**: Represents trust and stability - used for primary actions and branding
- **Wealth (Green)**: Represents growth and prosperity - used for financial data and success states

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js
│   ├── StockCard.js
│   └── ProtectedRoute.js
├── context/            # Context providers
│   └── AuthContext.js
├── pages/              # Page components
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── StockList.js
│   ├── StockDetail.js
│   └── Portfolio.js
├── services/           # API services
│   └── api.js
├── App.js              # Main app component
└── index.js            # Entry point
```

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## License

This project is private and confidential.
