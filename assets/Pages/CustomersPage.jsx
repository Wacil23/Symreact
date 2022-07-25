import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
        .get('https://localhost:8000/api/customers')
        .then(response => response.data['hydra:member'])
        .then(data => setCustomers(data))
        .catch(err => console.error(err.response));
    }, []);

    const handleDelete = (id) => {
        const originalCustomer = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));

        axios
        .delete('https://localhost:8000/api/customers/' + id)
        .then(response => console.log('ok'))
        .catch(error => {
            setCustomers(originalCustomer);
            console.log(error.response);
        });
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    const itemsPerPage = 10;
    const pageCount = Math.ceil(customers.length / itemsPerPage);
    const pages = [];

    for(let i = 1; i<= pageCount; i++) {
        pages.push(i)
    }

    const start = currentPage * itemsPerPage - itemsPerPage;
    const paginatedCustomers = customers.slice(start, start + itemsPerPage);

    return ( <>
        <h1>liste des clients</h1>

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
                        <span className="badge badge-light">{customer.invoices.length}</span>
                    </td>
                    <td>{customer.totalAmount.toLocaleString()} €</td>
                    <td>
                        <button onClick={() => handleDelete(customer.id)} disabled={customer.invoices.length > 0} className="btn btn-danger">supprimer</button>
                    </td>
                </tr>
                ))}

            </tbody>
        </table>
        <div className="d-flex justify-content-center">
            <ul className="pagination">
                <li className={"page-item" + (currentPage === 1 && " disabled")}>
                    <button className="page-link" onClick={() => handleChangePage(currentPage - 1)}>&laquo;</button>
                </li>
                {pages.map(page => 
                <li key={page} className={"page-item" + (currentPage === page && " active")}>
                    <button className="page-link" onClick={() => handleChangePage(page)}>{page}</button>
                </li>
                )}
                <li className={"page-item" + (currentPage === pageCount && " disabled")}>
                    <button className="page-link" onClick={() => handleChangePage(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </div>
     </>
    );
}
 
export default CustomersPage;