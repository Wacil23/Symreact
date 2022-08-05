import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Components/Pagination';
import customersApi from '../Services/customersApi';
import {toast} from 'react-toastify'
import TableLoader from '../Components/Loader/TableLoader';

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
            const data = await customersApi.findAll(customers)
            setCustomers(data)
            setLoading(false);
        }
        catch (error) {
            toast.error("Impossible de charger les clients")
        }
    }

    useEffect(() => { fetchCustomers() }, []);

    const handleDelete = async (id) => {
        const originalCustomer = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            
            await customersApi.delete(id)
            
            toast.success("Le client à bien été supprimé")
        }
        catch (error) {
            toast.error("Impossible de supprimer ce client")
            setCustomers(originalCustomer);
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
            {!loading && (<tbody>
                {paginatedCustomers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td><Link to={"/customers/" + customer.id}>{customer.firstName} {customer.lastName}</Link></td>
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
            </tbody>)}
        </table>
        {loading && <TableLoader/>}
        {itemsPerPage < filterCustomers.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filterCustomers.length} onPageChange={handleChangePage} />}
    </>
    );
}

export default CustomersPage;