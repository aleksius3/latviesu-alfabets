const cards = [{"upper": "A", "lower": "a", "word": "Arbūzs", "slug": "arbuzs", "image": "images/arbuzs.webp", "audio": "audio/arbuzs.mp3"}, {"upper": "Ā", "lower": "ā", "word": "Ābols", "slug": "abols", "image": "images/abols.webp", "audio": "audio/abols.mp3"}, {"upper": "B", "lower": "b", "word": "Balons", "slug": "balons", "image": "images/balons.webp", "audio": "audio/balons.mp3"}, {"upper": "C", "lower": "c", "word": "Citrons", "slug": "citrons", "image": "images/citrons.webp", "audio": "audio/citrons.mp3"}, {"upper": "Č", "lower": "č", "word": "Čūska", "slug": "cuska", "image": "images/cuska.webp", "audio": "audio/cuska.mp3"}, {"upper": "D", "lower": "d", "word": "Durvis", "slug": "durvis", "image": "images/durvis.webp", "audio": "audio/durvis.mp3"}, {"upper": "E", "lower": "e", "word": "Ezers", "slug": "ezers", "image": "images/ezers.webp", "audio": "audio/ezers.mp3"}, {"upper": "Ē", "lower": "ē", "word": "Ēzelis", "slug": "ezelis", "image": "images/ezelis.webp", "audio": "audio/ezelis.mp3"}, {"upper": "F", "lower": "f", "word": "Flamings", "slug": "flamings", "image": "images/flamings.webp", "audio": "audio/flamings.mp3"}, {"upper": "G", "lower": "g", "word": "Gekons", "slug": "gekons", "image": "images/gekons.webp", "audio": "audio/gekons.mp3"}, {"upper": "Ģ", "lower": "ģ", "word": "Ģitāra", "slug": "gitara", "image": "images/gitara.webp", "audio": "audio/gitara.mp3"}, {"upper": "H", "lower": "h", "word": "Haizivs", "slug": "haizivs", "image": "images/haizivs.webp", "audio": "audio/haizivs.mp3"}, {"upper": "I", "lower": "i", "word": "Instrumenti", "slug": "instrumenti", "image": "images/instrumenti.webp", "audio": "audio/instrumenti.mp3"}, {"upper": "Ī", "lower": "ī", "word": "Īlens", "slug": "ilens", "image": "images/ilens.webp", "audio": "audio/ilens.mp3"}, {"upper": "J", "lower": "j", "word": "Jērs", "slug": "jers", "image": "images/jers.webp", "audio": "audio/jers.mp3"}, {"upper": "K", "lower": "k", "word": "Kurpe", "slug": "kurpe", "image": "images/kurpe.webp", "audio": "audio/kurpe.mp3"}, {"upper": "Ķ", "lower": "ķ", "word": "Ķiploks", "slug": "kiploks", "image": "images/kiploks.webp", "audio": "audio/kiploks.mp3"}, {"upper": "L", "lower": "l", "word": "Lūsis", "slug": "lusis", "image": "images/lusis.webp", "audio": "audio/lusis.mp3"}, {"upper": "Ļ", "lower": "ļ", "word": "Lipa", "slug": "lipa", "image": "images/lipa.webp", "audio": "audio/lipa.mp3"}, {"upper": "M", "lower": "m", "word": "Māja", "slug": "maja", "image": "images/maja.webp", "audio": "audio/maja.mp3"}, {"upper": "N", "lower": "n", "word": "Nakts", "slug": "nakts", "image": "images/nakts.webp", "audio": "audio/nakts.mp3"}, {"upper": "Ņ", "lower": "ņ", "word": "Ņau", "slug": "nau", "image": "images/nau.webp", "audio": "audio/nau.mp3"}, {"upper": "O", "lower": "o", "word": "Ola", "slug": "ola", "image": "images/ola.webp", "audio": "audio/ola.mp3"}, {"upper": "P", "lower": "p", "word": "Pulkstenis", "slug": "pulkstenis", "image": "images/pulkstenis.webp", "audio": "audio/pulkstenis.mp3"}, {"upper": "R", "lower": "r", "word": "Robots", "slug": "robots", "image": "images/robots.webp", "audio": "audio/robots.mp3"}, {"upper": "S", "lower": "s", "word": "Sikspārnis", "slug": "siksparnis", "image": "images/siksparnis.webp", "audio": "audio/siksparnis.mp3"}, {"upper": "Š", "lower": "š", "word": "Šokolāde", "slug": "sokolade", "image": "images/sokolade.webp", "audio": "audio/sokolade.mp3"}, {"upper": "T", "lower": "t", "word": "Tomāts", "slug": "tomats", "image": "images/tomats.webp", "audio": "audio/tomats.mp3"}, {"upper": "U", "lower": "u", "word": "Ugunsdzēsējs", "slug": "ugunsdzesejs", "image": "images/ugunsdzesejs.webp", "audio": "audio/ugunsdzesejs.mp3"}, {"upper": "Ū", "lower": "ū", "word": "Ūsas", "slug": "usas", "image": "images/usas.webp", "audio": "audio/usas.mp3"}, {"upper": "V", "lower": "v", "word": "Varavīksne", "slug": "varaviksne", "image": "images/varaviksne.webp", "audio": "audio/varaviksne.mp3"}, {"upper": "Z", "lower": "z", "word": "Zilonis", "slug": "zilonis", "image": "images/zilonis.webp", "audio": "audio/zilonis.mp3"}, {"upper": "Ž", "lower": "ž", "word": "Žirafe", "slug": "zirafe", "image": "images/zirafe.webp", "audio": "audio/zirafe.mp3"}];

