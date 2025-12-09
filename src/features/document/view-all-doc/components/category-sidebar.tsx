import { useEffect, useMemo, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { useAllBookCategories } from '@/hooks/book-categories/useGetBookCategories'
import { useQueryParams } from '@/hooks/useQueryParam'
import { cn, convertCategoriesToTree } from '@/lib/utils'
import { ChevronDown, ChevronRight } from 'lucide-react'

export const CategorySidebar = () => {
	const queryParams = useQueryParams()
	const navigate = useNavigate()

	const { data: categories, isLoading } = useAllBookCategories()
	const currentCategoryId = queryParams.main_category_id as string | undefined

	// Convert flat array to tree structure
	const categoryTree = useMemo(() => {
		if (!categories) return []
		return convertCategoriesToTree(categories)
	}, [categories])

	// State for expanded categories
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

	// Auto-expand parent if currentCategoryId is a child
	useEffect(() => {
		if (currentCategoryId && categories) {
			const currentCategory = categories.find((cat) => cat.id === currentCategoryId)
			if (currentCategory?.parent_id) {
				setExpandedCategories((prev) => new Set(prev).add(currentCategory.parent_id!))
			}
		}
	}, [currentCategoryId, categories])

	// Toggle expand/collapse
	const toggleExpand = (categoryId: string) => {
		setExpandedCategories((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(categoryId)) {
				newSet.delete(categoryId)
			} else {
				newSet.add(categoryId)
			}
			return newSet
		})
	}

	// Handle "Tất cả sách" click
	const handleAllBooksClick = () => {
		const newParams: Record<string, string> = {
			...queryParams,
			page: '1'
		}
		delete newParams.main_category_id

		navigate({
			pathname: '/view-all-documents',
			search: createSearchParams(newParams).toString()
		})
	}

	// Handle category click
	const handleCategoryClick = (categoryId: string, hasChildren: boolean) => {
		// Always navigate with parent category
		const newParams: Record<string, string> = {
			...queryParams,
			page: '1',
			main_category_id: categoryId
		}

		navigate({
			pathname: '/view-all-documents',
			search: createSearchParams(newParams).toString()
		})

		// If has children, also toggle expand/collapse
		if (hasChildren) {
			toggleExpand(categoryId)
		}
	}

	// Handle child category click
	const handleChildClick = (categoryId: string) => {
		const newParams: Record<string, string> = {
			...queryParams,
			page: '1',
			main_category_id: categoryId
		}

		navigate({
			pathname: '/view-all-documents',
			search: createSearchParams(newParams).toString()
		})
	}
	return (
		<aside className='flex-shrink-0 w-64'>
			<div className='sticky p-6 bg-white border border-gray-100 shadow-lg rounded-xl top-4'>
				{/* Header */}
				<div className='pb-4 mb-5 border-b border-gray-200'>
					<h2 className='text-xl font-bold text-gray-900 flex items-center gap-2.5'>
						<span className='text-2xl'>📚</span>
						<span>Danh mục</span>
					</h2>
					<p className='text-xs text-gray-500 mt-1.5 ml-9'>Lọc sách theo danh mục</p>
				</div>

				{isLoading ? (
					// Loading state
					<div className='flex flex-col items-center justify-center py-8'>
						<div className='w-8 h-8 mb-2 border-green-200 rounded-full border-3 border-t-green-600 animate-spin'></div>
						<span className='text-sm text-gray-500'>Đang tải...</span>
					</div>
				) : (
					<div className='space-y-1.5'>
						<button
							onClick={handleAllBooksClick}
							className={cn(
								'group w-full flex items-center justify-between',
								'px-4 py-3 rounded-lg text-sm font-medium',
								'transition-all duration-200 ease-in-out',
								!currentCategoryId
									? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 shadow-sm ring-2 ring-green-200'
									: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
							)}
						>
							<span className='flex items-center gap-2.5'>
								<span className='text-lg'>📖</span>
								<span>Tất cả sách</span>
							</span>
							{!currentCategoryId && (
								<span className='px-2 py-0.5 bg-green-600 text-white text-xs rounded-full'>Tất cả</span>
							)}
						</button>

						{/* Divider */}
						<div className='py-2'>
							<div className='h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent'></div>
						</div>

						<div className='space-y-2.5 max-h-[calc(100vh-320px)] overflow-y-auto -mx-5 px-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
							{categoryTree.map((category, index) => {
								const hasChildren = Boolean(category.children && category.children.length > 0)
								const isExpanded = expandedCategories.has(category.id)
								const isActive = currentCategoryId === category.id
								const hasActiveChild =
									category.children?.some((child) => child.id === currentCategoryId) || false

								return (
									<div key={category.id} className='space-y-1'>
										<button
											onClick={() => handleCategoryClick(category.id, hasChildren)}
											className={cn(
												'group w-full flex items-center justify-between gap-3',
												'px-4 py-3 rounded-lg text-sm font-medium',
												'transition-all duration-200 ease-in-out',
												isActive || hasActiveChild
													? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 shadow-sm ring-2 ring-green-200'
													: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm hover:translate-x-0.5'
											)}
											style={{ animationDelay: `${index * 30}ms` }}
										>
											<span className='flex items-center gap-2.5 flex-1 min-w-0'>
												<span className='flex-shrink-0 text-base'>📚</span>
												<span className='text-left truncate'>{category.name}</span>
											</span>

											{/* Icon Chevron */}
											{hasChildren ? (
												<ChevronDown
													className={cn(
														'w-4 h-4 flex-shrink-0 transition-all duration-200',
														isExpanded ? 'rotate-180' : '',
														isActive || hasActiveChild
															? 'text-green-600'
															: 'text-gray-400 group-hover:text-gray-600'
													)}
												/>
											) : (
												<ChevronRight
													className={cn(
														'w-4 h-4 flex-shrink-0 transition-all duration-200',
														isActive
															? 'text-green-600 translate-x-0.5'
															: 'text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1'
													)}
												/>
											)}
										</button>

										{/* Submenu - Children */}
										{hasChildren && (
											<div
												className={cn(
													'overflow-hidden transition-all duration-300 ease-in-out',
													isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
												)}
											>
												<div className='pl-4 ml-4 space-y-1 border-l-2 border-gray-200'>
													{category.children?.map((child) => {
														const isChildActive = currentCategoryId === child.id
														return (
															<button
																key={child.id}
																onClick={() => handleChildClick(child.id)}
																className={cn(
																	'group w-full flex items-center justify-between gap-3',
																	'px-3 py-2 rounded-lg text-xs font-medium',
																	'transition-all duration-200 ease-in-out',
																	isChildActive
																		? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 shadow-sm ring-1 ring-green-200'
																		: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
																)}
															>
																<span className='flex items-center flex-1 min-w-0 gap-2'>
																	<span className='flex-shrink-0 text-sm'>📄</span>
																	<span className='text-left truncate'>
																		{child.name}
																	</span>
																</span>

																{isChildActive && (
																	<span className='px-1.5 py-0.5 bg-green-600 text-white text-xs rounded-full'>
																		✓
																	</span>
																)}
															</button>
														)
													})}
												</div>
											</div>
										)}
									</div>
								)
							})}
						</div>

						{categoryTree.length === 0 && (
							<div className='py-8 text-center'>
								<div className='mb-2 text-4xl'>📭</div>
								<p className='text-sm text-gray-500'>Chưa có danh mục nào</p>
							</div>
						)}
					</div>
				)}
			</div>
		</aside>
	)
}
