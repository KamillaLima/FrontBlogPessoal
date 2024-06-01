import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import foto from '../../../assets/usuario.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import FormularioPostagem from '../formularioPostagem/FormularioPostagem';
import EditarFormularioPostagem from '../formularioPostagem/EditarFormularioPostagem';
import './ModalPostagem.css'
interface CardPostagemProps {
  post: Postagem
}

function CardPostagemUsuario({ post }: CardPostagemProps) {
  const dataLocal = new Date(post.data + 'Z').toLocaleString();

  return (
    <div className='border w-2/3 rounded  '>
      <div>
        <div className="flex w-full  py-4 px-4 items-center gap-2 flex-row ">
          {post.usuario?.foto === "" || post.usuario?.foto === " " ?
            (
              <img src={foto} className='h-12 rounded-full brightness-50 cp:hidden' alt="foto do usuário" />
            ) : (
              <img src={post.usuario?.foto} className='h-12 rounded-full cp:hidden' alt="foto do usuário" />
            )

          }

          <div className=' w-full '>
            <h3 className='text-lg font-bold capitalize '>{post.usuario?.nome}</h3>

            <p className='text-sm '>{dataLocal}</p>

          </div>


          <div className=' ml-[70%] w-1/2 text-end text-lg lg:ml-[40%] lg:w-36 md:ml-[30%] sm:ml-[20%]  cp:ml-0 flex flex-row cp:flex-col  items-center'>

            <Link to={`/deletarPostagem/${post.id}`} >
              <FontAwesomeIcon icon={faTrash} className='pr-6 cp:pr-0 hover:text-red-500' />
            </Link>



            

            <Popup className=' '
              trigger={<FontAwesomeIcon icon={faPenToSquare} className='pr-6 cp:pr-0 hover:text-greenS hover:cursor-pointer' />} modal>
                <EditarFormularioPostagem postId={post.id}/>
            </Popup>


          </div>




        </div>
        <hr className='border '></hr>
        <div className='p-4 flex flex-col gap-5'>
          <h4 className='text-xl font-semibold capitalize '>{post.titulo}</h4>
          <p className='text-lg'><span className='font-semibold'>Tema: </span>{post.tema?.descricao}</p>
          <p className='text-justify text-clip  break-words '>{post.texto}</p>


        </div>
      </div>
    </div>
  )
}

export default CardPostagemUsuario


/*
{<Popup
  trigger={ <FontAwesomeIcon icon={faPenToSquare} className='pr-6 cp:pr-0 hover:text-red-500' />}
  modal >
    
  <EditarFormularioPostagem postId={post.id}/>
</Popup>
}*/