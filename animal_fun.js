const fs = require('fs');
const http = require('http');
const queryString = require('querystring');
const cache = {};

//////////////////////////////////////////// PART 1

// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//
//   console.log(data);
// });
//
// fs.writeFile('./example.txt', 'written', err => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//
//   console.log("successfully written");
// });

//////////////////////////////////////////// PART 2

// const animalLetter = (process.argv[2]).toUpperCase();
//
// function selectAnimals(letter, animals) {
//   return animals.split('\n')
//   .filter(animal => animal.startsWith(letter))
//   .join('\n');
// }
//
//
// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//
//   let animals = selectAnimals(animalLetter, data);
//
//   fs.writeFile(`./${animalLetter}_animals.txt`, animals, err => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//
//     console.log("Successfully returned matching animals");
//   });
// });

//////////////////////////////////////////// PART 3

// const server = http.createServer((req, res) => {
//   res.write('Hello Brandon');
//   res.end();
// });
//
// server.listen(8000, () => console.log('Listening on port 8000'));

//////////////////////////////////////////// PART 4

function selectAnimals(animalLetter, animals) {
  return animals.split('\n')
    .filter(animal => animal.startsWith(animalLetter))
    .join('\n');
}

const animalServer = http.createServer((req, res) => {
  let query = req.url.split('?')[1];

  if (query !== undefined) {
    let letter = queryString.parse(query).letter.toUpperCase();

    if (cache[letter] !== undefined) {
      return cache[letter];
    }

    if (letter !== undefined) {
      fs.readFile('./animals.txt', 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          res.end('Not Working');
          return;
        }

        const animals = selectAnimals(letter, data);
        cache[letter] = animals;
        res.end(animals);
      });
    }
  } else {
    if (cache['animals'] !== undefined) {
      return cache['animals'];
    }

    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        res.end('Not Working');
        return;
      }

      cache['animals'] = data;
      res.end(data);
    });
  }
});

animalServer.listen(8000, () => console.log('Listening on port 8000'));
