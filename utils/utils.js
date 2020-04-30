const moment = require("moment");

class Util {
  /**
   * @description 接口返回成功处理方法
   * @author cc
   * @static
   * @param {*} data 返回数据
   * @returns
   * @memberof Util
   */
  static responseHandler(data = []) {
    const result = {
      code: 200,
      msg: 'success',
      data: data,
    };
    return result;
  }

  /**
   * @description 接口出错处理方法
   * @author cc
   * @static
   * @param {*} err 错误信息
   * @returns
   * @memberof Util
   */
  static errorHandler(err, code = 500) {
    const result = {
      code: code,
      msg: 'error:' + err,
      data: null,
    };
    return result;
  }


  /**
   * @description 获取当前日期之前的某一时间
   * @author cc
   * @static
   * @param {*} rangeIndex 要获取的日期段类型，1代表近1小时，2代表近6小时，3,代表近12小时，4代表近24小时，5代表近1周，6代表近1月
   * @returns [startTime, endTime] 返回一个时间段数据，分别是开始时间和结束时间
   * @memberof Util
   */
  static getDateRange(rangeIndex) {
    let dateRange = [moment().format("YYYY-MM-DD HH:mm:ss")];
    switch (rangeIndex) {
      case 1:
        dateRange.unshift(moment().subtract(1, "h").format("YYYY-MM-DD HH:mm:ss"))
        break;
      case 2:
        dateRange.unshift(moment().subtract(6, "h").format("YYYY-MM-DD HH:mm:ss"))
        break;
      case 3:
        dateRange.unshift(moment().subtract(12, "h").format("YYYY-MM-DD HH:mm:ss"))
        break;
      case 4:
        dateRange.unshift(moment().subtract(24, "h").format("YYYY-MM-DD HH:mm:ss"))
        break;
      case 5:
        dateRange.unshift(moment().subtract(1, "w").format("YYYY-MM-DD HH:mm:ss"))
        break;
      case 6:
        dateRange.unshift(moment().subtract(1, "M").format("YYYY-MM-DD HH:mm:ss"))
        break;
    }
    return dateRange;
  }
}

module.exports = Util;