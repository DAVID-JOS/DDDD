const USD_TO_NGN = 1500; // fixed rate for now

function usdToNgn(usdAmount) {
  return usdAmount * USD_TO_NGN;
}

function ngnToUsd(nairaAmount) {
  return nairaAmount / USD_TO_NGN;
}

module.exports = { usdToNgn, ngnToUsd };
