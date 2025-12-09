export enum EAccountStatus {
	ACTIVE = 'active',
	SUSPENDED = 'suspended',
	BANNED = 'banned'
}

export type UserType = {
	id: string
	userCode: string
	username: string
	email: string
	role: 'admin' | 'reader'
	accountStatus: EAccountStatus
	lastLogin: string
	createdAt: string
	updatedAt: string
}
export interface UpdateUserPayload {
	username?: string
	email?: string
}

export type RegisterUserRequest = {
	userCode: string // ví dụ: GV001, SV20020001, NV001
	username: string
	password: string
	email: string
	role: 'reader' | 'admin'
	accountStatus: EAccountStatus
}

export type RegisterUserResponse = {
	id: string
	userCode: string // ví dụ: GV001, SV20020001, NV001
	username: string
	email: string
	role: 'reader' | 'admin'
	accountStatus: EAccountStatus
	lastLogin: string // ISO date
	createdAt: string // ISO date
	updatedAt: string // ISO date
}
