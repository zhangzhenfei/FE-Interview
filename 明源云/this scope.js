// this以及作用域，变量提升等综合考察
var User = {
  count: 1,
  method: {
    getCount: function() {
      return this.count
    }
  }
}

setTimeout(function() {
  console.log('setTimeout:', User.method.getCount())
})

var getCount = User.method.getCount
console.log('getCount:', getCount())

// 答案：
// getCount: undefined  getCount()函数作用域是window，所以是undefined
// setTimeout: undefined User.method.getCount作用域是method，由于method对象没有count变量，所以是undefined
