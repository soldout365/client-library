import { useGetBookById } from '@/hooks/books/useGetBooks'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, Calendar, User, Hash, Clock, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { EBookType } from '@/types/book.type'
import { useUserInfo } from '@/hooks/user/useGetInfoCurUser'

const BookDetailPage = () => {
	const { bookId } = useParams<{ bookId: string }>()
	const navigate = useNavigate()
	const { data: book, isLoading } = useGetBookById(bookId)
	const { userInfo } = useUserInfo()

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gray-50'>
				<Header />
				<div className='flex justify-center items-center h-64'>
					<div className='text-gray-500'>Đang tải...</div>
				</div>
			</div>
		)
	}

	if (!book) {
		return (
			<div className='min-h-screen bg-gray-50'>
				<Header />
				<div className='flex justify-center items-center h-64'>
					<div className='text-gray-500'>Không tìm thấy sách</div>
				</div>
			</div>
		)
	}

	const expectedReturnDate = new Date()
	expectedReturnDate.setDate(expectedReturnDate.getDate() + 1)

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
				{/* Back Button */}
				<Button
					variant='link'
					className='mb-4 text-green-600 hover:text-green-700 p-0 h-auto'
					onClick={() => navigate(-1)}
				>
					<ChevronLeft className='w-4 h-4 mr-1' />
					Quay lại
				</Button>

				{/* Title */}
				<h1 className='text-2xl font-bold text-gray-900 mb-6'>Đặt trước sách</h1>

				{/* Main Content */}
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
					{/* Left: Book Info Card */}
					<div className='lg:col-span-4'>
						<Card className='overflow-hidden h-full '>
							{/* Book Cover - Full width at top */}
							<div className='w-full aspect-[3/4] bg-gray-200'>
								<img
									src={book.cover_image || ''}
									alt={book.title}
									className='w-full h-full object-cover'
								/>
							</div>

							{/* Book Details - Below image */}
							<CardContent className='p-4'>
								<h2 className='font-bold text-gray-900 mb-3 text-lg'>{book.title}</h2>

								<div className='space-y-2 text-sm'>
									<div className='flex items-start gap-2'>
										<span className='text-gray-500 w-[100px]'>Tác giả:</span>
										<span className='text-gray-900 flex-1'>
											{book.authors?.map((author) => author.author_name).join(', ') || 'Chưa rõ'}
										</span>
									</div>

									<div className='flex items-start gap-2'>
										<span className='text-gray-500 w-[100px]'>ISBN:</span>
										<span className='text-gray-900 flex-1'>{book.isbn || 'N/A'}</span>
									</div>

									<div className='flex items-start gap-2'>
										<span className='text-gray-500 w-[100px]'>Năm xuất bản:</span>
										<span className='text-gray-900 flex-1'>{book.publish_year || 'N/A'}</span>
									</div>

									<div className='flex items-start gap-2'>
										<span className='text-gray-500 w-[100px] '>Loại:</span>
										<Badge variant='secondary' className='bg-green-100 text-green-800 text-xs '>
											{book.book_type === EBookType.PHYSICAL ? 'Sách vật lý' : 'Sách điện tử'}
										</Badge>
									</div>

									<div className='flex items-start gap-2'>
										<span className='text-gray-500 w-[100px]'>Số lượng:</span>
										<span className='text-gray-900 flex-1 font-medium'>
											{book.book_type === EBookType.PHYSICAL ? '1 cuốn' : 'Không giới hạn'}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Right: Booking Form */}
					<div className='lg:col-span-8'>
						<Card>
							<CardContent className='p-6'>
								{/* Thông tin đặt trước sách */}
								<div className='mb-6'>
									<h3 className='font-bold text-gray-900 mb-4 text-lg'>Thông tin đặt trước sách</h3>

									<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
										{/* Họ tên độc giả */}
										<div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
											<User className='w-5 h-5 text-gray-600' />
											<div className='flex-1'>
												<label className='text-sm text-gray-600 block'>Họ tên độc giả</label>
												<p className='text-gray-900 font-medium'>
													{userInfo?.username || 'N/A'}
												</p>
											</div>
										</div>

										{/* Số thẻ thư viện */}
										<div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
											<Hash className='w-5 h-5 text-gray-600' />
											<div className='flex-1'>
												<label className='text-sm text-gray-600 block'>Số thẻ thư viện</label>
												<p className='text-gray-900 font-medium'>
													{userInfo?.userCode || 'N/A'}
												</p>
											</div>
										</div>

										{/* Ngày đặt */}
										<div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
											<Calendar className='w-5 h-5 text-gray-600' />
											<div className='flex-1'>
												<label className='text-sm text-gray-600 block'>Ngày đặt</label>
												<p className='text-gray-900 font-medium'>
													{format(new Date(), 'dd/MM/yyyy', { locale: vi })}
												</p>
											</div>
										</div>

										{/* Hạn lấy sách */}
										<div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
											<Clock className='w-5 h-5 text-gray-600' />
											<div className='flex-1'>
												<label className='text-sm text-gray-600 block'>Hạn lấy sách</label>
												<p className='text-gray-900 font-medium'>
													{format(expectedReturnDate, 'dd/MM/yyyy', { locale: vi })}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Thông tin đặt trước - Blue box */}
								<div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
									<h4 className='font-semibold text-blue-900 mb-3 flex items-center gap-2'>
										<AlertCircle className='w-5 h-5' />
										Thông tin đặt trước:
									</h4>
									<ul className='space-y-1.5 text-sm text-blue-800'>
										<li>• Đặt trước có hiệu lực trong 1 ngày kể từ ngày đặt</li>
										<li>• Khi có sách sẵn, thư viện sẽ thông báo qua email hoặc điện thoại</li>
										<li>• Bạn có thể hủy đặt trước bất cứ lúc nào trong khoảng</li>
										<li>• Đặt trước sẽ tự động hết hạn sau 1 ngày nếu bạn có sách</li>
										<li>• Sau khi lấy trước, bạn có thể mượn sách từ ngày hôm sau</li>
									</ul>
								</div>

								{/* Điều khoản mượn sách - Yellow box */}
								<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6'>
									<h4 className='font-semibold text-yellow-900 mb-3'>Điều khoản mượn sách:</h4>
									<ul className='space-y-1.5 text-sm text-yellow-800'>
										<li>• Sách phải được trả đúng hạn</li>
										<li>• Giữ gìn sách cẩn thận, không làm hư hỏng</li>
										<li>• Phạt trễ hạn: VNĐ/ngày</li>
										<li>• Liên hệ thư viện nếu cần gia hạn có để ghi</li>
									</ul>
								</div>

								{/* Action Buttons */}
								<div className='flex justify-end gap-3'>
									<Button variant='outline' onClick={() => navigate(-1)}>
										Hủy
									</Button>
									<Button className='bg-green-600 hover:bg-green-700'>Đặt trước sách</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookDetailPage
