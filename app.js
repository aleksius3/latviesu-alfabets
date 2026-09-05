const cards=[
  {upper:"A",lower:"a",word:"Aita",slug:"aita",audio:"audio/A_aita.mp3"},
  {upper:"Ā",lower:"ā",word:"Ābols",slug:"abols",audio:"audio/AA_abols.mp3"},
  {upper:"B",lower:"b",word:"Bumba",slug:"bumba",audio:"audio/B_bumba.mp3"},
  {upper:"C",lower:"c",word:"Cālis",slug:"calis",audio:"audio/C_calis.mp3"},
  {upper:"Č",lower:"č",word:"Čūska",slug:"cuska",audio:"audio/CC_cuska.mp3"},
  {upper:"D",lower:"d",word:"Dāvana",slug:"davana",audio:"audio/D_davana.mp3"},
  {upper:"E",lower:"e",word:"Ezis",slug:"ezis",audio:"audio/E_ezis.mp3"},
  {upper:"Ē",lower:"ē",word:"Ēzelis",slug:"ezelis",audio:"audio/EE_ezelis.mp3"},
  {upper:"F",lower:"f",word:"Flauta",slug:"flauta",audio:"audio/F_flauta.mp3"},
  {upper:"G",lower:"g",word:"Gailis",slug:"gailis",audio:"audio/G_gailis.mp3"},
  {upper:"Ģ",lower:"ģ",word:"Ģitāra",slug:"gitara",audio:"audio/GG_gitara.mp3"},
  {upper:"H",lower:"h",word:"Hameleons",slug:"hameleons",audio:"audio/H_hameleons.mp3"},
  {upper:"I",lower:"i",word:"Instrumenti",slug:"instrumenti",audio:"audio/I_instrumenti.mp3"},
  {upper:"Ī",lower:"ī",word:"Īkšķis",slug:"ikskis",audio:"audio/II_ikskis.mp3"},
  {upper:"J",lower:"j",word:"Jūra",slug:"jura",audio:"audio/J_jura.mp3"},
  {upper:"K",lower:"k",word:"Kaķis",slug:"kakis",audio:"audio/K_kakis.mp3"},
  {upper:"Ķ",lower:"ķ",word:"Ķirbis",slug:"kirbis",audio:"audio/KK_kirbis.mp3"},
  {upper:"L",lower:"l",word:"Lācis",slug:"lacis",audio:"audio/L_lacis.mp3"},
  {upper:"Ļ",lower:"ļ",word:"Ļaudis",slug:"laudis",audio:"audio/LL_laudis.mp3"},
  {upper:"M",lower:"m",word:"Māja",slug:"maja",audio:"audio/M_maja.mp3"},
  {upper:"N",lower:"n",word:"Nazis",slug:"nazis",audio:"audio/N_nazis.mp3"},
  {upper:"Ņ",lower:"ņ",word:"Ņau",slug:"nau",audio:"audio/NN_nau.mp3"},
  {upper:"O",lower:"o",word:"Oga",slug:"oga",audio:"audio/O_oga.mp3"},
  {upper:"P",lower:"p",word:"Pīle",slug:"pile",audio:"audio/P_pile.mp3"},
  {upper:"R",lower:"r",word:"Ritenis",slug:"ritenis",audio:"audio/R_ritenis.mp3"},
  {upper:"S",lower:"s",word:"Suns",slug:"suns",audio:"audio/S_suns.mp3"},
  {upper:"Š",lower:"š",word:"Šalle",slug:"salle",audio:"audio/SS_salle.mp3"},
  {upper:"T",lower:"t",word:"Taurenis",slug:"taurenis",audio:"audio/T_taurenis.mp3"},
  {upper:"U",lower:"u",word:"Uguns",slug:"uguns",audio:"audio/U_uguns.mp3"},
  {upper:"Ū",lower:"ū",word:"Ūdens",slug:"udens",audio:"audio/UU_udens.mp3"},
  {upper:"V",lower:"v",word:"Vāvere",slug:"vavere",audio:"audio/V_vavere.mp3"},
  {upper:"Z",lower:"z",word:"Zivs",slug:"zivs",audio:"audio/Z_zivs.mp3"},
  {upper:"Ž",lower:"ž",word:"Žirafe",slug:"zirafe",audio:"audio/ZZ_zirafe.mp3"}
].map((c,i)=>({...c,image:`images/${c.slug}.webp`,index:i}));
const $=id=>document.getElementById(id);
const screens=["home","learn","gameMenu","quiz","memory"];
let index=+(localStorage.getItem("v12-index")||0);if(index<0||index>=33)index=0;
let learned=new Set(JSON.parse(localStorage.getItem("v12-learned")||"[]"));
let stars=+(localStorage.getItem("v12-stars")||0),streak=0,currentAudio=null,currentGame="picture",correctIndex=-1,answered=false,memoryState=null;
const audios=cards.map(c=>{const a=new Audio(c.audio);a.preload="auto";a.load();return a});
const correctSfx=new Audio("audio/correct.wav"),wrongSfx=new Audio("audio/wrong.wav");

