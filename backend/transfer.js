const fetch = require("node-fetch");

async function transferToMoniepoint(accountNumber, bankCode, amountNGN) {
  const apiKey = process.env.MONIEPOINT_API_KEY;
  const secret = process.env.MONIEPOINT_SECRET;

  const res = await fetch("https://api.moniepoint.com/v1/transfers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "x-secret-key": secret
    },
    body: JSON.stringify({
      account_number: accountNumber,
      bank_code: bankCode,
      amount: amountNGN
    })
  });

  return res.json();
}

module.exports = { transferToMoniepoint };
