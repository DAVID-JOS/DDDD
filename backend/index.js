require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { wallets, insertWallet, getWallet, updateBalance } = require("./wallets");
require("./mining"); // start mining automatically
const { transferToMoniepoint } = require("./transfer");
const { usdToNgn, ngnToUsd } = require("./exchange");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Route: all wallets
app.get("/wallets", (req, res) => {
  res.json(wallets);
});

// ✅ Route: create wallet
app.post("/wallets", (req, res) => {
  const { address } = req.body;
  insertWallet(address);
  res.json({ success: true, message: "Wallet created" });
});

// ✅ Route: update wallet balance
app.post("/wallets/update", (req, res) => {
  const { address, amount } = req.body;
  const wallet = updateBalance(address, amount);
  res.json(wallet || { error: "Wallet not found" });
});

// ✅ Route: transfer SKD → NGN → Moniepoint
app.post("/transfer", async (req, res) => {
  const { accountNumber, bankCode, amountUSD } = req.body;
  const amountNGN = usdToNgn(amountUSD);
  const response = await transferToMoniepoint(accountNumber, bankCode, amountNGN);
  res.json(response);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Mine App running on Node.js v22 at http://localhost:${PORT}`);
});
