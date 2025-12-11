import type { CreateReservationRequest, ReservationResponse } from '@/types/reservation.type'

import axiosInstance from '@/configs/instance'

export const reservationApis = {
	createReservation: async (payload: CreateReservationRequest): Promise<ReservationResponse> => {
		const res = await axiosInstance.post<ReservationResponse>('/reservations', payload)
		return res.data
	}
}
