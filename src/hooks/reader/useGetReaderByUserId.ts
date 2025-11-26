import { useQuery } from '@tanstack/react-query'
import { readerApis } from '@/apis/reader.api'
import type { Reader } from '@/types/reader.type'

export const useGetReaderByUserId = (userId: string) => {
	return useQuery<Reader>({
		queryKey: ['reader', userId],
		queryFn: () => readerApis.getReaderByUserId(userId),
		enabled: !!userId,
		retry: 1
	})
}
