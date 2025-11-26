import { useMutation } from '@tanstack/react-query'
import { readerApis } from '@/apis/reader.api'
import type { UpdateInfoReaderByIdRequest, Reader } from '@/types/reader.type'
import { useAuthStore } from '@/stores/auth.store'

interface UpdateReaderParams {
	id: string
	payload: UpdateInfoReaderByIdRequest
}

export const useUpdateReaderById = () => {
	const setReader = useAuthStore((state) => state.setReader)

	const mutation = useMutation<Reader, Error, UpdateReaderParams>({
		mutationFn: ({ id, payload }) => readerApis.updateInfoReaderById(id, payload),
		onSuccess: (data) => {
			setReader(data)
		}
	})

	return {
		updateReaderAsync: mutation.mutateAsync,
		isUpdating: mutation.isPending,
		error: mutation.error
	}
}
