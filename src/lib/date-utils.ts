import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export const isCardExpired = (cardExpiryDate: string): boolean => {
	const expiryDate = new Date(cardExpiryDate)
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	return expiryDate < today
}

export const formatDate = (date: string | Date): string => {
	const dateObj = typeof date === 'string' ? new Date(date) : date
	return format(dateObj, 'dd/MM/yyyy', { locale: vi })
}

export const calculateDueDate = (borrowDate: Date, durationDays: number): Date => {
	const dueDate = new Date(borrowDate)
	dueDate.setDate(dueDate.getDate() + durationDays)
	return dueDate
}