const $ = id => document.getElementById(id);
const screens = ["homeScreen","learnScreen","gameMenuScreen","quizScreen","memoryScreen"];
let index = Number(localStorage.getItem("abc-index") || 0);
if (!Number.isFinite(index) || index < 0 || index >= cards.length) index = 0;

let score = Number(localStorage.getItem("abc-stars") || 0) || 0;
let streak = Number(localStorage.getItem("abc-streak") || 0) || 0;
let learned = new Set(JSON.parse(localStorage.getItem("abc-learned") || "[]"));
let currentAudio = null;
let currentGame = null;
let quizCorrectIndex = -1;
let quizAnswered = false;
let lastPracticeMilestone = Number(localStorage.getItem("abc-practice-milestone") || 0);
let memoryState = null;

function saveProgress(){
  localStorage.setItem("abc-stars", String(score));
  localStorage.setItem("abc-streak", String(streak));
  localStorage.setItem("abc-learned", JSON.stringify([...learned]));
  $("scoreValue").textContent = score;
  $("menuStreak").textContent = streak;
  $("quizStreak").textContent = streak;
  $("learnedCount").textContent = learned.size;
  $("progressFill").style.width = `${(learned.size/cards.length)*100}%`;
}

function showScreen(id){
  screens.forEach(s => $(s).classList.toggle("active", s === id));
  $("homeBtn").classList.toggle("hidden", id === "homeScreen");
  $("scoreBadge").classList.toggle("hidden", id === "homeScreen" || id === "learnScreen");
  if(id === "gameMenuScreen") saveProgress();
}

function stopAudio(){
  if(currentAudio){ currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null; }
}
function playCardAudio(card){
  stopAudio();
  currentAudio = new Audio(card.audio);
  currentAudio.preload = "auto";
  currentAudio.play().catch(()=>{});
}
function playSuccessTone(){
  try{
    const AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return;
    const ctx = new AC();
    const now = ctx.currentTime;
    [523.25,659.25,783.99].forEach((f,i)=>{
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.frequency.value=f; o.type="sine";
      g.gain.setValueAtTime(.0001,now+i*.08);
      g.gain.exponentialRampToValueAtTime(.11,now+i*.08+.01);
      g.gain.exponentialRampToValueAtTime(.0001,now+i*.08+.22);
      o.connect(g).connect(ctx.destination); o.start(now+i*.08); o.stop(now+i*.08+.24);
    });
    setTimeout(()=>ctx.close(),700);
  }catch(e){}
}

function createCarousel(){
  const c = $("carousel");
  c.innerHTML = "";
  cards.forEach((item,i)=>{
    const b=document.createElement("button");
    b.type="button"; b.className="mini-card";
    b.innerHTML=`<div class="mini-letter">${item.upper}</div><div class="mini-picture"><img src="${item.image}" alt=""></div><div class="mini-word">${item.word}</div>`;
    b.addEventListener("click",e=>{e.stopPropagation(); index=i; renderLearn();});
    c.appendChild(b);
  });
}
function shortestDelta(i,current,n){
  let d=i-current;if(d>n/2)d-=n;if(d<-n/2)d+=n;return d;
}
function layoutCarousel(){
  const els=[...$("carousel").children];
  const spacing=Math.min(64,window.innerWidth*.17), arc=3.2;
  els.forEach((el,i)=>{
    const d=shortestDelta(i,index,cards.length), a=Math.abs(d);
    if(a>5){el.style.opacity="0";el.style.pointerEvents="none";return;}
    el.style.opacity=String(Math.max(.35,1-a*.11));
    el.style.pointerEvents="auto";
    el.style.zIndex=String(20-Math.round(a));
    el.style.transform=`translateX(calc(-50% + ${d*spacing}px)) translateY(${d*d*arc}px) rotate(${d*6}deg) scale(${1-Math.min(a*.045,.17)})`;
    el.classList.toggle("active",i===index);
  });
}

