import { authInstance } from "@/services/api/auth-instance"
import { IAuthResponse } from "@/types/auth.interface"
import { getRefreshToken, saveAccessToken } from "./auth.storage"

export const getNewTokens = async () => {
  console.log('getNewTokens')
  try {
    const refreshToken = await getRefreshToken()
    if (!refreshToken) throw new Error('No refresh token found')

    const body = new URLSearchParams()
    body.set('grant_type', 'refresh_token')
    body.set('refresh_token', refreshToken)

    const { data } = await authInstance.post<IAuthResponse>(
      '/token',
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic V0VSUDpwYXNzd29yZA=='
        }
      }
    )

    if (data.access_token) await saveAccessToken(data.access_token)

    return data
  } catch (e) {
    console.log('Error new token', e)
    throw e
  }
}
