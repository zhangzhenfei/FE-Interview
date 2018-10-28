// 观察者模式又叫做发布订阅模式，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，
// 这个主题对象的状态发生改变时就会通知所有观察着对象。
// 它是由两类对象组成，主题和观察者，主题负责发布事件，同时观察者通过订阅这些事件来观察该主体，
// 发布者和订阅者是完全解耦的，彼此不知道对方的存在，两者仅仅共享一个自定义事件的名称。

/* Pubsub */
function Pubsub() {
  // 存放事件和对应的处理方法
  this.handles = {}
}

Pubsub.prototype = {
  // 传入事件类型type和事件处理handle
  on: function(type, handle) {
    if (!this.handles[type]) {
      this.handles[type] = []
    }
    this.handles[type].push(handle)
  },
  emit: function() {
    //通过传入参数获取事件类型
    var type = Array.prototype.shift.call(arguments)
    if (!this.handles[type]) {
      return false
    }
    for (var i = 0; i < this.handles[type].length; i++) {
      var handle = this.handles[type][i]
      //执行事件
      handle.apply(this, arguments)
    }
  },
  off: function(type, handle) {
    handles = this.handles[type]
    if (handles) {
      if (!handle) {
        handles.length = 0 //清空数组
      } else {
        for (var i = 0; i < handles.length; i++) {
          var _handle = handles[i]
          if (_handle === handle) {
            handles.splice(i, 1)
          }
        }
      }
    }
  }
}

// test
var p1 = new Pubsub()
p1.on('mm', function(name) {
  console.log('mm: ' + name)
})
p1.emit('mm', '哈哈哈哈')
console.log('===============')
var p2 = new Pubsub()
var fn = function(name) {
  console.log('mm2: ' + name)
}
var fn2 = function(name) {
  console.log('mm222: ' + name)
}
p2.on('mm2', fn)
p2.on('mm2', fn2)
p2.emit('mm2', '哈2哈2哈2哈2')
console.log('-------------')
p2.off('mm2', fn)
p2.emit('mm2', '哈2哈2哈2哈2')
console.log('-------------')
p2.off('mm2')
p2.emit('mm2', '哈2哈2哈2哈2')
console.log('-------------')
