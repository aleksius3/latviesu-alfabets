const cards = [{"upper": "A", "lower": "a", "word": "acs", "fallback": "👁️", "image": "images/acs.webp"}, {"upper": "Ā", "lower": "ā", "word": "ābols", "fallback": "🍎", "image": "images/abols.webp"}, {"upper": "B", "lower": "b", "word": "bumba", "fallback": "⚽", "image": "images/bumba.webp"}, {"upper": "C", "lower": "c", "word": "cālis", "fallback": "🐥", "image": "images/calis.webp"}, {"upper": "Č", "lower": "č", "word": "čūska", "fallback": "🐍", "image": "images/cuska.webp"}, {"upper": "D", "lower": "d", "word": "dāvana", "fallback": "🎁", "image": "images/davana.webp"}, {"upper": "E", "lower": "e", "word": "ezis", "fallback": "🦔", "image": "images/ezis.webp"}, {"upper": "Ē", "lower": "ē", "word": "ēzelis", "fallback": "🫏", "image": "images/ezelis.webp"}, {"upper": "F", "lower": "f", "word": "futbols", "fallback": "⚽", "image": "images/futbols.webp"}, {"upper": "G", "lower": "g", "word": "govs", "fallback": "🐄", "image": "images/govs.webp"}, {"upper": "Ģ", "lower": "ģ", "word": "ģimene", "fallback": "👨‍👩‍👧", "image": "images/gimene.webp"}, {"upper": "H", "lower": "h", "word": "hameleons", "fallback": "🦎", "image": "images/hameleons.webp"}, {"upper": "I", "lower": "i", "word": "irbe", "fallback": "🐦", "image": "images/irbe.webp"}, {"upper": "Ī", "lower": "ī", "word": "īriss", "fallback": "🌸", "image": "images/iriss.webp"}, {"upper": "J", "lower": "j", "word": "jūra", "fallback": "🌊", "image": "images/jura.webp"}, {"upper": "K", "lower": "k", "word": "kaķis", "fallback": "🐱", "image": "images/kakis.webp"}, {"upper": "Ķ", "lower": "ķ", "word": "ķirbis", "fallback": "🎃", "image": "images/kirbis.webp"}, {"upper": "L", "lower": "l", "word": "lācis", "fallback": "🐻", "image": "images/lacis.webp"}, {"upper": "Ļ", "lower": "ļ", "word": "ļaudis", "fallback": "👨‍👩‍👧‍👦", "image": "images/laudis.webp"}, {"upper": "M", "lower": "m", "word": "māja", "fallback": "🏠", "image": "images/maja.webp"}, {"upper": "N", "lower": "n", "word": "nams", "fallback": "🏡", "image": "images/nams.webp"}, {"upper": "Ņ", "lower": "ņ", "word": "ņau!", "fallback": "🐱", "image": "images/nau.webp"}, {"upper": "O", "lower": "o", "word": "oga", "fallback": "🫐", "image": "images/oga.webp"}, {"upper": "P", "lower": "p", "word": "pīle", "fallback": "🦆", "image": "images/pile.webp"}, {"upper": "R", "lower": "r", "word": "ritenis", "fallback": "🚲", "image": "images/ritenis.webp"}, {"upper": "S", "lower": "s", "word": "suns", "fallback": "🐶", "image": "images/suns.webp"}, {"upper": "Š", "lower": "š", "word": "šalle", "fallback": "🧣", "image": "images/salle.webp"}, {"upper": "T", "lower": "t", "word": "taurenis", "fallback": "🦋", "image": "images/taurenis.webp"}, {"upper": "U", "lower": "u", "word": "uguns", "fallback": "🔥", "image": "images/uguns.webp"}, {"upper": "Ū", "lower": "ū", "word": "ūdens", "fallback": "💧", "image": "images/udens.webp"}, {"upper": "V", "lower": "v", "word": "vāvere", "fallback": "🐿️", "image": "images/vavere.webp"}, {"upper": "Z", "lower": "z", "word": "zivs", "fallback": "🐟", "image": "images/zivs.webp"}, {"upper": "Ž", "lower": "ž", "word": "žirafe", "fallback": "🦒", "image": "images/zirafe.webp"}];

let index = Number(localStorage.getItem("abc-index") || 0);
if (!Number.isFinite(index) || index < 0 || index >= cards.length) index = 0;

const mainCard = document.getElementById("mainCard");
const upperLetter = document.getElementById("upperLetter");
const lowerLetter = document.getElementById("lowerLetter");
const mainImage = document.getElementById("mainImage");
const fallbackPicture = document.getElementById("fallbackPicture");
const word = document.getElementById("word");
const currentNum = document.getElementById("currentNum");
const totalNum = document.getElementById("totalNum");
const carousel = document.getElementById("carousel");
const soundBtn = document.getElementById("soundBtn");
const prevBtn = document.getElementById("prevBtn");

