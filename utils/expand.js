// 添加事件结束
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value
        }
      )
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason
        }
      )
    }
  )
}