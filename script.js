const $=id=>document.getElementById(id);
let stream=null;

const responses=[
 "ആണല്ലേ… ആണല്ലേ… 😂 പക്ഷേ ശബ്ദം കേട്ടിട്ട് അങ്ങനെ തോന്നുന്നില്ലല്ലോ.",
 "ഒരു മിനിറ്റ്… എന്തോ ശരിയല്ലല്ലോ ഇവിടെ.",
 "എന്തായാലും സംഭവം അത്ര പന്തിയല്ല.",
 "ചേട്ടാ… പണി കിട്ടിയിട്ടുണ്ട്. നല്ലോണം കിട്ടിയിട്ടുണ്ട്. 💀",
 "അയ്യോ അമ്മച്ചീ… പണി പാളിയല്ലോ! 😭",
 "എന്താ ഇത്… നമ്മൾ പെട്ടോ?",
 "ഇനി എന്ത് ചെയ്യണം എന്ന് ചോദിച്ചാൽ… എനിക്കും അറിയില്ല.",
 "ചേട്ടാ, ഒന്നും നോക്കണ്ട… ഓടിക്കോ. 🏃‍♂️"
];

const levels=[
 [0,24,"LEVEL 1 — ചെറിയ പണി 😌","കണ്ടിട്ട് വലിയ പ്രശ്നമൊന്നുമില്ല. ഇപ്പൊ തന്നെ ഓടണ്ട."],
 [25,54,"LEVEL 2 — പണി തുടങ്ങീ","ചെറിയൊരു സംശയമുണ്ട്… ഒന്ന് ചുറ്റും നോക്കിക്കോ."],
 [55,79,"LEVEL 3 — പണി ഉണ്ട്","അവസ്ഥ അത്ര നല്ലതല്ല. വെറുതെ നിന്നാൽ മതിയാവില്ല."],
 [80,94,"LEVEL 4 — പണി കിട്ടി 🚨","ചേട്ടാ… ഒന്നും നോക്കണ്ട. ഓടിക്കോ."],
 [95,101,"LEVEL 5 — അയ്യോ പണി കിട്ടിയേ 💀","ഇനി രക്ഷപ്പെടാൻ നോക്കണ്ട… സമാധാനമായി ഇരുന്നോ."]
];

function speak(text){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="ml-IN"; u.rate=.92; u.pitch=1;
  speechSynthesis.speak(u);
}

function log(text){
  const d=document.createElement("div"); d.textContent="> "+text; $("logs").appendChild(d);
}

async function scan(){
  $("report").classList.add("hidden"); $("verdict").classList.add("hidden"); $("why").classList.add("hidden");
  $("logs").innerHTML="";
  $("progressBar").style.width="0%";
  const steps=[
    ["VOICE ANALYSIS INITIATED…",10],
    ["FACIAL SCAN INITIATED…",28],
    ["ENVIRONMENTAL THREAT SCAN INITIATED…",47],
    ["CHECKING SUSPICIOUS CALMNESS…",65],
    ["MAKING THINGS WORSE…",82],
    ["CONSULTING ABSOLUTELY NO REAL SCIENCE…",100]
  ];
  for(const [t,p] of steps){log(t);$("progressBar").style.width=p+"%";await new Promise(r=>setTimeout(r,500))}
  const pani=+(Math.random()*35+65).toFixed(1);
  $("stability").textContent=(100-pani).toFixed(1)+"%";
  $("pani").textContent=pani+"%";
  $("escape").textContent=Math.max(.1,+(100-pani-1).toFixed(1))+"%";
  $("brain").textContent=Math.floor(Math.random()*45+35)+"%";
  $("survival").textContent=(Math.random()*.1).toFixed(2)+"%";
  $("fine").textContent="FALSE";
  $("malayalamResponse").textContent=responses[Math.floor(Math.random()*responses.length)];
  $("report").classList.remove("hidden");

  let lev=levels.find(x=>pani>=x[0]&&pani<=x[1])||levels[4];
  $("verdictText").textContent=pani>=95?"PANI KITTI":"PANI UND";
  $("threat").textContent=pani>=95?"WHY DID YOU ASK?":"SUSPICIOUSLY NORMAL";
  $("action").textContent=pani>=80?"RUN":"PRETEND EVERYTHING IS FINE";
  $("levelText").textContent=lev[2]+" — "+lev[3];
  $("verdict").classList.remove("hidden");

  if(pani>=90){document.body.animate([{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:250,iterations:3})}
  await new Promise(r=>setTimeout(r,700));
  $("finalQuestion").classList.remove("hidden");
  $("finalVoiceStatus").textContent="AI ready… ചോദിച്ചോളൂ. 😭";
  window.finalPani = pani;
}

$("voiceBtn").onclick=()=>{
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){$("transcript").textContent="“ഞാൻ ഫൈൻ ആണ്…”";scan();return}
  const r=new SR();r.lang="ml-IN";r.interimResults=false;
  r.onresult=e=>$("transcript").textContent="“"+e.results[0][0].transcript+"”";
  r.onerror=()=>{$("transcript").textContent="“ഞാൻ ഫൈൻ ആണ്…”"};
  r.onend=scan;r.start();
};
$("demoBtn").onclick=()=>{ $("transcript").textContent="“ഞാൻ ഫൈൻ ആണ്… ഒന്നും പ്രശ്നമില്ല.”"; scan(); };
$("cameraBtn").onclick=async()=>{
  $("cameraPanel").classList.toggle("hidden");
  if(!$("cameraPanel").classList.contains("hidden")){
    try{stream=await navigator.mediaDevices.getUserMedia({video:true});$("video").srcObject=stream}catch(e){alert("Camera permission was not available. Demo will continue without camera.");}
  } else if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}
};

$("askFinalBtn").onclick=async()=>{
  const btn=$("askFinalBtn");
  const status=$("finalVoiceStatus");
  const pani=window.finalPani||99.6;
  btn.disabled=true;
  $("finalQuestion").classList.add("playing");
  status.textContent="🎙️ AI ആലോചിക്കുകയാണ്…";
  const lines=[
    "ഒരു മിനിറ്റ്… ആലോചിക്കട്ടെ.",
    "എന്തിനാ പണി കിട്ടിയതെന്ന് അറിയണോ?",
    "നിങ്ങൾ തന്നെ ചോദിച്ചില്ലേ… പണി കിട്ടിയോന്ന്!",
    "ഇനി എന്ത് ചെയ്യാനാ… സമാധാനമായി ഇരുന്നോ."
  ];
  $("why").classList.remove("hidden");
  $("whyLog").textContent="47 imaginary experts-ne consult cheyyunnu…";
  $("whyAnswer").textContent="";
  for(const line of lines){
    status.textContent=line;
    speak(line);
    await new Promise(r=>setTimeout(r,1700));
  }
  $("whyLog").textContent="FINAL AI EXPLANATION";
  $("whyAnswer").textContent="“നിങ്ങൾ തന്നെ ചോദിച്ചില്ലേ… പണി കിട്ടിയോന്ന്!” 💀😂";
  status.textContent="😂 AI answer complete.";
  btn.disabled=false;
  $("finalQuestion").classList.remove("playing");
};

window.addEventListener("beforeunload",()=>stream&&stream.getTracks().forEach(t=>t.stop
