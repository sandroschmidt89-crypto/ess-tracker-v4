
const MK='v42_meals',WK='v42_weights';
const meals=()=>JSON.parse(localStorage.getItem(MK)||'[]');
const weights=()=>JSON.parse(localStorage.getItem(WK)||'[]');

function fill(){
let h=['<5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10'];
let s=[...h,'>10'];
h.forEach(v=>hunger.add(new Option(v,v)));
s.forEach(v=>satiety.add(new Option(v,v)));
for(let i=0;i<=10;i++){enjoyment.add(new Option(i,i));health.add(new Option(i,i));portion.add(new Option(i,i));}
hunger.value='7'; satiety.value='8'; portion.value='5';
}

function showTab(id){
document.querySelectorAll('.tab').forEach(x=>x.classList.add('hidden'));
document.getElementById(id).classList.remove('hidden');
}

function clearForm(){
food.value=''; hunger.value='7'; satiety.value='8';
mood.selectedIndex=0; craving.value='false';
enjoyment.value=''; health.value=''; portion.value='5';
}

function saveMeal(){
let m=meals();
m.unshift({
id:Date.now(),
food:food.value,
hunger:hunger.value,
satiety:satiety.value,
mood:mood.value,
craving:craving.value==='true',
enjoyment:enjoyment.value,
health:health.value,
portion:portion.value,
date:new Date().toLocaleString('de-DE')
});
localStorage.setItem(MK,JSON.stringify(m));
clearForm();
render();
}

function saveWeight(){
let w=weights();
let today=new Date().toLocaleDateString('de-DE');
w.unshift({date:today,weight:weightInput.value});
localStorage.setItem(WK,JSON.stringify(w));
weightInput.value='';
render();
}

function toggle(id){
const el=document.getElementById(id);
el.style.display=el.style.display==='none'?'block':'none';
}

function render(){
const m=meals(), w=weights();

let avgH='-';
let avgS='-';
if(m.length){
avgH=(m.reduce((a,b)=>a+(parseFloat(b.hunger)||0),0)/m.length).toFixed(1);
avgS=(m.reduce((a,b)=>a+(parseFloat(b.satiety)||0),0)/m.length).toFixed(1);
}

dashboard.innerHTML=`
<div class='stats'>
<div class='card'><b>Mahlzeiten</b><br>${m.length}</div>
<div class='card'><b>Ø Hunger</b><br>${avgH}</div>
<div class='card'><b>Ø Sättigung</b><br>${avgS}</div>
<div class='card'><b>Gewichtseinträge</b><br>${w.length}</div>
</div>`;

const groups={};
m.forEach(x=>{
let d=x.date.split(',')[0];
(groups[d]=groups[d]||[]).push(x);
});

mealGroups.innerHTML='';
Object.keys(groups).forEach((d,i)=>{
mealGroups.innerHTML+=`<div class='day' onclick="toggle('g${i}')">▶ ${d} (${groups[d].length})</div>
<div id='g${i}' style='display:none'>
${groups[d].map(v=>`<div class='meal'><b>${v.food}</b><br>${v.date}<br>🍽️ Hunger ${v.hunger} | Sättigung ${v.satiety}<br>${v.mood} ${v.craving?'🔥':''}</div>`).join('')}
</div>`;
});

weightList.innerHTML=w.map(x=>`<div class='card'>${x.date}: ${x.weight} kg</div>`).join('');

analysisContent.innerHTML=`
<div class='card'>Ø Hunger: ${avgH}</div>
<div class='card'>Ø Sättigung: ${avgS}</div>
<div class='card'>Heißhungerquote: ${m.length?Math.round(m.filter(x=>x.craving).length/m.length*100):0}%</div>`;
}

fill();
render();
