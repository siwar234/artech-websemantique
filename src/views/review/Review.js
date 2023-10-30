import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

function Review() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?review
            WHERE {
                ?review rdf:type artechh:Review .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const reviewNames = results.map(item => {
                return item.review.value.split("#")[1]; // Assumption: review value is the last part after "#"
            });
            setReviews(reviewNames);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
                
            <div className="table-container">
            <Table className="type-table" responsive>
                <thead className="table-header">
                    <tr>
                        <th>Id</th>
                        <th>Review Name</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((reviewName, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{reviewName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </>
    );
}

export default Review;
