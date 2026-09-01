const cards = [{"upper": "A", "lower": "a", "word": "Arbūzs", "image": "images/arbuzs.webp", "audio": "audio/arbuzs.mp3"}, {"upper": "Ā", "lower": "ā", "word": "Ābols", "image": "images/abols.webp", "audio": "audio/abols.mp3"}, {"upper": "B", "lower": "b", "word": "Balons", "image": "images/balons.webp", "audio": "audio/balons.mp3"}, {"upper": "C", "lower": "c", "word": "Citrons", "image": "images/citrons.webp", "audio": "audio/citrons.mp3"}, {"upper": "Č", "lower": "č", "word": "Čūska", "image": "images/cuska.webp", "audio": "audio/cuska.mp3"}, {"upper": "D", "lower": "d", "word": "Durvis", "image": "images/durvis.webp", "audio": "audio/durvis.mp3"}, {"upper": "E", "lower": "e", "word": "Ezers", "image": "images/ezers.webp", "audio": "audio/ezers.mp3"}, {"upper": "Ē", "lower": "ē", "word": "Ēzelis", "image": "images/ezelis.webp", "audio": "audio/ezelis.mp3"}, {"upper": "F", "lower": "f", "word": "Flamings", "image": "images/flamings.webp", "audio": "audio/flamings.mp3"}, {"upper": "G", "lower": "g", "word": "Gekons", "image": "images/gekons.webp", "audio": "audio/gekons.mp3"}, {"upper": "Ģ", "lower": "ģ", "word": "Ģitāra", "image": "images/gitara.webp", "audio": "audio/gitara.mp3"}, {"upper": "H", "lower": "h", "word": "Haizivs", "image": "images/haizivs.webp", "audio": "audio/haizivs.mp3"}, {"upper": "I", "lower": "i", "word": "Instrumenti", "image": "images/instrumenti.webp", "audio": "audio/instrumenti.mp3"}, {"upper": "Ī", "lower": "ī", "word": "Īlens", "image": "images/ilens.webp", "audio": "audio/ilens.mp3"}, {"upper": "J", "lower": "j", "word": "Jērs", "image": "images/jers.webp", "audio": "audio/jers.mp3"}, {"upper": "K", "lower": "k", "word": "Kurpe", "image": "images/kurpe.webp", "audio": "audio/kurpe.mp3"}, {"upper": "Ķ", "lower": "ķ", "word": "Ķiploks", "image": "images/kiploks.webp", "audio": "audio/kiploks.mp3"}, {"upper": "L", "lower": "l", "word": "Lūsis", "image": "images/lusis.webp", "audio": "audio/lusis.mp3"}, {"upper": "Ļ", "lower": "ļ", "word": "Lipa", "image": "images/lipa.webp", "audio": "audio/lipa.mp3"}, {"upper": "M", "lower": "m", "word": "Māja", "image": "images/maja.webp", "audio": "audio/maja.mp3"}, {"upper": "N", "lower": "n", "word": "Nakts", "image": "images/nakts.webp", "audio": "audio/nakts.mp3"}, {"upper": "Ņ", "lower": "ņ", "word": "Ņau", "image": "images/nau.webp", "audio": "audio/nau.mp3"}, {"upper": "O", "lower": "o", "word": "Ola", "image": "images/ola.webp", "audio": "audio/ola.mp3"}, {"upper": "P", "lower": "p", "word": "Pulkstenis", "image": "images/pulkstenis.webp", "audio": "audio/pulkstenis.mp3"}, {"upper": "R", "lower": "r", "word": "Robots", "image": "images/robots.webp", "audio": "audio/robots.mp3"}, {"upper": "S", "lower": "s", "word": "Sikspārnis", "image": "images/siksparnis.webp", "audio": "audio/siksparnis.mp3"}, {"upper": "Š", "lower": "š", "word": "Šokolāde", "image": "images/sokolade.webp", "audio": "audio/sokolade.mp3"}, {"upper": "T", "lower": "t", "word": "Tomāts", "image": "images/tomats.webp", "audio": "audio/tomats.mp3"}, {"upper": "U", "lower": "u", "word": "Ugunsdzēsējs", "image": "images/ugunsdzesejs.webp", "audio": "audio/ugunsdzesejs.mp3"}, {"upper": "Ū", "lower": "ū", "word": "Ūsas", "image": "images/usas.webp", "audio": "audio/usas.mp3"}, {"upper": "V", "lower": "v", "word": "Varavīksne", "image": "images/varaviksne.webp", "audio": "audio/varaviksne.mp3"}, {"upper": "Z", "lower": "z", "word": "Zilonis", "image": "images/zilonis.webp", "audio": "audio/zilonis.mp3"}, {"upper": "Ž", "lower": "ž", "word": "Žirafe", "image": "images/zirafe.webp", "audio": "audio/zirafe.mp3"}];

