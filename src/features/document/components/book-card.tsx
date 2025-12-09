import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { EBookType, type BookType } from '@/types/book.type'
import { BookOpen, Calendar, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface BookCardProps {
	book: BookType
}

export const BookCard = ({ book }: BookCardProps) => {
	const navigate = useNavigate()

	return (
		<Card
			className='overflow-hidden transition-all duration-300 bg-white border cursor-pointer group hover:shadow-lg border-gray-200/80 hover:border-green-400/60'
			onClick={() => navigate(`/documents/${book.id}`)} // Chuyển trang khi click
		>
			{/* Ảnh bìa sách */}
			<div className='relative aspect-[9/10] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden'>
				{' '}
				{/* Đổi từ 3/4 xuống 2/3 để thu gọn */}
				<img
					src={
						book.cover_image ||
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1I_ZbgRygJ-yy2fIIlScWrxTZkGuZXThhA&s'
					}
					alt={book.title}
					className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 '
				/>
				{/* Badge loại sách */}
				<div className='absolute top-2 right-2'>
					<Badge
						variant={book.book_type === EBookType.PHYSICAL ? 'default' : 'secondary'}
						className='shadow-sm text-[10px] px-1.5 py-0.5' // Giảm size badge
					>
						{book.book_type === EBookType.PHYSICAL ? (
							<>
								<BookOpen className='w-2.5 h-2.5 mr-0.5' /> {/* Icon nhỏ hơn */}
								Vật lý
							</>
						) : (
							<>
								<BookOpen className='w-2.5 h-2.5 mr-0.5' />
								E-Book
							</>
						)}
					</Badge>
				</div>
			</div>

			<CardContent className='p-3 space-y-1.5'>
				{' '}
				{/* Giảm padding và spacing */}
				{/* Tiêu đề */}
				<h3 className='mb-3 text-sm font-semibold leading-tight text-gray-900 transition-colors line-clamp-2 group-hover:text-green-600'>
					{' '}
					{/* leading-tight để dòng chữ sát hơn */}
					{book.title}
				</h3>
				{/* Tác giả */}
				<p className='flex items-center gap-1 mb-3 text-xs text-gray-600 line-clamp-1'>
					{' '}
					{/* Giảm gap */}
					<span className='text-gray-400'>✍️</span>
					<span className='truncate'>
						{book.authors?.map((author) => author.author_name).join(', ') || 'Chưa rõ'}
					</span>
				</p>
				{/* Đường kẻ */}
				<div className='border-t border-gray-100 my-1.5'></div> {/* Giảm margin */}
				{/* Footer info */}
				<div className='flex items-center justify-between text-xs'>
					<div className='flex items-center gap-1 text-gray-500'>
						{' '}
						{/* Giảm gap */}
						<Calendar className='w-3 h-3' /> {/* Icon nhỏ hơn */}
						<span className='font-medium'>{book.publish_year || 'N/A'}</span>
					</div>

					<div className='flex items-center gap-1 text-amber-600'>
						<Eye className='w-3 h-3' />
						<span className='font-semibold'>{book.view || 0}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
