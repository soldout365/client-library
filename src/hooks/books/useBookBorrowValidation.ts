import { EBookType, EPhysicalType } from '@/types/book.type'

import { EAccountStatus } from '@/types/user.type'
import { EBorrowRecordStatus } from '@/types/borrow-record.type'
import type { PhysicalBook } from '@/types/physical-copies.type'
import { isCardExpired } from '@/lib/date-utils'
import { useGetAvailablePhysicalCopies } from '@/hooks/physical-copies/useGetAvailablePhysicalCopies'
import { useGetBorrowRecordsByStatus } from '@/hooks/borrow-records/useGetBorrowRecordsByStatus'
import { useGetReaderByUserId } from '@/hooks/reader/useGetReaderByUserId'
import { useMemo } from 'react'
import { useUserInfo } from '@/hooks/user/useGetInfoCurUser'

interface UseBookBorrowValidationProps {
	bookId: string | undefined
	bookType: string | undefined
	physicalType: string | undefined
}

export const useBookBorrowValidation = ({ bookId, bookType, physicalType }: UseBookBorrowValidationProps) => {
	const { userInfo, isLoading: isLoadingUser } = useUserInfo()
	const { data: reader, isLoading: isLoadingReader } = useGetReaderByUserId(userInfo?.id || '')
	const { data: borrowRecords, isLoading: isLoadingBorrowRecords } = useGetBorrowRecordsByStatus(
		EBorrowRecordStatus.BORROWED,
		reader?.id
	)

	const { data: availableCopies, isLoading: isLoadingAvailableCopies } = useGetAvailablePhysicalCopies(bookId)
	const totalAvailable = availableCopies?.meta.totalItems || 0

	const isLoading = isLoadingUser || isLoadingReader || isLoadingBorrowRecords || isLoadingAvailableCopies

	const validationResult = useMemo(() => {
		const errors: string[] = []
		let canBorrow = false
		let availablePhysicalCopy: PhysicalBook | null = null

		// Kiểm tra user accountStatus
		if (!userInfo) {
			errors.push('Không tìm thấy thông tin người dùng')
			return { isValid: false, canBorrow: false, errors, isLoading, availablePhysicalCopy, totalAvailable }
		}

		if (userInfo.accountStatus !== EAccountStatus.ACTIVE) {
			errors.push('Tài khoản của bạn không ở trạng thái hoạt động')
			return { isValid: false, canBorrow: false, errors, isLoading, availablePhysicalCopy, totalAvailable }
		}

		// Kiểm tra reader
		if (!reader) {
			errors.push('Không tìm thấy thông tin độc giả')
			return { isValid: false, canBorrow: false, errors, isLoading, availablePhysicalCopy, totalAvailable }
		}

		if (!reader.isActive) {
			errors.push('Thẻ thư viện của bạn không ở trạng thái hoạt động')
			return { isValid: false, canBorrow: false, errors, isLoading, availablePhysicalCopy, totalAvailable }
		}

		// Kiểm tra thẻ thư viện còn hạn
		if (isCardExpired(reader.cardExpiryDate)) {
			errors.push('Thẻ thư viện của bạn đã hết hạn')
			return { isValid: false, canBorrow: false, errors, isLoading, availablePhysicalCopy, totalAvailable }
		}

		// Kiểm tra số lượng sách đang mượn
		const currentBorrowedCount = borrowRecords?.meta.totalItems || 0
		if (currentBorrowedCount >= reader.readerType.maxBorrowLimit) {
			errors.push(
				`Bạn đã mượn tối đa ${reader.readerType.maxBorrowLimit} cuốn sách. Vui lòng trả sách trước khi mượn thêm.`
			)
			return { isValid: false, canBorrow: false, errors, isLoading, availablePhysicalCopy }
		}

		// Kiểm tra book_type
		if (bookType !== EBookType.PHYSICAL) {
			// Nếu là ebook thì không cần kiểm tra các điều kiện mượn sách
			return { isValid: true, canBorrow: false, errors: [], isLoading, availablePhysicalCopy, totalAvailable }
		}

		// Kiểm tra physical_type
		if (physicalType !== EPhysicalType.BORROWABLE) {
			errors.push('Sách này chỉ được đọc ở thư viện, không thể mượn về')
			return { isValid: false, canBorrow: false, errors, isLoading, availablePhysicalCopy, totalAvailable }
		}

		// Kiểm tra số lượng sách có sẵn
		if (totalAvailable === 0) {
			errors.push('Hiện tại không còn sách để cho mượn')
			return { isValid: false, canBorrow: false, errors, isLoading, availablePhysicalCopy, totalAvailable }
		}

		// Lấy physical copy đầu tiên trong mảng available
		availablePhysicalCopy = availableCopies?.data?.[0] || null

		// Tất cả điều kiện đều pass
		canBorrow = true
		return { isValid: true, canBorrow: true, errors: [], isLoading, availablePhysicalCopy, totalAvailable }
	}, [userInfo, reader, borrowRecords, availableCopies, bookType, physicalType, isLoading])

	return validationResult
}
