
(() => {
'use strict';
const $=s=>document.querySelector(s);
$('#menu').addEventListener('click',()=>{const isOpen=$('#nav-links').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(isOpen));$('#menu').textContent=isOpen?'CLOSE −':'MENU +';});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{$('#nav-links').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');$('#menu').textContent='MENU +';}));
$('#scanlines-toggle').addEventListener('click',()=>{const on=document.body.classList.toggle('scanlines');$('#scanlines-toggle').textContent='SCANLINES: '+(on?'ON':'OFF');$('#scanlines-toggle').setAttribute('aria-pressed',String(on));});
const rounds=[{q:'“Nestled in the heart of the Sonoran Desert, our family-owned café invites you to embark on a culinary journey.”',a:'robot',why:'It could describe almost any café. It tells you nothing about this one.',fix:'“We’ve made tortillas by hand since 1998. Come early: the green corn tamales sell out by noon.”'},{q:'“Thanks, Dana. Glad the AC was blowing cold again before your in-laws landed. Tell Marcus we said hi.”',a:'real',why:'Names. A real situation. A little warmth. This sounds like someone who remembers the customer.',fix:'Specific details do more work than “Thank you for your valuable feedback.”'},{q:'“In today’s fast-paced world, maintaining your HVAC system is a game-changer for comfort and efficiency.”',a:'robot',why:'A lot of words to tell a Tucson homeowner that air conditioning matters.',fix:'“If your AC runs all day in July and the house still sits at 84, it’s time to get it checked.”'}];
let round=0,score=0;
function renderRound(){ $('#round-label').textContent='ROUND 0'+(round+1)+' / 03';$('#game-quote').textContent=rounds[round].q;$('#game-reveal').hidden=true;$('#game-buttons').hidden=false;document.querySelectorAll('[data-answer]').forEach(b=>b.disabled=false); }
document.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>{let r=rounds[round],correct=b.dataset.answer===r.a;if(correct)score++;document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);let out=$('#game-reveal');out.hidden=false;out.replaceChildren();let strong=document.createElement('strong');strong.textContent=correct?'Spotted it.':'Worth another look.';let p=document.createElement('p');p.textContent=r.why;let fix=document.createElement('p');fix.textContent=r.fix;let next=document.createElement('button');next.className='btn small secondary';next.textContent=round<2?'Next example →':'See the result →';next.addEventListener('click',()=>{round++;if(round<3){renderRound();}else{$('#round-label').textContent='DIAGNOSTIC COMPLETE';$('#game-quote').textContent=score+' of 3. You already know what sounds off.';$('#game-buttons').hidden=true;out.replaceChildren();let p=document.createElement('p');p.textContent='The useful question isn’t who wrote it. It’s whether this sounds like a business you’d trust.';let a=document.createElement('a');a.className='btn small';a.href='#slop-check';a.textContent='Check my business ↗';let replay=document.createElement('button');replay.className='btn small secondary';replay.style.marginLeft='12px';replay.textContent='Play again';replay.addEventListener('click',()=>{round=0;score=0;renderRound();});out.append(p,a,replay);}});out.append(strong,p,fix,next);}));
$('#intake-form').addEventListener('submit',e=>{e.preventDefault();$('#intake-form').hidden=true;$('#success').hidden=false;});$('#reset-form').addEventListener('click',()=>{$('#success').hidden=true;$('#intake-form').hidden=false;$('#name').focus();});
const c=$('#scene'),ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;
let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,moving=!reduced,visible=true,human=0,target=0,frame=0,clock=0;

const mobileScene=matchMedia('(max-width: 767px)');
const cactusFrames=['tucson-cactus','tucson-cactus-tubes-dim','tucson-cactus-bulbs-dim'].map(name=>{const image=new Image();image.src='/assets/'+name+'.png';image.onload=()=>{scene();drawPersistentCactus();};return image;});
let cactusState=0;
const storefront=new Image();storefront.src="/assets/pueblo-storefront.gif";storefront.onload=()=>scene();
const sprite=new Image();sprite.src="/assets/replicant-states.gif"; sprite.onload=()=>scene();
const gameShot=$('#veyrakk-shot'),gameGif=gameShot.src,gameStill="/assets/veyrakk-still.gif";let gameplayPaused=reduced;
if(reduced){gameShot.src=gameStill;$('#gameplay-toggle').textContent='Play gameplay';$('#gameplay-toggle').setAttribute('aria-pressed','true');}
$('#gameplay-toggle').addEventListener('click',()=>{gameplayPaused=!gameplayPaused;gameShot.src=gameplayPaused?gameStill:gameGif;$('#gameplay-toggle').textContent=gameplayPaused?'Play gameplay':'Pause gameplay';$('#gameplay-toggle').setAttribute('aria-pressed',String(gameplayPaused));});

