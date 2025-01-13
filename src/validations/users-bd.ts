import { body } from 'express-validator'

export const validateUserBd  = [
  body('name')
    .isString()
    .withMessage('Имя должно быть строкой'),
  body('email')
    .isString()
    .isEmail()
    .withMessage('Некорректный email адрес')
];
