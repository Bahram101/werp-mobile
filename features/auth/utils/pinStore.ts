import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

import { EnumSecureStore } from '@/types/auth.interface'

export const savePinCode = async (pin: string) => {
  await setItemAsync(EnumSecureStore.PIN, pin)
}

export const getPinCode = async () => {
  const pinCode = await getItemAsync(EnumSecureStore.PIN)
  return pinCode || null
}

export const removePinCode = async () =>{
  await deleteItemAsync(EnumSecureStore.PIN)
}