import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import CheckYourEmail from './Auth/CheckYourEmail';
import VerifyEmail from './Auth/VerifyEmail';
import Dashboard from './Dashboard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/check-your-email" element={<CheckYourEmail />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );// If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();