# express-error-page

A minimalsit simple error handler for Express (4+) which returns an error page and can send you bug alerts via Telegram.

Support error reporting via `next()` and automatically handles 404.

It renders a simple HTML page, which can be customised via options.

## Who uses it?

<table>
<tr>
<td align="center"><a href="https://nucleus.sh/"><img src="https://nucleus.sh/logo_color.svg" height="64" /></a></td>
</tr>
<tr>
<td align="center">Nucleus</td>
</tr>
</table>

_👋 Want to be listed there? [Contact me](mailto:vince@lyser.io)._


## Features
- Telegram alerts on bugs
- Change the page background
- Add custom CSS
- Respond in JSON if API detected

## How to use

```
npm install express-error-page
```

Add to the end of your app:
```
const errorsHandler = require('express-error-page')

app.use(errorsHandler({
	background: 'red', // Can be any valid CSS background property value
	customCSS: 'body {color: #000}', 
	telegramAlerts: false,
	telegramToken: 'xxxxxx',
	telegramConversation: 'xxxxx'
}))
```


## Telegram Alerts

You can receive alerts via Telegram when an unhandled error happen in your app.

Get a token as explained [here](https://www.siteguarding.com/en/how-to-get-telegram-bot-api-token) and get your user id as explained [here]()

