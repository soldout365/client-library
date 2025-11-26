import { useQuery } from '@tanstack/react-query'
import { userApis } from '@/apis/user.api'
import type { UserType } from '@/types/user.type'

export const useUserInfo = () => {
	const authData = localStorage.getItem('authStore')
	const token = authData ? JSON.parse(authData)?.state?.accessToken : null

	const {
		data: userInfo,
		isLoading,
		error,
		refetch
	} = useQuery<UserType>({
		queryKey: ['userInfo'],
		queryFn: async () => {
			return await userApis.getInfoCurrentUser(token)
		}
	})

	return {
		userInfo: userInfo || null,
		isLoading,
		error: error ? (error as Error).message : null,
		refetch
	}
}
