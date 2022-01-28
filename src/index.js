const WebSocketClient = require("websocket").client;
const {mediaMonkeyWsUrl} = require('./utils');

(async () => {
    try {
        const url = await mediaMonkeyWsUrl()
        console.log('Here:',url)
    }
    catch(e) {
        console.log('Here error:',e);
    }
})();