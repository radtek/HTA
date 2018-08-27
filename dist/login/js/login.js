$(document).ready(function(){
    $("#submit").click(function(){

        var name = $.trim($("#name").val());
        var password = $.trim($("#password").val());
        if(name.length == 0 || password.length == 0){
            alert('账号密码不能为空!');
            return;
        }
        $('#loading').show();
        $.get(getUrl('sf_zhzf/msys/user/login'),{
            login : name,
            pwd   : hex_md5(password),
            imei  : imei
        },function(data,status){
            $('#loading').hide();
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