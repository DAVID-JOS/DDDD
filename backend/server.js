// 🚀 Strict Node.js version lock
const requiredVersion = "22.17.0";
const currentVersion = process.versions.node;

if (currentVersion !== requiredVersion) {
  console.error(`❌ Wrong Node.js version! Required ${requiredVersion}, but running ${currentVersion}`);
  process.exit(1);
}

// ✅ Import dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { wallets, insertWallet, getWallet, updateBalance } = require("./wallets");
require("./mining"); // starts mining automatically
const { transferToMoniepoint } = require("./transfer");
const { usdToNgn, ngnToUsd } = require("./exchange");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Route: check all wallets
app.get("/wallets", (req, res) => {
  res.json(wallets);
});

// ✅ Route: add wallet
app.post("/wallets", (req, res) => {
  const { address } = req.body;
  insertWallet(address);
  res.json({ success: true });
});

// ✅ Route: transfer SKD → NGN → Moniepoint
app.post("/transfer", async (req, res) => {
  const { accountNumber, bankCode, amountUSD } = req.body;
  const amountNGN = usdToNgn(amountUSD);
  const response = await transferToMoniepoint(accountNumber, bankCode, amountNGN);
  res.json(response);
});

// ✅ Force port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Mine App running at http://localhost:${PORT} on Node.js ${currentVersion}`);
});
