import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Components/Pagination';
import invoicesAPI from '../Services/invoicesAPI';
import {toast} from 'react-toastify'
import TableLoader from '../Components/Loader/TableLoader';

const STATUS_CLASSES = {
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
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 10;

    const handleChangePage = (page) => setCurrentPage(page);


    const handleSearch = ({ currentTarget }) => {
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
        try {
            const data = await invoicesAPI.findAll()
            setInvoices(data);
            setLoading(false);
        }
        catch (err) {
            toast.error("Erreur lors du chargement des factures !")
            console.log(err.response);
        }
    };

    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(i => i.id !== id));
        try {
            toast.success("La facture a bien été suprimée");
            await invoicesAPI.delete(id);
        }
        catch (error) {
            toast.error("Une erreur est survenu")
            setInvoices(originalInvoices);
            console.log(error);
        };
    }

    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    useEffect(() => { fetchInvoices() }, []);

    const formDate = (str) => moment(str).format('DD/MM/YYYY');

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Listes des factures</h1>
                <Link className="btn btn-info" to="/invoices/new">Créer une facture</Link>
            </div>
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
                {!loading && (<tbody>
                    {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td>
                            <Link to={"/customers/" + invoice.customer.id}>{invoice.customer.firstName} {invoice.customer.lasttName}</Link>
                        </td>
                        <td className="text-center">{formDate(invoice.sentAt)}</td>
                        <td className="text-center">
                            <span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>
                                {STATUS_LABEL[invoice.status].toUpperCase()}
                            </span>
                        </td>
                        <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                        <td>
                            <Link to={"/invoices/" + invoice.id} className="btn btn-sm btn-primary mr-3">Editer</Link>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)} >Supprimer</button>
                        </td>
                    </tr>)}

                </tbody>)}
            </table>
            {loading && <TableLoader/>}
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={handleChangePage} length={filteredInvoices.length} />
        </>
    );
}

export default InvoicesPage;