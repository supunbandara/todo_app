import { useState } from "react";
import LoginStyles from "./login.module.scss";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "admin") {
      // redirect to todo screen
      onLogin();
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <main className={LoginStyles.App}>
      <section>
        {errorMessage && <p className={LoginStyles.errmsg}>{errorMessage}</p>}
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button>Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default Login;
