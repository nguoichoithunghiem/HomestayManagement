import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdatePost = ({ url }) => {
  const { id } = useParams(); // Lấy id từ URL
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch dữ liệu bài viết
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${url}/posts/${id}`);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategory(response.data.category);
        setStatus(response.data.status);
      } catch (error) {
        console.log("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${url}/posts/${id}`, { title, content, category, status });
      alert('Bài viết đã được cập nhật');
    } catch (error) {
      console.log('Error updating post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cập nhật bài viết</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề bài viết"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nội dung bài viết"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Danh mục"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="draft">Lưu nháp</option>
        <option value="published">Đã xuất bản</option>
        <option value="archived">Lưu trữ</option>
      </select>
      <button type="submit">Cập nhật</button>
    </form>
  );
};

export default UpdatePost;
