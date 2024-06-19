import axios, { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

export const usePostData = (url: string) => {
  const mutation = useMutation((postData: object) =>
    axios.post<unknown, AxiosResponse>(`https://jsonplaceholder.typicode.com/${url}`, postData)
  );

  return mutation;
};