import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import WebsiteList from './pages/WebsiteList';
import UserProfile from './pages/UserProfile';
import SamePassword from './pages/SamePassword';
import CreateWebsite from './pages/CreateWebsite';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<WebsiteList />} />
        <Route path="/same-password" element={<SamePassword />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/create" element={<CreateWebsite />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
