import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import foto from '../../../assets/usuario.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import DeletarPostagem from '../deletarPostagem/deletarPostagem';
import moment from 'moment-timezone';

interface CardPostagemProps {
  post: Postagem
}

function CardPostagemUsuario({ post }: CardPostagemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showElement, setShowElement] = useState(false)
  const showOrHide = () => setShowElement(true)
  const navigate = useNavigate();
  const dataLocal = new Date(post.data + 'Z').toLocaleString();


  { console.log(post.data) }
  return (
    <div className='border w-2/3 rounded '>
      <div>
        <div className="flex w-full  py-4 px-4 items-center gap-4 flex-row ">
          {post.usuario?.foto === "" || post.usuario?.foto === " " ?
            (
              <img src={foto} className='h-12 rounded-full brightness-50' alt="foto do usuário" />
            ) : (
              <img src={post.usuario?.foto} className='h-12 rounded-full ' alt="foto do usuário" />
            )

          }

          <div className=''>
            <h3 className='text-lg font-bold capitalize '>{post.usuario?.nome}</h3>

            <p className=' '>{dataLocal}</p>

          </div>



          <Link to={`/deletarPostagem/${post.id}`} >
            <button>Deletar</button>
          </Link>

          <Link to={`/editarPostagem/${post.id}`}>
            <button>Editar</button>
          </Link>



        </div>
        <hr className='border '></hr>
        <div className='p-4 flex flex-col gap-5'>
          <h4 className='text-xl font-semibold capitalize '>{post.titulo}</h4>
          <p className='text-lg'><span className='font-semibold'>Tema: </span>{post.tema?.descricao}</p>
          <p className='text-justify break-words  text-ellipsis '>{post.texto}</p>


        </div>
      </div>
    </div>
  )
}

export default CardPostagemUsuario