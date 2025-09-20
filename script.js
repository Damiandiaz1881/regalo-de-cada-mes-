// script.js
const CONFIG = {
  nombres: 'Damian & Ian',
  desde: '2025-06-21',
  firma: 'Dami',
  mensaje: `Gracias por cada día, por tu paciencia y tus abrazos.\nContigo aprendí que el hogar no es un lugar, es una persona.\nQuiero seguir sumando risas, viajes, Findes de pelis y miles de amaneceres a tu lado.\nFeliz mesiversario, mi amor. Hoy te elijo, mañana y siempre .`,
  musica: ''
};

const $ = s => document.querySelector(s);

(function init(){
  $('#names').textContent = CONFIG.nombres;
  $('#firma').textContent = CONFIG.firma;

  const since = new Date(CONFIG.desde);
  const now = new Date();
  const months = (now.getFullYear() - since.getFullYear()) * 12 + (now.getMonth() - since.getMonth());
  const fmt = d => d.toLocaleDateString('es-AR');
  $('#sinceTxt').textContent = fmt(since);
  $('#monthsTxt').textContent = months >= 0 ? months : 0;
  $('#count').textContent = months + ' meses';
  $('#year').textContent = new Date().getFullYear();

  typewriter(CONFIG.mensaje, $('#typewriter'));

  const audio = $('#music');
  if(CONFIG.musica){ audio.querySelector('source').src = CONFIG.musica; audio.load(); }

  spawnHearts();
})();

const envelope = $('#envelope');
const openLetterBtn = $('#openLetter');
envelope.addEventListener('click', ()=> envelope.classList.toggle('open'));
openLetterBtn.addEventListener('click', ()=> envelope.classList.toggle('open'));

const musicToggle = $('#musicToggle');
musicToggle.addEventListener('change', (e)=>{
  const audio = $('#music');
  if(e.target.checked){ audio.volume = .7; audio.play().catch(()=>{}); }
  else { audio.pause(); }
});

async function typewriter(text, el, speed=22){
  el.textContent = '';
  for(let i=0;i<text.length;i++){
    el.textContent += text[i];
    await new Promise(r=>setTimeout(r, (text[i]==='.'||text[i]===',')? speed*6 : speed));
  }
}

function spawnHearts(){
  const container = $('#hearts');
  const colors = ['#ff4d73','#ff8aa6','#ffd1dc','#fff'];
  for(let i=0;i<30;i++){
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random()*100 + 'vw';
    h.style.bottom = (-10 + Math.random()*20) + 'vh';
    h.style.color = colors[Math.floor(Math.random()*colors.length)];
    h.style.animationDuration = 8 + Math.random()*8 + 's';
    h.style.animationDelay = Math.random()*6 + 's';
    h.style.opacity = .25 + Math.random()*.5;
    container.appendChild(h);
  }
}

const confettiBtn = $('#confettiBtn');
confettiBtn.addEventListener('click', shootConfetti);

function shootConfetti(){
  const canvas = $('#confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth; canvas.height = innerHeight; canvas.style.display='block';
  const pieces = Array.from({length:180}, ()=>({
    x: Math.random()*canvas.width,
    y: -20 - Math.random()*canvas.height*.3,
    s: 6+Math.random()*8,
    a: Math.random()*Math.PI*2,
    v: 2+Math.random()*4,
    r: (Math.random()<.5? -1:1) * (.02+.06*Math.random()),
    c: `hsl(${Math.floor(330+Math.random()*60)}, 90%, ${60+Math.random()*20}%)`
  }));
  let t=0; const maxT=160;
  (function anim(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.a += p.r; p.y += p.v; p.x += Math.sin(p.a)*1.5;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.a);
      ctx.fillStyle=p.c; ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.6); ctx.restore();
    });
    if(++t<maxT) requestAnimationFrame(anim); else canvas.style.display='none';
  })();
}

window.addEventListener('load', ()=>{
  const tl = $('#timeline');
  if(tl) tl.scrollTo({left: tl.scrollWidth*0.4, behavior:'smooth'});
});
