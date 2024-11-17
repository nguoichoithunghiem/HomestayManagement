import React, { useState } from 'react';
import './addPost'; 
import { assets } from '../../../assets/assets'; 
import axios from "axios";
import { toast } from 'react-toastify';

const AddPost = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        category: "Du lịch", // Mặc định danh mục là "Du lịch"
        content: "",
        status: "draft", // Trạng thái mặc định là "draft"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("content", data.content);
        formData.append("postImage", image);
        formData.append("status", data.status);

        try {
            const response = await axios.post(`${url}/api/posts/add`, formData);
            if (response.data.success) {
                setData({
                    title: "",
                    category: "Du lịch",
                    content: "",
                    status: "draft"
                });
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi thêm bài viết");
            console.error("Error:", error);
        }
    };

    return (
        <div className='add-post'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Tải lên hình ảnh</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-post-title flex-col">
                    <p>Tiêu đề bài viết</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.title} 
                        type="text" 
                        name="title" 
                        placeholder="Nhập tiêu đề bài viết" 
                        required 
                    />
                </div>
                <div className="add-post-category flex-col">
                    <p>Danh mục bài viết</p>
                    <select onChange={onChangeHandler} name="category">
                        <option value="Du lịch">Du lịch</option>
                        <option value="Kinh nghiệm">Kinh nghiệm</option>
                    </select>
                </div>
                <div className="add-post-content flex-col">
                    <p>Nội dung bài viết</p>
                    <textarea 
                        onChange={onChangeHandler} 
                        value={data.content} 
                        name="content" 
                        rows="6" 
                        placeholder="Viết nội dung ở đây" 
                        required
                    />
                </div>
                <div className="add-status flex-col">
                    <p>Trạng thái bài viết</p>
                    <select onChange={onChangeHandler} name="status">
                        <option value="draft">Nháp</option>
                        <option value="published">Đã xuất bản</option>
                        <option value="archived">Lưu trữ</option>
                    </select>
                </div>
                <button type='submit' className='add-btn'>THÊM</button>
            </form>
        </div>
    );
};

export default AddPost;
