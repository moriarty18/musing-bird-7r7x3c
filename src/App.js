import React from "react";
import "./styles.css";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  //  Вставьте сюда РЕАЛЬНЫЕ данные из вывода Python:
  const campaignTotals = {
    total_clicks: 869,
    total_impressions: 6448,
    total_cost: 201.88,
    total_conversions: 28,
    total_ctr: 13.48,
    avg_cpc: 0.23,
    total_conv_rate: 3.22,
    avg_cost_per_conv: 7.21,
  };

  const insights = [
    "Группы объявлений с расходами, но без конверсий: алматы домики в горах, аренда домиков в горах алматы, аренда юрты в горах алматы, базы отдыха в алматы, гостевые дома в горах алматы, гостиница алматы в горах, гостиницы алматы, гостиницы в горах алматы, деревенька на деревьях, домик в горах, домик в горах алматы, домик в горах алматы аренда, домик на дереве алматы, домики в горах, домики в лесной сказке, домики на деревьях алматы, зоны отдыха, отдых в горах с детьми, отдых в лесной сказке, отели алматы в горах, отели алматы недорого, отели в горах алматы, отель в горах, семейный отдых в горах, снять домик в горах алматы, спа отель алматы в горах, эко отель в горах, эко отель в горах алматы. Рекомендуется проверить релевантность ключевых слов и объявлений, а также посадочные страницы.",
    "Группы объявлений с высокой стоимостью конверсии: база отдыха в горах, семейный отдых алматы. Необходимо проанализировать ставки и качество объявлений для этих групп.",
    "Группы объявлений с высоким CTR, но низкой конверсией: аренда домиков в горах алматы, гостевые дома в горах алматы, домик в горах алматы, домик в горах алматы аренда, домики в горах, домики в лесной сказке. Проверьте соответствие объявлений и посадочных страниц, проблемы с UX.",
    "Топ-3 групп объявлений по конверсиям: домики в горах алматы, дома отдыха алматы, отдых в горах. Рассмотрите масштабирование: увеличьте бюджеты или расширьте таргетинг.",
  ];

  // Данные для круговой диаграммы (пример - нужно заменить на РЕАЛЬНЫЕ данные расходов по группам)
  const pieChartData = [
    { name: "Топ-3 групп", value: 50 }, // Пример -  доля расходов на топ-3 группы
    { name: "Остальные группы", value: 50 }, // Пример - доля расходов на остальные группы
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#a4de6c",
    "#d0ed57",
    "#ffc658",
  ];

  // Данные для столбчатой диаграммы (пример - нужно заменить на РЕАЛЬНЫЕ данные CTR и Conv. Rate по группам)
  const barChartData = [
    { name: "Топ-5 CTR", ctr: 25, convRate: 2 }, // Пример -  средний CTR и Conv. Rate для топ-5 по CTR
    { name: "Остальные", ctr: 8, convRate: 1 }, // Пример - средний CTR и Conv. Rate для остальных
  ];

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
              <p>{campaignTotals.total_clicks}</p>
            </div>
            <div className="metric-card">
              <h3>Показы</h3>
              <p>{campaignTotals.total_impressions}</p>
            </div>
            <div className="metric-card">
              <h3>CTR</h3>
              <p>{campaignTotals.total_ctr.toFixed(2)}%</p>
            </div>
            <div className="metric-card">
              <h3>Общая стоимость</h3>
              <p>{campaignTotals.total_cost.toFixed(2)} USD</p>
            </div>
            <div className="metric-card">
              <h3>Конверсии</h3>
              <p>{campaignTotals.total_conversions}</p>
            </div>
            <div className="metric-card">
              <h3>Коэффициент конверсии</h3>
              <p>{campaignTotals.total_conv_rate.toFixed(2)}%</p>
            </div>
            <div className="metric-card">
              <h3>Средняя цена за клик</h3>
              <p>{campaignTotals.avg_cpc.toFixed(2)} USD</p>
            </div>
            <div className="metric-card">
              <h3>Стоимость конверсии</h3>
              <p>{campaignTotals.avg_cost_per_conv.toFixed(2)} USD</p>
            </div>
          </div>
        </section>

        <section className="charts-section">
          <h2>Визуализация данных</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p className="chart-caption">
              Распределение расходов по группам объявлений (пример)
            </p>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: "CTR (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: "Conv. Rate (%)",
                    angle: -90,
                    position: "insideRight",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="ctr"
                  barSize={20}
                  fill="#413ea0"
                  yAxisId="left"
                  name="CTR"
                />
                <Bar
                  dataKey="convRate"
                  barSize={20}
                  fill="#82ca9d"
                  yAxisId="right"
                  name="Conv. Rate"
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="chart-caption">
              Сравнение CTR и коэффициента конверсии (пример)
            </p>
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
