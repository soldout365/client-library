import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserType } from '@/types/user.type'
import type { AuthState } from '@/types/auth.type'
import type { CreatReaderForUserRespponse } from '@/types/reader.type'

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: null,
			user: null,
			reader: null,

			setToken: (token: string) => {
				set({ accessToken: token })
			},
			setUser: (user: UserType) => {
				set({ user })
			},
			setReader: (reader: CreatReaderForUserRespponse) => {
				set({ reader })
			},
			clearAuth: () => {
				set({
					accessToken: null,
					user: null,
					reader: null
				})
			}
		}),
		{
			name: 'authStore'
		}
	)
)
