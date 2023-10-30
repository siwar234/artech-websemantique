import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

function Payment() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?payment ?order
            WHERE {
                ?payment rdf:type artechh:Payment .
                ?payment artechh:HasOrder ?order .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const paymentData = results.map(item => {
                const paymentName = item.payment.value.split("#")[1];
                const orderName = item.order ? item.order.value.split("#")[1] : null;

                return {
                    paymentName,
                    orderName,
                };
            });
            setPayments(paymentData);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="table-container">
                <Table className="type-table" responsive>
                    <thead className="table-header">
                        <tr>
                            <th>Id</th>
                            <th>Payment Name</th>
                            <th>Order Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{payment.paymentName}</td>
                                <td>{payment.orderName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Payment;
