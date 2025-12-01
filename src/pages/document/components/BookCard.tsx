import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EBookType, type BookType } from '@/types/book.type'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Eye, Calendar } from 'lucide-react'

interface BookCardProps {
	book: BookType
}

export const BookCard = ({ book }: BookCardProps) => {
	const navigate = useNavigate()

	return (
		<Card
			className='group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200/80 hover:border-green-400/60 bg-white'
			onClick={() => navigate(`/documents/${book.id}`)}
		>
			{/* Book Cover */}
			<div className='relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden'>
				<img
					src={
						book.cover_image ||
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1I_ZbgRygJ-yy2fIIlScWrxTZkGuZXThhA&s'
					}
					alt={book.title}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
				/>

				{/* Badge Overlay */}
				<div className='absolute top-2 right-2'>
					<Badge
						variant={book.book_type === EBookType.PHYSICAL ? 'default' : 'secondary'}
						className='shadow-sm text-xs px-2 py-0.5'
					>
						{book.book_type === EBookType.PHYSICAL ? (
							<>
								<BookOpen className='w-3 h-3 mr-1' />
								Vật lý
							</>
						) : (
							<>
								<BookOpen className='w-3 h-3 mr-1' />
								E-Book
							</>
						)}
					</Badge>
				</div>

				{/* Gradient Overlay at bottom */}
				<div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent'></div>
			</div>

			{/* Book Info */}
			<CardContent className='p-4 space-y-2.5'>
				{/* Title */}
				<h3 className='font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] text-sm leading-snug group-hover:text-green-600 transition-colors'>
					{book.title}
				</h3>

				{/* Author */}
				<p className='text-xs text-gray-600 line-clamp-1 flex items-center gap-1.5'>
					<span className='text-gray-400 text-sm'>✍️</span>
					<span className='truncate'>
						{book.authors?.map((author) => author.author_name).join(', ') || 'Chưa rõ'}
					</span>
				</p>

				{/* Divider */}
				<div className='border-t border-gray-100 my-2'></div>

				{/* Footer Info */}
				<div className='flex items-center justify-between text-xs'>
					{/* Publish Year */}
					<div className='flex items-center gap-1.5 text-gray-500'>
						<Calendar className='w-3.5 h-3.5' />
						<span className='font-medium'>{book.publish_year || 'N/A'}</span>
					</div>

					{/* Views */}
					<div className='flex items-center gap-1.5 text-amber-600'>
						<Eye className='w-3.5 h-3.5' />
						<span className='font-semibold'>{book.view || 0}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
