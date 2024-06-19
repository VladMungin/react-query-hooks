import axios from 'axios'
import { useQuery } from 'react-query'
import { Comment, Post, User } from '../Types/types'

export const useGetSomeData = (url: string) => {
	return useQuery<Post[] | User[] | Comment[]>({
		queryKey: [url],
		queryFn: async () => {
			const {data} = await axios.get(`https://jsonplaceholder.typicode.com/${url}`)
			return data as (Post[] | User[] | Comment[])
		}
	})
}