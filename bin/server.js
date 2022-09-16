'use strict'
const app = require('../src/app.js');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.port || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta: ' + port)

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' 
    ? 'pipe ' + addr 
    : 'port ' + addr.port;
    debug('Listening on ' + bind)
}
function normalizePort(val) {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }
    if (port>= 0) {
        return port;
    }
    return false; 
}
function onError(error) {
    if(error.syscall !== 'listen'){
    throw error;
}
const bind = typeof port === 'string' ? 
    'Pipe ' + port : 
    'Port: ' + port;
    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' Necessita de privilégios de administrador.');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' já está em uso.');
            process.exit(1);
        default: 
            throw error;
    }
}

