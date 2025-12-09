export enum EReaderActiveStatus {
	ACTIVE = true,
	INACTIVE = false
}

export type Reader = {
	id: string
	user: {
		id: string
		username: string
		email: string
	}
	readerType: {
		id: string
		typeName: string
		maxBorrowLimit: number
		borrowDurationDays: number
	}
	fullName: string
	dob: string
	gender: 'male' | 'female'
	address: string
	phone: string
	cardNumber: string
	cardIssueDate: string
	cardExpiryDate: string
	isActive: boolean
	createdAt: string
	updatedAt: string
}

//tao moi doc gia (user)
export type CreateReaderRequest = {
	fullName: string
	dob: string
	gender: 'male' | 'female'
	address: string
	phone: string
	cardNumber: string
	cardIssueDate: string
	cardExpiryDate: string
	readerTypeName: string
}
export type CreateReaderResponse = {
	id: string
	user: string | null
	readerType: string | null
	fullName: string
	dob: string // có thể đổi sang Date nếu bạn parse ISO string
	gender: 'male' | 'female'
	address: string
	phone: string
	cardNumber: string
	cardIssueDate: string // hoặc Date
	cardExpiryDate: string // hoặc Date
	isActive: boolean
	createdAt: string // hoặc Date
	updatedAt: string // hoặc Date
}

export type CreatReaderForUserRespponse = {
	id: string
	user: any | null
	readerType: any | null
	fullName: string
	dob: string
	gender: 'male' | 'female'
	address: string
	phone: string
	cardNumber: string
	cardIssueDate: string
	cardExpiryDate: string
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export type UpdateInfoReaderByIdRequest = {
	readerTypeId: string
	fullName: string
	dob: string
	gender: 'male' | 'female'
	address: string
	phone: string
	cardNumber: string
	cardIssueDate: string
	cardExpiryDate: string
	isActive: boolean
}
