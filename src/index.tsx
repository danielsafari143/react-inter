import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard';
import MeetingForm, { meetingDTO } from './pages/MeetingForm';
import { MeetingDetails } from './pages/MeetingListPage';
import Login from './pages/Login';
import EditForm from './pages/EditForm';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
          <Route path="details" element={<MeetingDetails />}/>
          <Route path="edit" element={<EditForm onSubmit={function (meeting: { date: string; time: string; duration: string; }): void {
            throw new Error('Function not implemented.');
          } } />}/>
          <Route index element={<App />} />
          <Route path="events" element={< MeetingForm onSubmit={function (meeting: meetingDTO): void {
            throw new Error('Function not implemented.');
          }} />} />
        </Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
