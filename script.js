
// Nav underline
(function(){
  const nav = document.querySelector('nav.main-nav');
  const links = Array.from(document.querySelectorAll('#navList a'));
  const underline = document.getElementById('navUnderline');
  function place(el){ if(!el){ underline.style.opacity=0; return; } const r=el.getBoundingClientRect(), nr=nav.getBoundingClientRect(); underline.style.width=r.width+'px'; underline.style.transform='translateX('+(r.left-nr.left)+'px)'; underline.style.opacity=1; }
  let active = links[0];
  links.forEach(a=>{
    a.addEventListener('mouseenter', ()=> place(a));
    a.addEventListener('mouseleave', ()=> place(active));
    a.addEventListener('click', (e)=>{ e.preventDefault(); document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'}); active=a; links.forEach(x=>x.classList.remove('active')); a.classList.add('active'); place(a);});
  });
  place(active);
  window.addEventListener('scroll', ()=>{
    let found=null;
    document.querySelectorAll('section[id]').forEach(s=>{ const r=s.getBoundingClientRect(); if(r.top <= window.innerHeight*0.45 && r.bottom > window.innerHeight*0.3) found=s; });
    if(found){ const a=document.querySelector('#navList a[href="#'+found.id+'"]'); if(a && a!==active){ active=a; links.forEach(x=>x.classList.remove('active')); a.classList.add('active'); place(a); } }
  }, {passive:true});
})();

// Hero background subtle float
(function(){
  const bg = document.getElementById('heroBg');
  window.addEventListener('scroll', ()=>{ const sc = window.scrollY; if(bg) bg.style.transform = 'translateY(' + (sc * -0.06) + 'px) scale(1.03)'; }, {passive:true});
})();

// Video modal (Option A)
document.getElementById('playBtn').addEventListener('click', function openVideo(){
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxContent').innerHTML = '<iframe width="100%" height="480" src="https://www.youtube.com/embed/Scqj6k6gF2M?autoplay=1" title="Intro video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  lb.style.display = 'flex';
});
document.getElementById('videoSlot').addEventListener('keydown', (e)=>{ if(e.key==='Enter') document.getElementById('playBtn').click(); });
function closeLightbox(){ document.getElementById('lightbox').style.display='none'; document.getElementById('lightboxContent').innerHTML=''; }

// Gallery parallax
function imgParallax(e, el){ const rect = el.getBoundingClientRect(); const px = (e.clientX - rect.left)/rect.width - 0.5; const py = (e.clientY - rect.top)/rect.height - 0.5; const inner = el.querySelector('.move'); if(inner) inner.style.transform = 'translate(' + (-px*8) + 'px,' + (-py*8) + 'px) scale(1.02)'; }

// Packages data (from lessons - paraphrased)
const lessonData = {
  'beginner': {
    title: 'Full Beginner Course',
    short: 'Start from zero: safe kite handling, bodydrag and first water starts.',
    long: 'A direct water-based introduction to kiteboarding — learn kite control, safety systems, bodydrags and your first water starts under IKO guidance. Ideal for true beginners and families.'
  },
  'discovery': {
    title: 'Discovery Course',
    short: 'Try a taster session with an instructor on shallow water.',
    long: 'A short taster to fly the kite and feel the water — perfect to test the sport before committing to a longer course. Quick, supervised and safe on our shallow bay.'
  }
};

// render package buttons with interactive reveal
(function renderPackages(){
  const container = document.getElementById('packageButtons');
  if(!container) return;
  const keys = ['beginner','discovery'];
  keys.forEach(k=>{
    const d = lessonData[k];
    const el = document.createElement('div'); el.className='pkg'; el.setAttribute('role','button'); el.tabIndex=0;
    el.innerHTML = `
      <div class="icon" aria-hidden="true">${iconFor(k)}</div>
      <h3>${d.title}</h3>
      <p class="mini">${d.short}</p>
      <div class="details" aria-hidden="true">
        <p style="margin:0 0 10px 0;color:var(--muted)">${d.long}</p>
        <div style="display:flex;gap:8px">
          <button class="btn small" onclick="openBooking('${d.title.replace(/'/g,'')}')">Book</button>
          <button class="btn small ghost" onclick="openDetails('${k}')">More</button>
        </div>
      </div>
    `;
    el.addEventListener('click', ()=> openDetails(k));
    el.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openDetails(k); });
    container.appendChild(el);
  });
})();

function iconFor(key){
  if(key==='beginner') return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="1" y="1" width="22" height="22" rx="6" fill="#e6f9fb"/><path d="M6 15c1.5-3 6-7 9-9" stroke="#0b7ea1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  if(key==='discovery') return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#fff7e6"/><path d="M9 15l6-6" stroke="#ff9a33" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  return '';
}

