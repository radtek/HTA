$(document).ready(function() {
    checkLogin();
    login();
});

function checkLogin() {
    let login = localStorage.getItem("login");
    let token = localStorage.getItem("token");
    if (login && token) {
        $("#name").val(login);
        $("#password").val(token);
    }
}

function login() {
    let isLoad = false;
    $("#submit").click(function() {
        if(isLoad) return;
        let name = $.trim($("#name").val());
        let password = $.trim($("#password").val());
        if (name.length == 0) {
            plus.nativeUI.toast('账号不能为空!');
            return;
        }
        if (password.length == 0) {
            plus.nativeUI.toast('密码不能为空!');
            return;
        }

        $('#loading').show();
        isLoad = true;
        // let imei = plus.device.imei;
        let imei = '867541032157567,867541032551835';

        (localStorage.getItem("lastsend") && localStorage.getItem("ukey")) ? {} : password = hex_md5(password);

        $.get(getUrl('sf_zhzf/msys/user/login'), {
            login: name,
            pwd: password,
            imei: imei,
        }, function(data, status) {
            $('#loading').hide();
            isLoad = false;
            if (data.statusCode == 200) {

                localStorage.setItem("login", name);
                localStorage.setItem("token", password);
                localStorage.setItem("ukey", data.ukey);
                localStorage.setItem("lastsend", data.lastsend);

                sessionStorage.setItem('personInfo', data);
                window.location.href = "index.html";
            } else {
                localStorage.clear();
                plus.nativeUI.toast(data.message);
            }
        }, 'json');
    });
}