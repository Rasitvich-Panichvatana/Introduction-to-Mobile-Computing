let count = 1;

function add() {
  if (count == 1) {
    document.getElementById("income2").style.display = "block";
    count++;
  } else if (count == 2) {
    document.getElementById("income3").style.display = "block";
    count++;
  }
}

function remove() {
  if (count == 3) {
    document.getElementById("income3").style.display = "none";
    document.getElementById("income3").value = 0;
    count--;
    calculate();
  } else if (count == 2) {
    document.getElementById("income2").style.display = "none";
    document.getElementById("income2").value = 0;
    count--;
    calculate();
  }
}

function calculate() {
  let income1 = Number(document.getElementById("income").value) || 0;
  let income2 = Number(document.getElementById("income2").value) || 0;
  let income3 = Number(document.getElementById("income3").value) || 0;

  let total = income1 + income2 + income3;

  document.getElementById("total-income").value = total;

  let ratio = 0;

  if (total <= 150000) ratio = 0;
  else if (total <= 300000) ratio = 5;
  else if (total <= 500000) ratio = 10;
  else if (total <= 750000) ratio = 15;
  else if (total <= 1000000) ratio = 20;
  else if (total <= 2000000) ratio = 25;
  else if (total <= 5000000) ratio = 30;
  else ratio = 35;

  document.getElementById("tax-ratio").value = ratio;

  let tax = (total * ratio) / 100;

  document.getElementById("tax").value = tax;
}
