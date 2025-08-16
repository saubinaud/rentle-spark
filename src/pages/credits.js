// credits.js

// Get credits from localStorage or initialize
let credits = parseInt(localStorage.getItem("rentle_credits")) || 3;

// DOM elements
const creditCountEl = document.getElementById("credit-count");
const useBtn = document.getElementById("use-credit");
const buyBtn = document.getElementById("buy-credit");
const premiumBtn = document.getElementById("unlock-premium");
const messageEl = document.getElementById("message");

// Render credits
function updateCredits() {
  creditCountEl.textContent = credits;
  localStorage.setItem("rentle_credits", credits);
}

// Use a credit
useBtn.addEventListener("click", () => {
  if (credits > 0) {
    credits--;
    updateCredits();
    showMessage("✅ Credit used! You can now view a match analysis.");
  } else {
    showMessage("⚠️ No credits available. Please buy more.");
  }
});

// Buy credits
buyBtn.addEventListener("click", () => {
  credits += 5;
  updateCredits();
  showMessage("💳 You bought +5 credits!");
});

// Unlock premium report
premiumBtn.addEventListener("click", () => {
  if (credits >= 2) {
    credits -= 2; // Cost: 2 credits
    updateCredits();
    showMessage("🌟 Premium report unlocked! Download coming soon.");
    // TODO: Redirect to premium_report.html when ready
  } else {
    showMessage("⚠️ You need at least 2 credits for the premium report.");
  }
});

// Helper message
function showMessage(text) {
  messageEl.textContent = text;
  messageEl.style.opacity = "1";
  setTimeout(() => {
    messageEl.style.opacity = "0";
  }, 3000);
}

// Init
updateCredits();
