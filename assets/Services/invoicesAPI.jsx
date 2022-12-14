import axios from "axios";

function findAll() {
    return axios
        .get('https://localhost:8000/api/invoices')
        .then(response => response.data['hydra:member'])
}

function deleteInvoices(id) {
    return axios
        .delete('https://localhost:8000/api/invoices/' + id)
}

function find(id){
    return axios
        .get("https://localhost:8000/api/invoices/" + id)
        .then(response => response.data);
}

function update(id, invoice) {
    return axios
        .put("https://localhost:8000/api/invoices/" + id, 
        {...invoice, customer: `/api/customers/${invoice.customer}` })
}

function create(invoice){
    return axios
        .post("https://localhost:8000/api/invoices", 
        { ...invoice, customer: `/api/customers/${invoice.customer}` })
}


export default {
    findAll,
    find,
    update,
    create,
    delete: deleteInvoices
}