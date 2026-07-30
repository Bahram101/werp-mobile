export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message
}

// Часть бэкенд-эндпоинтов кладёт сообщение об ошибке в response.data.response
// в виде JSON-строки — эта строка не гарантированно валидный JSON, поэтому
// парсинг всегда защищён try/catch.
export const parseServiceError = (error: any): string => {
  const raw = error?.response?.data?.response

  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (parsed?.message) return parsed.message
    } catch {
      // raw пришёл не в JSON-формате — используем сообщение ниже
    }
  }

  return error?.response?.data?.message || 'Ошибка сервера'
}
