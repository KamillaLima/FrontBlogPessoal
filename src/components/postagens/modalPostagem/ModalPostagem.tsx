import React from 'react';
import FormularioPostagem from '../formularioPostagem/FormularioPostagem';
import './ModalPostagem.css'
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import EditarFormularioPostagem from '../formularioPostagem/EditarFormularioPostagem';

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={<button className=' rounded-full text-2 hover:bg-purple text-white py-3 px-5 bg-greenS hover:text-white '>
          <FontAwesomeIcon icon={faPenToSquare} className='mr-2' />


          Nova postagem</button>} modal>
        <div  >
          <FormularioPostagem />
        </div>
      </Popup>
    </>
  );
}

export default ModalPostagem;