$('#motion-toggle').textContent='RAIN: '+(moving?'ON':'OFF');$('#motion-toggle').setAttribute('aria-pressed',String(moving));$('#motion-toggle').addEventListener('click',()=>{moving=!moving;$('#motion-toggle').textContent='RAIN: '+(moving?'ON':'OFF');$('#motion-toggle').setAttribute('aria-pressed',String(moving));draw();});
const rect=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
const poly=(points,color)=>{ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();};
let seed=79;function rand(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646;}
const rain=Array.from({length:100},()=>({x:rand()*384,y:rand()*216,s:1+rand()*2}));
function cactus(x,y,s,color){rect(x,y-15*s,2*s,15*s,color);rect(x-4*s,y-11*s,2*s,6*s,color);rect(x-4*s,y-7*s,6*s,2*s,color);rect(x+4*s,y-16*s,2*s,8*s,color);rect(x,y-10*s,6*s,2*s,color);}
function drawStreetLightBeam(mobile){
const yOffset=mobile?134:0,bulbX=198,bulbY=88+yOffset,groundY=mobile?296:164;
// Transparent, hard-edged bands preserve the pixel-art look while the scene remains visible beneath them.
poly([[bulbX-4,bulbY],[bulbX-34,groundY],[bulbX+70,groundY]],'rgba(255,184,92,.035)');
poly([[bulbX-3,bulbY],[bulbX-23,groundY],[bulbX+53,groundY]],'rgba(255,196,112,.045)');
poly([[bulbX-2,bulbY],[bulbX-11,groundY],[bulbX+36,groundY]],'rgba(255,219,149,.055)');
// Sparse square highlights mimic a late-SNES transparency pass.
for(let y=bulbY+9;y<groundY;y+=7){
const spread=(y-bulbY)/(groundY-bulbY);
for(let x=Math.ceil(bulbX-spread*28);x<=bulbX+spread*58;x+=6){
if((x+y)%3===0)rect(x,y,2,1,'rgba(255,210,132,.055)');
}
}
}
function drawStreetLightFixture(mobile){
const o=mobile?134:0;
// Cast-iron pole with a wet highlight, stepped base plates and mounting bolts.
rect(183,88+o,6,76,'#111923');
rect(184,88+o,4,76,'#293746');
rect(185,88+o,1,76,'#65717a');
rect(188,91+o,1,70,'#0b1119');
rect(180,160+o,12,4,'#121a24');
rect(178,164+o,16,3,'#26313c');
rect(181,158+o,10,2,'#49535b');
rect(180,165+o,2,1,'#778087');
rect(190,165+o,2,1,'#090e15');
// Stepped gooseneck and rear counterweight.
rect(184,82+o,5,8,'#293743');
rect(185,79+o,5,5,'#43515a');
rect(188,77+o,5,4,'#56616a');
rect(191,76+o,7,3,'#657078');
rect(180,80+o,5,3,'#202b36');
rect(179,81+o,3,2,'#6a7072');
// Beveled hood, warm glass and a two-pixel filament.
rect(195,78+o,12,2,'#222b34');
rect(193,80+o,16,3,'#46515a');
rect(195,83+o,13,3,'#171e25');
rect(197,86+o,10,3,'#a96737');
rect(198,87+o,8,2,'#e2a058');
rect(200,88+o,4,2,'#ffe2a0');
rect(201,88+o,2,1,'#fff4cc');
rect(207,82+o,2,5,'#0b1017');
rect(194,83+o,2,3,'#758087');
}
// Desktop sign placement in scene units (the canvas is 384 units wide). The sign starts just right of the
// hero copy and shrinks if needed so it never sits under the text or runs into the shop (which starts at 211).
// On narrow desktop/tablet widths where even a small sign won't fit beside the text, it is left out of the hero.
let heroSign={x:140,y:43,w:49.92};
function layoutHeroSign(){
if(mobileScene.matches){heroSign={x:219,y:13,w:62.4};return;}
const box=c.getBoundingClientRect(),unit=box.width/384;
let textRight=0;
document.querySelectorAll('.hero-copy > *').forEach(el=>{const range=document.createRange();range.selectNodeContents(el);textRight=Math.max(textRight,range.getBoundingClientRect().right);});
const shopEdge=209,fullWidth=49.92,minWidth=30;
let x=Math.max(140,(textRight-box.left)/unit+3),w=fullWidth;
if(x+w>shopEdge)w=shopEdge-x;
heroSign=w>=minWidth?{x,y:194-w*236/78,w}:null;
}
function drawHeroSign(){if(!heroSign)return;const neon=cactusFrames[cactusState];if(neon.complete&&neon.naturalWidth)ctx.drawImage(neon,heroSign.x,heroSign.y,heroSign.w,heroSign.w*236/78);}
function scene(){
ctx.setTransform(2,0,0,2,0,0);
const mobile=mobileScene.matches;
rect(0,0,384,mobile?320:216,'#090d18');
// Ordered, square-pixel haze rather than smoothed artwork.
for(let y=8;y<121;y++){let band=y<38?'#151b2a':y<58?'#262331':y<78?'#453033':y<96?'#694037':'#8d4b35';for(let x=0;x<384;x+=2){if((x+y)%4===0||y>65)rect(x,y,2,1,band);}}
poly([[0,108],[23,100],[32,102],[43,90],[52,94],[64,80],[73,83],[85,71],[94,78],[106,65],[116,70],[124,62],[135,76],[150,66],[160,74],[172,73],[185,88],[205,82],[226,96],[246,90],[274,102],[305,91],[333,102],[361,94],[384,107],[384,146],[0,146]],'#1d2230');
poly([[0,118],[44,111],[61,117],[84,105],[102,112],[129,103],[153,116],[183,110],[210,122],[240,112],[279,124],[309,114],[349,121],[384,112],[384,159],[0,159]],'#151c28');
rect(11,115,62,45,'#1e242b');rect(13,111,58,5,'#393339');rect(19,126,12,17,'#0c131e');rect(46,127,15,12,'#53402d');rect(48,129,11,8,'#a36939');rect(53,129,1,8,'#3c3031');
rect(92,119,36,41,'#222b33');rect(89,115,42,5,'#404047');rect(99,130,20,10,'#101826');rect(101,132,16,2,'#2d6168');
cactus(82,157,1.3,'#0c1720');cactus(168,157,1.4,'#0c1720');cactus(370,160,1.8,'#0a121b');
// The same fixed pixel artwork is used for every light state. On phones the sign stands behind the shop.
if(mobile)drawHeroSign();
// Pueblo Revival repair shop with a deep doorway, vigas and worn adobe stucco.
if(storefront.complete&&storefront.naturalWidth){ctx.imageSmoothingEnabled=false;ctx.drawImage(storefront,211,mobile?185:51,158,115);}
// Wet pavement, scattered neon reflections and curb stones.
rect(0,mobile?294:160,384,mobile?26:56,'#101825');rect(0,160,384,3,'#38434c');rect(209,163,150,3,'#59606a');rect(213,166,143,2,'#1a2734');
seed=615;for(let i=0;i<145;i++){let x=rand()*384,y=166+rand()*50,w=1+Math.floor(rand()*13);let col=x>245&&x<320?'#614335':x>322&&x<359?'#244d5b':'#263040';if(i%3===0)col='#152032';rect(x,y,w,1,col);}
for(let i=0;i<10;i++){rect(265-i,169+i*3,35+i*2,1,i%2?'#8b5a3c':'#3b3432');rect(333-i*.4,173+i*3,14+i,1,i%2?'#2f7177':'#24444f');}rect(189,172,12,1,'#b17c44');rect(182,181,25,1,'#825d3a');rect(177,193,32,1,'#4e4234');
// A detailed, two-state character portrait in the shop doorway.
if(sprite.complete&&sprite.naturalWidth){
ctx.imageSmoothingEnabled=false;let half=sprite.naturalWidth/2;
ctx.globalAlpha=1-human;ctx.drawImage(sprite,0,0,half,sprite.naturalHeight,247,mobile?240:100,59,108);
if(human>0){ctx.globalAlpha=human;ctx.drawImage(sprite,half,0,half,sprite.naturalHeight,247,mobile?240:100,59,108);}ctx.globalAlpha=1;
}
// The translucent light pass sits above the shop and character. The solid fixture remains crisp on top.
drawStreetLightBeam(mobile);
drawStreetLightFixture(mobile);
// On desktop the cactus remains in front of the streetlight, clear of the hero copy.
if(!mobile)drawHeroSign();
// Pixel rain: low contrast and no flashes.
rain.forEach((r,i)=>{let y=(r.y+(moving?clock*r.s/120:0))%216;rect(r.x,y,1,i%3===0?4:2,i%4===0?'#63778466':'#41566755');});
}
function draw(){scene();}
function tick(t){frame=requestAnimationFrame(tick);if(document.hidden||!visible)return;if(t-clock<95)return;clock=t; if(human!==target)human=Math.min(target,human+.15);scene();}
function declank(){target=1;human=reduced?1:human;$('#replicant-status').textContent='STATUS: DECLANKED. HUMAN AGAIN.';$('#declank').textContent='[ HUMAN AT THE CONTROLS ]';$('#declank').disabled=true;c.setAttribute('aria-label','The same rainy Tucson repair shop. The figure is now human, smiling in warm light.');scene();}
$('#declank').addEventListener('click',declank);
const heroObserver=new IntersectionObserver(entries=>{let e=entries[0];visible=e.isIntersecting;if(e.boundingClientRect.top<0&&e.intersectionRatio<.6)declank();$('#mobile-cta').classList.toggle('visible',!e.isIntersecting&&e.boundingClientRect.top<0);},{threshold:[0,.4,.6,1]});heroObserver.observe($('.hero'));
new IntersectionObserver(entries=>{if(entries[0].isIntersecting)$('#mobile-cta').classList.remove('visible');else if($('.hero').getBoundingClientRect().bottom<0)$('#mobile-cta').classList.add('visible');},{threshold:0}).observe($('#slop-check'));

