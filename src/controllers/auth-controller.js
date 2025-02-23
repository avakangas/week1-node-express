import { selectUserByNameAndPassword } from "../models/user-model";

// user authentication (login)
const login = async (req, res) => {
  const {username, password} = req.body;
  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }
  const user = await selectUserByNameAndPassword(username, password);
  if (user) {
    res.json({message: 'login ok', user});
  } else {
    res.status(401).json({message: 'Bad username/password.'});
  }
};

export {login};
