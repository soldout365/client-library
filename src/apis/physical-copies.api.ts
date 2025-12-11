import type { PaginationType, QueryParamsType } from '@/types/common.type'

import instance from '@/configs/instance'
import type { PhysicalBook, UpdatePhysicalCopyStatusRequest } from '@/types/physical-copies.type'

export const physicalCopiesApi = {
	getPhysicalCopyByBookId: async (
		bookId: string,
		params?: QueryParamsType
	): Promise<PaginationType<PhysicalBook>> => {
		const response = await instance.get<PaginationType<PhysicalBook>>(`/physical-copies/book/${bookId}`, {
			params
		})
		return response.data
	},
	getAvailablePhysicalCopiesByBookId: async (bookId: string): Promise<PaginationType<PhysicalBook>> => {
		const response = await instance.get<PaginationType<PhysicalBook>>(`/physical-copies/book/${bookId}/available`)
		return response.data
	},
	updatePhysicalCopyStatus: async (
		id: string,
		payload: UpdatePhysicalCopyStatusRequest
	): Promise<PhysicalBook> => {
		const response = await instance.patch<PhysicalBook>(`/physical-copies/${id}/status`, payload)
		return response.data
	}
}
