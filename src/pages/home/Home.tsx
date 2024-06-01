import React from 'react';
import homeLogo from '../../assets/gif_home.gif'
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function Home() {
  
const navigate = useNavigate();
function verPostagens() {
  navigate('/postagens')
}
  return (
    <>
      <div className=" flex justify-center">
        <div className='container grid grid-cols-2 mt-3 cp:grid-cols-1 sm:grid-cols-1 md:ml-2 xl:ml-2 '>
          <div className="flex flex-col gap-8 justify-center cp:mb-4 md:mb-4 sm:mb-4 ">

            <h2 className='text-6xl font-bold text-pink'>Seja bem-vinde ao meu Blog!</h2>
            <p className='text-2xl text-purple italic'>Compartilhe suas ideias e opiniões aqui!</p>
            <p className='text-justify text-1xl ' >Junte-se à nossa comunidade e descubra um espaço onde suas histórias, pensamentos e experiências são valorizados. Navegue pelas postagens, participe das discussões e encontre pessoas que compartilham dos mesmos interesses. Este blog é um lugar para aprender, inspirar e ser inspirado. Vamos começar essa jornada juntos!</p>
            <div className="flex justify-around gap-4">
              <ModalPostagem />
              <button className=' rounded-full hover:bg-purple text-white py-3 px-5 bg-greenS hover:text-white' onClick={verPostagens}>

                <FontAwesomeIcon icon={faList} className='mr-2' />
                Ver postagens</button>
            </div>
          </div>

          <div className="flex justify-center flex-col cp:hidden sm:hidden items-center ">
            <img src={homeLogo} alt="" className='w-11/12' />
            <p className='text-gray-300 relative bottom-28 md:bottom-16 lg:bottom-20 md:text-xs'>
              Illustration by <a href="https://icons8.com/illustrations/author/mNCLibjicqSz" target='_blank'>Julia K</a> from <a href="https://icons8.com/illustrations" target='_blank'>Ouch!</a>
            </p> </div>
        </div>
      </div>
    </>
  );
}

export default Home;