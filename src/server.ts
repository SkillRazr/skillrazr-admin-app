import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { adminPermissions } from './_mock/assets';

const app = express();
const PORT = 5000;

// Secret key for JWT
const JWT_SECRET = 'skillrazr_admin_app_1234$2893';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock user data (replace this with your database in a real app)
interface User {
  username: string;
  password: string;
  permissions: any;
}
const users: User[] = [];

console.log('users in the server', users);
console.log('hello');
//
// Signup endpoint
app.post('/signup', async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  console.log('signup, userName', 'password', username, password);

  // Check if the user already exists
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user
  users.push({ username, password: hashedPassword, permissions: adminPermissions });

  console.log('hashed password', hashedPassword, 'users database', users);

  return res.status(201).json({ message: 'User created successfully', status: 0, data: [] });
});

// Signin endpoint
app.post('/signin', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const now = Date.now();
  const expiresIn = new Date(now + 1 * 60 * 1000).toISOString();

  console.log('sign in, userName', 'password', username, password, expiresIn);

  // Find the user
  const user = users.find((user) => user.username === username);

  console.log('user found ', user);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ status: 0, data: { user, accessToken: token, expiresIn } });
});

// Protected route example
app.get('/protected', (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'You are not authorized to access this' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.json({ message: 'Protected route accessed', user: decoded, status: 0 });
  });
});

// const tokenCheck = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(401).json({ message: 'You are not authorized to access this'});
//     }   else {
//         // do token checks using jwt
//         jwt.verify(token, JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ message: 'Invalid token' });
//             }

//             next()
//         });
//     }
// }

// app.get('/getExerciseMarks', [tokenCheck], (req: Request, res: Response) => {
//     const {userName} = req;

//     // make a db call to get exercise scroes for this userName

//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(401).json({ message: 'You are not authorized to access this' });
//     }
//     // get exerciseScore from exerciseDb

// });

// app.get('/getQuizScores', [tokenCheck], (req: Request, res: Response) => {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(401).json({ message: 'You are not authorized to access this' });
//     }

//      // get quizScore from exerciseDb
// });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
