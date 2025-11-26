// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { Button } from '@/components/ui/button'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { useCreateReaderForUser } from '@/hooks/user/useCreateReaderForUser'
// import type { CreateReaderRequest } from '@/types/reader.type'
// import { toast } from 'sonner'
// import { useNavigate } from 'react-router-dom'
// import { Users } from 'lucide-react'
// import { useAuthStore } from '@/stores/auth.store'

// const createReaderSchema = z.object({
// 	fullName: z.string().min(3, 'Tên ít nhất 3 ký tự'),
// 	dob: z.string().nonempty('Ngày sinh bắt buộc'),
// 	gender: z.enum(['male', 'female']),
// 	address: z.string().min(5, 'Địa chỉ ít nhất 5 ký tự'),
// 	phone: z.string().min(9, 'Số điện thoại không hợp lệ'),
// 	cardNumber: z.string().min(3, 'Số thẻ không hợp lệ'),
// 	cardIssueDate: z.string(),
// 	cardExpiryDate: z.string(),
// 	readerTypeName: z.string().nonempty('Chọn loại độc giả')
// })

// export default function CreateReaderPage() {
// 	const navigate = useNavigate()
// 	const { createReaderForUserAsync, isLoading } = useCreateReaderForUser()
// 	const { setReader } = useAuthStore()

// 	const authData = localStorage.getItem('authStore')
// 	const userId = authData ? JSON.parse(authData).state.user.id : null

// 	const form = useForm<CreateReaderRequest>({
// 		resolver: zodResolver(createReaderSchema),
// 		defaultValues: {
// 			fullName: '',
// 			dob: '',
// 			gender: 'male',
// 			address: '',
// 			phone: '',
// 			cardNumber: '',
// 			cardIssueDate: '',
// 			cardExpiryDate: '',
// 			readerTypeName: ''
// 		}
// 	})

// 	const onSubmit = async (values: CreateReaderRequest) => {
// 		await createReaderForUserAsync(
// 			{
// 				userId,
// 				payload: values
// 			},
// 			{
// 				onSuccess: (data) => {
// 					setReader(data)
// 					toast.success('Tạo reader thành công')
// 					navigate('/user-info')
// 				},
// 				onError: (error: any) => {
// 					if (error.response) {
// 						const status = error.response.status
// 						switch (status) {
// 							case 400:
// 								toast.error('Dữ liệu đầu vào không hợp lệ')
// 								break
// 							case 403:
// 								toast.error('Không có quyền truy cập')
// 								break
// 							case 404:
// 								toast.error('User không tồn tại')
// 								break
// 							case 409:
// 								toast.error('User đã có reader')
// 								break
// 							default:
// 								toast.error('Có lỗi xảy ra, vui lòng thử lại')
// 						}
// 					}
// 				}
// 			}
// 		)
// 	}

// 	return (
// 		<div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4'>
// 			<div className='max-w-3xl mx-auto'>
// 				<div className='bg-white rounded-2xl shadow-2xl overflow-hidden'>
// 					{/* Header */}
// 					<div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6'>
// 						<h2 className='text-3xl font-bold text-white flex items-center gap-3'>
// 							<Users className='w-8 h-8' />
// 							Tạo Thông Tin Độc Giả
// 						</h2>
// 						<p className='text-indigo-100 mt-2'>Hoàn tất thông tin để tạo hồ sơ độc giả</p>
// 					</div>

// 					{/* Form */}
// 					<div className='p-8'>
// 						<Form {...form}>
// 							<form onSubmit={form.handleSubmit(onSubmit)} className='grid md:grid-cols-2 gap-6'>
// 								{/* FullName */}
// 								<FormField
// 									control={form.control}
// 									name='fullName'
// 									render={({ field }) => (
// 										<FormItem className='md:col-span-2'>
// 											<FormLabel>Họ và Tên</FormLabel>
// 											<FormControl>
// 												<Input placeholder='Nguyễn Văn A' {...field} />
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								{/* DOB */}
// 								<FormField
// 									control={form.control}
// 									name='dob'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Ngày sinh</FormLabel>
// 											<FormControl>
// 												<Input type='date' {...field} />
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								{/* Gender */}
// 								<FormField
// 									control={form.control}
// 									name='gender'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Giới tính</FormLabel>
// 											<FormControl>
// 												<select {...field} className='w-full border rounded p-2'>
// 													<option value='male'>Nam</option>
// 													<option value='female'>Nữ</option>
// 												</select>
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								{/* Phone */}
// 								<FormField
// 									control={form.control}
// 									name='phone'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Số điện thoại</FormLabel>
// 											<FormControl>
// 												<Input placeholder='0123456789' {...field} />
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								{/* ReaderType */}
// 								<FormField
// 									control={form.control}
// 									name='readerTypeName'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Loại độc giả</FormLabel>
// 											<FormControl>
// 												<select {...field} className='w-full border rounded p-2'>
// 													<option value=''>-- Chọn loại --</option>
// 													<option value='staff'>staff</option>
// 													<option value=' teacher'>teacher</option>
// 													<option value='student'>student</option>
// 												</select>
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								{/* Address */}
// 								<FormField
// 									control={form.control}
// 									name='address'
// 									render={({ field }) => (
// 										<FormItem className='md:col-span-2'>
// 											<FormLabel>Địa chỉ</FormLabel>
// 											<FormControl>
// 												<Input placeholder='123 Đường ABC, Quận 1, TP.HCM' {...field} />
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								{/* CardNumber */}
// 								<FormField
// 									control={form.control}
// 									name='cardNumber'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Số thẻ</FormLabel>
// 											<FormControl>
// 												<Input placeholder='DG001234' {...field} />
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								{/* CardIssueDate */}
// 								<FormField
// 									control={form.control}
// 									name='cardIssueDate'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Ngày cấp thẻ</FormLabel>
// 											<FormControl>
// 												<Input type='date' {...field} />
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								{/* CardExpiryDate */}
// 								<FormField
// 									control={form.control}
// 									name='cardExpiryDate'
// 									render={({ field }) => (
// 										<FormItem className='md:col-span-2'>
// 											<FormLabel>Ngày hết hạn</FormLabel>
// 											<FormControl>
// 												<Input type='date' {...field} />
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								{/* Submit */}
// 								<div className='md:col-span-2 mt-4'>
// 									<Button
// 										type='submit'
// 										disabled={isLoading}
// 										className='w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl disabled:opacity-50'
// 									>
// 										{isLoading ? 'Đang tạo...' : 'Tạo Độc Giả'}
// 									</Button>
// 								</div>
// 							</form>
// 						</Form>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
