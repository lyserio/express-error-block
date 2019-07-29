# express-error-page

A minimalsit simple error handler for Express (4+) which returns an error page.

Support error reporting via `next()` and handling of 404.

It renders a simple HTML page, which can be customised via options.

## Features
- [x] Customise the page CSS
- [x] Respond in JSON if appropriate
- [x] Show a cute illustration
- [x] Hide error message in production
- [ ] Telegram alerts on bugs

## Who uses it?

<table>
<tr>
	<td align="center">
		<a href="https://nucleus.sh"><img src="https://nucleus.sh/logo_color.svg" height="64" /></a>
	</td>
	<td align="center">
		<a href="https://eliopay.com"><img src="https://eliopay.com/logo_black.svg" height="64" /></a>
	</td>
	<td align="center">
		<a href="https://backery.io"><img src="https://backery.io/logo_color.svg" height="64" /></a>
	</td>
	<td align="center">
		<a href="https://lttrfeed.com"><img src="https://lttrfeed.com/icon.svg" height="64" /></a>
	</td>
	<td align="center">
		<a href="https://litch.app"><img src="https://litch.app/img/logo.png" height="64" /></a>
	</td>
</tr>
<tr>
	<td align="center">Nucleus</td>
	<td align="center">ElioPay</td>
	<td align="center">Backery</td>
	<td align="center">Lttrfeed</td>
	<td align="center">Litch.app</td>
</tr>
</table>

_👋 Want to be listed there? [Contact me](mailto:vince@lyser.io)._


## How to use

```bash
npm install express-error-page
```

Then require the module

```javascript
const errorsHandler = require('express-error-page')({
	background: 'red', // Can be any valid CSS background property value
	customCSS: 'body {color: #000}', 
})
```

And add the handlers at the end of your app (just before `app.listen()`)

```javascript
app.use(errorsHandler.handler)
app.use(errorsHandler.notFound)
```


<!-- ## Telegram Alerts

You can receive alerts via Telegram when an unhandled error happen in your app.

Get a token as explained [here](https://www.siteguarding.com/en/how-to-get-telegram-bot-api-token) and get your user chat id (`telegramChat`) by talking to [@get_id_bot](https://telegram.me/get_id_bot)
 -->
