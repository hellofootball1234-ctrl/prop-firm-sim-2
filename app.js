const ACCESS_TOKEN = "BG_PROP_9X72A_PRIVATE";

function checkAccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('access');
  if (token === ACCESS_TOKEN) {
    document.getElementById('locked').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  } else {
    document.getElementById('locked').style.display = 'block';
    document.getElementById('app').style.display = 'none';
  }
}

let phase = 1;
let balance = 10000;
let profitTarget = 0.08; // 8%
let maxDailyLoss = 0.05; // 5%
let maxOverallLoss = 0.10; // 10%
let dailyLoss = 0;
let profit = 0;

function updateUI() {
  document.getElementById('balance').innerText = balance.toFixed(2);
  document.getElementById('profit').innerText = profit.toFixed(2);
  document.getElementById('profitTarget').innerText = (profitTarget * 100) + '%';
  document.getElementById('phaseTitle').innerText = `Phase ${phase}`;
}

function logTrade() {
  const tradeInput = document.getElementById('tradeResult');
  let tradeValue = parseFloat(tradeInput.value);
  if (isNaN(tradeValue)) {
    alert('Please enter a valid number.');
    return;
  }
  balance += tradeValue;
  profit += tradeValue;

  if (tradeValue < 0) {
    dailyLoss += Math.abs(tradeValue);
    if (dailyLoss / 10000 > maxDailyLoss) {
      alert('Max daily loss exceeded! Evaluation failed.');
      resetEvaluation();
      return;
    }
  }

  if ((10000 - balance) / 10000 > maxOverallLoss) {
    alert('Max overall loss exceeded! Evaluation failed.');
    resetEvaluation();
    return;
  }

  if (profit / 10000 >= profitTarget) {
    if (phase === 1) {
      phase = 2;
      dailyLoss = 0;
      profitTarget = 0.10; // 10% profit for phase 2
      alert('Congrats! Phase 1 complete. Proceed to Phase 2.');
    } else {
      alert('🎉 You passed the evaluation! You are funded!');
      resetEvaluation();
      return;
    }
  }

  tradeInput.value = '';
  updateUI();
}

function resetEvaluation() {
  phase = 1;
  balance = 10000;
  profitTarget = 0.08;
  dailyLoss = 0;
  profit = 0;
  updateUI();
}

window.onload = function() {
  checkAccess();
  updateUI();
};
