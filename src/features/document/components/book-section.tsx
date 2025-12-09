import { Button } from '@/components/ui/button'
import type { BookType } from '@/types/book.type'
import { BookCard } from './book-card'

interface BookSectionProps {
	title: string
	books: BookType[]
	onViewAll?: () => void
}

export const BookSection = ({ title, books, onViewAll }: BookSectionProps) => {
	return (
		<section className='mb-12'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold text-gray-800'>{title}</h2>
				<Button
					variant='link'
					className='text-green-600 hover:text-green-700 text-sm font-medium p-0'
					onClick={onViewAll}
				>
					Xem tất cả »
				</Button>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{books.map((book) => (
					<BookCard key={book.id} book={book} />
				))}
			</div>
		</section>
	)
}
