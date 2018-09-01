$(document).ready(function(){
    checkLogin();
    login();
});

function checkLogin() {
    let login       = localStorage.getItem("login");
    let lastsend    = localStorage.getItem("lastsend");
    let ukey        = localStorage.getItem("ukey");
    let imei        = localStorage.getItem("imei");

    if (login && lastsend && ukey && imei) {
        $('#loading').show();
        $.get( getUrl('sf_zhzf/msys/user/login'),{
            login   : login,
            imei    : imei,
            lastsend: lastsend,
            ukey    : ukey
        },function(data,status){
            $('#loading').hide();
            if(data.statusCode == 200){
                localStorage.setItem("login", data.login);
                localStorage.setItem("ukey", data.ukey);
                localStorage.setItem("lastsend", data.lastsend);
                localStorage.setItem("imei", imei);
                sessionStorage.setItem('personInfo', data);
                window.location.href = "index.html";
            }else{
                //TODO::自动登录错误
                localStorage.clear();
                alert(data.message);
            }
        },'json');
    }
}

function login() {
    $("#submit").click(function(){

        var name = $.trim($("#name").val());
        var password = $.trim($("#password").val());
        if(name.length == 0){
            plus.nativeUI.toast( '账号不能为空!' );
            return;
        }
        if(password.length == 0){
            plus.nativeUI.toast( '密码不能为空!' );
            return;
        }
        $('#loading').show();
        var imei = '867541032157567,867541032551835';
        // var imei = plus.device.imei;
        $.get(getUrl('sf_zhzf/msys/user/login'),{
            login : name,
            pwd   : hex_md5(password),
            imei  : imei,
        },function(data,status){
            $('#loading').hide();
            if(data.statusCode == 200){
                localStorage.setItem("login", data.login);
                localStorage.setItem("ukey", data.ukey);
                localStorage.setItem("lastsend", data.lastsend);
                localStorage.setItem("lastsend", data.lastsend);
                localStorage.setItem("imei", imei);
                sessionStorage.setItem('personInfo', data);
                window.location.href = "index.html";
            }else{
                localStorage.clear();
                plus.nativeUI.toast( data.message );
            }
        },'json');
    });
}