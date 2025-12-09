import { createSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import SearchBar from '@/components/search-bar'
import { useQueryParams } from '@/hooks/useQueryParam'

export const DocumentSearchBar = () => {
	const queryParams = useQueryParams()
	const navigate = useNavigate()
	const searchParam = queryParams.q as string | undefined

	const [searchValue, setSearchValue] = useState<string>(searchParam || '')

	// Sync search value with URL query param
	useEffect(() => {
		if (searchParam !== undefined) {
			setSearchValue(searchParam)
		} else {
			setSearchValue('')
		}
	}, [searchParam])

	const handleSearchChange = (value: string) => {
		setSearchValue(value)
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	const handleSearch = () => {
		const newParams: Record<string, string> = {
			...queryParams,
			page: '1'
		}

		// Chỉ thêm q vào query params nếu có giá trị, nếu không thì xóa nó
		if (searchValue && searchValue.trim()) {
			newParams.q = searchValue.trim()
		} else {
			delete newParams.q
		}

		navigate({
			pathname: '/view-all-documents',
			search: createSearchParams(newParams).toString()
		})
	}

	return (
		<SearchBar
			searchValue={searchValue}
			onSearchChange={handleSearchChange}
			onKeyPress={handleKeyPress}
			onSubmit={handleSearch}
		/>
	)
}
