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
      msg: "success",
      data: data
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
  static errorHandler(err) {
    const result = {
      code: 500,
      msg: "error:" + err,
      data: null
    };
    return result;
  }
}

module.exports = Util;
