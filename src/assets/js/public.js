import {Toast, Indicator} from 'mint-ui';

function getRequest(url,params,callBack) {
    Indicator.open();
    $.get(getUrl(url), params, function (data, status) {
        Indicator.close();
        if (data.statusCode == 200) {
            callBack(data);
        } else if (data.statusCode == 310) {
            //登录超时
            window.location.href = "login.html";
        } else {
            Toast(data.message);
        }
    }, 'json');
}

export {
    getRequest
}