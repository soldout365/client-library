import type { BookQueryParamsType } from '@/types/book.type'
import { useQuery } from '@tanstack/react-query'
import { bookApi } from '@/apis/book.api'

export const useBooks = (params?: BookQueryParamsType, enabled: boolean = true) => {
	return useQuery({
		queryKey: [bookApi.getBooks.name, params],
		queryFn: () => bookApi.getBooks(params),
		enabled: enabled
	})
}

export const useGetBookById = (bookId?: string, enabled: boolean = true) => {
	return useQuery({
		queryKey: [bookApi.getBookById.name, bookId],
		queryFn: () => bookApi.getBookById(bookId as string),
		enabled: enabled && !!bookId
	})
}
