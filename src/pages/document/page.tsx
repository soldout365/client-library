import { useBooks } from '@/hooks/books/useGetBooks'
import { useQueryParams } from '@/hooks/useQueryParam'
import { EBookType, type BookQueryParamsType } from '@/types/book.type'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { BookSection } from './components/BookSection'
import { Header } from '@/components/header'

const DocumentPage = () => {
	const navigate = useNavigate()

	const param = useQueryParams()

	const { data: bookData, isLoading: isBookLoading } = useBooks(param as BookQueryParamsType)

	const physicalBooks = bookData?.data?.filter((book) => book.book_type === EBookType.PHYSICAL).slice(0, 4) || []
	const ebooks = bookData?.data?.filter((book) => book.book_type === EBookType.EBOOK).slice(0, 4) || []

	const navigateToViewAll = (book_type: EBookType) => {
		navigate({
			pathname: '/view-all-documents',
			search: createSearchParams({
				type: book_type,
				page: '1'
			}).toString()
		})
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<Header />

			{/* Main Content */}
			<main className='max-w-7xl mx-auto px-4 py-8'>
				{isBookLoading ? (
					<div className='flex justify-center items-center h-64'>
						<div className='text-gray-500'>Đang tải...</div>
					</div>
				) : (
					<>
						<BookSection
							title='Sách giấy'
							books={physicalBooks}
							onViewAll={() => navigateToViewAll(EBookType.PHYSICAL)}
						/>
						<BookSection
							title='Sách điện tử'
							books={ebooks}
							onViewAll={() => navigateToViewAll(EBookType.EBOOK)}
						/>
					</>
				)}
			</main>
		</div>
	)
}

export default DocumentPage
