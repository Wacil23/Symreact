import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../Components/Forms/Field';
import Select from '../Components/Forms/Select';
import customersApi from '../Services/customersApi';
import invoicesAPI from '../Services/invoicesAPI';

const InvoicePage = ({ history, match }) => {

    const { id = "new" } = match.params;

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });

    const [editing, setEditing] = useState(false);

    const [error, setError] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const [customers, setCustomers] = useState([]);

    const fetchCustomer = async () => {
        try {
            const data = await customersApi.findAll()
            setCustomers(data);
            console.log('coucou', data);
            if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
        } catch (err) {
            history.replace("/invoices")
        }
    };

    const fetchInvoice = async id => {
        try {
            const { amount, status, customer } = await invoicesAPI.find(id)
            setInvoice({ amount, status, customer: customer.id });
        } catch (err) {
            console.log(err);
            history.replace("/invoices");
        }
    }

    useEffect(() => {
        fetchCustomer();
    }, []);

    useEffect(() => {
        if (id !== "new") {
            setEditing(true)
            fetchInvoice(id);
        }
    }, [id])

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInvoice({ ...invoice, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editing) {
                const response = await await invoicesAPI.update(id, invoice);
            } else {
                const response = await invoicesAPI.create(invoice)
            }
            history.replace("/invoices")
        } catch ({ response }) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {}
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                setError(apiErrors);
            }
        }
    }

    return (
        <>
            {!editing && <h1>Création d'une facture</h1> || <h1>Modification d'une facture</h1>}
            <form onSubmit={handleSubmit}>
                <Field name="amount" type="number" placeholder="Montant de la facture" label="Montant" onChange={handleChange} value={invoice.amount} error={error.amount} />
                <Select name="customer" label="Client" value={invoice.customer} error={error.customer} onChange={handleChange}>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.lastName} {customer.firstName}
                        </option>))}
                </Select>
                <Select name="status" label="Status" value={invoice.status} onChange={handleChange} error={error.status}>
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className="btn btn-link">Retour aux factures</Link>
                </div>
            </form>
        </>
    );
}

export default InvoicePage;