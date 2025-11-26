import { useMutation } from '@tanstack/react-query'
import { userApis } from '@/apis/user.api'
import type { UpdateUserPayload } from '@/types/user.type'

export const useUpdateUserInfo = () => {
	const mutation = useMutation({
		mutationKey: ['updateUserInfo'],
		mutationFn: async ({ id, payload }: { id: string; payload: UpdateUserPayload }) => {
			return await userApis.updateInfoCurUser(id, payload)
		},
		onSuccess: (data) => {
			console.log(data)
		}
	})

	return {
		updateUserAsync: mutation.mutateAsync,
		isUpdating: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error
	}
}