// A stationary scenic sign remains in the page background as the hero scrolls away.
const neonSign=$('#tucson-neon'),neonCanvas=$('#neon-sign'),neonContext=neonCanvas.getContext('2d');
neonContext.imageSmoothingEnabled=false;
function drawPersistentCactus(){const image=cactusFrames[cactusState];if(!image.complete||!image.naturalWidth)return;neonContext.clearRect(0,0,78,236);neonContext.drawImage(image,0,0,78,236);}
function positionNeon(){const mobile=mobileScene.matches;c.height=mobile?640:432;ctx.imageSmoothingEnabled=false;layoutHeroSign();const hero=$('.hero').getBoundingClientRect();neonSign.classList.toggle('is-visible',hero.bottom<100);scene();}
window.addEventListener('scroll',()=>{neonSign.classList.toggle('is-visible',$('.hero').getBoundingClientRect().bottom<100);},{passive:true});
window.addEventListener('resize',positionNeon);positionNeon();if(document.fonts)document.fonts.ready.then(positionNeon);
let neonTimer,neonFlashTimer;
function setCactusState(state){cactusState=state;drawPersistentCactus();scene();}
function scheduleNeon(){clearTimeout(neonTimer);if(reduced||document.hidden)return;neonTimer=setTimeout(()=>{setCactusState(Math.random()<.7?1:2);neonFlashTimer=setTimeout(()=>{setCactusState(0);scheduleNeon();},70+Math.random()*70);},4500+Math.random()*11000);}
document.addEventListener('visibilitychange',()=>{clearTimeout(neonFlashTimer);setCactusState(0);scheduleNeon();});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{reduced=e.matches;moving=!reduced;$('#motion-toggle').textContent='RAIN: '+(moving?'ON':'OFF');$('#motion-toggle').setAttribute('aria-pressed',String(moving));clearTimeout(neonFlashTimer);setCactusState(0);scheduleNeon();if(!frame&&!reduced)frame=requestAnimationFrame(tick);});
scheduleNeon();

scene();if(!reduced)frame=requestAnimationFrame(tick);
})();


