import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebsiteList from './components/WebsiteList.js';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<WebsiteList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
