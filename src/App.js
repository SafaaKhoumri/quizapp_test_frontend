import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TestProvider } from './TestContext'; // Importez TestProvider
import Login from './pages/Login'; 
import Test1 from './pages/Test1';
import Test2 from './pages/Test2';
import Test3 from './pages/Test3';
import Condidatverification from './pages/Condidatverification';
import TestList from './pages/TestList';
import TakeTest from './pages/TakeTest';
import TestIntroduction from './pages/TestIntroduction';

function App() {
  return (
    <div className="App">
      <TestProvider> {/* Entourez vos routes avec TestProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/Login" element={<Login />} /> 
            <Route path="/Test1" element={<Test1 />} />
            <Route path="/Test2" element={<Test2 />} />
            <Route path="/Test3" element={<Test3 />} />
            <Route path="/Condidatverification" element={<Condidatverification />} />
            <Route path="/TestList" element={<TestList />} />
            <Route path="/TakeTest" element={<TakeTest />} />
            <Route path="/TestIntroduction" element={<TestIntroduction />} />
          </Routes>
        </Router>
      </TestProvider>
    </div>
  );
}

export default App;
