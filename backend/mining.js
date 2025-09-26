const { wallets } = require("./wallets");

const MINING_RATE = process.env.MINING_RATE || 200;

setInterval(() => {
  wallets.forEach(wallet => {
    wallet.balance += Number(MINING_RATE);
  });
  console.log(`⛏️ Mining: +${MINING_RATE} SKD to all wallets`);
}, 1000); // every 1 second
