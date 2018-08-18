document.addEventListener('plusready', function(){});
var realmName = 'root/';    //域名
var scan = null;            //扫码控件
var inspType = null;
function check(){
    let myScr = $("#myScr");
    let time = 50;
    let check = setInterval(function () {
        time+=time;
        if(time >= 300){
            clearTimeout(check);
        }else if(myScr.scrollTop() > 0){
            myScr.animate({ scrollTop: 0}, 100);
            clearTimeout(check);
        }
    },time);
}