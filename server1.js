const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

const options = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/server.crt')
};

app.get('/', (req, res) => {
    res.send('Hello, HTTPS!');
});

https.createServer(options, app).listen(443, () => {
    console.log('HTTPS server running on port 443');
});
