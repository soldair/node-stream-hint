var bindexOf = require('buffer-indexof');
// look at the first data event from a socket for a string identifying protocol
module.exports = function(s,protos,cb){

  function hintData(data){
    var type = typeof data;
    if(Buffer.isBuffer(data)) {
      type = "buf";
    } else if(type === "string"){
      type = "str";
    } else if(data && type == 'object'){
      type = "obj";
    } else { 
      type = 'eq';
    }

    var proto,p;
    for(var i=0;i<protos.length;++i){
      p = protos[i];
      if(type == "buf") {
        if(!Buffer.isBuffer(p)) {
          p = protos[i] = new Buffer(p);
        }
        if(bindexOf(data,p) === 0) {
          proto = p;
          data = data.slice(proto.length);
          break;
        } 
      } else if(type == "str") {
        if(data.indexOf(p) === 0){
          proto = p;
          data = data.substr(p.length);
          break; 
        }
      } else if(type === "obj"){
        if(data[p]) {
          proto = p;
          break;
        }
      } else {
        if(p === data) {
          proto = p;
          break;
        }
      }
    }

    s.removeListener("error",hintError);
    cb(false,proto,s,type);
    s.emit('data',data);
  }

  function hintError(e){
    s.removeListener("data",hintData);
    cb(e,false,s);
  }

  s.once("data",hintData);
  s.once("error",hintError);
  return s;
}

