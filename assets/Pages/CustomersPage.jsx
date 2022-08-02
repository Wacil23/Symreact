import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Components/Pagination';
import customersApi from '../Services/customersApi';

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("")

    const fetchCustomers = async () => {
        try {
            const data = await customersApi.findAll(customers)
            setCustomers(data)
        }
        catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => { fetchCustomers() }, []);

    const handleDelete = async (id) => {
        const originalCustomer = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await customersApi.delete(id)
        }
        catch (error) {
            setCustomers(originalCustomer);
            console.log('errors mex', error.response);
        };
    }

    const handleChangePage = (page) => setCurrentPage(page);

    const itemsPerPage = 10;

    const filterCustomers = customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedCustomers = Pagination.getData(filterCustomers, currentPage, itemsPerPage);

    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    return (<>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h1>Liste des clients</h1>
            <Link to="/customers/new" className="btn btn-info" >Créer un client</Link>
        </div>

        <div className="form-group">
            <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..." />
        </div>

        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th>Factures</th>
                    <th>Montant total</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {paginatedCustomers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td><a href="#">{customer.firstName} {customer.lastName}</a></td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td>
                            <span className="badge bg-info">{customer.invoices.length}</span>
                        </td>
                        <td>{customer.totalAmount.toLocaleString()} €</td>
                        <td>
                            <button onClick={() => handleDelete(customer.id)} disabled={customer.invoices.length > 0} className="btn btn-danger">supprimer</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {itemsPerPage < filterCustomers.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filterCustomers.length} onPageChange={handleChangePage} />}
    </>
    );
}

export default CustomersPage;