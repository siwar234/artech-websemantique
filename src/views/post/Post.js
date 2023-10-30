import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const endpoint = 'http://localhost:3030/Artech/sparql';

    const query1 = `
    PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    
        SELECT ?post
        WHERE {
            ?post rdf:type artechh:Posts.
        }
    `;

    const query2 = `
    PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    
    SELECT ?post ?comment
    WHERE {
      ?post rdf:type artechh:Posts.
      ?post artechh:HasComments ?comment.
    }
    `;

    // Make two separate requests for each query
    axios.all([
      axios.get(endpoint, { params: { query: query1, format: 'json' }, headers: { Accept: 'application/sparql-results+json' } }),
      axios.get(endpoint, { params: { query: query2, format: 'json' }, headers: { Accept: 'application/sparql-results+json' } })
    ])
      .then(axios.spread((res1, res2) => {
        const postsData = res1.data.results.bindings;
        const commentsData = res2.data.results.bindings;

        const combinedData = postsData.map(post => {
          const postId = post.post.value.split("#")[1];
          const comments = commentsData
            .filter(comment => comment.post.value === post.post.value)
            .map(comment => comment.comment ? comment.comment.value.split("#")[1] : null);
          
          return {
            postId,
            postName: postId, // Adjust this based on your actual data structure
            comments
          };
        });

        setPosts(combinedData);
      }))
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
              <th>Post Name</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{post.postName}</td>
                <td>{post.comments.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Post;