function show(id){screens.forEach(s=>$(s).classList.toggle("active",s===id));$("homeBtn").classList.toggle("hidden",id==="home");$("score").classList.toggle("hidden",id==="home"||id==="learn")}
function save(){localStorage.setItem("v12-index",index);localStorage.setItem("v12-learned",JSON.stringify([...learned]));localStorage.setItem("v12-stars",stars);$("scoreNum").textContent=stars;$("learned").textContent=learned.size;$("homeProgress").style.width=`${learned.size/33*100}%`}
function stopAudio(){if(currentAudio){currentAudio.pause();currentAudio.currentTime=0;currentAudio=null}}
function playCard(i){stopAudio();const a=audios[i];currentAudio=a;try{a.pause();a.currentTime=0;a.play().catch(()=>{})}catch(e){}}
function playSfx(a){try{a.pause();a.currentTime=0;a.play().catch(()=>{})}catch(e){}}

function makeRail(){
 const r=$("rail");r.innerHTML="";
 cards.forEach((c,i)=>{const b=document.createElement("button");b.className="rail-card";b.innerHTML=`<img src="${c.image}"><b>${c.upper}</b>`;b.onclick=()=>{const dir=i<index?-1:1;index=i;render(dir,true)};r.appendChild(b)})
}
function render(dir=1,autoSound=true){
 const c=cards[index];learned.add(index);save();
 $("cardImg").src=c.image;$("upper").textContent=c.upper;$("lower").textContent=c.lower;$("word").textContent=c.word;$("counter").textContent=`${index+1} / 33`;
 $("learnProgress").style.width=`${(index+1)/33*100}%`;
 const card=$("card");card.classList.remove("slide-next","slide-prev");void card.offsetWidth;card.classList.add(dir<0?"slide-prev":"slide-next");
 [...$("rail").children].forEach((e,i)=>e.classList.toggle("active",i===index));
 setTimeout(()=>{const e=$("rail").children[index];if(e)e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})},30);
 if(autoSound)setTimeout(()=>playCard(index),130);
}
function next(){index=(index+1)%33;render(1,true)}function prev(){index=(index+32)%33;render(-1,true)}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function pool(){const p=[...learned];return p.length>=6?p:cards.map((_,i)=>i)}function wrongs(c){return shuffle(cards.map((_,i)=>i).filter(i=>i!==c)).slice(0,2)}

