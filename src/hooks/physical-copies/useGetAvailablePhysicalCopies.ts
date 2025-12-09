import { physicalCopiesApi } from '@/apis/physical-copies.api'
import type { PaginationType } from '@/types/common.type'
import type { PhysicalBook } from '@/types/physical-copies.type'
import { useQuery } from '@tanstack/react-query'

export const useGetAvailablePhysicalCopies = (bookId: string | undefined) => {
	return useQuery<PaginationType<PhysicalBook>>({
		queryKey: ['physical-copies', 'available', bookId],
		queryFn: () => physicalCopiesApi.getAvailablePhysicalCopiesByBookId(bookId!),
		enabled: !!bookId,
		retry: 1
	})
}
