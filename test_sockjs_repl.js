var SockJS = require('sockjs-client');

// start server with defaults
var SockJSRepl = require('./sockjs-repl');
var sockjs_repl = new SockJSRepl;

// start client
var sock = new SockJS('http://localhost:9000/repl');

sock.onopen = function() {
    console.log('open: sending "1+1337;"');
    sock.send('1+1337;');
}

sock.onclose = function() {
    console.log('close');
}

sock.onmessage = function(e) {
    var data = e.data.trim();
    console.log('input: ', data);
    if ("1338" == data)
    {
        console.log('1+1337 = 1338; exiting');
        sock.send(".exit");
        sock.close();
    }
}

