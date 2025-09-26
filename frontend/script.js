const API_URL = "http://localhost:5000"; // backend runs here

// ✅ Create Wallet
async function createWallet() {
  const address = document.getElementById("walletAddress").value;
  const res = await fetch(`${API_URL}/wallets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address })
  });
  const data = await res.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

// ✅ Show Wallets
async function getWallets() {
  const res = await fetch(`${API_URL}/wallets`);
  const data = await res.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

// ✅ Transfer to Moniepoint
async function transfer() {
  const accountNumber = document.getElementById("accountNumber").value;
  const bankCode = document.getElementById("bankCode").value;
  const amountUSD = document.getElementById("amountUSD").value;

  const res = await fetch(`${API_URL}/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountNumber, bankCode, amountUSD })
  });
  const data = await res.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}
