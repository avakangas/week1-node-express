
import express from 'express';
import {addItem, deleteItem, editItem, getItemById, getItems} from './items.js';
import {addUser, getUsers, login} from './users.js';
import cors from 'cors';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// tätä tarvitaan, jotta Ullan fronttiharjoitukset toimivat (Vite)
// lisää myös: import cors from 'cors'; tiedoston yläosaan
// ja asenna paketti: npm install cors
app.use(cors());

// Staattinen html-sivusto tarjoillaan palvelimen juuressa
app.use('/', express.static('public'));
// middleware, joka lukee json data POST-pyyntöjen rungosta (body)
app.use(express.json());
// rest-apin resurssit tarjoillaan /api/-polun alla
app.get('/api/', (req, res) => {
  console.log('get-pyyntö apin juureen havaittu');
  console.log(req.url);
  res.send('Welcome to my REST API!');
});

// Items resurssin päätepisteet (endpoint)
app.get('/api/items', getItems);
app.get('/api/items/:id', getItemById);
app.post('/api/items', addItem);
app.put('/api/items/:id', editItem);
app.delete('/api/items/:id', deleteItem);

// Users resurssin päätepisteet
app.get('/api/users', getUsers);
app.post('/api/users', addUser);
app.post('/api/users/login', login);


// Alla olevat eivät ole varsinaisia sovelluksessa tarvittavia ominaisuuksia,
// mutta säästetty esimerkkeinä expressin toiminnasta
// syötteen lukeminen reittiparametreista (route params)
app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log(req.params);
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);
  // testataan, jos jompikumpi luvuista ei ole numero, niin lähetään
  // virhetilakoodi ja viesti json-muodossa
  if(isNaN(num1) || isNaN(num2)) {
    res.status(400);
    res.json({
      error: 'Both parameters must be numbers!'
    });
    return;
  }
  res.json({
    num1,
    num2,
    sum: num1 + num2
  });
});

// syötteen lukeminen kyselyparametreista (query params)
app.get('/api/sum/', (req, res) => {
  console.log(req.query);
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  res.json({
    num1,
    num2,
    sum: num1 + num2
  });
});

// POST-pynnön käsittely ja datan lukeminen pyynnön bodystä
app.post('/api/moro', (req, res) => {
  console.log(req.body);
  res.status(200);
  res.json({reply: 'no Moro ' + req.body.sender});
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