let index = Number(localStorage.getItem("abc-index") || 0);
if (!Number.isFinite(index) || index < 0 || index >= cards.length) index = 0;

const mainCard = document.getElementById("mainCard");
const upperLetter = document.getElementById("upperLetter");
const lowerLetter = document.getElementById("lowerLetter");
const mainImage = document.getElementById("mainImage");
const word = document.getElementById("word");
const currentNum = document.getElementById("currentNum");
const totalNum = document.getElementById("totalNum");
const quickStrip = document.getElementById("quickStrip");
const topSoundBtn = document.getElementById("topSoundBtn");
const cardSoundBtn = document.getElementById("cardSoundBtn");

let currentAudio = null;

totalNum.textContent = cards.length;

function buildStrip(){
  quickStrip.innerHTML = "";

  cards.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mini-card";
    btn.dataset.index = i;
    btn.innerHTML = `
      <div class="mini-letter">${item.upper}</div>
      <img class="mini-image" src="${item.image}" alt="">
      <div class="mini-word">${item.word}</div>
    `;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      index = i;
      render();
    });

    quickStrip.appendChild(btn);
  });
}

function playAudio(){
  if (currentAudio){
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(cards[index].audio);
  currentAudio.preload = "auto";
  currentAudio.play().catch(() => {});
}

function render(animate = true){
  const item = cards[index];

  upperLetter.textContent = item.upper;
  lowerLetter.textContent = item.lower;
  mainImage.src = item.image;
  mainImage.alt = item.word;
  word.textContent = item.word;
  currentNum.textContent = index + 1;

  localStorage.setItem("abc-index", String(index));

  const minis = [...quickStrip.querySelectorAll(".mini-card")];
  minis.forEach((el, i) => el.classList.toggle("active", i === index));

  const active = minis[index];
  if (active){
    active.scrollIntoView({
      behavior: animate ? "smooth" : "auto",
      block: "nearest",
      inline: "center"
    });
  }

  if (animate){
    mainCard.classList.remove("pop");
    void mainCard.offsetWidth;
    mainCard.classList.add("pop");
  }
}

function next(){
  index = (index + 1) % cards.length;
  render();
}

function prev(){
  index = (index - 1 + cards.length) % cards.length;
  render();
}

topSoundBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  playAudio();
});

cardSoundBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  playAudio();
});

mainCard.addEventListener("click", next);

let startX = null;
let startY = null;

mainCard.addEventListener("touchstart", e => {
  const t = e.changedTouches[0];
  startX = t.clientX;
  startY = t.clientY;
}, {passive:true});

mainCard.addEventListener("touchend", e => {
  if (startX === null) return;

  const t = e.changedTouches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;

  startX = null;
  startY = null;

  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.15){
    e.preventDefault();
    if (dx < 0) next();
    else prev();
  }
}, {passive:false});

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

buildStrip();
render(false);

if ("serviceWorker" in navigator){
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}
