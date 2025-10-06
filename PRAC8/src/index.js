// Simple, persistent rep counter

const STORAGE_KEY = "repCounter.count";
const countEl = document.getElementById("count");
const incBtn  = document.getElementById("increment");
const decBtn  = document.getElementById("decrement");
const resetBtn= document.getElementById("reset");

// Get saved count or start at 0
let count = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
render();

// Wire up buttons
incBtn.addEventListener("click", () => update(1));
decBtn.addEventListener("click", () => update(-1));
resetBtn.addEventListener("click", () => {
  count = 0;
  save();
  render();
});

// Optional: keyboard shortcuts
window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === " " || key === "+" || key === "ArrowUp" || key === "ArrowRight") {
    e.preventDefault(); update(1);
  } else if (key === "-" || key === "ArrowDown" || key === "ArrowLeft") {
    e.preventDefault(); update(-1);
  } else if (key.toLowerCase() === "r") {
    e.preventDefault(); count = 0; save(); render();
  }
});

function update(delta) {
  if (count + delta < 0) return; // remove this line if negatives are allowed
  count += delta;
  save();
  render();
}

function render() {
  countEl.textContent = count;
}

function save() {
  localStorage.setItem(STORAGE_KEY, String(count));
}
