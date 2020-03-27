import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './style.css';

import logoImg  from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    const ongID = localStorage.getItem('ongid');
const history = useHistory();
    async function handleNewIncident(e){
        e.preventDefault();
        const data= {
            title,
            description,
            value
        };

        try {
            
            await api.post('incidents',data,{
                headers:{Authorization:ongID} 
            });
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar novo caso');
        }
    }

    return (
       <div className="new-incident-container">
           <div className="content">
                <section >
                    <img src={logoImg} alt="Heroes"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, receba seus dados de login e realiza o cadastros dos casos e da busca de parceiros </p>
                            <Link to="/" className="back-link">
                                <FiArrowLeft size={16} color="#E02041"/>
                            Voltar para Home
                        </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo"
                        value={title}
                        onChange={e=> setTitle(e.target.value)}/>
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e=> setDescription(e.target.value)}/>
                    <input 
                        placeholder="Valor em Reais"                  
                        value={value}
                        onChange={e=> setValue(e.target.value)}/>
                    <button type="submit" className="button">Cadastrar</button>                        
                </form>
                
           </div>           
       </div>
    
    );
}