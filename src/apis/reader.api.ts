import axiosInstance from '@/configs/instance'
import type { Reader, UpdateInfoReaderByIdRequest } from '@/types/reader.type'

export const readerApis = {
	getReaderByUserId: async (userId: string) => {
		const res = await axiosInstance.get(`/readers/user/${userId}`)
		return res.data
	},
	updateInfoReaderById: async (id: string, payload: UpdateInfoReaderByIdRequest): Promise<Reader> => {
		const res = await axiosInstance.patch(`/readers/${id}`, payload)
		return res.data
	}
}