function startQuiz(type){currentGame=type;show("quiz");newQuestion()}
function newQuestion(){
 answered=false;$("feedback").textContent="";$("nextQ").classList.add("hidden");correctIndex=pool()[Math.floor(Math.random()*pool().length)];
 const c=cards[correctIndex],opts=shuffle([correctIndex,...wrongs(correctIndex)]);$("quizOptions").innerHTML="";
 if(currentGame==="picture"){$("quizTitle").textContent="Atrodi attēlu";$("quizPrompt").innerHTML=`<div class="prompt-letter">${c.upper}</div>`;opts.forEach(i=>{const b=document.createElement("button");b.className="quiz-option";b.innerHTML=`<img src="${cards[i].image}">`;b.onclick=()=>answer(b,i);$("quizOptions").appendChild(b)})}
 else{$("quizTitle").textContent="Atrodi burtu";$("quizPrompt").innerHTML=`<img src="${c.image}"><span class="prompt-shade"></span><b class="prompt-word">${c.word}</b>`;opts.forEach(i=>{const b=document.createElement("button");b.className="quiz-option";b.innerHTML=`<span class="ql">${cards[i].upper}</span>`;b.onclick=()=>answer(b,i);$("quizOptions").appendChild(b)})}
 setTimeout(()=>playCard(correctIndex),120);
}
function answer(btn,i){if(answered)return;if(i===correctIndex){answered=true;btn.classList.add("correct");stars++;streak++;save();playSfx(correctSfx);$("feedback").textContent="Malacis! ⭐";$("feedback").className="feedback good";$("nextQ").classList.remove("hidden")}else{btn.classList.add("wrong");streak=0;playSfx(wrongSfx);$("feedback").textContent="Mēģini vēl 🙂";$("feedback").className="feedback bad";setTimeout(()=>btn.classList.remove("wrong"),450)}}
function newMemory(){
 show("memory");$("newMemory").classList.add("hidden");$("memoryFeedback").textContent="";const picks=shuffle(pool()).slice(0,3),deck=shuffle(picks.flatMap(i=>[{pair:i,type:"letter"},{pair:i,type:"image"}]));
 memoryState={deck,first:null,lock:false,matches:0,moves:0};$("moves").textContent="0";$("memoryGrid").innerHTML="";
 deck.forEach((d,k)=>{const b=document.createElement("button");b.className="memory-card";b.innerHTML=d.type==="letter"?`<div class="memory-face memory-back">?</div><div class="memory-face memory-front letter">${cards[d.pair].upper}</div>`:`<div class="memory-face memory-back">?</div><div class="memory-face memory-front"><img src="${cards[d.pair].image}"></div>`;b.onclick=()=>flip(k,b);$("memoryGrid").appendChild(b)})
}
function flip(k,el){const s=memoryState;if(!s||s.lock||el.classList.contains("matched")||el.classList.contains("flipped"))return;el.classList.add("flipped");if(s.first===null){s.first=k;return}const a=s.first,b=k;s.moves++;$("moves").textContent=s.moves;s.lock=true;const A=s.deck[a],B=s.deck[b],ea=$("memoryGrid").children[a],eb=$("memoryGrid").children[b];if(A.pair===B.pair&&A.type!==B.type){setTimeout(()=>{ea.classList.add("matched");eb.classList.add("matched");s.first=null;s.lock=false;s.matches++;stars++;save();playSfx(correctSfx);if(s.matches===3){$("memoryFeedback").textContent="Visi pāri atrasti! ⭐";$("memoryFeedback").className="feedback good";$("newMemory").classList.remove("hidden")}},260)}else{playSfx(wrongSfx);setTimeout(()=>{ea.classList.remove("flipped");eb.classList.remove("flipped");s.first=null;s.lock=false},620)}}

$("learnBtn").onclick=()=>{show("learn");render(1,true)};$("playBtn").onclick=()=>show("gameMenu");$("homeBtn").onclick=()=>{stopAudio();show("home");save()};
$("soundBtn").onclick=e=>{e.stopPropagation();const b=$("soundBtn");b.classList.remove("playing");void b.offsetWidth;b.classList.add("playing");playCard(index)};
$("card").onclick=e=>{if(e.target.closest("#soundBtn"))return;next()};
document.querySelectorAll(".game-tile").forEach(b=>b.onclick=()=>b.dataset.game==="memory"?newMemory():startQuiz(b.dataset.game));
$("replay").onclick=()=>playCard(correctIndex);$("nextQ").onclick=newQuestion;$("newMemory").onclick=newMemory;
let sx=null,sy=null;$("card").addEventListener("touchstart",e=>{const t=e.changedTouches[0];sx=t.clientX;sy=t.clientY},{passive:true});
$("card").addEventListener("touchend",e=>{if(sx===null)return;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;sx=sy=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.15){e.preventDefault();dx<0?next():prev()}},{passive:false});
makeRail();save();render(1,false);show("home");
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js?v=12").catch(()=>{}));
