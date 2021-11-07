const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/mud-trackr-ui'));

app.get('/service-url', (req, res) => {
	res.json({url: process.env.API_URL})
});

app.get('/*', (req,res,next) => {
	res.sendFile(path.join(__dirname + '/dist/mud-trackr-ui/index.html'));
});

app.listen(process.env.PORT || 8000);
