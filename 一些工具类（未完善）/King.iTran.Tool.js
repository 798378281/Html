/*
* @Author: hxp
* @Date:   2017-09-19 17:07:07
* @Last Modified by:   79837
* @Last Modified time: 2017-09-22 15:51:13
*/

/**
 * 工具集
 * @param  {[type]} ){} [description]
 * @return {[type]}       [description]
 */
define([], function() {
	let timezoneOffset = new Date().getTimezoneOffset() / 60 * -1; //获取当前时区
    window.TIME_ZONE_OFFSET = timezoneOffset;
    /**
     * 将null，undefined等参数转成空字符串
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    let _trimNull = function(str) {
        if (str === null) {
            return "";
        } else if (typeof(str) == 'undefined') {
            return "";
        } else {
            return str;
        }
    }

    /**
     * 获取当天时间相关数据
     * @return {[type]} [description]
     */
    let _getNowTime = function() {
        var date = new Date();
        var time = "";
        if (date.getHours() > 9) {
            time += date.getHours() + ":";
        } else {
            time += "0" + date.getHours() + ":";
        }

        if (date.getMinutes() > 9) {
            time += date.getMinutes();
        } else {
            time += "0" + date.getMinutes();
        }
        var day = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
        var day2=date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        var week = "";
        switch (date.getDay()) {
            case 1:
                week = "星期一";
                break;
            case 2:
                week = "星期二";
                break;
            case 3:
                week = "星期三";
                break;
            case 4:
                week = "星期四";
                break;
            case 5:
                week = "星期五";
                break;
            case 6:
                week = "星期六";
                break;
            case 0:
                week = "星期日";
                break;
            default:
                break;
        }
        return {
            "time": time, //当前时间
            "day": day, //日期
            "day2":day2,//日期
            "week": week //星期几
        }
    }

    /**
     * 时间转换，并随手加个时区
     * @param  {[type]} str [时间字符串]
     * @return {[type]}     [description]
     */
    let _strToDate = function(str, type) {
        if (str == null || str == "" || typeof(str) == "undefined" ||str=="null") return "";
        let tempStrs = "";
        if (str.indexOf('T') > -1) {
            tempStrs = str.split("T"); //2016-16-08T00:00:00
        } else {
            tempStrs = str.split(" "); //2016-16-08,00:00:00
        }
        let dateStrs = tempStrs[0].split("-");
        let year = parseInt(dateStrs[0], 10);
        let month = parseInt(dateStrs[1], 10) - 1;
        let day = parseInt(dateStrs[2], 10);
        let timeStrs = tempStrs[1].split(":");
        let hour = parseInt(timeStrs[0], 10) + TIME_ZONE_OFFSET;
        let minute = parseInt(timeStrs[1], 10);
        //如果转时区后的时间大于24，则天数+1，时间为凌晨
        if (hour > 24) {
            hour = hour - 24;
            day++;
        }
        if (hour == 24) {
            hour = 0;
            day++;
        }
        let date = new Date(year, month, day, hour, minute);
        let h = date.getHours();
        let m = date.getMinutes();
        let timeStr = (h > 9 ? h : "0" + h) + ":" + (m > 9 ? m : "0" + m);
        let days=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        switch (type) {
            case "time":
                return timeStr;
            case "date":
                return date;
            case "day":
            	return days;
            default:
                return "";
        }
    }
    
    //不加时区的字符串转时间
    let _strToDate2 = function(str, type) {
        if (str == null || str == "" || typeof(str) == "undefined" ||str=="null") return "";
        let tempStrs = "";
        if (str.indexOf('T') > -1) {
            tempStrs = str.split("T"); //2016-16-08,00:00:00
        } else {
            tempStrs = str.split(" "); //2016-16-08,00:00:00
        }
        let dateStrs = tempStrs[0].split("-");
        let year = parseInt(dateStrs[0], 10);
        let month = parseInt(dateStrs[1], 10) - 1;
        let day = parseInt(dateStrs[2], 10);
        let timeStrs = tempStrs[1].split(":");
        let hour = parseInt(timeStrs[0], 10);
        let minute = parseInt(timeStrs[1], 10);
        //如果转时区后的时间大于24，则天数+1，时间为凌晨
        if (hour > 24) {
            hour = hour - 24;
            day++;
        }
        if (hour == 24) {
            hour = 0;
            day++;
        }
        let date = new Date(year, month, day, hour, minute);
        let h = date.getHours();
        let m = date.getMinutes();
        let timeStr = (h > 9 ? h : "0" + h) + ":" + (m > 9 ? m : "0" + m);
        switch (type) {
            case "time":
                return timeStr;
            case "date":
                return date;
            default:
                return "";
        }
    }

    /**
     * 判断一个对象是否为空
     * @param  {[type]}  o [要判断的对象]
     * @return {Boolean}   [description]
     */
    let _isEmptyObject = function(o) {
        let t;
        for (t in o)
            return !1;
        return !0;
    }

    /**
     * 分割时间字符串并加上时区
     * @param  {[type]} str [时间字符串]
     * @return {[type]}     [description]
     */
    let _spiltTheFuckTimeData = function(str) {
        let a = str.split(':');
        let hour = parseInt(a[0]);
        let min = parseInt(a[1]);
        hour = 24 - (hour + TIME_ZONE_OFFSET) > 0 ? (hour + TIME_ZONE_OFFSET) : 24 - (hour + TIME_ZONE_OFFSET);
        hour = hour > 9 ? hour : "0" + hour;
        min = min > 9 ? min : "0" + min;
        return hour + ":" + min;
    }

    /**
     * 获取当前时间
     * @param  {[type]} type [T-获取当前时分秒，Y-获取当前年月日，D-获取当前的年月日+时间]
     * @return {[type]}      [description]
     */
    let _getCurrenTime = function(type) {
        let date = new Date();

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let hour = date.getHours();
        let minute = date.getMinutes();

        switch (type) {
            case "T":
                return (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute) + ":00";
            case "Y":
                return year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day);
            case "D":
                return year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) + " " + (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute) + ":00";
            case "N":
                return date;
            default:
                return year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) + " " + (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute) + ":00";
        }
    }

    /**
     * 打印对象
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    let _outputObj = function(obj) {
        var description = "";
        for (var i in obj) {
            description += i + " = " + obj[i] + "\n";
        }
        console.log(description);
    }

    /**
     * 时间转四字码
     * @param  {[type]} time [时间字符串]
     * @return {[type]}      [description]
     */
    let _getTimeCode=function(time){
    	if(time==null){
    		return "";
    	}
        let timeStr=_strToDate(time,"time");
        let a=timeStr.split(':');
        return a[0]+a[1];
    }
    
    /**
     * 判断某个值是否在数组内
     * @param  {[type]} arr [数组]
     * @param {[type]} val [需要判断的值]
     * @return {[type]}      [description]
     */
    let _inArray=function(arr,val){
    	let i = arr.length;
    	  while (i--) {
    	    if (arr[i] === obj) {
    	      return true;
    	    }
    	  }
    	  return false;
    }
    


    return {
        TrimNull: _trimNull,
        GetNowTime: _getNowTime,
        StrToDate: _strToDate,
        IsEmptyObj: _isEmptyObject,
        SplitTimeDate: _spiltTheFuckTimeData,
        GetCurrenTime: _getCurrenTime,
        LogObj:_outputObj,
        GetTimeCoed:_getTimeCode,
        StrToDate2:_strToDate2,
        InArray:_inArray
    }

});