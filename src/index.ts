import express, { Request, Response } from 'express';
import userRoutes from './routers/userRoutes'
import userBdRoutes from './routers/user-bd-routes'
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/api/users', userRoutes);
app.use('/api/users-bd', userBdRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
