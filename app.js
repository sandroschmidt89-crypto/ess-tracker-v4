
const MK='meals_v4',WK='weights_v4';
const meals=()=>JSON.parse(localStorage.getItem(MK)||'[]');

function saveMeal(){
 const m=meals();
 m.unshift({food:food.value,hunger:hunger.value,satiety:satiety.value,mood:mood.value,craving:craving.checked,date:new Date().toLocaleString('de-DE')});
 localStorage.setItem(MK,JSON.stringify(m));
 render();
}

function saveWeight(){
 const w=JSON.parse(localStorage.getItem(WK)||'[]');
 w.unshift({weight:weight.value,date:new Date().toLocaleDateString('de-DE')});
 localStorage.setItem(WK,JSON.stringify(w));
 render();
}

function exportData(){
 const data={meals:localStorage.getItem(MK),weights:localStorage.getItem(WK)};
 const a=document.createElement('a');
 a.href=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:'application/json'}));
 a.download='ess-tracker-backup.json';
 a.click();
}

function importData(){
 const f=document.getElementById('importFile').files[0];
 if(!f) return;
 const r=new FileReader();
 r.onload=e=>{
  const d=JSON.parse(e.target.result);
  localStorage.setItem(MK,d.meals||'[]');
  localStorage.setItem(WK,d.weights||'[]');
  render();
 };
 r.readAsText(f);
}

function render(){
 const m=meals();
 stats.innerHTML='Mahlzeiten: '+m.length;
 meals.innerHTML=m.map(x=>'<div><b>'+x.food+'</b><br>'+x.date+'</div><hr>').join('');
}
render();
