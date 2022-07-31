import React, { useContext, useState } from 'react';
import AuthContext from '../Contexts/AuthContext';
import authAPI from '../Services/authAPI';

const LoginPage = ({ history}) => {
    const {setIsAuth} = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        username: 'Isaac66@Guillet.fr',
        password: 'password'
    });

    const [error, setError] = useState('')

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try{
           await authAPI.authenticate(credentials);
           setError("");
           setIsAuth(true);
           history.replace("/customers")
        }
        catch(error){
            console.log(error.response);
            setError('Aucun compte n\'a été trouvé')
        }
        console.log(credentials);
    }
    
    return (
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input value={credentials.username} onChange={handleChange} type="email" className={"form-control" + (error && " is-invalid")} placeholder="Adresse email de connexion" id="username" name="username" />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input value={credentials.password} onChange={handleChange} type="password" className="form-control" placeholder="Mot de passe" id="password" name="password" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">C'est parti !</button>
                </div>
            </form>
        </>
    );
}

export default LoginPage;