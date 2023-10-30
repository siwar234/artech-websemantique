import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Product.css';

function Product() {
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);

    

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?product
            WHERE {
                ?product rdf:type artechh:Product .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const productNames = results.map(item => {
                // Extrayez seulement la dernière partie de l'URL pour obtenir le nom du produit
                return item.product.value.split("#")[1];
            });
            setProducts(productNames);
        })
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?productType
            WHERE {
                ?productType rdf:type artechh:ProductType .
            }
        `;

        

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const productTypeNames = results.map(item => {
                // Extrayez seulement la dernière partie de l'URL pour obtenir le nom du type de produit
                return item.productType.value.split("#")[1];
            });
            setProductTypes(productTypeNames);
        })
        .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        const endpoint = 'http://localhost:3030/artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?product ?review
            WHERE {
                ?product rdf:type artechh:Product.
                OPTIONAL {
                    ?product artechh:hasReviews ?review.
                }
            }
        `;
    
        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const productReviews = results.map(item => {
                // Extract product name and review from the result
                const productName = item.product.value.split("#")[1];
                const review = item.review ? item.review.value.split("#")[1] : 'No review available';
                return {
                    productName,
                    review
                };
            });
            setProducts(productReviews);
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
                    <th>Product Type Name</th>
                </tr>
            </thead>
            <tbody>
                {productTypes.map((productTypeName, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{productTypeName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
</div>
       <br></br>
       <br></br>
       <div className="table-container">
    <Table className="type-table">
        <thead className="table-header">
            <tr>
                <th>Id</th>
                <th>Product Name</th>
                <th>Review</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.productName}</td>
                    <td>{product.review}</td>
                </tr>
            ))}
        </tbody>
    </Table>
</div>

       </>
    );
}

export default Product;
