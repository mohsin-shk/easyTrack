import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function PriceChart({ history }) {
  const chartData = {
    labels: history.map(h => new Date(h.checked_at).toLocaleDateString()),
    datasets: [
      {
        label: "Price",
        data: history.map(h => h.price),
        borderColor: "#6366f1",
        tension: 0.4
      }
    ]
  };

  return (
    <div className="mt-10 bg-gray-800 p-4 rounded">
      <Line data={chartData} />
    </div>
  );
}
