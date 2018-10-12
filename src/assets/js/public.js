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

function postRequest(url,jsonData,callBack) {
    Indicator.open();
    let task = plus.uploader.createUpload( "http://www.iotshifang.com/"+url,
        { method:"POST",blocksize:204800,priority:100 },
        function ( t, status ) {
            // 上传完成
            Indicator.close();
            if ( status == 200 ) {
                let data = t.responseText;
                if(data.substring(0,13) == 'jsoncallback(') data = data.substring(13,data.length-1);
                data = JSON.parse(data);

                if (data.statusCode == 200) {
                    callBack(data);
                } else if (data.statusCode == 310) {
                    //登录超时
                    window.location.href = "login.html";
                } else {
                    Toast(data.message);
                }
            } else {
                alert( "Upload failed: " + status );
            }
        }
    );
    task.addData( "jsonData", JSON.stringify(jsonData) );
    task.start();
}

export {
    getRequest,
    postRequest
}