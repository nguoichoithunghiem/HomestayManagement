import React, { useEffect, useState } from 'react';
import './UpdatePost.css'; // Bạn có thể tạo CSS riêng cho UpdatePost nếu cần
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePost = ({ url }) => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Dùng để điều hướng sau khi cập nhật
  const [post, setPost] = useState({
    title: '',
    category: '',
    content: '',
    status: 'draft',
    postImage: null // Để lưu trữ ảnh bài viết
  });

  // Hàm lấy thông tin bài viết hiện tại
  const fetchPost = async () => {
    try {
      const response = await axios.get(`${url}/api/posts/${id}`);
      if (response.data.success) {
        setPost(response.data.data); // Set dữ liệu bài viết vào state
      } else {
        toast.error("Lỗi khi lấy thông tin bài viết");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lấy dữ liệu bài viết");
      console.error("Error fetching post:", error);
    }
  };

  // Hàm xử lý sự thay đổi input
  const onChangeHandler = (event) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      setPost((prev) => ({ ...prev, postImage: files[0] })); // Cập nhật ảnh bài viết
    } else {
      setPost((prev) => ({ ...prev, [name]: value })); // Cập nhật các trường khác
    }
  };

  // Hàm xử lý khi gửi form
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('category', post.category);
    formData.append('content', post.content);
    formData.append('status', post.status);
    if (post.postImage) {
      formData.append('postImage', post.postImage); // Thêm ảnh bài viết nếu có
    }

    try {
      const response = await axios.put(`${url}/api/posts/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Đảm bảo gửi form data đúng cách
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/list-post'); // Điều hướng về danh sách bài viết
      } else {
        toast.error("Lỗi khi cập nhật bài viết");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật bài viết");
      console.error("Error updating post:", error);
    }
  };

  useEffect(() => {
    fetchPost(); // Lấy thông tin bài viết khi component mount
  }, []);

  return (
    <div className='update-post'>
      <h2>Cập nhật bài viết</h2>
      <form onSubmit={onSubmitHandler} className='update-form'>
        <div className='form-group'>
          <label>Tiêu đề:</label>
          <input
            type='text'
            name='title'
            value={post.title}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className='form-group'>
          <label>Danh mục:</label>
          <input
            type='text'
            name='category'
            value={post.category}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className='form-group'>
          <label>Nội dung:</label>
          <textarea
            name='content'
            value={post.content}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className='form-group'>
          <label>Trạng thái:</label>
          <select
            name='status'
            value={post.status}
            onChange={onChangeHandler}
            required
          >
            <option value='draft'>Lưu nháp</option>
            <option value='published'>Đã xuất bản</option>
            <option value='archived'>Lưu trữ</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Ảnh bài viết:</label>
          <input
            type='file'
            name='postImage'
            accept='image/*'
            onChange={onChangeHandler}
          />
        </div>

        <button type='submit' className='update-btn'>Cập nhật</button>
      </form>
    </div>
  );
};

export default UpdatePost;
