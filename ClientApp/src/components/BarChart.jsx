import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement);

function BarChart(props) {
  const labels = [
    "Total Complaints",
    "Pending",
    "InProgress",
    "Resolved",
    "Cancelled",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "dataset",
        data: [
          props.object.complaints,
          props.object.pending,
          props.object.inProgress,
          props.object.resolved,
          props.object.cancelled,
        ],
        backgroundColor: [
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 205, 86, 0.7)",
          "rgba(0, 230, 0,0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="main">
      <h2>Complaint Analysis</h2>
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default BarChart;
