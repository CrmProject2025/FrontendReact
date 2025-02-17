import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token"); // Получаем токен из localStorage

  useEffect(() => {
    if (!token) {
      console.error("Нет токена, доступ запрещен");
      return;
    }

    axios.get("http://localhost:8080/api/v1/order/test", {
      headers: {
        Authorization: `Bearer ${token}`, // Отправляем JWT-токен в заголовке
      },
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        setOrders(response.data); // ✅ Проверяем, что data - массив
      } else {
        throw new Error("Некорректный формат данных");
      }
    })
      .catch(error => console.error("Ошибка загрузки заказов:", error));
  }, [token]);

  return (
    <div>
      <h1>Список заказов</h1>
      {orders.length === 0 ? <p>Заказов пока нет.</p> : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>{order.info}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
