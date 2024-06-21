import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import HomePage from './pages/HomePage';
import SearchPage from "./pages/SearchPage";
import Menu from "./components/Menu"; // Assicurati che il percorso sia corretto
import AppShell from "./AppShell";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AppShell> <Menu/> <HomePage/> </AppShell>} />
            <Route path="/search" element={<AppShell> <Menu/> <SearchPage/> </AppShell>} />
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
