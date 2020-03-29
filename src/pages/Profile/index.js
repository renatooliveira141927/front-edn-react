import React, {useEffect, useState} from 'react';
import { Link ,useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './style.css';

import logoImg  from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ongID = localStorage.getItem('ongid');
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization:ongID
            }
        }).then(response=>{
            setIncidents(response.data);
        })
    },[ongID]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization:ongID
                }
            });
            setIncidents(incidents.filter(incident =>incident.id!==id));
        } catch (error) {
            alert('Erro ao realizar o delete');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
       <div className="profile-container">
           <header>
                <img src={logoImg} alt="Heroes"/>
                <span>Bem vinda, {ongName}</span>    
                <Link className="button" to="/incidents/new" >Cadastrar Novo Caso</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#e02041"/>
                </button>
           </header>     
           <h1>Casos cadastrados</h1>   
                <ul>
                    {incidents.map(caso =>(
                        <li key={caso.id}>
                            <strong>Caso:</strong>
                            <p>{caso.title}</p>
                            <strong>Descrição:</strong>
                            <p>{caso.description}</p>
                            <strong>Valor:</strong>
                            <p>{ Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(caso.value)}</p>
                            <button type="button"
                                onClick={()=>handleDeleteIncident(caso.id)}>
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>
                    ))}                  
                </ul>
        </div>
    );
}