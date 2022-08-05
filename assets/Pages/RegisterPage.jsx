import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../Components/Forms/Field';
import userAPI from '../Services/userAPI';
import {toast} from 'react-toastify'

const RegisterPage = ({ history }) => {

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiErrors = {};

        if(user.password !== user.confirmPassword){
            apiErrors.confirmPassword = "Les mots de passe ne correspondent pas"
            setErrors(apiErrors)
            toast.error("Des erreurs dans votre formulaire !");
            return
        } 
        try {
            const response = await userAPI.register(user)
            setErrors({});
            toast.success("Vous êtes désormais inscrit, connectez vous !")
            history.replace("/login")
        }
        catch ({ response }) {
            const { violations } = response.data;
            if (violations) {
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans votre formulaire !");
        }
    }

    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field name="firstName" label="Prénom" placeholder="Votre prénom" error={errors.firstName} onChange={handleChange} value={user.firstName} />
                <Field name="lastName" label="Nom de famille" placeholder="Votre nom de famille" error={errors.lastName} onChange={handleChange} value={user.lastName} />
                <Field name="email" type="email" label="Email" placeholder="Votre Email" error={errors.email} onChange={handleChange} value={user.email} />
                <Field name="password" type="password" label="Mot de passe" placeholder="Votre mot de passe" error={errors.password} onChange={handleChange} value={user.password} />
                <Field name="confirmPassword" type="password" label="Confirmation du mot de passe" placeholder="Confirmation du mot de passe" error={errors.confirmPassword} onChange={handleChange} value={user.confirmPassword} />
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-success">Confirmation</button>
                    <Link to="/login" className="btn btn-link">J'ai déja un compte</Link>
                </div>
            </form>
        </>
    );
}

export default RegisterPage;