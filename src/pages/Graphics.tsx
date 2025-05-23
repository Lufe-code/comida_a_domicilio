import React, { useState } from "react"
import { Pie, Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js"

// Registramos todos los elementos necesarios para los diferentes tipos de gráficos
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
)

// Función para generar colores aleatorios
const generateRandomColors = (count: number) => {
  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", 
    "#FF9F40", "#F44336", "#2196F3", "#FFEB3B", "#4CAF50", 
    "#9C27B0", "#FF5722", "#607D8B", "#E91E63", "#03A9F4"
  ]
  
  // Si necesitamos más colores de los predefinidos, generamos aleatorios
  if (count > colors.length) {
    for (let i = colors.length; i < count; i++) {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      colors.push(`rgb(${r}, ${g}, ${b})`)
    }
  }
  
  return colors.slice(0, count)
}

// Función para generar datos aleatorios para gráficos circulares
const generatePieData = (labelPrefix: string, count: number) => {
  const labels = Array.from({ length: count }, (_, i) => `${labelPrefix} ${i + 1}`)
  const data = Array.from({ length: count }, () => Math.floor(Math.random() * 100) + 10)
  const colors = generateRandomColors(count)
  
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace("rgb", "rgba").replace(")", ", 1)")),
        borderWidth: 1,
      },
    ],
  }
}

// Función para generar datos aleatorios para gráficos de barras
const generateBarData = (labelPrefix: string, count: number, datasets: number = 1) => {
  const labels = Array.from({ length: count }, (_, i) => `${labelPrefix} ${i + 1}`)
  const colors = generateRandomColors(datasets)
  
  const dataSets = Array.from({ length: datasets }, (_, i) => ({
    label: `Serie ${i + 1}`,
    data: Array.from({ length: count }, () => Math.floor(Math.random() * 100) + 10),
    backgroundColor: colors[i],
    borderColor: colors[i],
    borderWidth: 1,
  }))
  
  return {
    labels,
    datasets: dataSets,
  }
}

// Función para generar datos aleatorios para gráficos de líneas temporales
const generateTimeSeriesData = (months: number = 12, datasets: number = 1) => {
  const labels = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ].slice(0, months)
  
  const colors = generateRandomColors(datasets)
  
  const dataSets = Array.from({ length: datasets }, (_, i) => {
    // Generamos datos que tengan cierta tendencia para que parezcan más realistas
    let lastValue = Math.floor(Math.random() * 50) + 20
    const data = [lastValue]
    
    for (let j = 1; j < months; j++) {
      // Variación aleatoria entre -15 y +15 con respecto al valor anterior
      const change = Math.floor(Math.random() * 30) - 15
      lastValue = Math.max(5, lastValue + change) // Aseguramos que no baje de 5
      data.push(lastValue)
    }
    
    return {
      label: `Tendencia ${i + 1}`,
      data,
      backgroundColor: colors[i],
      borderColor: colors[i],
      tension: 0.3, // Suaviza las líneas
      fill: false,
    }
  })
  
  return {
    labels,
    datasets: dataSets,
  }
}

const StatsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("pie")
  
  // Datos para gráficos circulares
  const productsPieData = generatePieData("Producto", 6)
  const customersPieData = generatePieData("Cliente", 5)
  const addressesPieData = generatePieData("Dirección", 4)
  
  // Datos para gráficos de barras
  const salesByDayData = generateBarData("Día", 7)
  const deliveryTimeData = generateBarData("Hora", 12)
  const restaurantRatingData = generateBarData("Restaurante", 8, 2) // 2 series: calificación y pedidos
  
  // Datos para gráficos de series temporales
  const monthlySalesData = generateTimeSeriesData(12, 1)
  const customerGrowthData = generateTimeSeriesData(12, 1)
  const deliveryPerformanceData = generateTimeSeriesData(12, 3) // 3 series para diferentes métricas
  
  // Opciones comunes para los gráficos
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: false },
    },
  }
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }
  
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="stats-dashboard">
      <h1 className="stats-title">Estadísticas y Análisis</h1>
      
      <div className="tabs-container">
        <div className="tabs-header">
          <button 
            className={`tab-button ${activeTab === "pie" ? "active" : ""}`}
            onClick={() => setActiveTab("pie")}
          >
            Gráficos Circulares
          </button>
          <button 
            className={`tab-button ${activeTab === "bar" ? "active" : ""}`}
            onClick={() => setActiveTab("bar")}
          >
            Gráficos de Barras
          </button>
          <button 
            className={`tab-button ${activeTab === "line" ? "active" : ""}`}
            onClick={() => setActiveTab("line")}
          >
            Series Temporales
          </button>
        </div>
        
        {/* Gráficos Circulares */}
        {activeTab === "pie" && (
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <h2>Productos más vendidos</h2>
              </div>
              <div className="chart-content">
                <Pie data={productsPieData} options={pieOptions} />
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h2>Clientes con más compras</h2>
              </div>
              <div className="chart-content">
                <Pie data={customersPieData} options={pieOptions} />
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h2>Direcciones más frecuentes</h2>
              </div>
              <div className="chart-content">
                <Pie data={addressesPieData} options={pieOptions} />
              </div>
            </div>
          </div>
        )}
        
        {/* Gráficos de Barras */}
        {activeTab === "bar" && (
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <h2>Ventas por día de la semana</h2>
              </div>
              <div className="chart-content">
                <Bar data={salesByDayData} options={barOptions} />
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h2>Tiempo de entrega por hora</h2>
              </div>
              <div className="chart-content">
                <Bar data={deliveryTimeData} options={barOptions} />
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h2>Calificación de restaurantes</h2>
              </div>
              <div className="chart-content">
                <Bar data={restaurantRatingData} options={barOptions} />
              </div>
            </div>
          </div>
        )}
        
        {/* Gráficos de Series Temporales */}
        {activeTab === "line" && (
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <h2>Ventas mensuales</h2>
              </div>
              <div className="chart-content">
                <Line data={monthlySalesData} options={lineOptions} />
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h2>Crecimiento de clientes</h2>
              </div>
              <div className="chart-content">
                <Line data={customerGrowthData} options={lineOptions} />
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h2>Rendimiento de entregas</h2>
              </div>
              <div className="chart-content">
                <Line data={deliveryPerformanceData} options={lineOptions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsDashboard