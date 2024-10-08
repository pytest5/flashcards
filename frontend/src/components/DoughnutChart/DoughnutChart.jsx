import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from "./DoughnutChart.module.css";
Chart.register(ArcElement, ChartDataLabels, Legend);

function DoughnutChart({ chartData }) {
  const data = {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        label: "My First Dataset",
        data: [chartData.correct, chartData.wrong],
        backgroundColor: ["#84a59d", "#f28482"],
        hoverOffset: 4,
      },
    ],
  };
  const doughnutLabel = {
    id: "doughnutLabel",
    afterDatasetsDraw(chart, args, plugins) {
      const { ctx, data } = chart;
      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;
      //text
      ctx.save(); // save all variables first
      ctx.font = "bold 24px sans-serif";
      ctx.fillStyle = "hsl(234, 15%, 38%)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const percentage =
        (+data.datasets[0].data[0] /
          (+data.datasets[0].data[0] + +data.datasets[0].data[1])) *
        100;
      const percentageOneDecimalPlace = Math.round(percentage * 10) / 10;
      ctx.fillText(`${percentageOneDecimalPlace}%`, centerX, centerY);
    },
  };
  return (
    <div className={styles["chart-container"]}>
      {/* <h2 style={{ textAlign: "center" }}>Your results</h2> */}
      <Doughnut
        data={data}
        plugins={[doughnutLabel]}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "right", // Set legend position explicitly
              labels: {
                color: "var(--dark-variation)", // Set label color
                font: {
                  size: 14, // Set font size for legend labels
                },
              },
            },
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            datalabels: {
              color: "white",
              font: {
                size: "20px",
              },
            },
          },
        }}
      />
    </div>
  );
}
export default DoughnutChart;
