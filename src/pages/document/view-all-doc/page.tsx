import { BooksGrid } from './components/BooksGrid'
import { CategorySidebar } from './components/CategorySidebar'
import { DocumentBreadcrumb } from './components/DocumentBreadcrumb'
import { DocumentSearchBar } from './components/DocumentSearchBar'
import { Header } from '@/components/header'
import { useQueryParams } from '@/hooks/useQueryParam'

const ViewAllDocumentPage = () => {
	const queryParams = useQueryParams()
	const bookType = queryParams.type as string | undefined

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<div className='px-4 py-8 mx-auto max-w-7xl'>
				<DocumentBreadcrumb bookType={bookType} />

				<div className='flex gap-6'>
					<CategorySidebar />

					<main className='flex-1'>
						<DocumentSearchBar />

						<BooksGrid />
					</main>
				</div>
			</div>
		</div>
	)
}

export default ViewAllDocumentPage
