import React from 'react'

function Layout({children}) {
  return (
    <div className='max-w-[1280px] m-auto p-4 md:p-8'>{children}</div>
  )
}

export default Layout