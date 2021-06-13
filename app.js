document
  .getElementById("loan-form")
  .addEventListener("submit", function (event) {
    document.getElementById("loading").style.display = "block";
    document.getElementById("results").style.display = "none";

    setTimeout(calculateResult, 2000);
    event.preventDefault();
  });

function calculateResult() {
  console.log("Calculating...");
  //getting UI variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "block";
  } else {
    showError("ERROR : Please check the enetred values!");
  }

  setTimeout(removeError, 3000);
  console.log("calculation function triggered success");
}

function removeError() {
  document.querySelector(".alert").remove();
  document.querySelector("#monthly-payment").value = "";
  document.querySelector("#total-payment").value = "";
  document.querySelector("#total-interest").value = "";
}

function showError(error) {
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  const errorDiv = document.createElement("div");
  errorDiv.appendChild(document.createTextNode(error));
  errorDiv.className = "alert alert-danger";
  card.insertBefore(errorDiv, heading);
  document.getElementById("loading").style.display = "none";
}
