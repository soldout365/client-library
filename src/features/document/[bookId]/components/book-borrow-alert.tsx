import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookBorrowAlertProps {
	errors: string[]
	className?: string
}

export const BookBorrowAlert = ({ errors, className }: BookBorrowAlertProps) => {
	if (errors.length === 0) return null

	return (
		<Alert variant='destructive' className={cn('mb-6', className)}>
			<AlertCircle className='h-4 w-4' />
			<AlertTitle>Không thể mượn sách</AlertTitle>
			<AlertDescription>
				<ul className='list-disc list-inside space-y-1 mt-2'>
					{errors.map((error, index) => (
						<li key={index}>{error}</li>
					))}
				</ul>
			</AlertDescription>
		</Alert>
	)
}
