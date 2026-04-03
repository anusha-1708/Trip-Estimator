import { formatDate } from "./common.js";
export const generateHtml = (trip) => {
  return `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            color: #334155;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
          }

          .container {
            max-width: 800px;
            margin: 20px auto;
            background: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          h1 {
            color: #1e293b;
            font-size: 28px;
            text-align: center;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 10px;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          h2 {
            font-size: 18px;
            color: #3b82f6;
            border-left: 4px solid #3b82f6;
            padding-left: 10px;
            margin-top: 30px;
            background: #eff6ff;
            padding-top: 5px;
            padding-bottom: 5px;
          }

          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 20px;
          }

          p {
            margin: 8px 0;
          }

          b {
            color: #475569;
          }

          ul {
            list-style: none;
            padding: 0;
          }

          li {
            background: #f1f5f9;
            margin-bottom: 5px;
            padding: 10px 15px;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
          }

          .owner-info {
            font-style: italic;
            color: #64748b;
          }

          .total-section {
            margin-top: 30px;
            text-align: right;
            font-size: 20px;
            font-weight: bold;
            color: #0f172a;
          }

          @media print {
            body { background: none; }
            .container { box-shadow: none; margin: 0; width: 100%; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Trip Summary</h1>

          <h2>Trip Details</h2>
          <div class="details-grid">
            <p><b>Name:</b> ${trip.tripName}</p>
            <p><b>Destination:</b> ${trip.destination}</p>
            <p><b>Dates:</b> ${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}</p>
            <p><b>Persons:</b> ${trip.persons}</p>
          </div>

          <h2>Owner</h2>
          <p class="owner-info">${trip.created_by.name} — ${trip.created_by.email}</p>

          <h2>Fixed Expenses</h2>
          <ul>
            <li><span>Food</span> <b>₹${trip.fixedExpense.foodExpense}</b></li>
            <li><span>Travel</span> <b>₹${trip.fixedExpense.travelExpense}</b></li>
            <li><span>Stay</span> <b>₹${trip.fixedExpense.stayExpense}</b></li>
          </ul>

          <h2>Other Expenses</h2>
          <ul>
            ${
              trip.otherExpense.length > 0
                ? trip.otherExpense
                    .map(
                      (e) =>
                        `<li><span>${e.otherExpenseName}</span> <b>₹${e.otherExpenses}</b></li>`,
                    )
                    .join("")
                : "<li>No extra expenses</li>"
            }
          </ul>
        </div>
      </body>
    </html>
  `;
};
