// breathizen.com: reveal-on-scroll (progressive enhancement), "Where to?" panel, ingredient tiles, habit planner, sticky order bar.
(function () {
  var root = document.documentElement;
  var els = [].slice.call(document.querySelectorAll(".bzn-rise,.bzn-perday2,.bzn-rater,.bzn-dial2,.bzn-chartx,.bzn-dose,.bzn-donutx"));
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function show(el) { el.classList.add("is-in"); }
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); }
  else {
    root.classList.add("bzn-live2");
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "200px 0px -5% 0px", threshold: 0 });
    els.forEach(function (el) { io.observe(el); });
    var sweep = function () {
      var vh = innerHeight;
      els.forEach(function (el) { if (!el.classList.contains("is-in") && el.getBoundingClientRect().top < vh * 0.92) show(el); });
    };
    addEventListener("scroll", sweep, { passive: true });
    addEventListener("load", function () { sweep(); [400, 1200, 2500].forEach(function (t) { setTimeout(sweep, t); }); });
    sweep();
    setTimeout(function () { els.forEach(show); }, 3500);
  }

  var btn = document.querySelector(".bzn-menubtn"), panel = document.getElementById("bzn-megamenu");
  if (btn && panel) {
    var set = function (on) {
      if (on) panel.setAttribute("data-open", ""); else panel.removeAttribute("data-open");
      btn.setAttribute("aria-expanded", on ? "true" : "false");
    };
    btn.addEventListener("click", function (e) { e.stopPropagation(); set(!panel.hasAttribute("data-open")); });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); e.stopPropagation(); });
    document.addEventListener("click", function () { set(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  var tiles = [].slice.call(document.querySelectorAll(".bzn-chip6"));
  if (tiles.length) {
    var stories = [].slice.call(document.querySelectorAll(".bzn-focus"));
    tiles.forEach(function (t) {
      t.addEventListener("click", function () {
        var id = t.getAttribute("data-s");
        tiles.forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
        stories.forEach(function (s) { s.hidden = s.id !== id; });
      });
    });
  }

  var moments = [].slice.call(document.querySelectorAll(".bzn-whenb")), label = document.getElementById("bzn-moment");
  moments.forEach(function (m) {
    m.addEventListener("click", function () {
      moments.forEach(function (x) { x.setAttribute("aria-pressed", x === m ? "true" : "false"); });
      if (label) label.textContent = m.textContent.toLowerCase();
    });
  });
  [].slice.call(document.querySelectorAll(".bzn-daysbtn")).forEach(function (d) {
    d.addEventListener("click", function () { d.setAttribute("aria-pressed", d.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
  });

  var bar = document.querySelector(".bzn-sticky2"), foot = document.querySelector(".bzn-base2");
  if (bar) {
    var upd = function () {
      if (scrollY > 620) bar.setAttribute("data-up", ""); else bar.removeAttribute("data-up");
      var hide = false;
      if (foot) hide = foot.getBoundingClientRect().top < innerHeight - 40;
      if (hide) bar.setAttribute("data-hide", ""); else bar.removeAttribute("data-hide");
    };
    addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); upd();
  }
})();

/* hero air-flow canvas: two lung lobes made of connected nodes, a trachea, flowing air particles and a slow breathing pulse */
(function(){var c=document.getElementById('bzn-flow');if(!c||!c.getContext)return;var x=c.getContext('2d'),W=c.width,H=c.height,reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,t=0,run=true,i,k;
var cx=W/2,lobes=[],sx=[-1,1];
for(k=0;k<2;k++){var pts=[];for(i=0;i<12;i++){var a=i/12*Math.PI*2;pts.push([cx+sx[k]*(58+ (k?0:0))+Math.cos(a)*(40+8*Math.sin(a*2)),H*0.58+Math.sin(a)*(66)])}lobes.push(pts)}
var tr=[[cx,H*0.06],[cx,H*0.3],[cx-4,H*0.38]];
var parts=[];for(i=0;i<54;i++){parts.push({p:Math.random(),s:0.0025+Math.random()*0.004,o:(Math.random()-.5)*70,k:i%2})}
function path(pr,o,k){var tx=cx+sx[k]*58,ty=H*0.58;var u=pr<0.5?pr/0.5:1;var sxp=pr<0.5?-10+ (pr/0.5)*(cx+10):cx;var X,Y;if(pr<0.5){X=-10+u*(cx+10);Y=H*0.3+Math.sin(pr*9)*H*0.08+o*0.35+ (H*0.2-H*0.3)*0}else{var v=(pr-0.5)/0.5;X=cx+(tx-cx)*v+Math.sin(v*6+k)*5;Y=H*0.3+(ty-H*0.3)*v+o*0.1*(1-v)}return [X,Y]}
function frame(){t+=0.016;x.clearRect(0,0,W,H);var pulse=1+0.04*Math.sin(t*1.5);
x.lineWidth=1.2;
for(k=0;k<2;k++){var L=lobes[k];x.strokeStyle='rgba(47,111,208,.35)';x.beginPath();for(i=0;i<=L.length;i++){var q=L[i%L.length];var X=cx+(q[0]-cx)*pulse,Y=H*0.58+(q[1]-H*0.58)*pulse;if(i)x.lineTo(X,Y);else x.moveTo(X,Y)}x.stroke();
x.strokeStyle='rgba(47,111,208,.14)';for(i=0;i<L.length;i++){for(var j=i+3;j<L.length;j+=4){x.beginPath();x.moveTo(cx+(L[i][0]-cx)*pulse,H*0.58+(L[i][1]-H*0.58)*pulse);x.lineTo(cx+(L[j][0]-cx)*pulse,H*0.58+(L[j][1]-H*0.58)*pulse);x.stroke()}}
for(i=0;i<L.length;i++){var X=cx+(L[i][0]-cx)*pulse,Y=H*0.58+(L[i][1]-H*0.58)*pulse;x.beginPath();x.arc(X,Y,3.2*(1+0.25*Math.sin(t*2+i)),0,6.283);x.fillStyle=i%2?'rgba(47,111,208,.9)':'rgba(90,168,60,.9)';x.fill()}}
x.strokeStyle='rgba(90,168,60,.7)';x.lineWidth=3;x.beginPath();x.moveTo(tr[0][0],tr[0][1]);x.lineTo(tr[1][0],tr[1][1]);x.stroke();
x.lineWidth=2;for(k=0;k<2;k++){x.beginPath();x.moveTo(cx,H*0.3);x.quadraticCurveTo(cx+sx[k]*30,H*0.34,cx+sx[k]*58,H*0.58);x.stroke()}
for(i=0;i<parts.length;i++){var q=parts[i];q.p+=reduce?0:q.s;if(q.p>1)q.p=0;var pt=path(q.p,q.o,q.k),al=Math.sin(q.p*3.1416);x.beginPath();x.arc(pt[0],pt[1],2.4,0,6.283);x.fillStyle='rgba(47,111,208,'+(0.2+0.6*al)+')';x.fill()}
if(run&&!reduce)requestAnimationFrame(frame)}
frame();
if('IntersectionObserver' in window){new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!run&&!reduce){run=true;frame()}else if(!v){run=false}},{threshold:0}).observe(c)}
})();
