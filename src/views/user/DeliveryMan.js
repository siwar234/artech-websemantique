import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './User.css';

function DeliveryMan() {
  const [deliveryManData, setDeliveryManData] = useState([]);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    const endpoint = 'http://localhost:3030/Artech/sparql';

    const query1 = `
      PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
      SELECT ?deliveryMan ?tel ?address
      WHERE {
        ?deliveryMan a artechh:DeliveryMan ;
                     artechh:Tel ?tel ;
                     artechh:address ?address .
      }
    `;

    const query2 = `
      PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    
      SELECT ?deliveryMan ?post
      WHERE {
        ?deliveryMan rdf:type artechh:DeliveryMan.
        ?deliveryMan artechh:IsRelatedTo ?post.
      }
    `;
    axios
    .all([
      axios.get(endpoint, { params: { query: query1, format: 'json' }, headers: { Accept: 'application/sparql-results+json' } }),
      axios.get(endpoint, { params: { query: query2, format: 'json' }, headers: { Accept: 'application/sparql-results+json' } }),
    ])
    .then(
      axios.spread((res1, res2) => {
        const deliveryManData = res1.data.results.bindings;
        const postsData = res2.data.results.bindings;
  
        const modifiedDeliveryManData = deliveryManData.map(item => {
          const deliveryManName = item.deliveryMan.value.split("#")[1];
          return {
            ...item,
            deliveryMan: { ...item.deliveryMan, value: deliveryManName }
          };
        });
  
        const modifiedPostsData = postsData.map(item => {
          const deliveryManName = item.deliveryMan.value.split("#")[1];
          return {
            ...item,
            deliveryMan: { ...item.deliveryMan, value: deliveryManName }
          };
        });
  
        setDeliveryManData(modifiedDeliveryManData);
        setPostsData(modifiedPostsData);
      })
    )
    .catch(err => console.error(err));
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="table-container">
        <Table className="type-table" responsive>
          <thead className="table-header">
            <tr>
              <th>DeliveryMan</th>
              <th>Tel</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {deliveryManData.map((item, index) => (
              <tr key={index}>
                <td>{item.deliveryMan.value}</td>
                <td>{item.tel.value}</td>
                <td>{item.address.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Table for deliveryManName with associated posts */}
        <Table className="type-table" responsive>
          <thead className="table-header">
            <tr>
              <th>DeliveryMan</th>
              <th>Posts</th>
            </tr>
          </thead>
          <tbody>
            {postsData.map((item, index) => (
              <tr key={index}>
                <td>{item.deliveryMan.value}</td>
                <td>{item.post.value.split("#")[1]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default DeliveryMan;
