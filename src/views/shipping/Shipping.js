import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Shipping.css';

function Shipping() {
    const [shippings, setShippings] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?shipping
            WHERE {
                ?shipping rdf:type artechh:Shipping .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const shippingNames = results.map(item => {
                // Extract only the last part of the URL to get the Shipping name
                return item.shipping.value.split("#")[1];
            });
            setShippings(shippingNames);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <>
<br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="table-container">
        <Table className="type-table" responsive>
        <thead className="table-header">
                <tr>
                    <th>Id</th>
                    <th>Shipping Name</th>
                </tr>
            </thead>
            <tbody>
                {shippings.map((shippingName, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{shippingName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        </>
    );
}

export default Shipping;
