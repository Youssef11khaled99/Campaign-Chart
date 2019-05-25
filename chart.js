const obj = [
    { "name": "n1", "country": "USA", "budget": 149, "goal": "Awareness", "category": "Technology" },
    { "name": "n2", "country": "USA", "budget": 250, "goal": "Awareness", "category": "Sports" },
    { "name": "n3", "country": "EGY", "budget": 300, "goal": "Awareness", "category": "Technology" },
    { "name": "n4", "country": "USA", "budget": 150, "goal": "Awareness", "category": "Sports" },
    { "name": "n5", "country": "USA", "budget": 120, "goal": "Conversion", "category": "Sports" }
    ]
let myChart = document.getElementById('myChart').getContext('2d');

// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

let massPopChart = new Chart(myChart, {
type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
data:{
labels:['EGY', 'USA'],
datasets:[{
label:'Technology',
data:[
  obj[0].budget,
  obj[1].budget,
],
//backgroundColor:'green',
backgroundColor:[
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',

],
borderWidth:1,
borderColor:'#777',
hoverBorderWidth:2,
hoverBorderColor:'#777'
},
{
label:'Sports',
data:[
  obj[2].budget,
  obj[3].budget,
],
//backgroundColor:'green',
backgroundColor:[
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 99, 132, 0.6)',

],
borderWidth:1,
borderColor:'#777',
hoverBorderWidth:2,
hoverBorderColor:'#777'
}]
},
options:{
title:{
display:true,
text:'Analysis by country and category',
fontSize:30
},
legend:{
display:true,
position:'top',
labels:{
  fontColor:'#777'
}
},
layout:{
padding:{
  left:50,
  right:0,
  bottom:0,
  top:0
}
},
tooltips:{
enabled:true
}
}
});