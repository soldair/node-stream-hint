var hint = require('../');
var through = require('through');
var test = require('tape');

test("can hint a stream",function(t){
  t.plan(3);
  var s = through();
  var c = 0;
  var end = through(function(data){
    if(++c === 1) {
      t.equals(data," guys",'should have removed hint from buffer');
      s.write("test");
    } else {
      t.equals(data,'test','second data event should have worked');
    }
  })

  hint(s,['test','hi'],function(err,type,s){
    t.equals(type,"hi",'should have picked up correct hint');
    s.pipe(end);
  });


  s.write("hi guys");
  
})
