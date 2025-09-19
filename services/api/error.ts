export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message
  // console.log('EEEEE', JSON.stringify(error.response, null, 2))

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message
}
