let login = localStorage.getItem("login");
let lastsend = localStorage.getItem("lastsend");
let ukey  = localStorage.getItem("ukey");

if (login && lastsend && ukey) {
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
            sessionStorage.setItem('personInfo', data);
            window.location.href = "index.html";
        }else{
            //TODO::自动登录错误
            // alert(data.message);
        }
    },'json');
}
