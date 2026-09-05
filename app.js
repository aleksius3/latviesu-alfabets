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
  {upper:"G",lower:"g",word:"Govs",slug:"govs",audio:"audio/G_govs.mp3"},
  {upper:"Ģ",lower:"ģ",word:"Ģitāra",slug:"gitara",audio:"audio/GG_gitara.mp3"},
  {upper:"H",lower:"h",word:"Hameleons",slug:"hameleons",audio:"audio/H_hameleons.mp3"},
  {upper:"I",lower:"i",word:"Instrumenti",slug:"instrumenti",audio:"audio/I_instrumenti.mp3"},
  {upper:"Ī",lower:"ī",word:"Īkšķis",slug:"ikskis",audio:"audio/II_ikskis.mp3"},
  {upper:"J",lower:"j",word:"Jūra",slug:"jura",audio:"audio/J_jura.mp3"},
  {upper:"K",lower:"k",word:"Kaķis",slug:"kakis",audio:"audio/K_kakis.mp3"},
  {upper:"Ķ",lower:"ķ",word:"Ķirbis",slug:"kirbis",audio:"audio/KK_kirbis.mp3"},
  {upper:"L",lower:"l",word:"Lācis",slug:"lacis",audio:"audio/L_lacis.mp3"},
  {upper:"Ļ",lower:"ļ",word:"Ļipa",slug:"lipa",audio:"audio/LL_lipa.mp3"},
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
let index=+(localStorage.getItem("abc10-index")||0);
if(index<0||index>=cards.length)index=0;
let learned=new Set(JSON.parse(localStorage.getItem("abc10-learned")||"[]"));
let score=+(localStorage.getItem("abc10-stars")||0);
let streak=+(localStorage.getItem("abc10-streak")||0);
let currentAudio=null,currentGame="picture",correctIndex=-1,answered=false,memoryState=null;

const audios=cards.map(c=>{const a=new Audio(c.audio);a.preload="auto";a.load();return a});
const correctSfx=new Audio("audio/correct.wav"),wrongSfx=new Audio("audio/wrong.wav");
correctSfx.preload=wrongSfx.preload="auto";

function show(id){
 screens.forEach(s=>$(s).classList.toggle("active",s===id));
 $("homeBtn").classList.toggle("hidden",id==="home");
 $("stars").classList.toggle("hidden",id==="home"||id==="learn");
}
function save(){
 localStorage.setItem("abc10-index",index);
 localStorage.setItem("abc10-learned",JSON.stringify([...learned]));
 localStorage.setItem("abc10-stars",score);
 localStorage.setItem("abc10-streak",streak);
 $("starCount").textContent=score;$("menuStreak").textContent=streak;
 $("learnedCount").textContent=learned.size;
 $("homeProgress").style.width=`${learned.size/cards.length*100}%`;
 document.querySelectorAll(".milestones span").forEach(e=>e.classList.toggle("on",learned.size>=+e.dataset.n));
}
function stopAudio(){if(currentAudio){currentAudio.pause();currentAudio.currentTime=0;currentAudio=null}}
function playAudio(i){
 stopAudio();const a=audios[i];currentAudio=a;
 try{a.pause();a.currentTime=0;const p=a.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}
}
function sfx(a){try{a.pause();a.currentTime=0;a.play().catch(()=>{})}catch(e){}}
function renderRail(){
 const r=$("rail");r.innerHTML="";
 cards.forEach((c,i)=>{
   const b=document.createElement("button");b.className="rail-card";b.innerHTML=`<img src="${c.image}" alt=""><span>${c.upper}</span>`;
   b.onclick=()=>{index=i;renderCard(i>=index?1:1)};r.appendChild(b);
 });
}
function renderCard(dir=1){
 const c=cards[index];
 learned.add(index);save();
 $("sceneImg").src=c.image;$("sceneImg").alt=c.word;$("upper").textContent=c.upper;$("lower").textContent=c.lower;
 $("word").textContent=c.word;$("counter").textContent=`${index+1} / 33`;
 $("learnProgress").style.width=`${(index+1)/cards.length*100}%`;
 const coach=["Klausies un atkārto!","Pavelc tālāk!","Malacis!","Atceries šo burtu!"];
 $("coach").querySelector("b").textContent=coach[index%coach.length];
 const card=$("learnCard");card.classList.remove("enter-left","enter-right");void card.offsetWidth;card.classList.add(dir<0?"enter-left":"enter-right");
 [...$("rail").children].forEach((e,i)=>e.classList.toggle("active",i===index));
 setTimeout(()=>{const e=$("rail").children[index];if(e)e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})},50);
}
function next(){index=(index+1)%cards.length;renderCard(1)}
function prev(){index=(index-1+cards.length)%cards.length;renderCard(-1)}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function pool(){const a=[...learned];return a.length>=6?a:cards.map((_,i)=>i)}
function wrongs(correct,n=2){return shuffle(cards.map((_,i)=>i).filter(i=>i!==correct)).slice(0,n)}

