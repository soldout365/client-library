import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { set, z } from 'zod'
import { X, User, CreditCard, Check } from 'lucide-react'
import type { Reader, UpdateInfoReaderByIdRequest } from '@/types/reader.type'
import { useUpdateReaderById } from '@/hooks/reader/useUpdateReaderById'
import { useAuthStore } from '@/stores/auth.store'
import { toast } from 'sonner'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useUpdateUserInfo } from '@/hooks/user/useUpdateUserInfo'
import type { UpdateUserPayload } from '@/types/user.type'
import { useQueryClient } from '@tanstack/react-query'

const readerInfoSchema = z.object({
	fullName: z.string().min(1, 'Họ và tên không được bỏ trống'),
	dob: z.string().min(1, 'Vui lòng chọn ngày sinh'),
	gender: z.enum(['male', 'female']),
	address: z.string().min(1, 'Địa chỉ không được bỏ trống'),
	phone: z.string().min(8, 'Số điện thoại không hợp lệ')
})

type ReaderInfoSchema = z.infer<typeof readerInfoSchema>

interface ReaderDetailModalProps {
	reader: Reader | null
	isOpen: boolean
	onClose: () => void
}

export default function ReaderDetailModal({ reader, isOpen, onClose }: ReaderDetailModalProps) {
	const queryClient = useQueryClient()

	const { updateReaderAsync, isUpdating } = useUpdateReaderById()

	const { updateUserAsync } = useUpdateUserInfo()

	const setReader = useAuthStore((state) => state.setReader)

	const form = useForm<ReaderInfoSchema>({
		resolver: zodResolver(readerInfoSchema),
		defaultValues: {
			fullName: '',
			dob: '',
			gender: 'male',
			address: '',
			phone: ''
		}
	})

	// Load dữ liệu reader khi mở modal
	useEffect(() => {
		if (reader) {
			form.reset({
				fullName: reader.fullName || '',
				dob: reader.dob ? new Date(reader.dob).toISOString().split('T')[0] : '',
				gender: reader.gender,
				address: reader.address || '',
				phone: reader.phone || ''
			})
		}
	}, [reader, form])

	if (!isOpen || !reader) return null

	const formatDate = (dateString: string) => {
		if (!dateString) return 'N/A'
		return new Date(dateString).toLocaleDateString('vi-VN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	// Lưu thay đổi
	const onSubmit = async (values: ReaderInfoSchema) => {
		updateReaderAsync(
			{
				id: reader.id,
				payload: {
					readerTypeId: reader.readerType?.id || '',
					fullName: values.fullName,
					dob: values.dob,
					gender: values.gender,
					address: values.address,
					phone: values.phone,
					cardNumber: reader.cardNumber,
					cardIssueDate: reader.cardIssueDate,
					cardExpiryDate: reader.cardExpiryDate,
					isActive: reader.isActive
				} as UpdateInfoReaderByIdRequest
			},
			{
				onSuccess: async (data) => {
					const payloadUpdateUser: UpdateUserPayload = {
						username: values.fullName,
						email: reader.user?.email
					}
					updateUserAsync({ id: data.user.id, payload: payloadUpdateUser })

					await queryClient.invalidateQueries({ queryKey: ['updateUser'] })
					setReader(data)
					toast.success('Cập nhật thông tin độc giả thành công!')
					onClose()
				}
			}
		)
	}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
			<div className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
				{/* Header */}
				<div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between sticky top-0'>
					<h2 className='text-2xl font-bold text-white flex items-center gap-3'>
						<User className='w-7 h-7' />
						Thông tin Độc Giả Chi Tiết
					</h2>
					<Button
						onClick={onClose}
						variant='ghost'
						disabled={isUpdating}
						className='text-white hover:bg-white/20 rounded-full p-2'
					>
						<X className='w-6 h-6' />
					</Button>
				</div>

				{/* Content */}
				<div className='p-6 space-y-6'>
					{/* Personal Info */}
					<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5'>
						<h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
							<User className='w-5 h-5 text-indigo-600' />
							Thông tin độc giả
						</h3>

						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className='grid md:grid-cols-2 gap-4'>
								{/* Họ và tên */}
								<FormField
									control={form.control}
									name='fullName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Họ và tên</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Nhập họ và tên' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Ngày sinh */}
								<FormField
									control={form.control}
									name='dob'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ngày sinh</FormLabel>
											<FormControl>
												<Input type='date' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Giới tính */}
								<FormField
									control={form.control}
									name='gender'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Giới tính</FormLabel>
											<FormControl>
												<select
													{...field}
													className='w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500'
												>
													<option value='male'>Nam</option>
													<option value='female'>Nữ</option>
												</select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Số điện thoại */}
								<FormField
									control={form.control}
									name='phone'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Số điện thoại</FormLabel>
											<FormControl>
												<Input type='tel' {...field} placeholder='Nhập số điện thoại' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Địa chỉ */}
								<FormField
									control={form.control}
									name='address'
									render={({ field }) => (
										<FormItem className='md:col-span-2'>
											<FormLabel>Địa chỉ</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Nhập địa chỉ' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className='md:col-span-2 flex justify-end'>
									<Button
										type='submit'
										disabled={isUpdating}
										className='bg-green-600 hover:bg-green-700 text-white font-medium'
									>
										{isUpdating ? 'Đang lưu...' : 'Lưu thay đổi'}
									</Button>
								</div>
							</form>
						</Form>
					</div>

					{/* Thông tin thẻ */}
					<div className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5'>
						<h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
							<CreditCard className='w-5 h-5 text-purple-600' />
							Thông tin thẻ
						</h3>
						<div className='grid md:grid-cols-2 gap-4'>
							<InfoItem label='Số thẻ' value={reader.cardNumber} />
							<InfoItem label='Ngày cấp thẻ' value={formatDate(reader.cardIssueDate)} />
							<InfoItem label='Ngày hết hạn' value={formatDate(reader.cardExpiryDate)} />
							<InfoItem
								label='Trạng thái'
								value={reader.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
								badge={reader.isActive}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

interface InfoItemProps {
	label: string
	value: string | number
	icon?: React.ReactNode
	badge?: boolean
	className?: string
}

function InfoItem({ label, value, icon, badge, className = '' }: InfoItemProps) {
	return (
		<div className={className}>
			<label className='block text-sm font-medium text-gray-600 mb-1'>{label}</label>
			<div className='flex items-center gap-2'>
				{icon && <span className='text-gray-500'>{icon}</span>}
				{badge !== undefined ? (
					<span
						className={`px-3 py-1 rounded-full text-sm font-medium ${
							badge ? 'bg-green-100 text-green-700 flex items-center gap-1' : 'bg-red-100 text-red-700'
						}`}
					>
						{badge && <Check className='w-4 h-4' />}
						{value}
					</span>
				) : (
					<p className='text-gray-900 font-medium'>{value}</p>
				)}
			</div>
		</div>
	)
}
