import React, { useEffect, useState } from 'react';
import './ListPost.css';
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListPost = ({ url }) => {
    const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState(""); // For filtering by title
    const [searchStatus, setSearchStatus] = useState(""); // For filtering by status

    // Fetch the list of posts from API
    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${url}/api/posts/list`);
            if (response.data.success) {
                setPosts(response.data.data);
            } else {
                toast.error("Error fetching posts");
            }
        } catch (error) {
            toast.error("An error occurred while fetching posts");
            console.error("Error fetching posts:", error);
        }
    };

    // Remove post
    const removePost = async (postId) => {
        try {
            const response = await axios.post(`${url}/api/posts/remove`, { id: postId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchPosts(); // Refresh the list
            } else {
                toast.error("Error deleting post");
            }
        } catch (error) {
            toast.error("An error occurred while deleting post");
            console.error("Error removing post:", error);
        }
    };

    // Update post status
    const updateStatus = async (postId, newStatus) => {
        try {
            const response = await axios.post(`${url}/api/posts/update-status`, { id: postId, status: newStatus });
            if (response.data.success) {
                toast.success("Status updated successfully");
                await fetchPosts(); // Refresh the list
            } else {
                toast.error("Error updating status");
            }
        } catch (error) {
            toast.error("An error occurred while updating status");
            console.error("Error updating status:", error);
        }
    };

    // Fetch posts when component mounts
    useEffect(() => {
        fetchPosts();
    }, []);

    // Filter posts by title and status
    const filteredPosts = posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(searchTitle.toLowerCase());
        const statusMatch = !searchStatus || post.status === searchStatus;
        return titleMatch && statusMatch;
    });

    return (
        <div className='list add flex-col'>
            <div className="header">
                <p>Post List</p>
                <NavLink to="/add-post">
                    <button className="add-button">Thêm bài viết</button>
                </NavLink>
                {/* Search by title */}
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="search-input"
                />
                {/* Filter by status */}
                <select
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    className="search-input"
                >
                    <option value="">Tất cả tình trạng</option>
                    <option value="draft">Nháp</option>
                    <option value="published">Đã đăng</option>
                    <option value="archived">Đã lưu</option>
                </select>
            </div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts.map((post, index) => (
                        <tr key={index}>
                            <td>
                                <img src={`${url}/images/${post.postImage}`} alt={post.title} className="post-image" />
                            </td>
                            <td>{post.title}</td>
                            <td>{post.category}</td>
                            <td>{new Date(post.postDate).toLocaleDateString()}</td>
                            <td>
                                <select
                                    value={post.status}
                                    onChange={(e) => updateStatus(post._id, e.target.value)}
                                >
                                    <option value='draft'>Draft</option>
                                    <option value='published'>Published</option>
                                    <option value='archived'>Archived</option>
                                </select>
                            </td>
                            <td>
                                <NavLink to={`/update-posts/${post._id}`}>
                                    <button className="edit-button">Edit</button>
                                </NavLink>
                                <button onClick={() => removePost(post._id)} className='cursor'>X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPost;
