const http = require('http');
const { MEDIA_MONKEY_JSON_URL }= require('../consts');

module.exports.mediaMonkeyWsUrl = () => {
	return new Promise( (resolve,reject) => {
		const req = http.get(MEDIA_MONKEY_JSON_URL,(res) => {
			const { statusCode } = res

			let error
			// Any 2xx status code signals a successful response but
			// here we're only checking for 200.
			if (statusCode !== 200) {
				error = new Error(this.pluginId + ':ERROR: Request Failed.\n' + `Status Code: ${statusCode}`)
			}
			if (error) {
				resolve(error)
			}

			res.setEncoding('utf8')
			let data = ''
			res.on('data', (chunk) => {
				data += chunk
			})
			res.on('end', () => {
				try {
					const jsonData = JSON.parse(data)
					jsonData.forEach((val,idx) => {
						if( val.title === 'mainwindow.html' ) {
							resolve(val.webSocketDebuggerUrl)
						}
					})
				}
				catch (e) {
					resolve("ERROR: Check for Update error=",e.message)
				}
			});
		})
		req.on('timeout', (e) => {
			resolve(e)
		})
		req.on('error', (e) => {
			resolve(e)
		})
		req.end()
	})
}