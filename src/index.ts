import { Server } from 'http';
import webApp from './app';

let _handle: Server;

export function start(port = 3000) {
    _handle = webApp.listen(port, () => console.info('Server started listening on port', port));
}

export function stop() {
    if (_handle) {
        _handle.close();
        console.info('Server stopped');
    }
}