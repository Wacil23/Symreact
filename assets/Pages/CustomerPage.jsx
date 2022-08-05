import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../Components/Forms/Field';
import customersApi from '../Services/customersApi';
import {toast} from 'react-toastify'

const CustomerPage = ({ match, history }) => {

    const { id = "new" } = match.params;
    const [editing, setEditing] = useState(false);

    const fetchCustomer = async id => {
        try {
            const { firstName, lastName, email, company } = await customersApi.find(id);
            setCustomer({ firstName, lastName, email, company })
        } catch (e) {
            console.log(e.response);
            //Todo: handle error notif
            toast.error("Impossible d'afficher la liste des clients")
            history.replace('/customers')
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id)
        }
    }, [id]);


    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: "",
    });

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCustomer({ ...customer, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError({});
            
            if (editing) {
                await customersApi.update(id, customer);
                toast.success("Le client à bien été modifié")
            } else {
                const response = await customersApi.create(customer)
                toast.success("Le client à bien été créer")
                history.replace('/customers');
            }
        }
        catch ({ response }) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {}
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                toast.error("Des erreurs dans votre formulaire")
                setError(apiErrors);
            }
        }
    }

    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: "",
    })

    return (
        <>
            {!editing && <h1>Création d'un client</h1> || <h1>Modification du client : {customer.lastName} {customer.firstName}</h1>}
            <form onSubmit={handleSubmit}>
                <Field name="lastName" label="Nom de famille" placeholder="Nom de famille du client" value={customer.lastName} onChange={handleChange} error={error.lastName} />
                <Field name="firstName" label="Prénom" placeholder="Prénom du client" value={customer.firstName} onChange={handleChange} error={error.firstName} />
                <Field name="email" label="Email" placeholder="Email du client" type="email" value={customer.email} onChange={handleChange} error={error.email} />
                <Field name="company" label="Entreprise" placeholder="Entreprise du client" value={customer.company} onChange={handleChange} error={error.company} />

                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-danger">Retour à la liste</Link>
                </div>
            </form>
        </>
    );
}

export default CustomerPage;