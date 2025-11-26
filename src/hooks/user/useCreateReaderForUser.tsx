import { userApis } from '@/apis/user.api'
import type { CreateReaderRequest } from '@/types/reader.type'
import { useMutation } from '@tanstack/react-query'
// import { toast } from 'sonner'

export const useCreateReaderForUser = () => {
	const mutation = useMutation({
		mutationKey: ['createReader'],
		mutationFn: async ({ userId, payload }: { userId: string; payload: CreateReaderRequest }) => {
			return await userApis.createReaderforUser(userId, payload)
		},
		onSuccess: () => {
			// toast.success('tao reader cho user thanh cong')
		},
		onError: () => {
			// toast.error('failed')
		}
	})
	return {
		createReaderForUserAsync: mutation.mutateAsync,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
		isLoading: mutation.isPending
	}
}
