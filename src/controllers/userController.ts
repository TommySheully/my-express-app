import { Request, Response } from 'express'
import { User, users } from '../models/user'
import { ErrorResponse, SuccessResponse } from '../shared/types/response-types'

export const getUsers = (req: Request, res: Response<SuccessResponse<User[]>|ErrorResponse>) => {
  const findUsers = users
  if (findUsers) {
    res.status(200).json({ data: findUsers, message: 'Пользователи успешно найдены' })
  } else {
    res.status(404).json({ data: null, message: 'Пользователи не найдены' })
  }
}

export const getUserById = (req: Request, res: Response<SuccessResponse<User>|ErrorResponse>) => {
  const userId = req.params.id
  const user = users.find(u => u.id === userId)
  if (user) {
    res.status(200).json({ data: user, message: 'Пользователь успешно найден' })
  } else {
    res.status(404).json({ data: null, message: 'Пользователь не найден' })
  }
}

export const createUser = (req: Request, res: Response<SuccessResponse<User>|ErrorResponse>) => {
  const newUser: User = {
    id: crypto.randomUUID(),
    name: req.body.name,
    email: req.body.email
  }
  users.push(newUser)
  if (newUser) {
    res.status(200).json({ data: newUser, message: 'Пользователь успешно добавлен' })
  } else {
    res.status(404).json({ data: null, message: 'Пользователь не добавлен' })
  }
}

export const updateUser = (req: Request, res: Response<SuccessResponse<User>|ErrorResponse>) => {
  const userId = req.params.id
  const userIndex = users.findIndex(u => u.id === userId)
  if (userIndex !== -1) {
    const updatedUser: User = {
      id: userId,
      name: req.body.name,
      email: req.body.email
    }
    users[userIndex] = updatedUser
    res.status(200).json({ data: updatedUser, message: 'Пользователь успешно обнавлен' })
  } else {
    res.status(404).json({ data: null, message: 'Пользователь не обнавлен' })
  }
}

export const deleteUser = (req: Request, res: Response<SuccessResponse<User>|ErrorResponse>) => {
  const userId = req.params.id
  const userIndex = users.findIndex(u => u.id === userId)
  if (userIndex !== -1) {
    users.splice(userIndex, 1)
    res.status(204).json({ data: null, message: 'Пользователь успешно удален' })
  } else {
    res.status(404).json({ data: null, message: 'Пользователь не удален' })
  }
}
