const fs = require('fs');
const http = require('http');
const https = require('https');
const queryString = require('querystring');

function buildOptionsObj (username) {
  return {
    hostname: `api.github.com`,
    path: `/users/${username}/repos`,
    headers: {
      'User-Agent': 'github-grabber'
    }
  };
}

const githubServer = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', d => {
      body += d;
    });
    req.on('end', () => {
      const username = queryString.parse(body).username;
      const ws = fs.createWriteStream(`./${username}_repos.txt`);
      const opts = buildOptionsObj(username);

      https.get(opts, (dataStream) => {
        let repoData = "";
        dataStream.on('data', chunk => { repoData += chunk });
        dataStream.on('end', () => {
          const repos = JSON.parse(repoData).map(repo => {
            return `Repo: ${repo.name}`;
          }).join('\n');
          ws.write(repos);
          res.end(repos);
        });
      });
    });
  }
});

githubServer.listen(8000, () => console.log('Listening on port 8000'));