function openDetails(key){
  const d = lessonData[key];
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxContent').innerHTML = `<h3 style="margin-top:0">${d.title}</h3><p style="color:var(--muted)">${d.long}</p><div style="margin-top:12px;display:flex;gap:8px;justify-content:center"><button class="btn" onclick="openBooking('${d.title.replace(/'/g,'')}')">Book this course</button><button class="btn ghost" onclick="closeLightbox()">Close</button></div>`;
  lb.style.display='flex';
}

function openBooking(title){ const msg = encodeURIComponent(`Hi — I'm interested in the ${title}. Please help me choose a date and package.`); window.open('https://wa.me/85589392068?text=' + msg, '_blank'); }

function openLightbox(name){ const lb = document.getElementById('lightbox'); document.getElementById('lightboxContent').textContent = name + ' — placeholder'; lb.style.display='flex'; }

// Calculator logic
(function(){
  const PRICE_NIGHT=35, PRICE_BB=5, PRICE_ALL=30, PRICE_PRIVATE=55, PRICE_RENT=30, PRICE_PHOTO=55, PRICE_SPEED=15, PRICE_INS=10, GROUP_RATE=80, PRIVATE_RATE=55, HOURS_DAY=2;
  const nightsEl=document.getElementById('nights'), peopleEl=document.getElementById('people'), mealEl=document.getElementById('meal'), courseDaysEl=document.getElementById('courseDays'), rentalEl=document.getElementById('rentalHours'), privateEl=document.getElementById('privateTransport'), photosEl=document.getElementById('photoshoot'), groupEl=document.getElementById('groupLesson'), calcBtn=document.getElementById('calcBtn'), resetBtn=document.getElementById('resetBtn'), totalDisplay=document.getElementById('totalDisplay'), breakdown=document.getElementById('breakdown'), emailRequest=document.getElementById('emailRequest'), waRequest=document.getElementById('waRequest');
  function fmt(v){ return '$'+Number(v).toFixed(2); }
  function compute(){
    const nights=Math.max(1,parseInt(nightsEl.value)||1), people=Math.max(1,parseInt(peopleEl.value)||1), meal=mealEl.value, courseDays=Math.max(0,parseInt(courseDaysEl.value)||0), rentalHours=Math.max(0,parseFloat(rentalEl.value)||0), priv=privateEl.checked, photos=photosEl.checked, group=groupEl.checked, lessonRate=group?GROUP_RATE:PRIVATE_RATE;
    const accom=PRICE_NIGHT*people*nights;
    const mealExtra=(meal==='bb'?PRICE_BB:(meal==='all'?PRICE_ALL:0))*people*nights;
    const course=lessonRate*HOURS_DAY*courseDays*people;
    const transport=priv?PRICE_PRIVATE:0;
    const rental=PRICE_RENT*rentalHours*people;
    const photosTotal=photos?PRICE_PHOTO*people:0;
    const speedTotal=PRICE_SPEED*nights*people;
    const insTotal=PRICE_INS*nights*people;
    const total=accom+mealExtra+course+transport+rental+photosTotal+speedTotal+insTotal;
    let lines='<ul>';
    lines+=`<li>Accommodation: ${fmt(PRICE_NIGHT)} × ${people} × ${nights} nights = <strong>${fmt(accom)}</strong></li>`;
    if(meal!=='none') lines+=`<li>${meal==='bb'?'Bed & Breakfast':'All-Inclusive (dinner)'}: ${fmt(meal==='bb'?PRICE_BB:PRICE_ALL)} × ${people} × ${nights} = <strong>${fmt(mealExtra)}</strong></li>`;
    else lines+=`<li>Meals: none</li>`;
    lines+=`<li>Course: ${courseDays} day(s) × ${HOURS_DAY} hrs/day × ${fmt(lessonRate)} × ${people} = <strong>${fmt(course)}</strong></li>`;
    lines+=`<li>Private transport: <strong>${fmt(transport)}</strong></li>`;
    lines+=`<li>Equipment rental: ${fmt(PRICE_RENT)} × ${rentalHours} hrs × ${people} = <strong>${fmt(rental)}</strong></li>`;
    lines+=`<li>Photoshoot: ${photos?fmt(PRICE_PHOTO)+' × '+people:fmt(0)} = <strong>${fmt(photosTotal)}</strong></li>`;
    lines+=`<li>Speedboat: ${fmt(PRICE_SPEED)} × ${nights} days × ${people} = <strong>${fmt(speedTotal)}</strong></li>`;
    lines+=`<li>Insurance: ${fmt(PRICE_INS)} × ${nights} days × ${people} = <strong>${fmt(insTotal)}</strong></li>`;
    lines+='</ul>';
    breakdown.innerHTML=lines;
    totalDisplay.textContent=fmt(total);
    const subj=encodeURIComponent(`Booking request: ${people} guest(s), ${nights} nights`);
    const body=encodeURIComponent([`Hello, I'm interested in the All-Inclusive package.`,`Guests: ${people}`,`Nights: ${nights}`,`Meal plan: ${meal}`,`Course days: ${courseDays}`,`Lesson type: ${group?'Group':'Private'} @ ${lessonRate} USD/hr`,`Rental hrs/person: ${rentalHours}`,`Private transport: ${priv?'Yes':'No'}`,`Photoshoot: ${photos?'Yes':'No'}`,`Estimated total: ${fmt(total)}`].join('\n'));
    emailRequest.href=`mailto:owner@example.com?subject=${subj}&body=${body}`;
    waRequest.href=`https://wa.me/85589392068?text=${encodeURIComponent('Booking request: '+people+' guests, '+nights+' nights. Est: '+fmt(total))}`;
  }
  calcBtn.addEventListener('click', compute);
  [nightsEl,peopleEl,mealEl,courseDaysEl,rentalEl,privateEl,photosEl,groupEl].forEach(i=>{ i.addEventListener('input', compute); i.addEventListener('change', compute); });
  resetBtn.addEventListener('click', ()=>{ nightsEl.value=5; peopleEl.value=2; mealEl.value='none'; courseDaysEl.value=0; rentalEl.value=0; privateEl.checked=false; photosEl.checked=false; groupEl.checked=false; compute(); });
  window.addEventListener('load', ()=>{ nightsEl.value=5; peopleEl.value=2; courseDaysEl.value=0; compute(); });
})();
