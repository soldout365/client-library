import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export const LibraryUseAlert = () => {
	return (
		<Alert className='mb-6'>
			<AlertCircle className='h-4 w-4' />
			<AlertTitle>Thông báo</AlertTitle>
			<AlertDescription>Sách này chỉ được đọc ở thư viện, không thể mượn về.</AlertDescription>
		</Alert>
	)
}
