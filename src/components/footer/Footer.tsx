import { LinkedinLogo , GithubLogo } from '@phosphor-icons/react'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

  const { usuario, handleLogout } = useContext(AuthContext)

  let footerComponent

  let data = new Date().getFullYear()

  if(usuario.token !== '') {
    footerComponent = (
      <>
        <div className="flex justify-center bg-purple text-white">
          <div className="container flex flex-row items-center py-4 justify-between cp:flex-col cp:text-center cp:gap-2">
            <p className='text-xl '>Blog pessoal Generation | Copyright: {data}</p>
            <div className='flex gap-20 mr-3 '>
              <a href='https://www.linkedin.com/in/kamillarodrigues/' target='_blank'>
                
              <LinkedinLogo size={48} weight='light' />
              </a>
              <a href='https://github.com/KamillaLima' target='_blank'>
                
              <GithubLogo size={48} weight='light' />
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {footerComponent}
    </>
  )
}

export default Footer