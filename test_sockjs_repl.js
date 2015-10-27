var SockJS = require('sockjs-client');
var sockjs_repl = new require('./sockjs-repl');

// start client
var sock = new SockJS('http://localhost:9000/repl');

sock.onopen = function() {
    console.log('open');
    sock.send('1+1337;');
}

sock.onclose = function() {
    console.log('close');
}

sock.onmessage = function(e) {
    console.log('', e.data);
    if ("1338" == e.data)
    {
        console.log('1+1337 = 1338; exiting');
    }
}
