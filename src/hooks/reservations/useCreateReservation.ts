import type { CreateReservationRequest } from '@/types/reservation.type'
import { EPhysicalCopyStatus } from '@/types/physical-copies.type'
import { physicalCopiesApi } from '@/apis/physical-copies.api'
import { reservationApis } from '@/apis/reservation.api'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

export const useCreateReservation = () => {
	const result = useMutation({
		mutationKey: ['createReservation'],
		mutationFn: async (payload: CreateReservationRequest) => {
			// Bước 1: Tạo reservation
			const reservation = await reservationApis.createReservation(payload)

			// Bước 2: Sau khi tạo reservation thành công, update status của physical copy sang 'reserved'
			try {
				await physicalCopiesApi.updatePhysicalCopyStatus(payload.physical_copy_id, {
					status: EPhysicalCopyStatus.RESERVED,
					notes: `Đã được đặt trước bởi reservation ${reservation.id}`
				})
			} catch (error: any) {
				// Nếu update physical copy status thất bại, vẫn return reservation nhưng hiển thị cảnh báo
				const errorMessage =
					error?.response?.data?.message || error?.message || 'Không thể cập nhật trạng thái sách'
				toast.warning(`Đã tạo đặt trước nhưng ${errorMessage.toLowerCase()}`)
				// Có thể thêm logic rollback reservation ở đây nếu cần
			}

			return reservation
		},
		onSuccess: () => {
			toast.success('Đã ghi nhận yêu cầu mượn sách thành công')
		},
		onError: (error: any) => {
			const errorMessage = error?.response?.data?.message || error?.message || 'Có lỗi xảy ra khi đặt sách'
			toast.error(errorMessage)
		}
	})

	return result
}
