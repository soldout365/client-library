import type { QueryParamsType } from './common.type'
import type { LocationType } from './location.type'

export enum EPhysicalCopyStatus {
	AVAILABLE = 'available',
	BORROWED = 'borrowed',
	RESERVED = 'reserved',
	MAINTENANCE = 'maintenance'
}

export type PhysicalCopyQueryParamsType = QueryParamsType

export type PhysicalBook = {
	id: string
	book_id: string
	book: {
		id: string
		title: string
		slug: string
		isbn: string
		publish_year: number
		edition: string
		description: string
		cover_image: string
		language: string
		page_count: number
		book_type: string
		physical_type: string
		publisher_id: string
		category_id: string
		main_category_id: string
		created_at: string // ISO date string
		updated_at: string // ISO date string
		view: number
	}
	barcode: string
	status: EPhysicalCopyStatus
	current_condition: string
	condition_details: string
	purchase_date: string // ISO date string
	purchase_price: string
	location_id: string
	location: LocationType
	notes: string
	last_checkup_date: string // ISO date string
	is_archived: boolean
	created_at: string
	updated_at: string
}

export type PhysicalCopyAvailableResponseType = {
	data: PhysicalBook[]
	totalItems: number
}

export type CreatePhysicalBookRes = {
	id: string
	book_id: string
	barcode: string
	status: EPhysicalCopyStatus
	current_condition: string
	condition_details: string
	purchase_date: string
	purchase_price: number
	location_id: string
	notes: string
	last_checkup_date: string
	is_archived: boolean
	created_at: string
	updated_at: string
}

export type CreatePhysicalBookReq = Pick<
	CreatePhysicalBookRes,
	| 'book_id'
	| 'barcode'
	| 'status'
	| 'current_condition'
	| 'condition_details'
	| 'purchase_date'
	| 'purchase_price'
	| 'location_id'
	| 'notes'
	| 'last_checkup_date'
	| 'is_archived'
>

export type UpdatePhysicalCopyStatusRequest = {
	status: 'available' | 'borrowed' | 'reserved' | 'damaged' | 'lost' | 'maintenance'
	notes?: string
}