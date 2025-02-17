import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Добавляем хук для перехода между страницами

  const handleLogin = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setError(null); // Сбрасываем ошибки перед новым запросом

    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email,
        password
      });

      const token = response.data.token;
      if (!token) throw new Error("Токен отсутствует в ответе"); // Проверяем, что токен получен

      localStorage.setItem("token", token); // Сохраняем токен
      onLogin(); // Вызываем коллбек для обновления состояния в `App.js`
      navigate("/orders"); // Перенаправляем пользователя на страницу заказов
    } catch (error) {
      setError("Ошибка входа. Проверьте логин и пароль."); // Показываем сообщение об ошибке
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Логин" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;