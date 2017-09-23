const fs = require('fs');
const http = require('http');
const queryString = require('querystring');

// let letter = process.argv[2].toUpperCase();
//
function selectAnimals(animalString, animalLetter) {
  return animalString
    .split('\n')
    .filter(animal => animal.startsWith(animalLetter))
    .join('\n');
}
//
// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   let animals = data.split('\n');
//
//   let selectedAnimals = selectAnimals(data, letter);
//
//   fs.writeFile(`./${letter}_animals.txt`, selectedAnimals, err => {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("successfully written");
//     }
//   });
// });

const server = http.createServer((req, res) => {
  const query = req.url.split('?')[1];

  if (query !== undefined) {
    let animalLetter = queryString.parse(query).letter.toUpperCase();

    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        res.end('Not Working');
        return;
      }
      const animals = selectAnimals(data, animalLetter);
      res.end(animals);
    });
  } else {
    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if(err) {
        console.log(err);
        res.end('Not Working');
        return;
      } else {
        res.end(data);
      }
    });
  }
});

server.listen(8000, () => console.log("I'm listening on port 8000"));
