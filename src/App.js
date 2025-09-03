import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes
import TodoList from './components/TodoList';
import Footer from './components/Footer';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/todolist"
              element={<TodoList />}
            />
            {/* Redirige la ruta raíz a /todolist */}
            <Route
              path="/"
              element={<Navigate to="/todolist" replace />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;