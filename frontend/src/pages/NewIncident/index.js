import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [edescription, setEdescription] = useState('');
    const [value,setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            edescription,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        } catch (err) {
            alert('Seu cadastro de caso falhou, tente novamente.');
        }

    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Cadastre seu caso hot damn</p>

                    <Link className='back-link' to='/profile'>
                        <FiArrowLeft size={16} color='#e02041'></FiArrowLeft>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Titulo do Caso"
                    />
                    <textarea 
                    placeholder="Descricao"
                    value={edescription}
                    onChange={e => setEdescription(e.target.value)}
                    />
                    <input 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Valor em reais"
                    />
                    
                    <button className="button" type="submit" > Cadastrar</button>
                </form>
            </div>
        </div>
    )
}