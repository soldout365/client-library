import { useAuthStore } from '@/stores/auth.store'
import { BookOpen, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
	const navigate = useNavigate()
	const reader = useAuthStore((state) => state.reader)

	return (
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
					<button onClick={() => navigate('/documents')} className='text-gray-600 hover:text-gray-800'>
						Tài liệu
					</button>
					<div className='flex items-center gap-2 text-green-600 font-medium'>
						<User className='w-4 h-4' />
						<span>{reader?.fullName}</span>
					</div>
				</div>
			</div>
		</header>
	)
}
