import { AlertCircle, Calendar, Clock, Hash, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { calculateDueDate, formatDate, getTomorrowDate } from '@/lib/date-utils'

import type { BookType } from '@/types/book.type'
import { Button } from '@/components/ui/button'
import type { PhysicalBook } from '@/types/physical-copies.type'
import type { Reader } from '@/types/reader.type'
import { useCreateReservation } from '@/hooks/reservations/useCreateReservation'

interface BookBorrowFormProps {
	book: BookType
	reader: Reader | undefined
	availablePhysicalCopy: PhysicalBook | null
	onBorrow: () => void
	onCancel: () => void
}

export const BookBorrowForm = ({ book, reader, availablePhysicalCopy, onBorrow, onCancel }: BookBorrowFormProps) => {
	const borrowDate = new Date()
	const dueDate = reader ? calculateDueDate(borrowDate, reader.readerType.borrowDurationDays) : new Date()
	const createReservationMutation = useCreateReservation()

	const handleBorrow = () => {
		if (!availablePhysicalCopy) {
			return
		}

		if (!reader) {
			return
		}

		// Tính toán reservation_date (ngày hôm nay)
		const reservationDate = new Date()

		// Tính toán expiry_date (ngày mai)
		const expiryDate = getTomorrowDate(reservationDate)

		// Tạo reader_notes theo format yêu cầu
		const readerNotes = `${reader.cardNumber} - ${reader.fullName} muốn mượn sách ${book.title} - ${book.isbn}`

		// Chuẩn bị payload
		const payload = {
			reader_id: reader.id,
			book_id: book.id,
			physical_copy_id: availablePhysicalCopy.id,
			reservation_date: reservationDate.toISOString(),
			expiry_date: expiryDate.toISOString(),
			reader_notes: readerNotes,
			priority: 1
		}

		// Gọi API
		createReservationMutation.mutate(payload, {
			onSuccess: () => {
				onBorrow()
			}
		})
	}

	return (
		<Card className='h-full'>
			<CardContent className='p-6'>
				{/* Thông tin mượn sách */}
				<div className='mb-6'>
					<h3 className='mb-4 text-lg font-bold text-gray-900'>Thông tin mượn sách</h3>

					<div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
						{/* Họ tên độc giả */}
						<div className='flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50'>
							<User className='w-5 h-5 text-gray-600' />
							<div className='flex-1'>
								<label className='block text-sm text-gray-600'>Họ tên độc giả</label>
								<p className='font-medium text-gray-900'>{reader?.fullName || 'N/A'}</p>
							</div>
						</div>

						{/* Số thẻ thư viện */}
						<div className='flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50'>
							<Hash className='w-5 h-5 text-gray-600' />
							<div className='flex-1'>
								<label className='block text-sm text-gray-600'>Số thẻ thư viện</label>
								<p className='font-medium text-gray-900'>{reader?.cardNumber || 'N/A'}</p>
							</div>
						</div>

						{/* Ngày mượn */}
						<div className='flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50'>
							<Calendar className='w-5 h-5 text-gray-600' />
							<div className='flex-1'>
								<label className='block text-sm text-gray-600'>Ngày mượn</label>
								<p className='font-medium text-gray-900'>{formatDate(borrowDate)}</p>
							</div>
						</div>

						{/* Hạn trả */}
						<div className='flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50'>
							<Clock className='w-5 h-5 text-gray-600' />
							<div className='flex-1'>
								<label className='block text-sm text-gray-600'>Hạn trả</label>
								<p className='font-medium text-gray-900'>{formatDate(dueDate)}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Thông tin đặt trước - Blue box */}
				<div className='p-4 mb-4 border border-blue-200 rounded-lg bg-blue-50'>
					<h4 className='flex items-center gap-2 mb-3 font-semibold text-blue-900'>
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
				<div className='p-4 mb-6 border border-yellow-200 rounded-lg bg-yellow-50'>
					<h4 className='mb-3 font-semibold text-yellow-900'>Điều khoản mượn sách:</h4>
					<ul className='space-y-1.5 text-sm text-yellow-800'>
						<li>• Sách phải được trả đúng hạn</li>
						<li>• Giữ gìn sách cẩn thận, không làm hư hỏng</li>
						<li>• Phạt trễ hạn: VNĐ/ngày</li>
						<li>• Liên hệ thư viện nếu cần gia hạn có để ghi</li>
					</ul>
				</div>

				{/* Action Buttons */}
				<div className='flex justify-end gap-3'>
					<Button variant='outline' onClick={onCancel} disabled={createReservationMutation.isPending}>
						Hủy
					</Button>
					<Button
						className='bg-green-600 hover:bg-green-700'
						onClick={handleBorrow}
						disabled={createReservationMutation.isPending || !availablePhysicalCopy || !reader}
					>
						{createReservationMutation.isPending ? 'Đang xử lý...' : 'Mượn sách'}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
