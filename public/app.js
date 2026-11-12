
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
const signTabs=[...document.querySelectorAll('.sign-tab')];
function showSign(tab,focus){signTabs.forEach(t=>{const on=t===tab;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!on;});if(focus)tab.focus();}
signTabs.forEach((tab,i)=>{tab.addEventListener('click',()=>showSign(tab));tab.addEventListener('keydown',e=>{const k={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];let next=null;if(k)next=signTabs[(i+k+signTabs.length)%signTabs.length];else if(e.key==='Home')next=signTabs[0];else if(e.key==='End')next=signTabs[signTabs.length-1];if(next){e.preventDefault();showSign(next,true);}});});
$('#intake-form').addEventListener('submit',e=>{e.preventDefault();$('#intake-form').hidden=true;$('#success').hidden=false;});$('#reset-form').addEventListener('click',()=>{$('#success').hidden=true;$('#intake-form').hidden=false;$('#name').focus();});
const c=$('#scene'),ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;
let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,moving=!reduced,visible=true,lampOn=true,frame=0,clock=0;

const mobileScene=matchMedia('(max-width: 767px)');
const cactusFrames=['tucson-cactus','tucson-cactus-tubes-dim','tucson-cactus-bulbs-dim'].map(name=>{const image=new Image();image.src='/assets/'+name+'.png';image.onload=()=>drawPersistentCactus();return image;});
let cactusState=0;
const storefront=new Image();storefront.src="/assets/pueblo-storefront.gif";storefront.onload=()=>scene();
const sprite=new Image();sprite.src="/assets/replicant-states.gif"; sprite.onload=()=>{buildFigures();layout();};
const streetlight=new Image();streetlight.src="/assets/streetlight.png";streetlight.onload=()=>{buildLampOff();layout();};
const gameShot=$('#veyrakk-shot'),gameGif=gameShot.src,gameStill="/assets/veyrakk-still.gif";let gameplayPaused=reduced;
if(reduced){gameShot.src=gameStill;$('#gameplay-toggle').textContent='Play gameplay';$('#gameplay-toggle').setAttribute('aria-pressed','true');}
$('#gameplay-toggle').addEventListener('click',()=>{gameplayPaused=!gameplayPaused;gameShot.src=gameplayPaused?gameStill:gameGif;$('#gameplay-toggle').textContent=gameplayPaused?'Play gameplay':'Pause gameplay';$('#gameplay-toggle').setAttribute('aria-pressed',String(gameplayPaused));});

