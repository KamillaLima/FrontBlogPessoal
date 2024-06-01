import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { Tooltip as ReactTooltip, Tooltip } from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import foto from '../../assets/usuario.png'


function Navbar() {
  let navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { usuario, handleLogout } = useContext(AuthContext)

  function logout() {
    handleLogout()
    alert('Usuário deslogado com sucesso')
    navigate('/login')
  }

  const idUser = usuario.id;
  let navbarComponent

  if (usuario.token !== "") {

    navbarComponent = (
      <div className='w-full text-purple flex justify-center py-6 h-[100%] items-center'>
        <div className=" flex flex-row items-center justify-between w-full text-lg cp:w-[90%] 
         sm:justify-around  md:justify-around  lg:mx-12   xl:mx-12  2xl:mx-12  ">
          <Link to='/home' className='text-2xl font-light uppercase cp:hidden md:text-3xl 2xl:text-3xl  hover:text-greenS '>Blog Pessoal</Link>

          <div className='gap-8  w-[40%] flex justify-around md:w-[30%] md:ml-20 md:text-2xl lg:w-[30%]
            xl:gap-2  xl:w-[30%] xl:text-2xl font-light items-center 2xl:text-3xl  cp:w-full'>
            <Link to='/postagens' className=' hover:text-greenS'>Postagens</Link>
            <Link to='/usuario' className=' hover:text-greenS'>
              <a data-tooltip-id="my-tooltip" className='hover:text-greenSr' onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} >
                <FontAwesomeIcon icon={faUser} />
              </a>
            </Link>
            <ReactTooltip

              id="my-tooltip"
              isOpen={isOpen}
              style={{ backgroundColor: "#8e86bd", height: "12rem", boxShadow: "revert" }}
            >
              <div className='text-white text-center w-full h-full flex items-center flex-col'>
                <h1>
                  Olá {usuario.nome}!
                </h1>
                {usuario.foto === "" || usuario.foto === " " ? (
                  <img className='mt-3 w-full h-32 object-cover rounded-full' src={foto} alt="foto padrão" />
                ) : (
                  <img src={usuario.foto} className='mt-3 w-[85%] h-32 object-cover rounded-full' alt="foto do usuário" />
                )}
              </div>


            </ReactTooltip>

            <Link to='' onClick={logout} className=' hover:text-greenS'><FontAwesomeIcon icon={faArrowRightFromBracket} /></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {navbarComponent}
    </>
  )
}

export default Navbar