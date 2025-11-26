import axiosInstance from '@/configs/instance'
import type { CreateReaderRequest, CreateReaderResponse } from '@/types/reader.type'
import type { RegisterUserRequest, RegisterUserResponse, UpdateUserPayload, UserType } from '@/types/user.type'

export const userApis = {
	register: async (payload: RegisterUserRequest): Promise<RegisterUserResponse> => {
		const res = await axiosInstance.post('/users', payload)
		return res.data
	},
	getInfoCurrentUser: async (token: string): Promise<UserType> => {
		const res = await axiosInstance.get('/users/me', {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json'
			}
		})
		return res.data
	},
	updateInfoCurUser: async (id: string, payload: UpdateUserPayload) => {
		const res = await axiosInstance.patch(`/users/${id}`, payload)
		return res.data
	},
	createReaderforUser: async (userId: string, payload: CreateReaderRequest): Promise<CreateReaderResponse> => {
		const res = await axiosInstance.post(`users/${userId}/reader`, payload)
		return res.data
	}
}
