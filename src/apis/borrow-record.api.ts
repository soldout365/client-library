import instance from '@/configs/instance'
import type { BorrowRecordQueryParamsType, BorrowRecordResponseType } from '@/types/borrow-record.type'
import { EBorrowRecordStatus } from '@/types/borrow-record.type'

export const borrowRecordApi = {
	getBorrowRecordsByStatus: async (
		status: EBorrowRecordStatus,
		readerId: string
	): Promise<BorrowRecordResponseType> => {
		const response = await instance.get<BorrowRecordResponseType>(`/borrow-records/status/${status}`, {
			params: {
				readerId
			}
		})
		return response.data
	}
}
