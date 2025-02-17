import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/*const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
