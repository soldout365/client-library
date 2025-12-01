import type { BookQueryParamsType, BookType } from '@/types/book.type'

import type { PaginationType } from '@/types/common.type'
import instance from '@/configs/instance'

export const bookApi = {
	// get books
	getBooks: async (params?: BookQueryParamsType): Promise<PaginationType<BookType>> => {
		const response = await instance.get<PaginationType<BookType>>('/books', {
			params
		})
		return response.data
	},

	// get book by id
	getBookById: async (bookId: string): Promise<BookType> => {
		const response = await instance.get(`/books/${bookId}`)
		return response.data
	}
}
