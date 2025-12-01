import type { BookCategoryParamsType, BookCategoryType, SearchBookCategoryParamsType } from '@/types/book-category.type'

import axiosInstance from '@/configs/instance'
import type { PaginationType } from '@/types/common.type'

export const bookCategoryApi = {
	// get book categories
	getBookCategories: async (params?: BookCategoryParamsType): Promise<PaginationType<BookCategoryType>> => {
		const response = await axiosInstance.get<PaginationType<BookCategoryType>>('/book-categories', {
			params
		})
		return response.data
	},

	searchBookcategory: async (params: SearchBookCategoryParamsType): Promise<PaginationType<BookCategoryType>> => {
		const response = await axiosInstance.get('/book-categories/search', {
			params
		})
		return response.data
	},
	getAllBookCategory: async (): Promise<BookCategoryType[]> => {
		const response = await axiosInstance.get<BookCategoryType[]>('/book-categories/all')
		return response.data
	}
}
