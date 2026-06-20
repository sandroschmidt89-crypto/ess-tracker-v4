
const MK='v41_meals',WK='v41_weights';
function fill(){let h=['<5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10'];let s=[...h,'>10'];h.forEach(v=>hunger.add(new Option(v,v)));s.forEach(v=>satiety.add(new Option(v,v)));for(let i=0;i<=10;i++){enjoyment.add(new Option(i,i));health.add(new Option(i,i));portion.add(new Option(i,i));}hunger.value='7';satiety.value='8';}
const meals=()=>JSON.parse(localStorage.getItem(MK)||'[]');const weights=()=>JSON.parse(localStorage.getItem(WK)||'[]');
function showTab(id){document.querySelectorAll('.tab').forEach(x=>x.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');}
function clearMealForm(){food.value='';hunger.value='7';satiety.value='8';mood.selectedIndex=0;craving.value='false';}
function saveMeal(){let m=meals();m.unshift({food:food.value,hunger:hunger.value,satiety:satiety.value,date:new Date().toLocaleString('de-DE')});localStorage.setItem(MK,JSON.stringify(m));clearMealForm();render();}
function saveWeight(){let w=weights();w.unshift({weight:weightInput.value,date:new Date().toLocaleDateString('de-DE')});localStorage.setItem(WK,JSON.stringify(w));render();}
function toggleDay(id){let e=document.getElementById(id);e.style.display=e.style.display==='none'?'block':'none';}
function render(){dashboard.innerHTML='<div class=card>Mahlzeiten: '+meals().length+'</div>';const g={};meals().forEach(x=>{let d=x.date.split(',')[0];(g[d]=g[d]||[]).push(x)});mealGroups.innerHTML='';Object.keys(g).forEach((d,i)=>{mealGroups.innerHTML+=`<div class="dayHeader" onclick="toggleDay('g${i}')">📅 ${d} (${g[d].length})</div><div id="g${i}">${g[d].map(v=>`<div class='mealItem'><b>${v.food}</b><br>${v.date}<br>Hunger ${v.hunger} | Sättigung ${v.satiety}</div>`).join('')}</div>`});weightList.innerHTML=weights().map(x=>'<div class=card>'+x.date+': '+x.weight+' kg</div>').join('');analysisContent.innerHTML='Ø Mahlzeiten: '+meals().length;}
fill();render();
