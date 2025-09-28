import React, { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function UploadForm({ token, onUploaded }) {
  const [title, setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [year,setYear] = useState('');
  const [tags,setTags] = useState('');
  const [poster, setPoster] = useState(null);
  const [screenshots, setScreenshots] = useState([]);

  const submit = async e => {
    e.preventDefault();
    if (!title || !poster) return alert('Title and poster required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (year) formData.append('year', year);
    if (tags) formData.append('tags', tags);

    formData.append('poster', poster);
    for (let i = 0; i < screenshots.length; i++) {
      formData.append('screenshots', screenshots[i]);
    }

    try {
      const res = await axios.post(`${API}/movies`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      });
      onUploaded(res.data);
      setTitle(''); setDescription(''); setYear(''); setTags(''); setPoster(null); setScreenshots([]);
      alert('Uploaded');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Upload failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <br />
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <br />
      <input placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} />
      <br />
      <input placeholder="Tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)} />
      <br />
      <label>Poster (single)</label>
      <input type="file" accept="image/*" onChange={e=>setPoster(e.target.files[0])} required />
      <br />
      <label>Screenshots (multiple)</label>
      <input type="file" accept="image/*" multiple onChange={e=>setScreenshots(e.target.files)} />
      <br />
      <button type="submit">Upload Movie</button>
    </form>
  );
}
