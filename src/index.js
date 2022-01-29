//const WebSocketClient = require("websocket").client
const WebSocket = require('ws')
const { PLUGIN_ID } = require('./consts')
const {mediaMonkeyWsUrl} = require('./utils')
const puppeteer = require('puppeteer')

// const main = async () => {
//     try {
//         const url = await mediaMonkeyWsUrl()
//         console.log('URL:',url)

//         let ws = new WebSocketClient()
//         //var request = {id:1,method:'Runtime.evaluate',params:{expression:"app.listen(app.player,'playbackState',console.debug)"}}
//         let request = {id:1,method:'Runtime.evaluate',params:{expression:'app.currentSkin()'}}

//         ws.on("connect",async (connection) => {
//             connection.on('message',(message) => {
//                 console.log("Result",message);
//             })
//             console.log('sending',JSON.stringify(request));
//             let resp = await connection.send(JSON.stringify(request))
//             connection.on('frame',(data) => {
//                 console.log(data);
//             })
//             console.log('resp',JSON.stringify(resp));
//         })
        
//         ws.connect(url)

//     }
//     catch(e) {
//         console.log('ERROR:',e)
//     }
// }

const main = async () => {
        try {
            const url = await mediaMonkeyWsUrl()
            console.log('URL:',url)

            const ws = new WebSocket(url)
            //var request = {id:1,method:'Runtime.evaluate',params:{expression:"app.listen(app.player,'playbackState',console.debug)"}}
            var enable = {id:1,method:'Runtime.enable'}
            var exression = "app.listen(app.player,'playbackState',console.debug);"
            var request = {id:1,method:'Runtime.evaluate',params:{expression:exression}}
            //var request = {id:1,method:'Runtime.evaluate',params:{expression:"app.player.getSongList()"}}
            ws.addEventListener('open', function (event) {
                ws.send(JSON.stringify(enable));
                ws.send(JSON.stringify(request));
            });
            
            ws.addEventListener('message', function (event) {
                console.log("Result",event.data);
            });
        }
        catch(e) {
            console.log(e)
        }
}


// const main = async () => {
//     try {
//         //const browserWSEndpoint = await mediaMonkeyWsUrl()
//         const browserWSEndpoint = 'ws://localhost:9222/devtools/browser/cb825b50-4bc5-42c7-bab0-d34e3cc319fa'
//         console.log(browserWSEndpoint)
//         var browser = await puppeteer.connect({browserWSEndpoint})
//         var pages = await browser.pages()
//         let page = pages[0]
//         page.on('playbackState',(e) => {
//             console.log(e);
//         })
//     }
//     catch (e) {
//         console.log('ERROR:',e)
//     }
// }

main();