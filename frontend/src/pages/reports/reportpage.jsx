import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getExpenseReport, getIncomeReport } from "../../services/reports";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ReportPage() {
  const [IncomeData, setIncomeData] = useState([]);
  const [ExpenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const incomeRes = await getIncomeReport();
        const expenseRes = await getExpenseReport();
        setIncomeData(incomeRes);
        setExpenseData(expenseRes);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  const incomePieData = {
    labels: IncomeData.map((item) => item.category),
    datasets: [
      {
        data: IncomeData.map((item) => item.total),
        backgroundColor: ["#4ade80", "#facc15", "#f87171", "#60a5fa", "#c084fc"],
      },
    ],
  };

  const expensePieData = {
    labels: ExpenseData.map((item) => item.category),
    datasets: [
      {
        data: ExpenseData.map((item) => item.total),
        backgroundColor: ["#396a4bff", "#4d431cff", "#aa7171ff", "#435872ff", "#a075ccff"],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl font-bold">Reports & Charts</h2>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-4">📅 Income Transaction Summary (Pie Chart)</h3>
        {IncomeData.length === 0 ? (
          <p>No income data found.</p>
        ) : (
          <div style={{ width: "300px", height: "300px" }}>
            <Pie data={incomePieData} options={pieOptions} />
          </div>
        )}
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-4">📅 Expense Transaction Summary (Pie Chart)</h3>
        {ExpenseData.length === 0 ? (
          <p>No expense data found.</p>
        ) : (
          <div style={{ width: "300px", height: "300px" }}>
            <Pie data={expensePieData} options={pieOptions} />
          </div>
        )}
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-4">📊 Income vs Expense (Bar Chart)</h3>
        {/* {ExpenseData.length === 0 ? <p>No data found.</p> : <Bar data={barData} />} */}
      </div>
    </div>
  );
}
