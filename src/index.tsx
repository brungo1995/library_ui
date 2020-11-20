import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from "./AppContainer";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AlertProvider } from './context_providers/alert_context';
import { AccountProvider, UserContext } from './context_providers/user_provider';

ReactDOM.render(
  <>
    <AccountProvider>
      <AlertProvider>
        <Router>
          <App />
        </Router>
      </AlertProvider>
    </AccountProvider>
  </>
  ,
  document.getElementById("root")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
