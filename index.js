const express = require('express')
const router = express.Router()

let background = '#2196F3'

let TelegramBot = null
let telegramBot = null
let telegramAlerts = false
let telegramToken = null
let telegramConv = null
let customCSS = ''

const errorHTML = (title, message) => {
	return `
	<style>
		body {
			background: ${background};
			font-family: Lato, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			color: #fff;
		}

		h1, h2 {
			font-weight: 200;
		}

		${customCSS}
	</style>
	<body>
		<div>
			<h1>${title}</h1>
			<br>
			<h2>${message}</h2>
		</div>
	</body>
	`
}

// Error handler
router.use((err, req, res, next) => {
	console.error(err)

	if (!process.env.NODE_ENV) { // https://stackoverflow.com/questions/34227216/process-env-vs-app-getenv-on-getting-the-express-js-environment
		var message = err
	} else {
		var message = (typeof err === 'string' ? err : 'Internal server error')
	}

	if (telegramAlerts) {
		telegramBot.sendMessage(telegramConversation, `Hi,\n\nAn error happened in your app.\n\n${message}`);
	}
	
	if (req.xhr || req.accepts('json', 'html') === 'json') {
		res.status(500).json({ error: message })
	} else {
		res.status(500).send(errorHTML("Mmmh, something went wrong appened here.", message))
	}
})

// 404 Handler (last route)
router.use((req, res, next) => {
	if (req.xhr || req.accepts('json', 'html') === 'json') {
		res.status(404).json({ error: 'not found' })
	} else {
		res.status(404).send(errorHTML("Looks like you got lost!", "404 - page not found"))
	}
})

module.exports = (options) => {
	
	if (options.background) background = options.background
	if (options.customCSS) customCSS = options.customCSS

	if (options.telegramAlerts) {
		options.telegramAlerts = true
	
		if (!TelegramBot) TelegramBot = require('node-telegram-bot-api')
	
		telegramToken = options.telegramToken
	
		telegramBot = new TelegramBot(telegramToken, {polling: false})
	
		telegramConv = options.telegramConversation
	}

	return router
}