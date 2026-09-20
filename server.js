const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running." });
});

// Mock STK Push endpoint (development only)
app.post("/stk-push", (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({
      success: false,
      message: "Phone and amount are required."
    });
  }

  res.json({
    success: true,
    transactionId: "TEST-" + Date.now(),
    message: "Mock payment request created."
  });
});

// Mock payment status
app.post("/payment-status", (req, res) => {
  const { transactionId } = req.body;

  if (!transactionId) {
    return res.status(400).json({
      success: false,
      message: "Transaction ID is required."
    });
  }

  res.json({
    success: true,
    data: {
      transactionId,
      status: "COMPLETED"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
