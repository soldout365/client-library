import { useBooks } from '@/hooks/books/useGetBooks'
import { useAllBookCategories } from '@/hooks/book-categories/useGetBookCategories'
import { useQueryParams } from '@/hooks/useQueryParam'
import { ChevronRight, Home } from 'lucide-react'
import type { BookQueryParamsType } from '@/types/book.type'
import { BookCard } from '../components/BookCard'
import { Header } from '@/components/header'
import { createSearchParams, useNavigate } from 'react-router-dom'
import PaginationWrapper from '@/components/pagination-wrapper'
import SearchBar from '@/components/search-bar'
import { useSearch } from '@/hooks/useSearch'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const ViewAllDocumentPage = () => {
	const queryParams = useQueryParams()
	const navigate = useNavigate()

	const { data: bookData, isLoading: isBookLoading } = useBooks({
		...queryParams,
		limit: 8
	} as BookQueryParamsType)
	const books = bookData?.data || []

	const { data: categoryData, isLoading: isCategoryLoading } = useAllBookCategories()

	const currentCategoryId = queryParams.main_category_id as string | undefined
	const bookType = queryParams.type as string | undefined

	// Tìm tên category hiện tại
	const currentCategory = categoryData?.find((cat) => cat.id === currentCategoryId)

	// Handle change page
	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: '/view-all-documents',
			search: createSearchParams({
				...queryParams,
				limit: '8',
				page: newPage.toString()
			}).toString()
		})
	}

	// search
	const { searchValue, handleKeyPress, handleSearchChange, handleSubmit } = useSearch({
		onKeyPress: (e) => {
			if (e.key === 'Enter') {
				navigate({
					pathname: '/view-all-documents',
					search: createSearchParams({
						...queryParams,
						page: '1',
						q: searchValue
					}).toString()
				})
			}
		},
		onSubmit: (searchValue) => {
			navigate({
				pathname: '/view-all-documents',
				search: createSearchParams({
					...queryParams,
					page: '1',
					q: searchValue
				}).toString()
			})
		}
	})

	// Handle category click
	const handleCategoryClick = (categoryId?: string) => {
		const newParams = {
			...queryParams
		}
		if (categoryId) {
			newParams.main_category_id = categoryId
		} else {
			delete newParams.main_category_id
		}

		newParams.page = '1'
		navigate({
			pathname: '/view-all-documents',
			search: createSearchParams(newParams).toString()
		})
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<div className='max-w-7xl mx-auto px-4 py-8'>
				{/* Breadcrumb */}
				<Breadcrumb className='mb-6'>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink
								href='/'
								className='flex items-center gap-1 hover:text-green-600 transition-colors'
							>
								<Home className='w-4 h-4' />
								<span>Trang chủ</span>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href='/documents' className='hover:text-green-600 transition-colors'>
								Tài liệu
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage className='font-medium text-gray-900'>
								{bookType === 'physical'
									? 'Sách giấy'
									: bookType === 'ebook'
										? 'Sách điện tử'
										: 'Tất cả sách'}
								{currentCategory && ` - ${currentCategory.name}`}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className='flex gap-6'>
					{/* Sidebar - Danh mục */}
					<aside className='w-64 flex-shrink-0'>
						<div className='bg-white rounded-xl shadow-lg p-6 sticky top-4 border border-gray-100 '>
							{/* Header - Cải thiện style */}
							<div className='mb-5 pb-4 border-b border-gray-200'>
								<h2 className='text-xl font-bold text-gray-900 flex items-center gap-2.5'>
									<span className='text-2xl'>📚</span>
									<span>Danh mục</span>
								</h2>
								<p className='text-xs text-gray-500 mt-1.5 ml-9'>Lọc sách theo danh mục</p>
							</div>

							{isCategoryLoading ? (
								// Loading state - Đẹp hơn
								<div className='flex flex-col items-center justify-center py-8'>
									<div className='w-8 h-8 border-3 border-green-200 border-t-green-600 rounded-full animate-spin mb-2'></div>
									<span className='text-sm text-gray-500'>Đang tải...</span>
								</div>
							) : (
								<div className='space-y-1.5'>
									<button
										onClick={() => handleCategoryClick()}
										className={`
            group w-full flex items-center justify-between 
            px-4 py-3 rounded-lg text-sm font-medium
            transition-all duration-200 ease-in-out
            ${
				!currentCategoryId
					? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 shadow-sm ring-2 ring-green-200' // Active state
					: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm' // Normal state
			}
          `}
									>
										<span className='flex items-center gap-2.5'>
											<span className='text-lg'>📖</span>
											<span>Tất cả sách</span>
										</span>
										{!currentCategoryId && (
											<span className='px-2 py-0.5 bg-green-600 text-white text-xs rounded-full'>
												Tất cả
											</span>
										)}
									</button>

									{/* Divider */}
									<div className='py-2'>
										<div className='h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent'></div>
									</div>

									<div className='space-y-2.5 max-h-[calc(100vh-320px)] overflow-y-auto -mx-5 px-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
										{categoryData?.map((category, index) => (
											<button
												key={category.id}
												onClick={() => handleCategoryClick(category.id)}
												className={`
        group w-full flex items-center justify-between gap-3
        px-4 py-3 rounded-lg text-sm font-medium
        transition-all duration-200 ease-in-out
        ${
			currentCategoryId === category.id
				? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 shadow-sm ring-2 ring-green-200'
				: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm hover:translate-x-0.5'
		}
      `}
												style={{ animationDelay: `${index * 30}ms` }}
											>
												<span className='flex items-center gap-2.5 flex-1 min-w-0'>
													<span className='text-base flex-shrink-0'>📚</span>
													<span className='truncate text-left'>{category.name}</span>
												</span>

												{/* Icon Chevron */}
												<ChevronRight
													className={`
          w-4 h-4 flex-shrink-0 transition-all duration-200
          ${
				currentCategoryId === category.id
					? 'text-green-600 translate-x-0.5'
					: 'text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1'
			}
        `}
												/>
											</button>
										))}
									</div>

									{categoryData?.length === 0 && (
										<div className='text-center py-8'>
											<div className='text-4xl mb-2'>📭</div>
											<p className='text-sm text-gray-500'>Chưa có danh mục nào</p>
										</div>
									)}
								</div>
							)}
						</div>
					</aside>

					{/* Main Content */}
					<main className='flex-1'>
						{/* Search Bar */}
						<SearchBar
							searchValue={searchValue}
							onSearchChange={handleSearchChange}
							onKeyPress={handleKeyPress}
							onSubmit={handleSubmit}
						/>

						{/* Books Grid */}
						{isBookLoading ? (
							<div className='flex justify-center items-center h-64'>
								<div className='text-gray-500'>Đang tải...</div>
							</div>
						) : (
							<>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
									{books?.map((book) => (
										<BookCard key={book.id} book={book} />
									))}
								</div>

								{books?.length === 0 && (
									<div className='text-center py-12'>
										<p className='text-gray-500'>Không tìm thấy sách nào</p>
									</div>
								)}

								{/* pagination */}
								<PaginationWrapper
									currentData={books?.length || 0}
									onChangePage={handleChangePage}
									currentMeta={bookData?.meta}
								/>
							</>
						)}
					</main>
				</div>
			</div>
		</div>
	)
}

export default ViewAllDocumentPage
