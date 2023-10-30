import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './User.css';


function GalleryOwner() {
  const [data, setData] = useState([]);


useEffect(() => {
  const endpoint = 'http://localhost:3030/Artech/sparql';
  const query = `
      PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
      SELECT ?galleryOwner ?email ?address
      WHERE {
        ?galleryOwner a artechh:GalleryOwner ;
                      artechh:email ?email ;
                      artechh:address ?address .
      }
    `;
  
    axios.get(endpoint, {
      params: { query, format: 'json' },
      headers: { Accept: 'application/sparql-results+json' }
    })
    .then(res => {
      const results = res.data.results.bindings;
      // Modifiez chaque objet de résultats pour ne conserver que la dernière partie de l'URL
      const modifiedResults = results.map(item => {
        const galleryOwnerName = item.galleryOwner.value.split("#")[1];
        return {
          ...item,
          galleryOwner: { ...item.galleryOwner, value: galleryOwnerName }
        };
      });
      setData(modifiedResults);
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
          <th>Gallery Owner</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.galleryOwner.value}</td>
            <td>{item.email.value}</td>
            <td>{item.address.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
    </>
  );
}

export default GalleryOwner;
