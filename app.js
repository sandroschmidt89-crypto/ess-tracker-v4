
const MK='v4pro_meals',WK='v4pro_weights';
const meals=()=>JSON.parse(localStorage.getItem(MK)||'[]');
const weights=()=>JSON.parse(localStorage.getItem(WK)||'[]');

function showTab(id){
 document.querySelectorAll('.tab').forEach(x=>x.classList.add('hidden'));
 document.getElementById(id).classList.remove('hidden');
}

function saveMeal(){
 let m=meals();
 m.unshift({
  id:Date.now(),food:food.value,hunger:+hunger.value,satiety:+satiety.value,
  mood:mood.value,craving:craving.checked,enjoyment:+(enjoyment.value||0),
  health:+(health.value||0),portion:+(portion.value||0),
  date:new Date().toLocaleString('de-DE')
 });
 localStorage.setItem(MK,JSON.stringify(m));
 food.value='';
 render();
}

function deleteMeal(id){
 localStorage.setItem(MK,JSON.stringify(meals().filter(x=>x.id!==id)));
 render();
}

function saveWeight(){
 let w=weights();
 w.unshift({id:Date.now(),weight:+weightInput.value,date:new Date().toLocaleDateString('de-DE')});
 localStorage.setItem(WK,JSON.stringify(w));
 weightInput.value='';
 render();
}

function exportData(){
 const data={meals:meals(),weights:weights()};
 const a=document.createElement('a');
 a.href=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:'application/json'}));
 a.download='ess-tracker-backup.json';a.click();
}

function importData(){
 const f=importFile.files[0]; if(!f) return;
 const r=new FileReader();
 r.onload=e=>{
  const d=JSON.parse(e.target.result);
  localStorage.setItem(MK,JSON.stringify(d.meals||[]));
  localStorage.setItem(WK,JSON.stringify(d.weights||[]));
  render();
 };
 r.readAsText(f);
}

function resetData(){
 if(confirm('Wirklich löschen?')){
  localStorage.removeItem(MK); localStorage.removeItem(WK); render();
 }
}

function render(){
 const m=meals(), w=weights();

 dashboard.innerHTML=`
 <div class="card">Mahlzeiten: <b>${m.length}</b></div>
 <div class="card">Gewichtseinträge: <b>${w.length}</b></div>
 <div class="card">Heißhungerquote: <b>${m.length?Math.round(m.filter(x=>x.craving).length/m.length*100):0}%</b></div>`;

 mealList.innerHTML=m.map(x=>`<div class="card">
 <b>${x.food}</b><br>${x.date}<br>
 Hunger ${x.hunger} | Sättigung ${x.satiety}<br>
 ${x.mood} ${x.craving?'🔥':''}<br>
 <button onclick="deleteMeal(${x.id})">Löschen</button></div>`).join('');

 weightList.innerHTML=w.map(x=>`<div class="card">${x.date}: ${x.weight} kg</div>`).join('');

 const avgH=m.length?(m.reduce((a,b)=>a+b.hunger,0)/m.length).toFixed(1):'-';
 const avgS=m.length?(m.reduce((a,b)=>a+b.satiety,0)/m.length).toFixed(1):'-';
 analysisContent.innerHTML=`Ø Hunger: ${avgH}<br>Ø Sättigung: ${avgS}`;
}
render();
