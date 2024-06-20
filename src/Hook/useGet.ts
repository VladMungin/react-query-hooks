import axios from 'axios'
import { useQuery } from 'react-query'
import { Post } from '../Types/types'

const getData = (url: string) => {
	return axios.get<Post[]>(`https://jsonplaceholder.typicode.com/${url}`)
}

export function useGetSomeData(url: string) {
	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['posts', url],
		queryFn: () => getData(url),
		select: data => data.data,
		enabled: !!url,
	})

	return { posts: data, isLoading, isSuccess, refetchPosts: refetch }
}
