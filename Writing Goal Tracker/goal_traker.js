const wordInput   = document.querySelector("#goal");
const startBtn    = document.querySelector("#start");
const textarea    = document.querySelector("#editor");
const totalWordEl = document.querySelector("#totalword");
const currentEl   = document.querySelector("#wordCount");
const resetBtn    = document.querySelector("#reset");
const progressEl  = document.querySelector("#progess-bar"); // keep your id, but maybe rename it
const message     = document.querySelector("#message");
const display     = document.querySelector("#display-message");
const button      = document.querySelector("#btn"); 
let goal = 0;
let started = false;

// Attach input listener ONCE
textarea.addEventListener("input", handleInput);

startBtn.addEventListener("click", startGoal);
resetBtn.addEventListener("click", resetAll);

button.addEventListener("click",()=>{
  display.style.display="none";
})

function startGoal(e) {
  // If it's inside a <form>, prevent submit
  e?.preventDefault?.();

  const value = parseInt(wordInput.value, 10);

  if (!Number.isFinite(value) || value <= 0) {
    display.style.display="flex";
    message.textContent="Set a positive goal before you start writing.";
    return;
  }

  goal = value;
  totalWordEl.textContent = goal;
  started = true;
  startBtn.disabled = true; // prevent double starts
  textarea.focus();
}

function handleInput() {
  if (!started) return;

  const text = textarea.value.trim();
  const currentWords = text === "" ? 0 : text.split(/\s+/).filter(Boolean).length;

  currentEl.textContent = currentWords;

  const percentage = goal > 0 ? Math.min(100, (currentWords / goal) * 100) : 0;
  progressEl.style.width = `${percentage}%`;

  if (currentWords >= goal) {
    display.style.display="flex";
    message.textContent="🎉 Congratulations! You completed the goal.";
    resetAll();
  }
}

function resetAll() {
  started = false;
  goal = 0;

  progressEl.style.width = "0%";
  totalWordEl.textContent = "0";
  currentEl.textContent = "0";
  wordInput.value = "";
  textarea.value = "";

  startBtn.disabled = false;
}
