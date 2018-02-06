
//工具相关的封装
var Tool = (function (window, undefind) {
    let ContentPath = "http://app-shop.chinacloudsites.cn";

    //GET请求
    let _ajaxGet = function (url, data) {
        return new Promise(function (resolve, reject) {
            let apiurl = "";
            if (data) {
                apiurl = ContentPath + url + data;
            }
            else {
                apiurl = ContentPath + url
            }
            $.ajax({
                url: apiurl,
                async: true,
                type: "GET",
                dataType: "json",
                success: function (req, status) {
                    resolve({ "req": req, "status": status });
                },
                error: function (xhr, textStatus, errorThrown) {
                    reject(xhr);
                }
            });
        });
    }
    //POST请求
    let _ajaxPost = function (url, data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: ContentPath + url,
                async: true,
                type: "POST",
                dataType: "json",
                data: data,
                contentType: 'application/json',  
                success: function (req, xhr) {
                    resolve(req, xhr);
                },
                error: function (xhr, textStatus, errorThrown) {
                    reject(xhr);
                }
            });
        });
    }
    //其他一些莫名其妙的请求
    let _ajaxOther = function (url, data, type) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: ContentPath + url,
                async: true,
                type: type,
                dataType: "json",
                data: data,
                success: function (req, xhr) {
                    resolve(req, xhr);
                },
                error: function (xhr, textStatus, errorThrown) {
                    reject(xhr);
                }
            });
        });
    }

    //获取URL上的参数
    let _utilityGetQueryString = function (queryname)
    {
        let reg = new RegExp("(^|&)" + queryname + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    return {
        ContextPath: ContentPath,
        Ajax: {
            Get: _ajaxGet,
            Post: _ajaxPost,
            Other: _ajaxOther
        },
        Utility: {
            GetQueryString: _utilityGetQueryString   //获取url上的参数
        }
    }
})(window, );