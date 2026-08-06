import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports() {
  const [reports, setReports] = useState({
    patients: [],
    doctors: [],
    appointments: [],
    bills: [],
    prescriptions: [],
    labs: [],
  });

  const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("MediSync Hospital Report", 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [["Patient", "Amount", "Status", "Date"]],
    body: reports.bills.map((bill) => [
      bill.patient?.name || "N/A",
      `₹ ${bill.amount}`,
      bill.paymentStatus,
      new Date(bill.createdAt).toLocaleDateString(),
    ]),
  });

  doc.save("Hospital_Report.pdf");
};
const exportExcel = () => {
  const data = reports.bills.map((bill) => ({
    Patient: bill.patient?.name,
    Amount: bill.amount,
    Status: bill.paymentStatus,
    Date: new Date(bill.createdAt).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Bills");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "Hospital_Report.xlsx");
};

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports");
      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalRevenue = reports.bills.reduce(
    (sum, bill) => sum + Number(bill.amount || 0),
    0
  );

  const cardStyle = (bg) => ({
    background: bg,
    color: "#fff",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,.15)",
    transition: "0.3s",
    cursor: "pointer",
  });

  const tableContainer = {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    marginTop: "30px",
    boxShadow: "0 5px 15px rgba(0,0,0,.12)",
  };

  const thStyle = {
    background: "#2563eb",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
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
            <h1>Hospital Reports</h1>
            <p style={{ color: "#666" }}>
              Overview of all hospital records
            </p>
          </div>

          <div>
           <button
  onClick={exportPDF}
  style={{
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    marginRight: "10px",
    cursor: "pointer",
  }}
>
  Export PDF
</button>

<button
  onClick={exportExcel}
  style={{
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Export Excel
</button>
          </div>
        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search Patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "25px",
          }}
        />

        {/* Summary Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
          }}
        >
          <div
            style={cardStyle("linear-gradient(135deg,#22c55e,#15803d)")}
          >
            <h2>{reports.patients.length}</h2>
            <p>Total Patients</p>
          </div>

          <div
            style={cardStyle("linear-gradient(135deg,#3b82f6,#1d4ed8)")}
          >
            <h2>{reports.doctors.length}</h2>
            <p>Total Doctors</p>
          </div>

          <div
            style={cardStyle("linear-gradient(135deg,#f59e0b,#d97706)")}
          >
            <h2>{reports.appointments.length}</h2>
            <p>Appointments</p>
          </div>

          <div
            style={cardStyle("linear-gradient(135deg,#8b5cf6,#6d28d9)")}
          >
            <h2>₹ {totalRevenue}</h2>
            <p>Total Revenue</p>
          </div>
        </div>
                {/* Bills Table */}

        <div style={tableContainer}>
          <h2 style={{ marginBottom: "20px" }}>💰 Recent Bills</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Patient</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>

            <tbody>
              {reports.bills
                .filter((bill) =>
                  bill.patient?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((bill, index) => (
                  <tr
                    key={bill._id}
                    style={{
                      background:
                        index % 2 === 0 ? "#fff" : "#f8fafc",
                    }}
                  >
                    <td style={tdStyle}>
                      {bill.patient?.name || "N/A"}
                    </td>

                    <td style={tdStyle}>
                      ₹ {bill.amount}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background:
                            bill.paymentStatus === "Paid"
                              ? "#16a34a"
                              : "#dc2626",
                          color: "#fff",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                        }}
                      >
                        {bill.paymentStatus}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      {new Date(
                        bill.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Prescriptions */}

        <div style={tableContainer}>
          <h2 style={{ marginBottom: "20px" }}>
            💊 Recent Prescriptions
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Patient</th>
                <th style={thStyle}>Doctor</th>
                <th style={thStyle}>Medicine</th>
                <th style={thStyle}>Dosage</th>
              </tr>
            </thead>

            <tbody>
              {reports.prescriptions
                .filter((p) =>
                  p.patient?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((prescription, index) => (
                  <tr
                    key={prescription._id}
                    style={{
                      background:
                        index % 2 === 0 ? "#fff" : "#f8fafc",
                    }}
                  >
                    <td style={tdStyle}>
                      {prescription.patient?.name}
                    </td>

                    <td style={tdStyle}>
                      {prescription.doctor?.name}
                    </td>

                    <td style={tdStyle}>
                      {prescription.medicine?.name ||
                        prescription.medicine}
                    </td>

                    <td style={tdStyle}>
                      {prescription.dosage}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Lab Reports */}

        <div style={tableContainer}>
          <h2 style={{ marginBottom: "20px" }}>
            🧪 Lab Reports
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Patient</th>
                <th style={thStyle}>Test</th>
                <th style={thStyle}>Result</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {reports.labs
                .filter((lab) =>
                  lab.patient?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((lab, index) => (
                  <tr
                    key={lab._id}
                    style={{
                      background:
                        index % 2 === 0 ? "#fff" : "#f8fafc",
                    }}
                  >
                    <td style={tdStyle}>
                      {lab.patient?.name}
                    </td>

                    <td style={tdStyle}>
                      {lab.testName}
                    </td>

                    <td style={tdStyle}>
                      {lab.result}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background:
                            lab.status === "Completed"
                              ? "#16a34a"
                              : "#f59e0b",
                          color: "#fff",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                        }}
                      >
                        {lab.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Reports;