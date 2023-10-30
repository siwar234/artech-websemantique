import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Event.css';

function Event() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?event
            WHERE {
                ?event rdf:type artechh:Event .
            }
        `;
        const query1 = `
        PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        
        SELECT ?event ?category
        WHERE {
          ?event rdf:type artechh:Event .
          ?event artechh:IsRelatedTo ?category.
        }
        
    `;

    axios
    .all([
      axios.get(endpoint, { params: { query: query, format: 'json' }, headers: { Accept: 'application/sparql-results+json' } }),
      axios.get(endpoint, { params: { query: query1, format: 'json' }, headers: { Accept: 'application/sparql-results+json' } }),
    ])
    .then(
      axios.spread((res1, res2) => {
        const eventsdData = res1.data.results.bindings;
        const categoryData = res2.data.results.bindings;

        const combinedData = eventsdData.map((events) => {
            const eventsId = events.event.value.split('#')[1]; // Change events.events to events.event
            const category = categoryData
              .filter((category) => category.event.value === events.event.value) // Change events.events to events.event
              .map((category) => (category.category ? category.category.value.split('#')[1] : null));
          
            return {
              eventsId,
              eventsName: eventsId,
              category,
            };
          });
          

        setEvents(combinedData);
      })
    )
    .catch((err) => console.error(err));
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
                <th>Events Name</th>
                <th>Categories</th>
              </tr>
            </thead>
            <tbody>
              {events.map((events, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{events.eventsName}</td>
                  <td>{events.category.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
  

export default Event;
