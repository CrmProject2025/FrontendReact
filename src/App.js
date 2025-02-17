import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./Login";
import Orders from "./Orders";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {!isLoggedIn ? (
              <li><Link to="/login">Вход</Link></li>
            ) : (
              <>
                <li><Link to="/orders">Заказы</Link></li>
                <li><button onClick={handleLogout}>Выйти</button></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/orders" /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/orders" element={isLoggedIn ? <Orders /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/orders" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;