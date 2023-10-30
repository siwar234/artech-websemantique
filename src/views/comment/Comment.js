import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Comment.css';

function Comments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?comment
            WHERE {
                ?comment rdf:type artechh:Comments .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const commentNames = results.map(item => {
                // Extract only the last part of the URL to get the Comment name
                return item.comment.value.split("#")[1];
            });
            setComments(commentNames);
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
                    <th>Comment Description</th>
                </tr>
            </thead>
            <tbody>
                {comments.map((commentName, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{commentName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        </>
    );
}

export default Comments;
