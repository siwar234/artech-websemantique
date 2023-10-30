import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Category.css';

function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?category
            WHERE {
                ?category rdf:type artechh:Category .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const categoryNames = results.map(item => {
                return item.category.value.split("#")[1]; // Assumption: category value is the last part after "#"
            });
            setCategories(categoryNames);
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
                        <th>Category Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((categoryName, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{categoryName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
       </>
    );
}

export default Category;
