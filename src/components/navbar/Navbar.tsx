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
      <div className='w-full text-purple flex justify-center py-6 h-[100%] '>
        <div className="container flex justify-between text-lg">
          <Link to='/home' className='text-2xl font-light uppercase'>Blog Pessoal</Link>

          <div className='flex gap-4'>
            <Link to='/postagens' className='hover:underline'>Postagens</Link>
            <Link to='/temas' className='hover:underline'>Temas</Link>
            <Link to='/cadastroTema' className='hover:underline'>Cadastrar tema</Link>
            <Link to='/usuario' className='hover:underline'>
            <a data-tooltip-id="my-tooltip" className='hover:cursor-pointer' onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} >
              <FontAwesomeIcon icon={faUser} />
            </a>
            </Link>
            <ReactTooltip

              id="my-tooltip"
              isOpen={isOpen}
              style={{ backgroundColor: "#8e86bd", height: "12rem", boxShadow: "revert" }}
            >
              <div className='text-white text-center w-full h-full'>
                <h1>
                  Olá {usuario.nome}!
                </h1>
                {usuario.foto === "" || usuario.foto === " " ? (
                  <img className='mt-3 w-full h-32 object-cover rounded-full' src={foto} alt="foto padrão" />
                ) : (
                  <img src={usuario.foto} className='mt-3 w-full h-32 object-cover rounded-full' alt="foto do usuário" />
                )}
              </div>


            </ReactTooltip>

            <Link to='' onClick={logout} className='hover:underline'><FontAwesomeIcon icon={faArrowRightFromBracket} /></Link>
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