import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  BarController,
  Legend,
  Tooltip,
} from 'chart.js';

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, PieController, BarController, Legend, Tooltip);

const SpendingPatterns = () => {
  const [spendingData, setSpendingData] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchSpendingData();
  }, []);

  const fetchSpendingData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/expenses/spending'); 
      setSpendingData(res.data);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching spending data:', error);
      setLoading(false);
    }
  };

  const generateChartData = (data) => {
    const categories = Object.keys(data);
    const categories1 = data.reduce((acc, item) => {
      acc[item._id] = item.totalExpenses;
      return acc;
    }, {});
    console.log(categories1);
    const keysArray = Object.keys(categories1);
    const expenses = categories.map((category) => data[category].totalExpenses);

    return {
      labels: keysArray, 
      datasets: [
        {
          label: 'Total Expenses',
          data: expenses,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          borderColor: '#FFFFFF',
          borderWidth: 1,
        },
      ],
    };
  };


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF', 
        },
      },
      tooltip: {
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF', 
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF', 
        },
      },
      y: {
        ticks: {
          color: '#FFFFFF',
        },
      },
    },
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Spending Report', 20, 10);
    doc.autoTable({
      head: [['Category', 'Total Expenses']],
      body: Object.keys(spendingData).map((category) => [
        category,
        spendingData[category].totalExpenses,
      ]),
    });
    doc.save('Spending_Report.pdf');
  };

  return (
    <div className="container mx-auto p-6 pt-16 bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-800 text-white rounded-lg">
      <h2 className="text-2xl mb-4">Spending Patterns</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16" />
          <p className="ml-4 text-white">Loading...</p>
        </div>
      ) : (
        <div className="charts flex flex-col lg:flex-row justify-around items-center space-y-6 lg:space-y-0">
          <div className="chart w-64 h-64">
            <h3 className="text-lg text-center mb-2">Expense Distribution by Category</h3>
            <Pie data={generateChartData(spendingData)} options={chartOptions} />
          </div>

          <div className="chart w-64 h-64">
            <h3 className="text-lg text-center mb-2">Category-wise Spending</h3>
            <Bar data={generateChartData(spendingData)} options={chartOptions} />
          </div>
        </div>
      )}

      <button onClick={generatePDF} className="mt-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download Report as PDF
      </button>
    </div>
  );
};

export default SpendingPatterns;
