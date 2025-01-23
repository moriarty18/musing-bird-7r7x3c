import React, { useState, useEffect } from 'react';
import './styles.css';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/data'); // Запрос к API endpoint Vercel
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setDashboardData(json);
      } catch (e) {
        console.error("Ошибка загрузки данных:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="error">Ошибка загрузки данных: {error.message}</div>;
  }

  const { totals, insights, pieChartData, barChartData } = dashboardData;


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  return (
    <div className="dashboard-container">
      <header>
        <h1>Дашборд эффективности рекламы</h1>
        <p className="subtitle">Период: 1 - 23 января 2025</p>
      </header>

      <main>
        <section className="summary-section">
          <h2>Сводка основных показателей</h2>
          <div className="metric-grid">
            <div className="metric-card">
              <h3>Клики</h3>
              <p>{totals.total_clicks}</p>
            </div>
            <div className="metric-card">
              <h3>Показы</h3>
              <p>{totals.total_impressions}</p>
            </div>
            <div className="metric-card">
              <h3>CTR</h3>
              <p>{totals.total_ctr.toFixed(2)}%</p>
            </div>
            <div className="metric-card">
              <h3>Общая стоимость</h3>
              <p>{totals.total_cost.toFixed(2)} USD</p>
            </div>
            <div className="metric-card">
              <h3>Конверсии</h3>
              <p>{totals.total_conversions}</p>
            </div>
            <div className="metric-card">
              <h3>Коэффициент конверсии</h3>
              <p>{totals.total_conv_rate.toFixed(2)}%</p>
            </div>
            <div className="metric-card">
              <h3>Средняя цена за клик</h3>
              <p>{totals.avg_cpc.toFixed(2)} USD</p>
            </div>
            <div className="metric-card">
              <h3>Стоимость конверсии</h3>
              <p>{totals.avg_cost_per_conv.toFixed(2)} USD</p>
            </div>
          </div>
        </section>

        <section className="charts-section">
          <h2>Визуализация данных</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart data={pieChartData}>
                <Pie
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  labelLine={false}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p className="chart-caption">Распределение расходов по группам объявлений</p>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" label={{ value: 'CTR (%)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Conv. Rate (%)', angle: -90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="ctr" barSize={20} fill="#413ea0" yAxisId="left" name="CTR" />
                <Bar dataKey="convRate" barSize={20} fill="#82ca9d" yAxisId="right" name="Conv. Rate" />
              </BarChart>
            </ResponsiveContainer>
            <p className="chart-caption">CTR и коэффициент конверсии по группам объявлений</p>
          </div>
        </section>

        <section className="insights-section">
          <h2>Инсайты и рекомендации</h2>
          <ul className="insights-list">
            {insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <p>© 2025 Дашборд эффективности рекламы</p>
      </footer>
    </div>
  );
}