totalNum.textContent = cards.length;

function setImage(img, fallbackEl, item) {
  img.style.display = "none";
  fallbackEl.style.display = "grid";
  fallbackEl.textContent = item.fallback;

  img.onload = () => {
    img.style.display = "block";
    fallbackEl.style.display = "none";
  };
  img.onerror = () => {
    img.style.display = "none";
    fallbackEl.style.display = "grid";
  };
  img.src = item.image;
  img.alt = item.word;
}

function createCarousel() {
  carousel.innerHTML = "";
  cards.forEach((item, i) => {
    const el = document.createElement("button");
    el.className = "mini-card";
    el.type = "button";
    el.dataset.index = i;
    el.innerHTML = `
      <div class="mini-letter">${item.upper}</div>
      <div class="mini-picture">
        <img alt="${item.word}">
        <span>${item.fallback}</span>
      </div>
      <div class="mini-word">${item.word}</div>
    `;
    const img = el.querySelector("img");
    const fb = el.querySelector("span");
    img.onload = () => { img.style.display = "block"; fb.style.display = "none"; };
    img.onerror = () => { img.style.display = "none"; fb.style.display = "inline"; };
    img.src = item.image;
    el.addEventListener("click", e => {
      e.stopPropagation();
      index = i;
      render();
    });
    carousel.appendChild(el);
  });
}

function shortestDelta(i, current, n) {
  let d = i - current;
  if (d > n/2) d -= n;
  if (d < -n/2) d += n;
  return d;
}

function layoutCarousel() {
  const els = [...carousel.querySelectorAll(".mini-card")];
  const spacing = Math.min(88, window.innerWidth * 0.22);
  const arc = 6.2;

  els.forEach((el, i) => {
    const d = shortestDelta(i, index, cards.length);
    const abs = Math.abs(d);

    if (abs > 4.4) {
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      return;
    }

    const x = d * spacing;
    const y = d * d * arc;
    const rot = d * 7.5;
    const scale = 1 - Math.min(abs * 0.055, .20);

    el.style.opacity = String(Math.max(.32, 1 - abs * .13));
    el.style.pointerEvents = "auto";
    el.style.zIndex = String(20 - Math.round(abs));
    el.style.filter = abs > 3 ? "saturate(.72)" : "none";
    el.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px) rotate(${rot}deg) scale(${scale})`;
    el.classList.toggle("active", i === index);
  });
}

function render(animate = true) {
  const item = cards[index];

  upperLetter.textContent = item.upper;
  lowerLetter.textContent = item.lower;
  word.textContent = item.word;
  currentNum.textContent = index + 1;
  document.title = `${item.upper} — ${item.word}`;
  localStorage.setItem("abc-index", index);

  setImage(mainImage, fallbackPicture, item);
  layoutCarousel();

  if (animate) {
    mainCard.classList.remove("pop");
    void mainCard.offsetWidth;
    mainCard.classList.add("pop");
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
  speechSynthesis.cancel();
  const item = cards[index];

  const letterVoice = new SpeechSynthesisUtterance(item.lower);
  letterVoice.lang = "lv-LV";
  letterVoice.rate = .72;

  const wordVoice = new SpeechSynthesisUtterance(item.word.replace("!",""));
  wordVoice.lang = "lv-LV";
  wordVoice.rate = .70;

  letterVoice.onend = () => speechSynthesis.speak(wordVoice);
  speechSynthesis.speak(letterVoice);
}

prevBtn.addEventListener("click", e => { e.stopPropagation(); prev(); });
soundBtn.addEventListener("click", e => { e.stopPropagation(); speak(); });
mainCard.addEventListener("click", next);

document.addEventListener("keydown", e => {
  if (["ArrowRight"," ","Enter"].includes(e.key)) next();
  if (e.key === "ArrowLeft") prev();
});

let startX = null, startY = null;
function touchStart(e) {
  const t = e.changedTouches[0];
  startX = t.clientX;
  startY = t.clientY;
}
function touchEnd(e) {
  if (startX === null) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;
  startX = startY = null;

  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.15) {
    e.preventDefault();
    dx < 0 ? next() : prev();
  }
}
mainCard.addEventListener("touchstart", touchStart, {passive:true});
mainCard.addEventListener("touchend", touchEnd, {passive:false});
carousel.addEventListener("touchstart", touchStart, {passive:true});
carousel.addEventListener("touchend", touchEnd, {passive:false});

window.addEventListener("resize", layoutCarousel);

createCarousel();
render(false);

if ("serviceWorker" in navigator) {
  addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}
