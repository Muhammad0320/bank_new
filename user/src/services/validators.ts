import { body } from 'express-validator';


export const nameValidator = () =>
  body('name')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Please provide a valid name');

export const emailValidator = () =>
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Please provide a valid email');

export const passwordValidator = (field: string = 'password') =>
  body(field)
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 chars');

export const passwordConfirmationValidator = () =>
  body('passwordConfirm')
    .trim()
    .notEmpty()
    .isString()
    .custom((input: string, { req }) => input === req.body.password)
    .withMessage('Passwords are not the same');

export const phoneValidator = () =>
  body('phone')
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number');


export const usernameValidator = () =>
         body('username')
           .isString()
           .notEmpty()
           .isLength({ min: 6 })
           .withMessage('Please provide a valid username: min of 6 chars');