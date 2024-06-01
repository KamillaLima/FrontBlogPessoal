import React from 'react'
import { useNavigate } from 'react-router-dom'
import error from '../../assets/404.png'
function NotFound() {
    const navigate = useNavigate();
    function retornar(){
      navigate("/login")
    }
    return (
        <div className='h-screen w-full justify-center items-center flex flex-col'>
            <h1 className='text-5xl font-light mb-20 lg:text-4xl md:text-2xl sm:text-2xl cp:text-lg'>Ops!Rota incorreta , clique no botão abaixo e volte para o login</h1>
            <img src={error} className='w-[30%]' />
            <button onClick={retornar} className='rounded-full hover:bg-purple text-white py-3 px-5 bg-greenS hover:text-white '>
                Clique aqui
            </button>
        </div>
    )
}


export default NotFound;