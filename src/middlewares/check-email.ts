import { Request, Response, NextFunction } from 'express'
import { ErrorResponse, SuccessResponse } from '../shared/types/response-types'
import { User } from '../models/user'
import pool from '../config/bd'

export const checkEmailMiddleware = async (req: Request, res: Response<SuccessResponse<User>|ErrorResponse>, next: NextFunction) => {
  const { email } = req.body

  const checkEmail = await pool.query(
    'SELECT id FROM users WHERE email = $1',
    [email]
  )

  if (checkEmail.rows.length > 0) {
    res.status(400).json({ data: null, message: 'Пользователь с таким email уже существует' })
    return
  }

    next()
}

