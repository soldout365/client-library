import type { EbookCreateType, EbookQueryParamsType, EBookType } from '@/types/ebook.type'
import type { PaginationType } from '@/types/common.type'
import instance from '@/configs/instance'

export const ebookApi = {
	// get ebook by book id
	getEbookByBookId: async (bookId: string, params?: EbookQueryParamsType): Promise<PaginationType<EBookType>> => {
		const response = await instance.get<PaginationType<EBookType>>(`/ebooks/book/${bookId}`, {
			params
		})

		return response.data
	},

	// increase ebook download count
	increaseDownloadCount: async (ebookId: string) => {
		const response = await instance.post(`/ebooks/${ebookId}/increment-downloads`, {})
		return response.data
	}
}
