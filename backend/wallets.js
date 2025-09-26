let wallets = [];

function insertWallet(address, balance = 0) {
  wallets.push({ address, balance, createdAt: new Date() });
}

function getWallet(address) {
  return wallets.find(w => w.address === address);
}

function updateBalance(address, amount) {
  const wallet = getWallet(address);
  if (wallet) {
    wallet.balance += amount;
    return wallet;
  }
  return null;
}

module.exports = { wallets, insertWallet, getWallet, updateBalance };
