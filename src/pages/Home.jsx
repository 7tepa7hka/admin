import React from "react";
import "./Home.css";

function Home() {
  const recentTransactions = [
    {
      id: "#1000",
      user: "Дамир",
      amount: "$120.00",
      status: "Успешно",
      date: "25.06.2026",
    },
    {
      id: "#999",
      user: "Султан",
      amount: "$85.50",
      status: "В обработке",
      date: "24.06.2026",
    },
    {
      id: "#998",
      user: "Абдурашид",
      amount: "$300.00",
      status: "Успешно",
      date: "24.06.2026",
    },
    {
      id: "#997",
      user: "Умид акя",
      amount: "$45.00",
      status: "Отклонено",
      date: "23.06.2026",
    },
  ];

  return (
    <div className="dashboard-home">
      <h1 className="page-title">Панель управления</h1>
      <p className="page-subtitle">
        Приветствуем в админ-панели! Вот краткая сводка на сегодня.
      </p>

      {/* Сетка с карточками метрик */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Пользователи</span>
            <h3 className="metric-value">1,248</h3>
          </div>
          <div className="metric-badge positive">+12% за неделю</div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Общая прибыль</span>
            <h3 className="metric-value">$14,250</h3>
          </div>
          <div className="metric-badge positive">+8.4% в этом месяце</div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Активные заказы</span>
            <h3 className="metric-value">42</h3>
          </div>
          <div className="metric-badge warning">Ожидают сборки</div>
        </div>
      </div>

      {/* Секция с таблицей */}
      <div className="dashboard-section">
        <h2 className="section-title">Последние операции</h2>
        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Пользователь</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="tx-id">{tx.id}</td>
                  <td>{tx.user}</td>
                  <td className="tx-amount">{tx.amount}</td>
                  <td>
                    <span
                      className={`status-badge ${tx.status === "Успешно" ? "success" : tx.status === "В обработке" ? "pending" : "rejected"}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