$('#motion-toggle').textContent='RAIN: '+(moving?'ON':'OFF');$('#motion-toggle').setAttribute('aria-pressed',String(moving));$('#motion-toggle').addEventListener('click',()=>{moving=!moving;$('#motion-toggle').textContent='RAIN: '+(moving?'ON':'OFF');$('#motion-toggle').setAttribute('aria-pressed',String(moving));draw();});
const rect=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
const poly=(points,color)=>{ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();};
let seed=79;function rand(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646;}
const rain=Array.from({length:100},()=>({x:rand()*384,y:rand()*216,s:1+rand()*2}));
function cactus(x,y,s,color){rect(x,y-15*s,2*s,15*s,color);rect(x-4*s,y-11*s,2*s,6*s,color);rect(x-4*s,y-7*s,6*s,2*s,color);rect(x+4*s,y-16*s,2*s,8*s,color);rect(x,y-10*s,6*s,2*s,color);}
const STREETLIGHT={x:185,desktopY:72,mobileY:136,sourceWidth:99,sourceHeight:256,drawHeight:96,bulbX:67.47,bulbY:42.07,beamOffsetX:2.5};
function streetlightLayout(mobile){
const scale=STREETLIGHT.drawHeight/STREETLIGHT.sourceHeight;
return{x:STREETLIGHT.x,y:mobile?STREETLIGHT.mobileY:STREETLIGHT.desktopY,w:STREETLIGHT.sourceWidth*scale,h:STREETLIGHT.drawHeight,bulbX:STREETLIGHT.x+STREETLIGHT.bulbX*scale,bulbY:(mobile?STREETLIGHT.mobileY:STREETLIGHT.desktopY)+STREETLIGHT.bulbY*scale};
}
function drawStreetLightBeam(mobile){
const light=streetlightLayout(mobile),bulbX=light.bulbX+STREETLIGHT.beamOffsetX,bulbY=light.bulbY,groundY=mobile?226:164;
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
function drawStreetLight(mobile){
if(!streetlight.complete||!streetlight.naturalWidth)return;
const light=streetlightLayout(mobile);
ctx.imageSmoothingEnabled=false;
ctx.drawImage(!lampOn&&lampOff?lampOff:streetlight,light.x,light.y,light.w,light.h);
}
const offscreen=(w,h)=>{const k=document.createElement('canvas');k.width=w;k.height=h;return k;};
// The lamp's unlit state: the warm bulb and the lit underside of the shade go dark.
let lampOff=null;
function buildLampOff(){
try{const w=streetlight.naturalWidth,h=streetlight.naturalHeight,k=offscreen(w,h),x2=k.getContext('2d');x2.drawImage(streetlight,0,0);
const img=x2.getImageData(48,40,44,19),d=img.data;
for(let i=0;i<d.length;i+=4){if(d[i+3]&&d[i]>120&&d[i+1]>60&&(d[i]>d[i+2]+30||d[i]+d[i+1]+d[i+2]>600)){d[i]=d[i]*.3+10;d[i+1]=d[i+1]*.26+9;d[i+2]=d[i+2]*.3+12;}}
x2.putImageData(img,48,40);lampOff=k;}catch(e){lampOff=null;}
}
// The man under the lamp. Lit, he looks human. In the dark he dims and only the replicant's eyes stay bright.
// The replicant pose sits 5px further right in the sprite sheet than the human pose; darkOffset lines the two up so he doesn't jump when the lamp flickers.
const FIGURE={w:59,h:108,desktopY:100,mobileY:170,darkOffset:5,eyes:[[84,59,9,7],[108,59,9,7]]};
let figureLit=null,figureDark=null;
function buildFigures(){
const half=sprite.naturalWidth/2,h=sprite.naturalHeight;
figureLit=offscreen(half,h);figureLit.getContext('2d').drawImage(sprite,half,0,half,h,0,0,half,h);
const off=FIGURE.darkOffset,k=offscreen(half,h),x2=k.getContext('2d');x2.drawImage(sprite,off,0,half-off,h,0,0,half-off,h);
try{const img=x2.getImageData(0,0,half,h),d=img.data,glow=[];
const isEye=(x,y)=>FIGURE.eyes.some(([ex,ey,ew,eh])=>x+off>=ex&&x+off<ex+ew&&y>=ey&&y<ey+eh);
for(let y=0;y<h;y++)for(let x=0;x<half;x++){const i=(y*half+x)*4;if(!d[i+3])continue;
if(isEye(x,y)&&d[i]>200&&d[i+1]>120){d[i]=255;d[i+1]=205;d[i+2]=110;glow.push([x,y]);continue;}
d[i]=d[i]*.36+6;d[i+1]=d[i+1]*.36+8;d[i+2]=d[i+2]*.42+16;}
x2.putImageData(img,0,0);
// A small amber halo on the face around each eye, kept to the sprite's own pixels.
x2.globalCompositeOperation='source-atop';x2.fillStyle='rgba(255,150,50,.045)';
glow.forEach(([x,y])=>x2.fillRect(x-3,y-2,7,5));
x2.globalCompositeOperation='source-over';
}catch(e){x2.globalCompositeOperation='source-atop';x2.fillStyle='rgba(8,10,20,.6)';x2.fillRect(0,0,half,h);}
figureDark=k;
}
function figureBox(mobile){const light=streetlightLayout(mobile);return{x:Math.round(light.bulbX-FIGURE.w/2+2),y:mobile?FIGURE.mobileY:FIGURE.desktopY};}
function drawFigure(mobile){const art=lampOn?figureLit:figureDark;if(!art)return;const b=figureBox(mobile);ctx.imageSmoothingEnabled=false;ctx.drawImage(art,b.x,b.y,FIGURE.w,FIGURE.h);}
// On desktop, slide the scene right only as far as needed to keep the man clear of the hero copy.
function layoutScene(){
c.style.transform='';
if(mobileScene.matches)return;
const box=c.getBoundingClientRect(),unit=box.width/384;
let textRight=0;
document.querySelectorAll('.hero-copy > *').forEach(el=>{const range=document.createRange();range.selectNodeContents(el);textRight=Math.max(textRight,range.getBoundingClientRect().right);});
const figureLeft=box.left+(figureBox(false).x+3)*unit,shift=Math.ceil(textRight+20-figureLeft);
if(shift>0)c.style.transform='translateX('+shift+'px)';
}
function scene(){
ctx.setTransform(2,0,0,2,0,0);
const mobile=mobileScene.matches;
rect(0,0,384,mobile?250:216,'#090d18');
// Ordered, square-pixel haze rather than smoothed artwork.
for(let y=8;y<121;y++){let band=y<38?'#151b2a':y<58?'#262331':y<78?'#453033':y<96?'#694037':'#8d4b35';for(let x=0;x<384;x+=2){if((x+y)%4===0||y>65)rect(x,y,2,1,band);}}
poly([[0,108],[23,100],[32,102],[43,90],[52,94],[64,80],[73,83],[85,71],[94,78],[106,65],[116,70],[124,62],[135,76],[150,66],[160,74],[172,73],[185,88],[205,82],[226,96],[246,90],[274,102],[305,91],[333,102],[361,94],[384,107],[384,146],[0,146]],'#1d2230');
poly([[0,118],[44,111],[61,117],[84,105],[102,112],[129,103],[153,116],[183,110],[210,122],[240,112],[279,124],[309,114],[349,121],[384,112],[384,159],[0,159]],'#151c28');
rect(11,115,62,45,'#1e242b');rect(13,111,58,5,'#393339');rect(19,126,12,17,'#0c131e');rect(46,127,15,12,'#53402d');rect(48,129,11,8,'#a36939');rect(53,129,1,8,'#3c3031');
rect(92,119,36,41,'#222b33');rect(89,115,42,5,'#404047');rect(99,130,20,10,'#101826');rect(101,132,16,2,'#2d6168');
cactus(82,157,1.3,'#0c1720');cactus(168,157,1.4,'#0c1720');cactus(370,160,1.8,'#0a121b');
// Pueblo Revival repair shop with a deep doorway, vigas and worn adobe stucco.
if(storefront.complete&&storefront.naturalWidth){ctx.imageSmoothingEnabled=false;ctx.drawImage(storefront,211,mobile?115:51,158,115);}
// Wet pavement, scattered neon reflections and curb stones.
// On phones the street sits lower (under the shop), so the pavement, curb and reflections move down with it.
ctx.save();if(mobile)ctx.translate(0,64);
rect(0,160,384,56,'#101825');rect(0,160,384,3,'#38434c');rect(209,163,150,3,'#59606a');rect(213,166,143,2,'#1a2734');
seed=615;for(let i=0;i<145;i++){let x=rand()*384,y=166+rand()*50,w=1+Math.floor(rand()*13);let col=x>245&&x<320?'#614335':x>322&&x<359?'#244d5b':'#263040';if(i%3===0)col='#152032';rect(x,y,w,1,col);}
for(let i=0;i<10;i++){rect(265-i,169+i*3,35+i*2,1,i%2?'#8b5a3c':'#3b3432');rect(333-i*.4,173+i*3,14+i,1,i%2?'#2f7177':'#24444f');}rect(189,172,12,1,'#b17c44');rect(182,181,25,1,'#825d3a');rect(177,193,32,1,'#4e4234');
ctx.restore();
// The man stands in front of the lamp post; the translucent beam falls over him only while the lamp is lit.
drawStreetLight(mobile);
drawFigure(mobile);
if(lampOn)drawStreetLightBeam(mobile);
// Pixel rain: low contrast and no flashes.
rain.forEach((r,i)=>{let y=(r.y+(moving?clock*r.s/120:0))%(mobile?250:216);rect(r.x,y,1,i%3===0?4:2,i%4===0?'#63778466':'#41566755');});
}
function draw(){scene();}
function tick(t){frame=requestAnimationFrame(tick);if(document.hidden||!visible)return;if(t-clock<95)return;clock=t;scene();}
const heroObserver=new IntersectionObserver(entries=>{let e=entries[0];visible=e.isIntersecting;$('#mobile-cta').classList.toggle('visible',!e.isIntersecting&&e.boundingClientRect.top<0);},{threshold:[0,.4,.6,1]});heroObserver.observe($('.hero'));
new IntersectionObserver(entries=>{if(entries[0].isIntersecting)$('#mobile-cta').classList.remove('visible');else if($('.hero').getBoundingClientRect().bottom<0)$('#mobile-cta').classList.add('visible');},{threshold:0}).observe($('#slop-check'));

// The Tucson sign stays fixed on the left side of the page from top to bottom.
const neonSign=$('#tucson-neon'),neonCanvas=$('#neon-sign'),neonContext=neonCanvas.getContext('2d');
neonContext.imageSmoothingEnabled=false;
function drawPersistentCactus(){const image=cactusFrames[cactusState];if(!image.complete||!image.naturalWidth)return;neonContext.clearRect(0,0,78,236);neonContext.drawImage(image,0,0,78,236);}
function layout(){c.height=mobileScene.matches?500:432;ctx.imageSmoothingEnabled=false;layoutScene();scene();}
window.addEventListener('resize',layout);layout();if(document.fonts)document.fonts.ready.then(layout);
let neonTimer,neonFlashTimer;
function setCactusState(state){cactusState=state;drawPersistentCactus();}
function scheduleNeon(){clearTimeout(neonTimer);if(reduced||document.hidden)return;neonTimer=setTimeout(()=>{setCactusState(Math.random()<.7?1:2);neonFlashTimer=setTimeout(()=>{setCactusState(0);scheduleNeon();},70+Math.random()*70);},4500+Math.random()*11000);}
// The streetlight: steady for a few seconds, then a burst of flickers. Sometimes it catches; sometimes it stays dark for a while.
let lampTimer;
function setLamp(on){lampOn=on;scene();}
function flicker(times,endOn,then){let i=0;(function step(){if(i<times){setLamp(i%2===1);i++;lampTimer=setTimeout(step,45+Math.random()*120);}else{setLamp(endOn);then();}})();}
function scheduleLamp(){
clearTimeout(lampTimer);
if(reduced||document.hidden){setLamp(true);return;}
lampTimer=setTimeout(()=>{
if(Math.random()<.45)flicker(3+Math.floor(Math.random()*3),false,()=>{lampTimer=setTimeout(()=>flicker(3+Math.floor(Math.random()*3),true,scheduleLamp),1800+Math.random()*2700);});
else flicker(2+Math.floor(Math.random()*2)*2,true,scheduleLamp);
},3500+Math.random()*4500);
}
document.addEventListener('visibilitychange',()=>{clearTimeout(neonFlashTimer);setCactusState(0);scheduleNeon();scheduleLamp();});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{reduced=e.matches;moving=!reduced;$('#motion-toggle').textContent='RAIN: '+(moving?'ON':'OFF');$('#motion-toggle').setAttribute('aria-pressed',String(moving));clearTimeout(neonFlashTimer);setCactusState(0);scheduleNeon();scheduleLamp();if(!frame&&!reduced)frame=requestAnimationFrame(tick);});
scheduleNeon();scheduleLamp();

scene();if(!reduced)frame=requestAnimationFrame(tick);
})();



