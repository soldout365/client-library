import { userApis } from '@/apis/user.api'
import type { RegisterUserRequest } from '@/types/user.type'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useRegisterUser = () => {
	const navigate = useNavigate()
	const mutation = useMutation({
		mutationKey: ['register'],
		mutationFn: async (payload: RegisterUserRequest) => {
			return await userApis.register(payload)
		},
		onSuccess: (data) => {
			toast.success('dang ki thanh cong')
			navigate('/login')
		},
		onError: (error) => {
			toast.error('dang ki that bat')
		}
	})
	return {
		registerUserAsync: mutation.mutateAsync,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
		isPending: mutation.isPending
	}
}
