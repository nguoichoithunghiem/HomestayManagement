import postModel from "../models/postModel.js";
import fs from 'fs';
import mongoose from "mongoose"; // Đảm bảo import mongoose

// Thêm bài viết
const addPost = async (req, res) => {
    let image_filename = req.file ? `${req.file.filename}` : null;

    const post = new postModel({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        postImage: image_filename,
        status: req.body.status || 'draft'
    });

    try {
        await post.save();
        res.json({ success: true, message: "Bài viết đã được thêm thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Có lỗi xảy ra khi thêm bài viết" });
    }
};

// Liệt kê tất cả bài viết
const listPost = async (req, res) => {
    try {
        const posts = await postModel.find({});
        res.json({ success: true, data: posts });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Có lỗi khi lấy danh sách bài viết" });
    }
};

// Xóa bài viết
const removePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.body.id);
        if (post) {
            if (post.postImage) {
                fs.unlink(`uploads/${post.postImage}`, (err) => {
                    if (err) console.error("Lỗi khi xóa ảnh:", err);
                });
            }
            await postModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Bài viết đã được xóa" });
        } else {
            res.json({ success: false, message: "Bài viết không tồn tại" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Có lỗi khi xóa bài viết" });
    }
};

// Cập nhật bài viết
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const postData = {
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
            status: req.body.status
        };

        if (req.file) {
            const post = await postModel.findById(id);
            if (post && post.postImage) {
                fs.unlink(`uploads/${post.postImage}`, (err) => {
                    if (err) console.error("Lỗi khi xóa ảnh:", err);
                });
            }
            postData.postImage = req.file.filename;
        }

        const updatedPost = await postModel.findByIdAndUpdate(id, postData, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Bài viết không tồn tại' });
        }

        res.json({ success: true, message: "Bài viết đã được cập nhật", data: updatedPost });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Có lỗi khi cập nhật bài viết" });
    }
};

// Cập nhật trạng thái bài viết
const updatePostStatus = async (req, res) => {
    const { id, status } = req.body;

    if (!['draft', 'published', 'archived'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ' });
    }

    try {
        const updatedPost = await postModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Bài viết không tồn tại' });
        }

        res.json({ success: true, message: "Trạng thái bài viết đã được cập nhật", data: updatedPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi khi cập nhật trạng thái" });
    }
};

// Lấy bài viết theo ID
const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'ID không hợp lệ' });
        }

        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
        }
        res.json({ success: true, data: post });
    } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        res.status(500).json({ success: false, message: error.message || 'Lỗi khi lấy bài viết' });
    }
};

export { addPost, listPost, removePost, updatePost, updatePostStatus, getPostById };
