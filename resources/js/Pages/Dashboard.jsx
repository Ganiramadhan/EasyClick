import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FaBoxOpen, FaShoppingCart, FaUser } from "react-icons/fa";

Chart.register(...registerables);

export default function Dashboard({ totalOrders, totalProducts }) {

  // Data untuk grafik
  const chartData = {
    labels: ["Orders", "Products"],
    datasets: [
      {
        label: "Total Data",
        data: [totalOrders, totalProducts],
        backgroundColor: ["#3b82f6", "#03AC0E"],
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <AppLayout header={<h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>}>
      <Head title="Dashboard" />

      {/* Welcome Message */}
      <div className="p-6 text-gray-800 text-lg font-medium flex items-center gap-2">
        <FaUser className="text-blue-500 text-2xl" />
        <span>Selamat datang, Gani Ramadhan!</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Card Total Orders */}
        <Card className="shadow-lg flex flex-row items-center p-4 bg-white border border-gray-200">
          <div className="p-4 bg-blue-500 text-white rounded-full">
            <FaShoppingCart className="text-3xl" />
          </div>
          <CardBody className="ml-4">
            <Typography variant="h6" color="blue-gray">
              Total Orders
            </Typography>
            <Typography variant="h2" color="blue" className="font-bold">
              {totalOrders}
            </Typography>
          </CardBody>
        </Card>

        {/* Card Total Products */}
        <Card className="shadow-lg flex flex-row items-center p-4 bg-white border border-gray-200">
          <div className="p-4 bg-green-500 text-white rounded-full">
            <FaBoxOpen className="text-3xl" />
          </div>
          <CardBody className="ml-4">
            <Typography variant="h6" color="blue-gray">
              Total Products
            </Typography>
            <Typography variant="h2" color="green" className="font-bold">
              {totalProducts}
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* Grafik */}
      <div className="p-6">
        <Card className="shadow-lg p-6 bg-white border border-gray-200">
          <Typography variant="h5" color="blue-gray" className="mb-4 font-semibold">
            Data Statistik
          </Typography>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