function renderLearn(){
  const item=cards[index];
  $("upperLetter").textContent=item.upper;
  $("lowerLetter").textContent=item.lower;
  $("word").textContent=item.word;
  $("mainImage").src=item.image;
  $("mainImage").alt=item.word;
  $("currentNum").textContent=index+1;
  $("totalNum").textContent=cards.length;
  localStorage.setItem("abc-index",String(index));
  learned.add(index);
  saveProgress();
  layoutCarousel();

  const milestone = Math.floor(learned.size/5)*5;
  if(milestone>=5 && milestone>lastPracticeMilestone && learned.size<cards.length){
    $("practicePrompt").classList.remove("hidden");
  } else {
    $("practicePrompt").classList.add("hidden");
  }
}
function nextLearn(){ index=(index+1)%cards.length; renderLearn(); }
function prevLearn(){ index=(index-1+cards.length)%cards.length; renderLearn(); }

function randomUnique(exclude,count){
  const pool=cards.map((_,i)=>i).filter(i=>i!==exclude);
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,count);
}
function shuffle(arr){
  arr=[...arr];for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;
}
function gamePool(){
  const known=[...learned].filter(i=>i>=0&&i<cards.length);
  return known.length>=5 ? known : cards.map((_,i)=>i);
}
function pickCorrect(){
  const pool=gamePool();
  return pool[Math.floor(Math.random()*pool.length)];
}

function startQuiz(type){
  currentGame=type;
  showScreen("quizScreen");
  newQuizQuestion();
}
function newQuizQuestion(){
  quizAnswered=false;
  $("nextQuestionBtn").classList.add("hidden");
  $("quizFeedback").textContent="";
  $("quizFeedback").className="feedback";
  const correct=pickCorrect();
  quizCorrectIndex=correct;
  const item=cards[correct];
  const others=randomUnique(correct,2);
  const choices=shuffle([correct,...others]);
  const prompt=$("quizPrompt"), opts=$("quizOptions");
  opts.innerHTML="";

  if(currentGame==="picture"){
    $("quizTitle").textContent="Atrodi attēlu";
    prompt.innerHTML=`<div><div class="prompt-letter">${item.upper}</div><div class="prompt-word">${item.word}</div></div>`;
    choices.forEach(i=>{
      const b=document.createElement("button");b.type="button";b.className="quiz-option";
      b.innerHTML=`<img src="${cards[i].image}" alt="${cards[i].word}">`;
      b.addEventListener("click",()=>answerQuiz(b,i));
      opts.appendChild(b);
    });
    setTimeout(()=>playCardAudio(item),180);
  }else{
    $("quizTitle").textContent="Atrodi burtu";
    prompt.innerHTML=`<div><img class="prompt-img" src="${item.image}" alt="${item.word}"><div class="prompt-word">${item.word}</div></div>`;
    choices.forEach(i=>{
      const b=document.createElement("button");b.type="button";b.className="quiz-option";
      b.innerHTML=`<span class="choice-letter">${cards[i].upper}</span>`;
      b.addEventListener("click",()=>answerQuiz(b,i));
      opts.appendChild(b);
    });
    setTimeout(()=>playCardAudio(item),180);
  }
}
function answerQuiz(btn,chosen){
  if(quizAnswered)return;
  if(chosen===quizCorrectIndex){
    quizAnswered=true;
    btn.classList.add("correct");
    score++; streak++;
    $("quizFeedback").textContent="Pareizi! ⭐";
    $("quizFeedback").className="feedback good";
    $("nextQuestionBtn").classList.remove("hidden");
    playSuccessTone();
    saveProgress();
    if(streak>0 && streak%5===0) celebrate();
  }else{
    btn.classList.add("wrong");
    streak=0;
    $("quizFeedback").textContent="Mēģini vēlreiz 🙂";
    $("quizFeedback").className="feedback try";
    saveProgress();
    setTimeout(()=>btn.classList.remove("wrong"),520);
  }
}

