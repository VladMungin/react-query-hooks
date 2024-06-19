import { useState } from 'react'
import { useGetSomeData } from '../../Hook/useGet'
import { usePostData } from '../../Hook/usePost'
import { Post } from '../../Types/types'
import './App.css'

function App() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState(1)
  const {data, refetch} = useGetSomeData('posts')

  const handleClick = () =>{
    setOpen(!open);
    console.log(open)
  }

  const mutation = usePostData('posts')


  const handleSubmit = (title:string, body:string, userId:number ) => {
    
    mutation.mutate({
      title, 
      body, 
      userId
    })
    refetch();
    console.log()
  }
  
  return (
    <div className='relative max-w-[1200px] mx-auto'>  
      <button className='block px-8 py-1 border-2 border-green-600 rounded-xl mx-auto mt-3 bg-green-500' onClick={(e)=>{
        e.preventDefault()
        handleClick()
      }}>Создать</button>
      <div className="flex flex-col justify-between items-center max-w-[100%]">
      {data?.map((post) => {
        const {id, userId, title, body} = post as Post 
        return (<div className='border-2 w-[100%] border-black rounded-xl my-4 p-2' key={id}>
          <h1 className='font-bold text-2xl'>{title}</h1>
          <h2 className='font-medium text-xl'>{body}</h2>
          <p> User: {userId}</p>
        </div>)
      })}
      </div>
      {open ? <><div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col">
                  <input type="text" className='w-[100%] my-3 h-10 border-2 border-black rounded-xl px-3'
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}/>
                  <input type="text" className='w-[100%] my-3 h-10 border-2 border-black rounded-xl px-3'
                  onChange={(e) => {
                    setBody(e.target.value)
                  }}/>
                  <input type="text" className='w-[100%] my-3 h-10 border-2 border-black rounded-xl px-3' onChange={(e) => {
                    setUserId(+e.target.value)
                  }}/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleSubmit(title,body,userId)
                      setOpen(false)
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div></> : ''}
    </div>
    
  )
}

export default App