function burst(){
 const colors=["#4b9f38","#ff9a32","#5c7bea","#df6384","#f0c54b"];
 for(let i=0;i<26;i++){const p=document.createElement("i");p.style.left=`${Math.random()*100}%`;p.style.background=colors[i%colors.length];p.style.animationDelay=`${Math.random()*.18}s`;$("confetti").appendChild(p)}
 setTimeout(()=>$("confetti").innerHTML="",1500);
}
function toast(){$("toast").classList.remove("hidden");burst();setTimeout(()=>$("toast").classList.add("hidden"),1100)}

function newQuestion(){
 answered=false;$("feedback").textContent="";$("feedback").className="feedback";$("nextBtn").classList.add("hidden");
 const p=pool();correctIndex=p[Math.floor(Math.random()*p.length)];
 const c=cards[correctIndex],opts=shuffle([correctIndex,...wrongs(correctIndex)]);
 $("quizOptions").innerHTML="";
 if(currentGame==="picture"){
   $("quizTitle").textContent="Atrodi attēlu";
   $("quizPrompt").innerHTML=`<div class="prompt-letter">${c.upper}</div>`;
   opts.forEach(i=>{const b=document.createElement("button");b.className="quiz-option";b.innerHTML=`<img src="${cards[i].image}" alt="${cards[i].word}">`;b.onclick=()=>answer(b,i);$("quizOptions").appendChild(b)})
 }else{
   $("quizTitle").textContent="Atrodi burtu";
   $("quizPrompt").innerHTML=`<img src="${c.image}" alt=""><span class="prompt-shade"></span><div class="prompt-copy">${c.word}</div>`;
   opts.forEach(i=>{const b=document.createElement("button");b.className="quiz-option";b.innerHTML=`<span class="q-letter">${cards[i].upper}</span>`;b.onclick=()=>answer(b,i);$("quizOptions").appendChild(b)})
 }
 setTimeout(()=>playAudio(correctIndex),120);
}
function answer(btn,i){
 if(answered)return;
 if(i===correctIndex){
   answered=true;btn.classList.add("correct");score++;streak++;save();sfx(correctSfx);
   $("feedback").textContent=["Pareizi! ⭐","Malacis! 🌟","Super! 🎉","Lieliski! ⭐"][streak%4];$("feedback").className="feedback good";
   $("nextBtn").classList.remove("hidden");if(streak%5===0)toast();
 }else{
   btn.classList.add("wrong");streak=0;save();sfx(wrongSfx);$("feedback").textContent="Mēģini vēl 🙂";$("feedback").className="feedback bad";
   setTimeout(()=>btn.classList.remove("wrong"),480);
 }
}
function startGame(type){
 if(type==="memory")return newMemory();
 currentGame=type;show("quiz");newQuestion();
}
function newMemory(){
 show("memory");$("newMemory").classList.add("hidden");$("memoryFeedback").textContent="";
 const picks=shuffle(pool()).slice(0,3);
 const deck=shuffle(picks.flatMap(i=>[{pair:i,type:"letter"},{pair:i,type:"image"}]));
 memoryState={deck,first:null,lock:false,matches:0,moves:0};$("moves").textContent="0";$("memoryGrid").innerHTML="";
 deck.forEach((d,k)=>{
   const b=document.createElement("button");b.className="memory-card";
   b.innerHTML=d.type==="letter"?`<div class="memory-face memory-back">?</div><div class="memory-face memory-front letter">${cards[d.pair].upper}</div>`:
   `<div class="memory-face memory-back">?</div><div class="memory-face memory-front"><img src="${cards[d.pair].image}" alt=""></div>`;
   b.onclick=()=>flip(k,b);$("memoryGrid").appendChild(b);
 });
}
function flip(k,el){
 const s=memoryState;if(!s||s.lock||el.classList.contains("matched")||el.classList.contains("flipped"))return;
 el.classList.add("flipped");
 if(s.first===null){s.first=k;return}
 const a=s.first,b=k;s.moves++;$("moves").textContent=s.moves;s.lock=true;
 const A=s.deck[a],B=s.deck[b],ea=$("memoryGrid").children[a],eb=$("memoryGrid").children[b];
 if(A.pair===B.pair&&A.type!==B.type){
   setTimeout(()=>{ea.classList.add("matched");eb.classList.add("matched");s.first=null;s.lock=false;s.matches++;score++;streak++;save();sfx(correctSfx);
   if(streak%5===0)toast();if(s.matches===3){$("memoryFeedback").textContent="Visi pāri atrasti! ⭐";$("memoryFeedback").className="feedback good";$("newMemory").classList.remove("hidden")}},280);
 }else{
   streak=0;save();sfx(wrongSfx);setTimeout(()=>{ea.classList.remove("flipped");eb.classList.remove("flipped");s.first=null;s.lock=false},650);
 }
}

