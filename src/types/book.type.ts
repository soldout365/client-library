import type { AuthorBookRefType } from './author.type'
import type { BookCategoryBookRefType } from './book-category.type'
import type { QueryParamsType } from './common.type'
import type { PublisherBookRefType } from './publisher.type'

export enum EBookType {
	PHYSICAL = 'physical',
	EBOOK = 'ebook'
}

export enum EPhysicalType {
	BORROWABLE = 'borrowable',
	LIBRARY_USE = 'library_use'
}

export enum EView {
	ASC = 'asc',
	DESC = 'desc'
}

export type BookType = {
	id: string
	title: string
	slug: string
	isbn: string
	publish_year: number
	edition: string
	description: string | null
	cover_image: string | null
	language: string
	page_count: number
	book_type: EBookType
	physical_type: EPhysicalType
	publisher_id: string
	publisher: PublisherBookRefType
	category_id: null
	category: null
	main_category_id: string
	mainCategory: BookCategoryBookRefType
	authors: AuthorBookRefType[]
	created_at: string
	view: number
	updated_at: string
}

export type BookQueryParamsType = QueryParamsType & {
	q?: string
	type?: EBookType
	main_category_id?: string
	category_id?: string
	view?: EView
}