function createMemory(){
  showScreen("memoryScreen");
  $("newMemoryBtn").classList.add("hidden");
  $("memoryFeedback").textContent="";
  const pool=shuffle(gamePool()).slice(0,3);
  const deck=shuffle(pool.flatMap(i=>[
    {pair:i,type:"letter",value:cards[i].upper},
    {pair:i,type:"image",value:cards[i].image}
  ]));
  memoryState={deck,first:null,second:null,lock:false,matches:0,moves:0};
  $("memoryMoves").textContent="0";
  const grid=$("memoryGrid");grid.innerHTML="";
  deck.forEach((card,idx)=>{
    const b=document.createElement("button");b.type="button";b.className="memory-card";b.dataset.idx=idx;
    const front=card.type==="letter"
      ? `<div class="memory-face memory-front letter">${card.value}</div>`
      : `<div class="memory-face memory-front"><img src="${card.value}" alt=""></div>`;
    b.innerHTML=`<div class="memory-face memory-back">?</div>${front}`;
    b.addEventListener("click",()=>flipMemory(idx,b));
    grid.appendChild(b);
  });
}
function flipMemory(idx,el){
  const s=memoryState;if(!s||s.lock||el.classList.contains("matched")||el.classList.contains("flipped"))return;
  el.classList.add("flipped");
  if(s.first===null){s.first=idx;return;}
  s.second=idx;s.moves++;$("memoryMoves").textContent=s.moves;s.lock=true;
  const a=s.deck[s.first],b=s.deck[s.second];
  const elA=$("memoryGrid").children[s.first],elB=$("memoryGrid").children[s.second];
  if(a.pair===b.pair && a.type!==b.type){
    setTimeout(()=>{
      elA.classList.add("matched");elB.classList.add("matched");
      s.matches++;s.first=s.second=null;s.lock=false;
      score++;streak++;saveProgress();playSuccessTone();
      if(streak>0&&streak%5===0)celebrate();
      if(s.matches===3){
        $("memoryFeedback").textContent="Visi pāri atrasti! ⭐";
        $("memoryFeedback").className="feedback good";
        $("newMemoryBtn").classList.remove("hidden");
      }
    },350);
  }else{
    streak=0;saveProgress();
    setTimeout(()=>{
      elA.classList.remove("flipped");elB.classList.remove("flipped");
      s.first=s.second=null;s.lock=false;
    },720);
  }
}

function celebrate(){
  $("celebration").classList.remove("hidden");
  confetti();
  playSuccessTone();
  setTimeout(()=>$("celebration").classList.add("hidden"),1500);
}
function confetti(){
  const box=$("confetti");box.innerHTML="";
  const colors=["#ff6b00","#73b72b","#f7c948","#6c8cff","#d36be8","#ff7b9d"];
  for(let i=0;i<34;i++){
    const p=document.createElement("i");p.className="confetti-piece";
    p.style.left=`${Math.random()*100}%`;p.style.background=colors[i%colors.length];
    p.style.animationDelay=`${Math.random()*.25}s`;p.style.transform=`rotate(${Math.random()*180}deg)`;
    box.appendChild(p);
  }
  setTimeout(()=>box.innerHTML="",1800);
}

$("learnBtn").addEventListener("click",()=>{showScreen("learnScreen");renderLearn();});
$("playBtn").addEventListener("click",()=>showScreen("gameMenuScreen"));
$("homeBtn").addEventListener("click",()=>{stopAudio();showScreen("homeScreen");saveProgress();});
$("soundBtn").addEventListener("click",()=>playCardAudio(cards[index]));
$("mainCard").addEventListener("click",nextLearn);
$("practiceNowBtn").addEventListener("click",()=>{
  lastPracticeMilestone=Math.floor(learned.size/5)*5;
  localStorage.setItem("abc-practice-milestone",String(lastPracticeMilestone));
  $("practicePrompt").classList.add("hidden");
  startQuiz("picture");
});
document.querySelectorAll(".game-card").forEach(b=>b.addEventListener("click",()=>{
  const g=b.dataset.game;
  if(g==="memory")createMemory();else startQuiz(g);
}));
$("quizReplayBtn").addEventListener("click",()=>playCardAudio(cards[quizCorrectIndex]));
$("nextQuestionBtn").addEventListener("click",newQuizQuestion);
$("newMemoryBtn").addEventListener("click",createMemory);
$("celebration").addEventListener("click",()=> $("celebration").classList.add("hidden"));

let startX=null,startY=null;
$("mainCard").addEventListener("touchstart",e=>{const t=e.changedTouches[0];startX=t.clientX;startY=t.clientY;},{passive:true});
$("mainCard").addEventListener("touchend",e=>{
  if(startX===null)return;const t=e.changedTouches[0],dx=t.clientX-startX,dy=t.clientY-startY;startX=startY=null;
  if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15){e.preventDefault();dx<0?nextLearn():prevLearn();}
},{passive:false});

createCarousel();
saveProgress();
renderLearn();
showScreen("homeScreen");
window.addEventListener("resize",layoutCarousel);

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
}
