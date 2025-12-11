export type CreateReservationRequest = {
	reader_id: string
	book_id: string
	physical_copy_id: string
	reservation_date: string // ISO 8601 format
	expiry_date: string // ISO 8601 format
	reader_notes: string
	priority: number
}

export type ReservationResponse = {
	id: string
	reader_id: string
	book_id: string
	physical_copy_id: string
	reservation_date: string
	expiry_date: string
	status: string
	reader_notes: string
	librarian_notes: string | null
	fulfillment_date: string | null
	fulfilled_by: string | null
	cancelled_date: string | null
	cancellation_reason: string | null
	cancelled_by: string | null
	priority: number
	created_at: string
	updated_at: string
}
