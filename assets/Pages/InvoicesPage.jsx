import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Pagination from '../Components/Pagination';
import invoicesAPI from '../Services/invoicesAPI';

const STATUS_CLASSES  = {
    PAID: "success",
    SENT: 'light',
    CANCELLED: "danger"
};

const STATUS_LABEL = {
    PAID: "Payée",
    SENT: 'Envoyée',
    CANCELLED: "Annulée"
};

const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const handleChangePage = (page) => setCurrentPage(page);

    const itemsPerPage = 10;

    const handleSearch = ({currentTarget}) => 
    {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const filteredInvoices = invoices.filter(
        i => 
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) 
            || 
            i.customer.firstName.toLowerCase().includes(search.toLowerCase())
            ||
            i.amount.toString().startsWith(search.toLowerCase())
            ||
            STATUS_LABEL[i.status].toLowerCase().includes(search.toLowerCase())
    );
    
    const fetchInvoices = async () => {
        try{
            const data = await invoicesAPI.findAll()
            setInvoices(data);
        }
        catch(err){
            console.log(err.response);
        }
    };

    const handleDelete = async (id) => 
    {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(i => i.id !== id));
        try
        {
            await invoicesAPI.delete(id);
        }
        catch(error)
        {
            setInvoices(originalInvoices);
            console.log(error);
        };
    }

    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage,itemsPerPage);


    useEffect(() => {fetchInvoices()}, []);

    const formDate = (str) => moment(str).format('DD/MM/YYYY');

    return ( 
        <>
            <h1>Listes des factures</h1>
            <div className="form-group">
            <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..." />
        </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className="text-center">Date de facturation</th>
                        <th className="text-center">Statut</th>
                        <th className="text-center">Montant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td> 
                            <a href="#">{invoice.customer.firstName} {invoice.customer.lasttName}</a>
                        </td>
                        <td className="text-center">{formDate(invoice.sentAt)}</td>
                        <td className="text-center">
                            <span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>
                                {STATUS_LABEL[invoice.status].toUpperCase()}
                            </span>
                        </td>
                        <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                        <td>
                        <button className="btn btn-sm btn-primary mr-3">Editer</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)} >Supprimer</button>
                        </td>
                    </tr> )}
                    
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={handleChangePage} length={filteredInvoices.length} />
        </>
     );
}
 
export default InvoicesPage;