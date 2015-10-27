var Readable = require("stream").Readable
  || require("readable-stream/readable");

function SockJSRepl(options)
{
  Readable.call(this, options);

  var opts = options || {
        prompt : "> "
        , port : 9000
        , prefix : "repl"
  };
  
  this.prefix = opts.prefix;
  this.port = opts.port;
  this.prompt = opts.prompt;
    
  this.sockjs_server = require('sockjs').createServer();
  
  var self = this;
  
  // normally this belongs to _read = function ...
  this.sockjs_server.on('connection', function (conn) {
    conn.on('data', function(msg) {
        console.log('incoming: '+ msg);
        self.push(msg.trim() + "\n");
    });
    
    conn.on('close', function () {
        console.log('client disconnected');
    });
    
    // repl
    require('repl').start({
      prompt: this.prompt,
      input: self,
      output: conn
    }).on('exit', function() {
      self.push(0);
      self.end();
    });
  });
    
  this.http_server = require('http').createServer();
  this.sockjs_server.installHandlers(this.http_server, {prefix:this.prefix});
  this.http_server.listen(this.port, '0.0.0.0');
}

require("util").inherits(SockJSRepl, Readable);
SockJSRepl.prototype._read = function noop(size) {
    // noop
}

module.exports = SockJSRepl;

// usage:
// new require('sockjs_repl')(opts);

new SockJSRepl;


