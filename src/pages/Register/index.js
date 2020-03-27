import React, { useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './style.css';
import api from '../../services/api';

import logoImg  from '../../assets/logo.svg';

export default function Register(){
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [whatsapp, setWhatsApp]= useState('');
    const [city, setCity]= useState('');
    const [uf, setUf]= useState('');
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = ({
            name,
            email,
            whatsapp,
            city,
            uf
        });
        try {
           const response = await api.post('ongs',data);    
           alert(`Seu id de acesso é ${response.data.id}`);
           history.push('/');
        } catch (error) {
            alert('Erro ao cadastrar tente novamente');
        }        
    }
    return (
       <div className="register-container">
           <div className="content">
                <section >
                    <img src={logoImg} alt="Heroes"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, receba seus dados de login e realiza o cadastros dos casos e da busca de parceiros </p>
                   
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome"
                     value={name}
                     onChange={e => setName(e.target.value)}/>
                    <input placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="WhatsApp"
                            value={whatsapp}
                            onChange={e => setWhatsApp(e.target.value)}/>
                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" style={{width:80}}
                                value={uf}
                                onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button type="submit" className="button">Cadastrar</button>
                         <Link to="/" className="back-link">
                            <FiArrowLeft size={16} color="#E02041"/>
                            Não tenho cadastro
                        </Link>
                </form>
                
           </div>           
       </div>
    
    );
}