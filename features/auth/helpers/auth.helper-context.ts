let setUserFunction: ((user: null) => void) | null = null

export const registerSetUser = (fn: (user: null) => void) => {
  setUserFunction = fn
}

export const logoutWithContext = async (logoutFn: () => Promise<void>) => {
  await logoutFn()
  if (setUserFunction) setUserFunction(null)
}
