import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getWeeklyReport, getMonthlyReport } from "../../services/reports"; 

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ReportPage() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const weeklyRes = await getWeeklyReport();
        const monthlyRes = await getMonthlyReport(2025, 7); // Make dynamic if needed
        setWeeklyData(weeklyRes);
        setMonthlyData(monthlyRes);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  // Prepare Pie Chart Data for Weekly Summary
  const pieData = {
    labels: weeklyData.map(item => item.category),
    datasets: [
      {
        data: weeklyData.map(item => item.total),
        backgroundColor: ["#4ade80", "#facc15", "#f87171", "#60a5fa", "#c084fc"],
      },
    ],
  };

  // Prepare Bar Chart Data for Monthly Summary
  const barData = {
    labels: monthlyData.map(item => item.date), // e.g. ["Jul 1", "Jul 2", ...]
    datasets: [
      {
        label: "Income",
        data: monthlyData.map(item => item.income || 0),
        backgroundColor: "#4ade80",
      },
      {
        label: "Expense",
        data: monthlyData.map(item => item.expense || 0),
        backgroundColor: "#f87171",
      },
    ],
  };

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl font-bold">Reports & Charts</h2>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-4">📅 Weekly Transaction Summary (Pie Chart)</h3>
        {weeklyData.length === 0 ? <p>No weekly data found.</p> : <Pie data={pieData} />}
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-4">📊 Monthly Income vs Expense (Bar Chart)</h3>
        {monthlyData.length === 0 ? <p>No monthly data found.</p> : <Bar data={barData} />}
      </div>
    </div>
  );
}
