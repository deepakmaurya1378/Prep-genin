import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='p-10'>
      <div className="flex justify-center items-center h-screen">
    <SignUp />
     </div>
  </div>
  )
}