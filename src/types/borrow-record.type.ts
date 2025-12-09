import type { PaginationType, QueryParamsType } from './common.type'

export enum EBorrowRecordStatus {
	BORROWED = 'borrowed',
	RETURNED = 'returned',
	OVERDUE = 'overdue',
	RESERVED = 'reserved'
}

export type BorrowRecordType = {
	id: string
	readerId: string
	physicalCopyId: string
	status: EBorrowRecordStatus
	borrowDate: string
	dueDate: string
	returnDate: string | null
	createdAt: string
	updatedAt: string
}

export type BorrowRecordQueryParamsType = QueryParamsType & {
	status?: EBorrowRecordStatus
	readerId?: string
}

export type BorrowRecordResponseType = PaginationType<BorrowRecordType>
