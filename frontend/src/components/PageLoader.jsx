import React from 'react'
import { LoaderIcon } from "lucide-react"

function PageLoader() {
  return (
    <div className='flex h-dvh w-full items-center justify-center bg-prsBlack'>
      <LoaderIcon className='size-10 animate-spin text-prsBlue' />
    </div>
  )
}

export default PageLoader
