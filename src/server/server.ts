import {DomioServer} from './DomioServer/DomioServer';

const domioServer = new DomioServer(parseInt(process.argv[2]));
domioServer.start();
