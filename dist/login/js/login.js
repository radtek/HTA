$(document).ready(function(){
    $("#submit").click(function(){

        var name = $.trim($("#name").val());
        var password = $.trim($("#password").val());
        // var imei = plus.device.imei;
        $.get(getUrl('sf_zhzf/msys/user/login'),{
            // login : name,
            // pwd   : hex_md5(password),
            // imei  : imei
            login : 'admin01',
            pwd   : 'e10adc3949ba59abbe56e057f20f883e',
            imei  : '123451234512345'
        },function(data,status){
            if(data.statusCode == 200){
                localStorage.setItem("login", data.login);
                localStorage.setItem("ukey", data.ukey);
                localStorage.setItem("lastsend", data.lastsend);
                sessionStorage.setItem('personInfo', data);
                window.location.href = "index.html";
            }else{
                alert(data.message);
            }
        },'json');
    });
});