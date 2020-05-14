// let TelegramBot = null
// let telegramBot = null
// let telegramAlerts = false
// let telegramToken = null
// let telegramChat = null
let customCSS = ''
let noImage = false
let background = '#2196F3'

const errorHTML = (title, message, img) => {
	if (noImage) img = null
	return `
	<style>
		body {
			margin: 0;
			background: ${background};
			font-family: Lato, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			color: #fff;
			height: 100%;
		}

		h1, h2 {
			font-weight: 200;
		}

		${customCSS}
	</style>
	<body>
		<div>
			${img ? `<img width=300 src='${img}'/>` : ''}
			<h1>${title}</h1>
			<br>
			<h2>${message}</h2>
		</div>
	</body>
	`
}

// Error handler
const normalError = (err, req, res, next) => {

	let status = err.status || res.statusCode || 500
	console.error(err, status)

	if (!process.env.NODE_ENV) { // https://stackoverflow.com/questions/34227216/process-env-vs-app-getenv-on-getting-the-express-js-environment
		var message = err
	} else {
		var message = (typeof err === 'string' ? err : 'An error happened on our side.')
	}

	// if (telegramAlerts) {
	// 	telegramBot.sendMessage(telegramChat, `Hi,\n\nAn error happened in your app.\n\n${err.toString()}`)
	// }
	
	if (req.xhr || req.accepts('json', 'html') === 'json') {
		res.status(status).json({ error: message })
	} else {
		res.status(status).send(errorHTML("Something went wrong here.", message, "https://i.imgur.com/O0DCcQy.png"))
	}
}

// 404 Handler (last route)
const notFound = (req, res, next) => {

	if (req.xhr || req.accepts('json', 'html') === 'json') {
		res.status(404).json({ error: 'not found' })
	} else {
		res.status(404).send(errorHTML("Looks like you got lost.", "This page was not found.", "https://i.imgur.com/A040Lxr.png"))
	}
}

module.exports = (options) => {

	// if (options.telegramAlerts) {
	// 	telegramAlerts = true
	// 	telegramToken = options.telegramToken
	// 	telegramChat = options.telegramChat
		
	// 	if (!TelegramBot) TelegramBot = require('node-telegram-bot-api')
	
	// 	telegramBot = new TelegramBot(telegramToken, { polling: false })
	// }

	if (options.background) background = options.background
	if (options.customCSS) customCSS = options.customCSS
	if (options.noImage) noImage = options.noImage

	return {
		notFound: notFound,
		handler: normalError
	}
}