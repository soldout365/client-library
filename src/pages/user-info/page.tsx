import { useState } from 'react'
import { User, BookOpen, Calendar, Shield, Activity, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUserInfo } from '@/hooks/user/useGetInfoCurUser'
import { useAuthStore } from '@/stores/auth.store'
import { toast } from 'sonner'
import ReaderDetailModal from '@/pages/user-info/components/detail-info'

export default function UserInfoPage() {
	const navigate = useNavigate()
	const { userInfo, isLoading, error, refetch } = useUserInfo()

	const reader = useAuthStore((state) => state.reader)

	const [isReaderModalOpen, setIsReaderModalOpen] = useState(false)

	const formatDate = (dateString: string) => {
		if (!dateString) return 'N/A'
		const date = new Date(dateString)
		return date.toLocaleString('vi-VN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	const handleViewReaderDetail = () => {
		if (!reader) {
			toast.error('Bạn chưa có thông tin độc giả. Vui lòng tạo reader trước!')
			return
		}
		setIsReaderModalOpen(true)
	}

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<div className='w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
					<p className='text-gray-600'>Đang tải thông tin...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center bg-white p-8 rounded-lg shadow-sm'>
					<p className='text-red-600 mb-4'>{error}</p>
					<button
						onClick={() => refetch()}
						className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
					>
						Thử lại
					</button>
				</div>
			</div>
		)
	}

	if (!userInfo) return null

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<header className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center'>
							<BookOpen className='text-white' size={24} />
						</div>
						<h1 className='text-lg font-semibold text-gray-800'>Manage Lib</h1>
					</div>
					<div className='flex items-center gap-4'>
						<button onClick={() => navigate('/')} className='text-gray-600 hover:text-gray-800'>
							Trang chủ
						</button>
						<button className='text-gray-600 hover:text-gray-800'>Tài liệu</button>
						<div className='flex items-center gap-2 text-green-600 font-medium'>
							<User className='w-4 h-4' />
							<span>{reader?.fullName}</span>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 py-8'>
				<div className='bg-white rounded-lg shadow-sm'>
					<div className='border-b px-6 py-4'>
						<h2 className='text-xl font-semibold text-gray-800'>Trang cá nhân</h2>
					</div>

					<div className='p-6'>
						<div className='flex gap-8'>
							{/* Left Sidebar */}
							<div className='w-64 flex-shrink-0'>
								<div className='flex flex-col items-center'>
									<div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4'>
										<User className='w-12 h-12 text-green-600' />
									</div>
									<h3 className='font-semibold text-gray-800 mb-1'>{reader?.fullName}</h3>
									{reader && (
										<span className='text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full mt-1'>
											Đã có Reader
										</span>
									)}
								</div>

								<nav className='space-y-1 mt-6'>
									<button className='w-full text-left px-4 py-2 text-green-600 bg-green-50 rounded-lg flex items-center gap-3'>
										<User className='w-4 h-4' />
										<span className='text-sm font-medium'>Thông tin cá nhân</span>
									</button>
									<button
										onClick={handleViewReaderDetail}
										className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
											reader
												? 'text-gray-600 hover:bg-gray-50'
												: 'text-gray-400 cursor-not-allowed opacity-60'
										}`}
									>
										<FileText className='w-4 h-4' />
										<span className='text-sm'>Thông tin chi tiết</span>
									</button>
									<button className='w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-3'>
										<Activity className='w-4 h-4' />
										<span className='text-sm'>Lịch sử học</span>
									</button>
									<button
										onClick={() => navigate('/change-password')}
										className='w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-3'
									>
										<Shield className='w-4 h-4' />
										<span className='text-sm'>Đổi mật khẩu</span>
									</button>
								</nav>
							</div>

							{/* Main Info */}
							<div className='flex-1'>
								<h3 className='text-lg font-semibold text-gray-800 mb-6'>Thông tin cá nhân</h3>

								<div className='grid grid-cols-2 gap-6'>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Mã người dùng
										</label>
										<p className='text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
											{userInfo.userCode}
										</p>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Tên người dùng
										</label>
										<p className='text-gray-900'>{reader?.fullName}</p>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
										<p className='text-gray-900'>{userInfo.email}</p>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>Vai trò</label>
										<p className='text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2'>
											<Shield className='w-4 h-4 text-blue-600' />
											{userInfo.role}
										</p>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Trạng thái tài khoản
										</label>
										<span className='px-3 py-2 rounded-lg inline-block bg-green-100 text-green-700'>
											{userInfo.accountStatus}
										</span>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Đăng nhập lần cuối
										</label>
										<p className='text-gray-900 flex items-center gap-2'>
											<Calendar className='w-4 h-4 text-gray-500' />
											{formatDate(userInfo.lastLogin)}
										</p>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Ngày tạo tài khoản
										</label>
										<p className='text-gray-900'>{formatDate(userInfo.createdAt)}</p>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Cập nhật lần cuối
										</label>
										<p className='text-gray-900'>{formatDate(userInfo.updatedAt)}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Reader Detail Modal */}
			<ReaderDetailModal reader={reader} isOpen={isReaderModalOpen} onClose={() => setIsReaderModalOpen(false)} />
		</div>
	)
}
