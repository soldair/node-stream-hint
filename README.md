stream-hint
================

detect type of a stream based on match on first dataevent.

works on flowing streams of all types with varying usefullness.

```js
var hint = require('stream-hint');
var net = require('net');

net.createServer(function(con){
  hint(con,["HTTP","tacos","replication"],function(err,type,con){

    if(type === "HTTP"){
      // handle http. note the string HTTP is removed from the first data event so you should add it back.
      con.write(type); 
    } else if(type == "replication") {
      // do magic event streams! or some such.
      con.pipe(db.replication());
    } else if(type == "tacos"){
      // feede tacos!
      con.write("mmm tacos.");
      con.end();
    } else {h
      // no!
      con.destroy();
    }

  });

}).listen(0);


```

- you can compare strings to either strings or buffers.
- with objects i will check to see if a property exists
- with other data types i will check to see if the data === the value in the hint array
