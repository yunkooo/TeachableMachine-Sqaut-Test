//냘짜 함수
var d = new Date();
var year = d.getFullYear();
var month =('0' + (d.getMonth() + 1)).slice(-2);
var day = ('0' + d.getDate()).slice(-2);
var hours = ('0' + d.getHours()).slice(-2); 
var minutes = ('0' + d.getMinutes()).slice(-2);
var seconds = ('0' + d.getSeconds()).slice(-2); 
currentTime = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
var meTime = currentTime.toString();