import axios, { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { Post } from '../Types/types';

export const usePostData = (url: string) => {
	const mutation = useMutation((postData: Post) =>
		axios.post<unknown, AxiosResponse>(
			`https://jsonplaceholder.typicode.com/${url}`,
			postData
		)
	);

	return mutation;
};
