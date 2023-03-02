import { useState, useEffect } from "react";
import "./App.scss";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Todo from "./pages/Todo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("logged");
    if (storedLoginStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("logged", true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("logged");
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar onLogout={handleLogout} />
          <Todo />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