$("learnBtn").onclick=e=>{e.currentTarget.animate([{transform:"scale(1)"},{transform:"scale(.94)"},{transform:"scale(1.02)"},{transform:"scale(1)"}],{duration:260});setTimeout(()=>{show("learn");renderCard(1)},130)};
$("playBtn").onclick=e=>{e.currentTarget.animate([{transform:"scale(1)"},{transform:"scale(.94)"},{transform:"scale(1.02)"},{transform:"scale(1)"}],{duration:260});setTimeout(()=>show("gameMenu"),130)};
$("homeBtn").onclick=()=>{stopAudio();show("home");save()};
$("soundBtn").onclick=e=>{e.stopPropagation();const b=$("soundBtn");b.classList.remove("playing");void b.offsetWidth;b.classList.add("playing");playAudio(index)};
$("learnCard").onclick=e=>{if(e.target.closest("#soundBtn"))return;next()};
document.querySelectorAll(".game-tile").forEach(b=>b.onclick=()=>{b.animate([{transform:"scale(1)"},{transform:"scale(.95)"},{transform:"scale(1)"}],{duration:220});setTimeout(()=>startGame(b.dataset.game),110)});
$("replayBtn").onclick=()=>playAudio(correctIndex);$("nextBtn").onclick=newQuestion;$("newMemory").onclick=newMemory;

let sx=null,sy=null;
$("learnCard").addEventListener("touchstart",e=>{const t=e.changedTouches[0];sx=t.clientX;sy=t.clientY},{passive:true});
$("learnCard").addEventListener("touchend",e=>{if(sx===null)return;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;sx=sy=null;if(Math.abs(dx)>42&&Math.abs(dx)>Math.abs(dy)*1.15){e.preventDefault();dx<0?next():prev()}},{passive:false});

renderRail();save();renderCard(1);show("home");
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js?v=11").catch(()=>{}));
