import React, { useContext, useState } from 'react';
import Field from '../Components/Forms/Field';
import AuthContext from '../Contexts/AuthContext';
import authAPI from '../Services/authAPI';

const LoginPage = ({ history }) => {
    const { setIsAuth } = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        username: 'Isaac66@Guillet.fr',
        password: 'password'
    });

    const [error, setError] = useState('')

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await authAPI.authenticate(credentials);
            setError("");
            setIsAuth(true);
            history.replace("/customers")
        }
        catch (error) {
            console.log(error.response);
            setError('Aucun compte n\'a été trouvé')
        }
        console.log(credentials);
    };

    return (
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <Field
                    label="Adresse email"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Adresse email de connexion"
                    error={error}
                />
                <Field
                    label="Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    type="password"
                    error=""
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">C'est parti !</button>
                </div>
            </form>
        </>
    );
}

export default LoginPage;