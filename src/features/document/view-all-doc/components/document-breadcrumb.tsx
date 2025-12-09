import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useAllBookCategories } from '@/hooks/book-categories/useGetBookCategories'
import { useQueryParams } from '@/hooks/useQueryParam'
import { Home } from 'lucide-react'

interface DocumentBreadcrumbProps {
	bookType?: string
}

export const DocumentBreadcrumb = ({ bookType }: DocumentBreadcrumbProps) => {
	const queryParams = useQueryParams()
	const currentCategoryId = queryParams.main_category_id as string | undefined
	const { data: categories } = useAllBookCategories()

	// Tìm tên category hiện tại
	const currentCategory = categories?.find((cat) => cat.id === currentCategoryId)

	const getBookTypeLabel = () => {
		if (bookType === 'physical') return 'Sách giấy'
		if (bookType === 'ebook') return 'Sách điện tử'
		return 'Tất cả sách'
	}

	return (
		<Breadcrumb className='mb-6'>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink
						href='/'
						className='flex items-center gap-1 transition-colors hover:text-green-600'
					>
						<Home className='w-4 h-4' />
						<span>Trang chủ</span>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href='/documents' className='transition-colors hover:text-green-600'>
						Tài liệu
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage className='font-medium text-gray-900'>
						{getBookTypeLabel()}
						{currentCategory && ` - ${currentCategory.name}`}
					</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}
