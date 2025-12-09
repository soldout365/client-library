import { createSearchParams, useNavigate } from 'react-router-dom'

import { BookCard } from '@/features/document/components/book-card'
import type { BookQueryParamsType } from '@/types/book.type'
import PaginationWrapper from '@/components/pagination-wrapper'
import { useBooks } from '@/hooks/books/useGetBooks'
import { useQueryParams } from '@/hooks/useQueryParam'

export const BooksGrid = () => {
	const queryParams = useQueryParams()
	const navigate = useNavigate()

	const { data: bookData, isLoading } = useBooks({
		...queryParams,
		limit: 8
	} as BookQueryParamsType)

	const books = bookData?.data || []

	// Handle change page
	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: '/view-all-documents',
			search: createSearchParams({
				...queryParams,
				limit: '8',
				page: newPage.toString()
			}).toString()
		})
	}

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-gray-500'>Đang tải...</div>
			</div>
		)
	}

	return (
		<>
			<div className='grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4'>
				{books?.map((book) => (
					<BookCard key={book.id} book={book} />
				))}
			</div>

			{books?.length === 0 && (
				<div className='py-12 text-center'>
					<p className='text-gray-500'>Không tìm thấy sách nào</p>
				</div>
			)}

			{/* pagination */}
			<PaginationWrapper
				currentData={books?.length || 0}
				onChangePage={handleChangePage}
				currentMeta={bookData?.meta}
			/>
		</>
	)
}
