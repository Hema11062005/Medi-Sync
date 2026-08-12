import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalMedicines: 0,
    totalBills: 0,
    totalPrescriptions: 0,
    totalLabTests: 0,
    totalRevenue: 0,
    recentAppointments: [],
    lowStockMedicines: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  const cardStyle = {
    color: "white",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 6px 15px rgba(0,0,0,.15)",
  };

  const chartData = {
    labels: [
      "Patients",
      "Doctors",
      "Appointments",
      "Medicines",
      "Bills",
      "Prescriptions",
      "Labs",
    ],
    datasets: [
      {
        label: "Hospital Statistics",
        data: [
          stats.totalPatients,
          stats.totalDoctors,
          stats.totalAppointments,
          stats.totalMedicines,
          stats.totalBills,
          stats.totalPrescriptions,
          stats.totalLabTests,
        ],
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FF9800",
          "#E91E63",
          "#9C27B0",
          "#00BCD4",
          "#607D8B",
        ],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Hospital Overview",
      },
    },
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f4f6f9",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>MediSync Dashboard</h1>

            <p style={{ color: "gray", marginTop: "8px" }}>
              Welcome back, Administrator 👋
            </p>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "white",
              padding: "15px 25px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                opacity: 0.9,
              }}
            >
              Today's Date
            </div>

            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
            }}
          >
            <h2>{stats.totalPatients}</h2>
            <p>Total Patients</p>
          </div>

          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg,#2196F3,#1565C0)",
            }}
          >
            <h2>{stats.totalDoctors}</h2>
            <p>Total Doctors</p>
          </div>

          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg,#FF9800,#F57C00)",
            }}
          >
            <h2>{stats.totalAppointments}</h2>
            <p>Appointments</p>
          </div>

          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg,#9C27B0,#6A1B9A)",
            }}
          >
            <h2>{stats.totalMedicines}</h2>
            <p>Medicines</p>
          </div>

          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg,#E91E63,#C2185B)",
            }}
          >
            <h2>{stats.totalBills}</h2>
            <p>Bills</p>
          </div>

          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg,#00BCD4,#00838F)",
            }}
          >
            <h2>{stats.totalPrescriptions}</h2>
            <p>Prescriptions</p>
          </div>

          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg,#607D8B,#37474F)",
            }}
          >
            <h2>{stats.totalLabTests}</h2>
            <p>Lab Tests</p>
          </div>

          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg,#22c55e,#15803d)",
            }}
          >
            <h2>₹ {stats.totalRevenue}</h2>
            <p>Total Revenue</p>

            <div
              style={{
                marginTop: "15px",
                height: "8px",
                background: "rgba(255,255,255,0.3)",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  width: "75%",
                  height: "100%",
                  background: "#fff",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div
          style={{
            marginTop: "40px",
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.12)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#1e293b",
            }}
          >
            📊 Hospital Overview
          </h2>

          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Recent Appointments + Low Stock */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {/* Recent Appointments */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 3px 12px rgba(0,0,0,.12)",
            }}
          >
            <h2>Recent Appointments</h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    textAlign: "left",
                  }}
                >
                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Patient
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Doctor
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Date
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {stats.recentAppointments?.map((appointment) => (
                  <tr key={appointment._id}>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {appointment.patient?.name || "N/A"}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {appointment.doctor?.name || "N/A"}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span
                        style={{
                          padding: "5px 12px",
                          borderRadius: "20px",
                          color: "#fff",
                          backgroundColor:
                            appointment.status === "Completed"
                              ? "#16a34a"
                              : appointment.status === "Cancelled"
                              ? "#dc2626"
                              : "#f59e0b",
                        }}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Low Stock Medicines */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 3px 12px rgba(0,0,0,.12)",
            }}
          >
            <h2>Low Stock Alert</h2>

            {stats.lowStockMedicines?.length === 0 ? (
              <p
                style={{
                  color: "green",
                  marginTop: "20px",
                }}
              >
                ✅ All medicines are sufficiently stocked.
              </p>
            ) : (
              stats.lowStockMedicines?.map((medicine) => (
                <div
                  key={medicine._id}
                  style={{
                    marginTop: "15px",
                    padding: "12px",
                    background: "#fee2e2",
                    borderRadius: "10px",
                  }}
                >
                  <strong>{medicine.name}</strong>

                  <br />

                  Stock Left:

                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {medicine.stock}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;