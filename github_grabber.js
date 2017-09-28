const fs = require('fs');
const http = require('http');
const https = require('https');
const queryString = require('querystring');

const githubServer = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', d => {
      body += d;
    });
    req.on('end', () => {
      const username = queryString.parse(body).username;
      res.end(username);
    });
  }
});

githubServer.listen(8000, () => console.log('Listening on port 8000'));
