import type { CreatReaderForUserRespponse } from './reader.type'
import type { UserType } from './user.type'

export interface LoginResponse {
	access_token: string
}

export interface LoginRequest {
	username: string
	password: string
}

export interface AuthState {
	accessToken: string | null
	user: UserType | null
	reader: CreatReaderForUserRespponse | null

	setUser: (user: UserType) => void
	setToken: (token: string) => void
	setReader: (reader: CreatReaderForUserRespponse) => void
	clearAuth: () => void
}

export interface ChangePasswordRequest {
	currentPassword: string
	newPassword: string
}

export interface ChangePasswordForm {
	currentPassword: string
	newPassword: string
	confirmNewPassword: string
}

export interface ForgotPasswordRequest {
	email: string
}
export interface ForgotPasswordResponse {
	message: string
}

export interface ResetPasswordRequest {
	newPassword: string
	resetToken: string
}
export interface ResetPasswordForm {
	newPassword: string
	confirmNewPassword: string
}
export interface ResetPasswordResponse {
	message: string
}
