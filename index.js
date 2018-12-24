const express = require('express')
const router = express.Router()

const errorHTML = (title, message) => {
	return `
	<style>
		body {
			background: lightblue;
			font-family: sans-serif;
			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
		}
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

	if (app.get('env') === 'development') {
		var message = err
	} else {
		var message = (typeof err === 'string' ? err : 'Internal server error')
	}
	
	if (req.xhr || req.accepts('json', 'html') === 'json') {
		res.status(500).json({ error: message })
	} else {
		res.status(500).send(errorHTML("Oops! Looks like something went wrong here.", message))
	}
})


router.use((req, res, next) => {
	if (req.xhr || req.accepts('json', 'html') === 'json') {
		res.status(404).json({ error: 'not found' })
	} else {
		res.status(404).send(errorHTML("Sorry, can't find that!"))
	}
})

module.exports = router