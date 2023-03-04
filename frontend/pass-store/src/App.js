import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebsiteList from './components/WebsiteList.js';
import SignIn from './components/Auth/SignIn';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<WebsiteList />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
