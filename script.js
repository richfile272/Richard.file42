/* FULL POLISHED INTERACTIVE JS (AUTO-INJECTED) */

/* --------- NAV UNDERLINE --------- */
(function(){
  const nav=document.querySelector('nav.main-nav');
  const links=[...document.querySelectorAll('#navList a')];
  const u=document.getElementById('navUnderline');
  function place(el){
    if(!el){u.style.opacity=0;return;}
    const r=el.getBoundingClientRect(), nr=nav.getBoundingClientRect();
    u.style.width=r.width+'px';
    u.style.transform='translateX('+(r.left-nr.left)+'px)';
    u.style.opacity=1;
  }
  let active=links[0];
  links.forEach(a=>{
    a.onmouseenter=()=>place(a);
    a.onmouseleave=()=>place(active);
    a.onclick=e=>{
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))
      .scrollIntoView({behavior:'smooth'});
      active=a; links.forEach(x=>x.classList.remove('active'));
      a.classList.add('active'); place(a);
    };
  });
  place(active);
})();

/* --------- HERO PARALLAX --------- */
window.addEventListener('scroll',()=>{
  const bg=document.getElementById('heroBg');
  if(bg){ bg.style.transform=
    `translateY(${window.scrollY*-0.06}px) scale(1.03)`; }
},{passive:true});

/* --------- VIDEO MODAL --------- */
document.getElementById('playBtn').onclick=()=>{
  const lb=document.getElementById('lightbox');
  document.getElementById('lightboxContent').innerHTML=
  `<iframe width="100%" height="480"
  src="https://www.youtube.com/embed/Scqj6k6gF2M?autoplay=1"
  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  lb.style.display='flex';
};
function closeLightbox(){
  document.getElementById('lightbox').style.display='none';
  document.getElementById('lightboxContent').innerHTML='';
}

/* --------- PACKAGES RENDER --------- */
const lessonData={
  beginner:{
    title:"Full Beginner Course",
    short:"Start from zero.",
    long:"Kite control, safety, bodydrag and first water starts with IKO instructors."
  },
  discovery:{
    title:"Discovery Course",
    short:"Quick intro session.",
    long:"Light taster to test kite handling on safe shallow water."
  }
};
(function renderPkgs(){
  const box=document.getElementById('packageButtons');
  ["beginner","discovery"].forEach(k=>{
    const d=lessonData[k];
    const el=document.createElement('div');
    el.className='pkg';
    el.innerHTML=
    `<div class="icon">${k==='beginner'?'<svg width="40"><rect width="40" height="40" fill="#e6f9fb"/></svg>':'<svg width="40"><circle cx="20" cy="20" r="20" fill="#fff3e6"/></svg>'}</div>
     <h3>${d.title}</h3><p>${d.short}</p>
     <div class="details"><p>${d.long}</p></div>`;
    box.appendChild(el);
  });
})();

/* --------- CALCULATOR --------- */
(function(){
  const$n=v=>Number(v)||0;
  const g=id=>document.getElementById(id);

  const nights=g('nights'), people=g('people'),
  meal=g('meal'), days=g('courseDays'),
  rent=g('rentalHours'), priv=g('privateTransport'),
  photo=g('photoshoot'), group=g('groupLesson');

  const out=g('totalDisplay'), bd=g('breakdown'),
  wa=g('waRequest'), em=g('emailRequest');

  function calc(){
    const N=$n(nights.value)||5,
          P=$n(people.value)||2,
          M=meal.value,
          D=$n(days.value)||0,
          R=$n(rent.value)||0;

    const base=35*N*P;
    const mealCost=(M==='bb'?5:(M==='all'?30:0))*N*P;
    const lessonRate=group.checked?80:55;
    const lessons=lessonRate*2*D*P;
    const transport=priv.checked?55:0;
    const rental=30*R*P;
    const photoC=photo.checked?55*P:0;
    const speed=15*N*P;
    const insurance=10*N*P;

    const total=base+mealCost+lessons+transport+rental+photoC+speed+insurance;

    bd.innerHTML=`<ul>
      <li>Accommodation: $35 × ${P} × ${N} = <b>$${base}</b></li>
      <li>Meals: <b>$${mealCost}</b></li>
      <li>Lessons: <b>$${lessons}</b></li>
      <li>Rental: <b>$${rental}</b></li>
      <li>Photoshoot: <b>$${photoC}</b></li>
      <li>Transport: <b>$${transport}</b></li>
      <li>Speedboat: <b>$${speed}</b></li>
      <li>Insurance: <b>$${insurance}</b></li>
    </ul>`;

    out.textContent=`$${total}`;

    wa.href=`https://wa.me/85589392068?text=Estimate:%20$${total}`;
    em.href=`mailto:owner@example.com?subject=Quote&body=Estimate:%20$${total}`;
  }

  ['input','change'].forEach(ev=>{
    nights.addEventListener(ev,calc);
    people.addEventListener(ev,calc);
    meal.addEventListener(ev,calc);
    days.addEventListener(ev,calc);
    rent.addEventListener(ev,calc);
    priv.addEventListener(ev,calc);
    photo.addEventListener(ev,calc);
    group.addEventListener(ev,calc);
  });
  document.getElementById('calcBtn').onclick=calc;
  document.getElementById('resetBtn').onclick=()=>{
    nights.value=5; people.value=2; meal.value='none';
    days.value=0; rent.value=0; priv.checked=false;
    photo.checked=false; group.checked=false; calc();
  };
  calc();
})();

/* --------- COLLAPSIBLE DETAILED PACKAGES --------- */
(function(){
  const btn=document.getElementById('togglePackagesBtn');
  const panel=document.getElementById('detailedPackages');
  if(!btn||!panel) return;

  btn.onclick=()=>{
    const open=panel.style.display==='block';
    panel.style.display=open?'none':'block';
    btn.textContent=open?'Show Detailed Packages':'Hide Detailed Packages';
  };
})();
