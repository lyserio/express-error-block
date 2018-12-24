# express-mini-errors

A simple error handler for Express (4+). 

Support error reporting via `next()` and automatically handles 404.

It renders a simple HTML page. 

## Future features
- Telegram alerts
- Customization of background

## How to use

```
npm install express-mini-errors
```

Add to the end of your app:
```
app.use(require('express-mini-errors))
```

