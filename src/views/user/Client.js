import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './User.css';

function Client() {
    const [clients, setClients] = useState([]);
    const [clientsWithIsClient, setClientsWithIsClient] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';

        // Query for all clients
        const queryClients = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?client
            WHERE {
                ?client rdf:type artechh:Client .
            }
        `;

        // Query for clients with IsClient property and their attended events
        const queryClientsWithIsClient = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?client ?event
            WHERE {
                ?client rdf:type artechh:Client .
                ?client artechh:IsClient ?event.
            }
        `;

        // Fetch data for all clients
        axios.get(endpoint, {
            params: { query: queryClients, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const clientNames = results.map(item => {
                return item.client.value.split("#")[1];
            });
            setClients(clientNames);
        })
        .catch(err => console.error(err));

        // Fetch data for clients with IsClient property and their attended events
        axios.get(endpoint, {
            params: { query: queryClientsWithIsClient, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const clientsWithIsClientData = results.map(item => ({
                clientName: item.client.value.split("#")[1],
                eventName: item.event ? item.event.value.split("#")[1] : null,
            }));
            setClientsWithIsClient(clientsWithIsClientData);
        })
        .catch(err => console.error(err));

    }, []);

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <div className="table-container">
                <Table className="type-table" responsive>
                    <thead className="table-header">
                        <tr>
                            <th>Id</th>
                            <th>Client Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((clientName, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{clientName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <br />
            <br />
            <div className="table-container">
                <Table className="type-table" responsive>
                    <thead className="table-header">
                        <tr>
                            <th>Id</th>
                            <th>Client Name with IsClient Property</th>
                            <th>Associated Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientsWithIsClient.map((data, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.clientName}</td>
                                <td>{data.eventName || 'No Event'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Client;
