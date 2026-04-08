import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {
  const categories = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("en-US", { month: "short" }),
  );

  const series = [
    {
      name: "Trips",
      data: data,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    colors: ["#0066FF"],

    fill: {
      opacity: 0.8,
    },
    xaxis: {
      categories: categories,
      labels: {
        style: { colors: "#64748B" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#64748B" },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    tooltip: {
      enabled: true,
      theme: "light",
      shared: false,
      intersect: true,
      y: {
        formatter: (value) => `${value} trips`,
        title: {
          formatter: () => "",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div style={{ width: "100%", height: "290px" }}>
      <Chart options={options} series={series} type="bar" height={290} />
    </div>
  );
};
export default BarChart;
