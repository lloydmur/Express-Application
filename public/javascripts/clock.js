var tick = true;
var _t = ' AM'

var clock = document.getElementById('clock');
clock.innerHTML = getTime();

setInterval(function(){
  clock.innerHTML = getTime();
},1000)

function getTime(){
  tick = !tick;
  var time = new Date().toString().slice(15, 21);
  if(time[0] == '0') time[0] = ' ';
  var hour = parseInt(time.slice(0, 3));
  if(hour > 12){
    _t = ' PM';
    hour -= 12;
  }
  else if(hour == 0) hour = 12;
  else{
    _t = ' AM'
  }
  if(tick){
    var t = time.replace(/:/g, " ");
    time = t;
  }
  time = hour.toString() + time.slice(3, time.length);
  time += _t;
  return time;
}


