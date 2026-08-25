const cards = [{"upper": "A", "lower": "a", "word": "acs", "emoji": "👁️"}, {"upper": "Ā", "lower": "ā", "word": "ābols", "emoji": "🍎"}, {"upper": "B", "lower": "b", "word": "bumba", "emoji": "⚽"}, {"upper": "C", "lower": "c", "word": "cālis", "emoji": "🐥"}, {"upper": "Č", "lower": "č", "word": "čūska", "emoji": "🐍"}, {"upper": "D", "lower": "d", "word": "dāvana", "emoji": "🎁"}, {"upper": "E", "lower": "e", "word": "ezis", "emoji": "🦔"}, {"upper": "Ē", "lower": "ē", "word": "ēzelis", "emoji": "🫏"}, {"upper": "F", "lower": "f", "word": "futbols", "emoji": "⚽"}, {"upper": "G", "lower": "g", "word": "govs", "emoji": "🐄"}, {"upper": "Ģ", "lower": "ģ", "word": "ģimene", "emoji": "👨‍👩‍👧"}, {"upper": "H", "lower": "h", "word": "hameleons", "emoji": "🦎"}, {"upper": "I", "lower": "i", "word": "irbe", "emoji": "🐦"}, {"upper": "Ī", "lower": "ī", "word": "īriss", "emoji": "🌸"}, {"upper": "J", "lower": "j", "word": "jūra", "emoji": "🌊"}, {"upper": "K", "lower": "k", "word": "kaķis", "emoji": "🐱"}, {"upper": "Ķ", "lower": "ķ", "word": "ķirbis", "emoji": "🎃"}, {"upper": "L", "lower": "l", "word": "lācis", "emoji": "🐻"}, {"upper": "Ļ", "lower": "ļ", "word": "ļaudis", "emoji": "👨‍👩‍👧‍👦"}, {"upper": "M", "lower": "m", "word": "māja", "emoji": "🏠"}, {"upper": "N", "lower": "n", "word": "nams", "emoji": "🏡"}, {"upper": "Ņ", "lower": "ņ", "word": "ņau!", "emoji": "🐱"}, {"upper": "O", "lower": "o", "word": "oga", "emoji": "🫐"}, {"upper": "P", "lower": "p", "word": "pīle", "emoji": "🦆"}, {"upper": "R", "lower": "r", "word": "ritenis", "emoji": "🚲"}, {"upper": "S", "lower": "s", "word": "suns", "emoji": "🐶"}, {"upper": "Š", "lower": "š", "word": "šalle", "emoji": "🧣"}, {"upper": "T", "lower": "t", "word": "taurenis", "emoji": "🦋"}, {"upper": "U", "lower": "u", "word": "uguns", "emoji": "🔥"}, {"upper": "Ū", "lower": "ū", "word": "ūdens", "emoji": "💧"}, {"upper": "V", "lower": "v", "word": "vāvere", "emoji": "🐿️"}, {"upper": "Z", "lower": "z", "word": "zivs", "emoji": "🐟"}, {"upper": "Ž", "lower": "ž", "word": "žirafe", "emoji": "🦒"}];

let index = Number(localStorage.getItem("abc-index") || 0);
if (!Number.isFinite(index) || index < 0 || index >= cards.length) index = 0;

const card = document.getElementById("card");
const letter = document.getElementById("letter");
const picture = document.getElementById("picture");
const word = document.getElementById("word");
const currentNum = document.getElementById("currentNum");
const totalNum = document.getElementById("totalNum");
const soundBtn = document.getElementById("soundBtn");
const prevBtn = document.getElementById("prevBtn");

totalNum.textContent = cards.length;

function render(animate = true) {
  const item = cards[index];
  letter.innerHTML = `${item.upper} <span>${item.lower}</span>`;
  picture.textContent = item.emoji;
  word.textContent = item.word;
  currentNum.textContent = index + 1;
  document.title = `${item.upper} — ${item.word}`;
  localStorage.setItem("abc-index", index);

  if (animate) {
    card.classList.remove("pop");
    void card.offsetWidth;
    card.classList.add("pop");
  }
}

function next() {
  index = (index + 1) % cards.length;
  render();
}

function prev() {
  index = (index - 1 + cards.length) % cards.length;
  render();
}

function speak() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const item = cards[index];

  // Two short utterances sound clearer for small children.
  const first = new SpeechSynthesisUtterance(item.lower);
  first.lang = "lv-LV";
  first.rate = 0.75;

  const second = new SpeechSynthesisUtterance(item.word.replace("!", ""));
  second.lang = "lv-LV";
  second.rate = 0.72;

  first.onend = () => window.speechSynthesis.speak(second);
  window.speechSynthesis.speak(first);
}

card.addEventListener("click", next);
prevBtn.addEventListener("click", e => { e.stopPropagation(); prev(); });
soundBtn.addEventListener("click", e => { e.stopPropagation(); speak(); });

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") next();
  if (e.key === "ArrowLeft") prev();
});

let startX = null;
let startY = null;
card.addEventListener("touchstart", e => {
  const t = e.changedTouches[0];
  startX = t.clientX;
  startY = t.clientY;
}, {passive:true});

card.addEventListener("touchend", e => {
  if (startX === null) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;
  startX = startY = null;

  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
    e.preventDefault();
    if (dx < 0) next();
    else prev();
  }
}, {passive:false});

render(false);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}
