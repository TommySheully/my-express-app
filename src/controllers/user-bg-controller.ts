import { Request, Response } from 'express'

import { User } from '../models/user'
import { ErrorResponse, SuccessResponse } from '../shared/types/response-types'
import pool from '../config/bd'

export const getUsersBd = async (req: Request, res: Response<SuccessResponse<User[]>|ErrorResponse>) => {
  try {
    const result = await pool.query<User>('SELECT * FROM users')

    if (!result.rows.length) {
      res.status(404).json({ data: null, message: 'Пользователи не найдены' })
      return
    }

    res.status(200).json({ data: result.rows, message: 'Пользователи успешно найдены' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: error, message: 'Ошибка при получении пользователей' })
  }
}

export const getUserBdById = async (req: Request, res: Response<SuccessResponse<User>|ErrorResponse>): Promise<void> => {
  const userId = req.params.id
  try {
    const result = await pool.query<User>('SELECT * FROM users WHERE id = $1', [userId])
    const user = result.rows[0]

    if (!user) {
      res.status(404).json({ data: null, message: 'Пользователь не найден' })
      return
    }

    res.status(200).json({ data: user, message: 'Пользователь успешно найден' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Ошибка при получении пользователя' })
  }
}

export const createUserBd = async (req: Request, res: Response<SuccessResponse<User>|ErrorResponse>): Promise<void> => {
  const { name, email } = req.body
  const id = crypto.randomUUID()

  try {
    const result = await pool.query<User>(
      'INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *',
      [id, name, email]
    )
    const newUser = result.rows[0]

    res.status(201).json({ data: newUser, message: 'Пользователь успешно добавлен' })
  } catch (error) {
    console.error('Ошибка при добавлении пользователя:', error)
    res.status(500).json({ data: error, message: 'Ошибка при добавлении пользователя' })
  }
}

export const updateUserBd = async (req: Request, res: Response<SuccessResponse<User>|ErrorResponse>): Promise<void> => {
  const userId = req.params.id
  const { name, email } = req.body
  try {
    const result = await pool.query<User>(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, userId]
    )
    const updatedUser = result.rows[0]

    if (!updatedUser) {
      res.status(404).json({ data: null, message: 'Пользователь не найден' })
      return
    }

    res.status(200).json({ data: updatedUser, message: 'Пользователь успешно обновлен' })
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error)
    res.status(500).json({ data: null, message: 'Ошибка при обновлении пользователя' })
  }
}

export const deleteUserBd = async (req: Request, res: Response<SuccessResponse<null> | ErrorResponse>): Promise<void> => {
  const userId = req.params.id;
  try {
    const result = await pool.query<User>('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    const deletedUser  = result.rows[0];

    if (!deletedUser ) {
       res.status(404).json({ data: null, message: 'Пользователь не найден' });
      return
    }

    res.status(204).json({ data: null, message: 'Пользователь успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).json({ data: null, message: 'Ошибка при удалении пользователя' });
  }
};
