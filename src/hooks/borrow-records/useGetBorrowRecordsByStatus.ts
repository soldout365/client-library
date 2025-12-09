import { useQuery } from '@tanstack/react-query'
import { borrowRecordApi } from '@/apis/borrow-record.api'
import type { BorrowRecordResponseType } from '@/types/borrow-record.type'
import { EBorrowRecordStatus } from '@/types/borrow-record.type'

export const useGetBorrowRecordsByStatus = (status: EBorrowRecordStatus, readerId: string | undefined) => {
	return useQuery<BorrowRecordResponseType>({
		queryKey: ['borrow-records', status, readerId],
		queryFn: () => borrowRecordApi.getBorrowRecordsByStatus(status, readerId!),
		enabled: !!status && !!readerId,
		retry: 1
	})
}
