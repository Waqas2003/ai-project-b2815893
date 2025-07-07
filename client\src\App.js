import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/posts', newPost);
    setNewPost({ title: '', content: '' });
  };

  return (
    <div>
      <h1>Blog Platform</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newPost.title} onChange={(event) => setNewPost({ ...newPost, title: event.target.value })} />
        <textarea value={newPost.content} onChange={(event) => setNewPost({ ...newPost, content: event.target.value })} />
        <button type="submit">Create Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;