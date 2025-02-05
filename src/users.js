
const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

// kaikkien käyttäjätietojen haku
const getUsers = (req, res) => {
  res.json(users);
};

// TODO (kotihommia): toteuta ja testaa getUserById()

// käyttäjän lisäys (rekisteröinti)
const addUser = (req, res) => {
  console.log('addUser request body', req.body);
  // esitellään 3 uutta muuttujaa, johon sijoitetaan req.body:n vastaavien propertyjen arvot
  const {username, password, email} = req.body;
  // tarkistetaan, että pyynnössä on kaikki tarvittavat tiedot
  if (username && password && email) {
    // generoidaan id-numero uudelle käyttäjälle (yhtä suurempi kuin viimeisin)
    const latestId = users[users.length - 1].id;
    // luodaan uusi käyttäjä olio ja lisätään se users-taulukkoon
    const newUser = {
      id: latestId + 1,
      username,
      password,
      email,
    };
    users.push(newUser);
    res.status(201);
    return res.json({message: 'User added.'});
  }
  res.status(400);
  return res.json({
    message: 'Request should have username, password and email properties.',
  });
};

// user authentication (login)
const login = (req, res) => {
  const {username, password} = req.body;
  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }
  const user = users.find((user) => user.username === username);
  // jos user-olio löytyy ja sen password-ominaisuus täsmää requestissa
  // lähetetyn password:n arvon kanssa, lähetetään vastauksessa viesti ja
  // löydetyn käyttäjän kaikki tiedot
  if (user && user.password === password) {
    res.json({message: 'login ok', user});
  } else {
    res.status(401).json({message: 'Bad username/password.'});
  }
};

export {getUsers, addUser, login};
