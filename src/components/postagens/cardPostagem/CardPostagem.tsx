import React from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import foto from '../../../assets/usuario.png'
interface CardPostagemProps {
  post: Postagem
}

function CardPostagem({ post }: CardPostagemProps) {
  const dataLocal = new Date(post.data + 'Z').toLocaleString();
  return (
    <div className='border w-2/3 rounded '>
      <div>
        <div className="flex w-full  py-4 px-4 items-center gap-4">
          {post.usuario?.foto === "" || post.usuario?.foto === " " ?
            (
              <img src={foto} className='h-12 rounded-full brightness-50' alt="foto do usuário" />
            ) : (
              <img src={post.usuario?.foto} className='h-12 rounded-full w-[5%] object-cover' alt="foto do usuário" />
            )

          }

          <div className=''>
            <h3 className='text-lg font-bold capitalize '>{post.usuario?.nome}</h3>
            
            <p className=' '>{dataLocal}</p>

          </div>


        </div>
        <hr className='border '></hr>
        <div className='p-4 flex flex-col gap-5 w-full '>
          <h4 className='text-xl font-semibold capitalize '>{post.titulo}</h4>
          <p className='text-lg'><span className='font-semibold'>Tema: </span>{post.tema?.descricao}</p>
          <p className='text-justify text-clip  break-words '>{post.texto}</p>


        </div>
      </div>
    </div>
  )
}

export default CardPostagem