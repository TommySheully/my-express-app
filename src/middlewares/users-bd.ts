// middlewares/validateUser .ts

import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { ErrorResponse, SuccessResponse } from '../shared/types/response-types'
import { User } from '../models/user'

export const validationMiddleware = async (req: Request, res: Response<SuccessResponse<User>|ErrorResponse>, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ data: errors.mapped(), message: 'Некорректные данные' })
    return
  }

  next()
}

