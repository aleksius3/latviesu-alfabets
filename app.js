const cards=[
["A","a","Arbūzs","arbuzs"],["Ā","ā","Ābols","abols"],["B","b","Balons","balons"],["C","c","Citrons","citrons"],
["Č","č","Čūska","cuska"],["D","d","Durvis","durvis"],["E","e","Ezers","ezers"],["Ē","ē","Ēzelis","ezelis"],
["F","f","Flamings","flamings"],["G","g","Gekons","gekons"],["Ģ","ģ","Ģitāra","gitara"],["H","h","Haizivs","haizivs"],
["I","i","Instrumenti","instrumenti"],["Ī","ī","Īlens","ilens"],["J","j","Jērs","jers"],["K","k","Kurpe","kurpe"],
["Ķ","ķ","Ķiploks","kiploks"],["L","l","Lūsis","lusis"],["Ļ","ļ","Lipa","lipa"],["M","m","Māja","maja"],
["N","n","Nakts","nakts"],["Ņ","ņ","Ņau","nau"],["O","o","Ola","ola"],["P","p","Pulkstenis","pulkstenis"],
["R","r","Robots","robots"],["S","s","Sikspārnis","siksparnis"],["Š","š","Šokolāde","sokolade"],["T","t","Tomāts","tomats"],
["U","u","Ugunsdzēsējs","ugunsdzesejs"],["Ū","ū","Ūsas","usas"],["V","v","Varavīksne","varaviksne"],
["Z","z","Zilonis","zilonis"],["Ž","ž","Žirafe","zirafe"]
].map(([upper,lower,word,slug])=>({upper,lower,word,slug,image:`images/${slug}.webp`,audio:`audio/${slug}.mp3`}));

const $=id=>document.getElementById(id);
const screens=["homeScreen","learnScreen","gameMenuScreen","quizScreen","memoryScreen"];
let index=+(localStorage.getItem("abc-index")||0); if(index<0||index>=cards.length) index=0;
let score=+(localStorage.getItem("abc-stars")||0), streak=+(localStorage.getItem("abc-streak")||0);
let learned=new Set(JSON.parse(localStorage.getItem("abc-learned")||"[]"));
let lastPracticeMilestone=+(localStorage.getItem("abc-practice-milestone")||0);
let currentAudio=null,currentGame=null,quizCorrectIndex=-1,quizAnswered=false,memoryState=null;

function saveProgress(){
  localStorage.setItem("abc-stars",score);localStorage.setItem("abc-streak",streak);
  localStorage.setItem("abc-learned",JSON.stringify([...learned]));
  $("scoreValue").textContent=score;$("menuStreak").textContent=streak;$("quizStreak").textContent=streak;
  $("learnedCount").textContent=learned.size;$("progressFill").style.width=`${learned.size/cards.length*100}%`;
}
function showScreen(id){
  screens.forEach(s=>$(s).classList.toggle("active",s===id));
  $("homeBtn").classList.toggle("hidden",id==="homeScreen");
  $("scoreBadge").classList.toggle("hidden",id==="homeScreen"||id==="learnScreen");
  if(id==="learnScreen") setTimeout(scrollActiveMini,50);
  if(id==="gameMenuScreen")saveProgress();
}
function stopAudio(){if(currentAudio){currentAudio.pause();currentAudio.currentTime=0;currentAudio=null}}
function playCardAudio(card){
  stopAudio();currentAudio=new Audio(card.audio);currentAudio.preload="auto";currentAudio.play().catch(()=>{});
}
const correctSfx=new Audio("audio/correct.wav?v=72");
const wrongSfx=new Audio("audio/wrong.wav?v=72");
correctSfx.preload="auto"; wrongSfx.preload="auto";

function playSfx(audio){
  try{
    audio.pause();
    audio.currentTime=0;
    const p=audio.play();
    if(p&&p.catch)p.catch(()=>{});
  }catch(e){}
}
function playSuccessTone(){ playSfx(correctSfx); }
function playWrongTone(){ playSfx(wrongSfx); }

