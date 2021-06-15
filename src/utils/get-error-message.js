const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
  EMAIL_EXISTS: 'Пользователь с таким email уже зарегистрирован',
  INVALID_PASSWORD: 'Неверный пароль',
  admin: 'Необходим доступ администратора',
  auth: 'Пожалуйста войдите в систему'
}

export default function getErrorMessage(code) {
  return ERROR_CODES[code] || 'Неизвестная ошибка'
}
