// src/components/RadarChart.jsx
import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ score }) => {
  const data = {
    labels: ["情熱", "冷静", "自立", "依存", "共感"],
    datasets: [
      {
        label: "あなたの性格レーダー",
        data: [
          score.passion,
          score.cool,
          score.independent,
          score.dependent,
          score.empathy,
        ],
        backgroundColor: "rgba(90, 200, 250, 0.3)",
        borderColor: "rgba(90, 200, 250, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(90, 200, 250, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
          backdropColor: "transparent",
        },
        pointLabels: {
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