function createCarousel(){
  const c=$("carousel");c.innerHTML="";
  cards.forEach((item,i)=>{
    const b=document.createElement("button");b.type="button";b.className="mini-card";
    b.innerHTML=`<div class="mini-letter">${item.upper}</div><div class="mini-picture"><img src="${item.image}" alt=""></div><div class="mini-word">${item.word}</div>`;
    b.addEventListener("click",()=>{index=i;renderLearn();});
    c.appendChild(b);
  });
}
function scrollActiveMini(){
  const el=$("carousel").children[index]; if(el) el.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
}
function renderLearn(){
  const item=cards[index];
  $("upperLetter").textContent=item.upper;$("lowerLetter").textContent=item.lower;$("word").textContent=item.word;
  $("mainImage").src=item.image;$("mainImage").alt=item.word;$("currentNum").textContent=index+1;$("totalNum").textContent=cards.length;
  localStorage.setItem("abc-index",index);learned.add(index);saveProgress();
  [...$("carousel").children].forEach((el,i)=>el.classList.toggle("active",i===index));scrollActiveMini();
  const milestone=Math.floor(learned.size/5)*5;
  $("practicePrompt").classList.toggle("hidden",!(milestone>=5&&milestone>lastPracticeMilestone&&learned.size<cards.length));
  $("mainCard").animate([{transform:"scale(.985)",opacity:.75},{transform:"scale(1)",opacity:1}],{duration:180,easing:"ease-out"});
}
function nextLearn(){index=(index+1)%cards.length;renderLearn()}
function prevLearn(){index=(index-1+cards.length)%cards.length;renderLearn()}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function gamePool(){const known=[...learned].filter(i=>i>=0&&i<cards.length);return known.length>=5?known:cards.map((_,i)=>i)}
function pickCorrect(){const p=gamePool();return p[Math.floor(Math.random()*p.length)]}
function wrongChoices(correct,count=2){
  let p=cards.map((_,i)=>i).filter(i=>i!==correct);return shuffle(p).slice(0,count)
}
function startQuiz(type){currentGame=type;showScreen("quizScreen");newQuizQuestion()}
function newQuizQuestion(){
  quizAnswered=false;$("nextQuestionBtn").classList.add("hidden");$("quizFeedback").textContent="";$("quizFeedback").className="feedback";
  const correct=pickCorrect();quizCorrectIndex=correct;const item=cards[correct],choices=shuffle([correct,...wrongChoices(correct)]);
  const prompt=$("quizPrompt"),opts=$("quizOptions");opts.innerHTML="";
  if(currentGame==="picture"){
    $("quizTitle").textContent="Atrodi attēlu";
    prompt.innerHTML=`<div><div class="prompt-letter">${item.upper}</div><div class="prompt-word">${item.word}</div></div>`;
    choices.forEach(i=>{const b=document.createElement("button");b.type="button";b.className="quiz-option";
      b.innerHTML=`<img src="${cards[i].image}" alt="${cards[i].word}">`;b.onclick=()=>answerQuiz(b,i);opts.appendChild(b)});
  }else{
    $("quizTitle").textContent="Atrodi burtu";
    prompt.innerHTML=`<div><img class="prompt-img" src="${item.image}" alt="${item.word}"><div class="prompt-word">${item.word}</div></div>`;
    choices.forEach(i=>{const b=document.createElement("button");b.type="button";b.className="quiz-option";
      b.innerHTML=`<span class="choice-letter">${cards[i].upper}</span>`;b.onclick=()=>answerQuiz(b,i);opts.appendChild(b)});
  }
  setTimeout(()=>playCardAudio(item),180);
}
function answerQuiz(btn,chosen){
  if(quizAnswered)return;
  if(chosen===quizCorrectIndex){
    quizAnswered=true;btn.classList.add("correct");score++;streak++;$("quizFeedback").textContent="Pareizi! ⭐";
    $("quizFeedback").className="feedback good";$("nextQuestionBtn").classList.remove("hidden");playSuccessTone();saveProgress();
    if(streak%5===0)celebrate();
  }else{
    btn.classList.add("wrong");playWrongTone();streak=0;$("quizFeedback").textContent="Mēģini vēlreiz 🙂";$("quizFeedback").className="feedback try";
    saveProgress();setTimeout(()=>btn.classList.remove("wrong"),520);
  }
}
function createMemory(){
  showScreen("memoryScreen");$("newMemoryBtn").classList.add("hidden");$("memoryFeedback").textContent="";
  const pool=shuffle(gamePool()).slice(0,3);
  const deck=shuffle(pool.flatMap(i=>[{pair:i,type:"letter",value:cards[i].upper},{pair:i,type:"image",value:cards[i].image}]));
  memoryState={deck,first:null,second:null,lock:false,matches:0,moves:0};$("memoryMoves").textContent="0";
  const grid=$("memoryGrid");grid.innerHTML="";
  deck.forEach((card,idx)=>{const b=document.createElement("button");b.type="button";b.className="memory-card";
    const front=card.type==="letter"?`<div class="memory-face memory-front letter">${card.value}</div>`:
      `<div class="memory-face memory-front"><img src="${card.value}" alt=""></div>`;
    b.innerHTML=`<div class="memory-face memory-back">?</div>${front}`;b.onclick=()=>flipMemory(idx,b);grid.appendChild(b)});
}
function flipMemory(idx,el){
  const s=memoryState;if(!s||s.lock||el.classList.contains("matched")||el.classList.contains("flipped"))return;
  el.classList.add("flipped");if(s.first===null){s.first=idx;return}
  s.second=idx;s.moves++;$("memoryMoves").textContent=s.moves;s.lock=true;
  const a=s.deck[s.first],b=s.deck[s.second],elA=$("memoryGrid").children[s.first],elB=$("memoryGrid").children[s.second];
  if(a.pair===b.pair&&a.type!==b.type){
    setTimeout(()=>{elA.classList.add("matched");elB.classList.add("matched");s.matches++;s.first=s.second=null;s.lock=false;
      score++;streak++;saveProgress();playSuccessTone();if(streak%5===0)celebrate();
      if(s.matches===3){$("memoryFeedback").textContent="Visi pāri atrasti! ⭐";$("memoryFeedback").className="feedback good";$("newMemoryBtn").classList.remove("hidden")}},350);
  }else{
    playWrongTone();streak=0;saveProgress();setTimeout(()=>{elA.classList.remove("flipped");elB.classList.remove("flipped");s.first=s.second=null;s.lock=false},720);
  }
}
function celebrate(){
  $("celebration").classList.remove("hidden");confetti();playSuccessTone();
  setTimeout(()=>$("celebration").classList.add("hidden"),1500);
}
function confetti(){
  const box=$("confetti");box.innerHTML="";const colors=["#4b9f2d","#f39a28","#f7c948","#6c8cff","#d36be8","#ff7b9d"];
  for(let i=0;i<34;i++){const p=document.createElement("i");p.className="confetti-piece";p.style.left=`${Math.random()*100}%`;
    p.style.background=colors[i%colors.length];p.style.animationDelay=`${Math.random()*.25}s`;box.appendChild(p)}
  setTimeout(()=>box.innerHTML="",1800);
}

