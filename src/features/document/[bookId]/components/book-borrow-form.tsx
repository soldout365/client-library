import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, User, Hash, Clock, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { formatDate, calculateDueDate } from '@/lib/date-utils'
import type { Reader } from '@/types/reader.type'
import type { BookType } from '@/types/book.type'
import { toast } from 'sonner'
import type { PhysicalBook } from '@/types/physical-copies.type'

interface BookBorrowFormProps {
	book: BookType
	reader: Reader | undefined
	availablePhysicalCopy: PhysicalBook | null
	onBorrow: () => void
	onCancel: () => void
}

export const BookBorrowForm = ({
	book,
	reader,
	availablePhysicalCopy,
	onBorrow,
	onCancel
}: BookBorrowFormProps) => {
	const borrowDate = new Date()
	const dueDate = reader
		? calculateDueDate(borrowDate, reader.readerType.borrowDurationDays)
		: new Date()

	const handleBorrow = () => {
		if (availablePhysicalCopy) {
			console.log('Physical available đầu tiên:', availablePhysicalCopy)
			toast.success('Đã ghi nhận yêu cầu mượn sách')
			onBorrow()
		} else {
			toast.error('Không tìm thấy sách có sẵn')
		}
	}

	return (
		<Card className='h-full'>
			<CardContent className='p-6'>
				{/* Thông tin mượn sách */}
				<div className='mb-6'>
					<h3 className='font-bold text-gray-900 mb-4 text-lg'>Thông tin mượn sách</h3>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						{/* Họ tên độc giả */}
						<div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
							<User className='w-5 h-5 text-gray-600' />
							<div className='flex-1'>
								<label className='text-sm text-gray-600 block'>Họ tên độc giả</label>
								<p className='text-gray-900 font-medium'>{reader?.fullName || 'N/A'}</p>
							</div>
						</div>

						{/* Số thẻ thư viện */}
						<div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
							<Hash className='w-5 h-5 text-gray-600' />
							<div className='flex-1'>
								<label className='text-sm text-gray-600 block'>Số thẻ thư viện</label>
								<p className='text-gray-900 font-medium'>{reader?.cardNumber || 'N/A'}</p>
							</div>
						</div>

						{/* Ngày mượn */}
						<div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
							<Calendar className='w-5 h-5 text-gray-600' />
							<div className='flex-1'>
								<label className='text-sm text-gray-600 block'>Ngày mượn</label>
								<p className='text-gray-900 font-medium'>{formatDate(borrowDate)}</p>
							</div>
						</div>

						{/* Hạn trả */}
						<div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
							<Clock className='w-5 h-5 text-gray-600' />
							<div className='flex-1'>
								<label className='text-sm text-gray-600 block'>Hạn trả</label>
								<p className='text-gray-900 font-medium'>{formatDate(dueDate)}</p>
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
					<Button variant='outline' onClick={onCancel}>
						Hủy
					</Button>
					<Button className='bg-green-600 hover:bg-green-700' onClick={handleBorrow}>
						Mượn sách
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
