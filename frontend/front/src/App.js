import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import HomePage from './pages/HomePage';
import SearchPage from "./pages/SearchPage"; // Assicurati che il percorso sia corretto


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <HomePage/>} />
            <Route path="/search" element={<SearchPage/>} />
        </Routes>
    )
}

const App = () => {
  return (
    <div className="contenitorePaginaHomePage">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