$("learnBtn").onclick=()=>{showScreen("learnScreen");renderLearn()};
$("playBtn").onclick=()=>showScreen("gameMenuScreen");
$("homeBtn").onclick=()=>{stopAudio();showScreen("homeScreen");saveProgress()};
$("soundBtn").onclick=e=>{e.stopPropagation();playCardAudio(cards[index])};
$("mainCard").onclick=e=>{if(e.target.closest("#soundBtn"))return;nextLearn()};
$("practiceNowBtn").onclick=()=>{lastPracticeMilestone=Math.floor(learned.size/5)*5;localStorage.setItem("abc-practice-milestone",lastPracticeMilestone);$("practicePrompt").classList.add("hidden");startQuiz("picture")};
document.querySelectorAll(".game-card").forEach(b=>b.onclick=()=>b.dataset.game==="memory"?createMemory():startQuiz(b.dataset.game));
$("quizReplayBtn").onclick=()=>playCardAudio(cards[quizCorrectIndex]);
$("nextQuestionBtn").onclick=newQuizQuestion;$("newMemoryBtn").onclick=createMemory;
$("celebration").onclick=()=>$("celebration").classList.add("hidden");

let startX=null,startY=null;
$("mainCard").addEventListener("touchstart",e=>{const t=e.changedTouches[0];startX=t.clientX;startY=t.clientY},{passive:true});
$("mainCard").addEventListener("touchend",e=>{if(startX===null)return;const t=e.changedTouches[0],dx=t.clientX-startX,dy=t.clientY-startY;startX=startY=null;
  if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15){e.preventDefault();dx<0?nextLearn():prevLearn()}},{passive:false});

createCarousel();saveProgress();renderLearn();showScreen("homeScreen");
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js?v=7.2").catch(()=>{}))}
