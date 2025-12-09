import { Card, CardContent } from '@/components/ui/card'
import { EBookType, EPhysicalType } from '@/types/book.type'
import { useNavigate, useParams } from 'react-router-dom'

import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookBorrowAlert } from '@/features/document/[bookId]/components/book-borrow-alert'
import { BookBorrowForm } from '@/features/document/[bookId]/components/book-borrow-form'
import { LibraryUseAlert } from '@/features/document/[bookId]/components/library-use-alert'
import { useBookBorrowValidation } from '@/hooks/books/useBookBorrowValidation'
import { useGetBookById } from '@/hooks/books/useGetBooks'
import { useGetReaderByUserId } from '@/hooks/reader/useGetReaderByUserId'
import { useUserInfo } from '@/hooks/user/useGetInfoCurUser'
import { ChevronLeft } from 'lucide-react'

const BookDetailPage = () => {
	const { bookId } = useParams<{ bookId: string }>()
	const navigate = useNavigate()
	const { data: book, isLoading } = useGetBookById(bookId)
	const { userInfo } = useUserInfo()
	const { data: reader } = useGetReaderByUserId(userInfo?.id || '')
	console.log('🚀 ~ BookDetailPage ~ reader:', reader)

	const validation = useBookBorrowValidation({
		bookId,
		bookType: book?.book_type,
		physicalType: book?.physical_type
	})

	if (isLoading || validation.isLoading) {
		return (
			<div className='min-h-screen bg-gray-50'>
				<Header />
				<div className='flex items-center justify-center h-64'>
					<div className='text-gray-500'>Đang tải...</div>
				</div>
			</div>
		)
	}

	if (!book) {
		return (
			<div className='min-h-screen bg-gray-50'>
				<Header />
				<div className='flex items-center justify-center h-64'>
					<div className='text-gray-500'>Không tìm thấy sách</div>
				</div>
			</div>
		)
	}

	// Xử lý logic hiển thị theo book_type và physical_type
	const renderContent = () => {
		// Nếu là ebook thì hiển thị giao diện đọc sách
		if (book.book_type === EBookType.EBOOK) {
			return (
				<div className='lg:col-span-8'>
					<Card className='h-full'>
						<CardContent className='p-6'>
							<div className='py-12 text-center'>
								<p className='mb-4 text-gray-600'>
									Đây là sách điện tử. Tính năng đọc sách sẽ được phát triển sau.
								</p>
								<Button variant='outline' onClick={() => navigate(-1)}>
									Quay lại
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			)
		}

		// Nếu là physical và library_use thì hiển thị alert
		if (book.book_type === EBookType.PHYSICAL && book.physical_type === EPhysicalType.LIBRARY_USE) {
			return (
				<div className='lg:col-span-8'>
					<LibraryUseAlert />
					<Card className='h-full'>
						<CardContent className='p-6'>
							<div className='py-12 text-center'>
								<Button variant='outline' onClick={() => navigate(-1)}>
									Quay lại
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			)
		}

		// Nếu là physical và borrowable thì kiểm tra validation
		if (book.book_type === EBookType.PHYSICAL && book.physical_type === EPhysicalType.BORROWABLE) {
			// Nếu có lỗi validation thì hiển thị alert
			if (!validation.canBorrow && validation.errors.length > 0) {
				return (
					<div className='lg:col-span-8'>
						<BookBorrowAlert errors={validation.errors} />
						<Card className='h-full'>
							<CardContent className='p-6'>
								<div className='py-12 text-center'>
									<Button variant='outline' onClick={() => navigate(-1)}>
										Quay lại
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				)
			}

			// Nếu pass validation thì hiển thị form mượn sách
			if (validation.canBorrow) {
				return (
					<div className='lg:col-span-8'>
						<BookBorrowForm
							book={book}
							reader={reader}
							availablePhysicalCopy={validation.availablePhysicalCopy}
							onBorrow={() => {
								// Logic xử lý mượn sách sẽ được thêm sau
								navigate(-1)
							}}
							onCancel={() => navigate(-1)}
						/>
					</div>
				)
			}
		}

		return null
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<div className='max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8'>
				{/* Back Button */}
				<Button
					variant='link'
					className='h-auto p-0 mb-4 text-green-600 hover:text-green-700'
					onClick={() => navigate(-1)}
				>
					<ChevronLeft className='w-6 h-6 ml-[-20px]' />
					Quay lại
				</Button>

				{/* Title */}
				<h1 className='mb-6 text-2xl font-bold text-gray-900'>
					{book.book_type === EBookType.PHYSICAL ? 'Mượn sách' : 'Đọc sách'}
				</h1>

				{/* Main Content */}
				<div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
					{/* Left: Book Info Card */}
					<div className='lg:col-span-4'>
						<Card className='h-full overflow-hidden'>
							{/* Book Cover - Full width at top */}
							<div className='w-full aspect-[3/4] bg-gray-200'>
								<img
									src={book.cover_image || ''}
									alt={book.title}
									className='object-cover w-full h-full'
								/>
							</div>

							{/* Book Details - Below image */}
							<CardContent className='p-4'>
								<h2 className='mb-3 text-lg font-bold text-gray-900'>{book.title}</h2>

								<div className='space-y-2 text-sm'>
									<div className='flex items-start gap-2'>
										<span className='text-gray-500 w-[100px]'>Tác giả:</span>
										<span className='flex-1 text-gray-900'>
											{book.authors?.map((author) => author.author_name).join(', ') || 'Chưa rõ'}
										</span>
									</div>

									<div className='flex items-start gap-2'>
										<span className='text-gray-500 w-[100px]'>ISBN:</span>
										<span className='flex-1 text-gray-900'>{book.isbn || 'N/A'}</span>
									</div>

									<div className='flex items-start gap-2'>
										<span className='text-gray-500 w-[100px]'>Năm xuất bản:</span>
										<span className='flex-1 text-gray-900'>{book.publish_year || 'N/A'}</span>
									</div>

									<div className='flex items-start gap-2'>
										<span className='text-gray-500 w-[100px]'>Loại:</span>
										<Badge variant='secondary' className='text-xs text-green-800 bg-green-100'>
											{book.book_type === EBookType.PHYSICAL ? 'Sách vật lý' : 'Sách điện tử'}
										</Badge>
									</div>

									<div className='flex items-start gap-2'>
										<span className='text-gray-500 w-[100px]'>Số lượng:</span>
										<span className='flex-1 font-medium text-gray-900'>
											{book.book_type === EBookType.PHYSICAL ? '1 cuốn' : 'Không giới hạn'}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Right: Content based on book type and validation */}
					{renderContent()}
				</div>
			</div>
		</div>
	)
}

export default BookDetailPage
