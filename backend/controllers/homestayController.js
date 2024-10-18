import homestayModel from "../models/homestayModel.js";
import fs from 'fs';
import mongoose from "mongoose"; // Đảm bảo import mongoose

// Thêm homestay
const addHomestay = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const homestay = new homestayModel({
        homestayName: req.body.homestayName,
        homestayAddress: req.body.homestayAddress,
        homestayPrice: req.body.homestayPrice,
        homestayDescription: req.body.homestayDescription,
        homestayCategory: req.body.homestayCategory,
        homestayImage: image_filename,
        status: req.body.status || 'available'
    });

    try {
        await homestay.save();
        res.json({ success: true, message: "Homestay Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Liệt kê tất cả homestay
const listHomestay = async (req, res) => {
    try {
        const homestays = await homestayModel.find({});
        res.json({ success: true, data: homestays });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Xóa homestay
const removeHomestay = async (req, res) => {
    try {
        const homestay = await homestayModel.findById(req.body.id);
        if (homestay) {
            fs.unlink(`uploads/${homestay.homestayImage}`, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
            await homestayModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Homestay Removed" });
        } else {
            res.json({ success: false, message: "Homestay không tồn tại" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Cập nhật homestay
const updateHomestay = async (req, res) => {
    try {
        const { id } = req.params;
        const homestayData = {
            homestayName: req.body.homestayName,
            homestayAddress: req.body.homestayAddress,
            homestayPrice: req.body.homestayPrice,
            homestayDescription: req.body.homestayDescription,
            homestayCategory: req.body.homestayCategory,
            status: req.body.status
        };

        if (req.file) {
            const homestay = await homestayModel.findById(id);
            if (homestay) {
                fs.unlink(`uploads/${homestay.homestayImage}`, (err) => {
                    if (err) console.error("Error deleting image:", err);
                });
                homestayData.homestayImage = req.file.filename;
            }
        }

        const updatedHomestay = await homestayModel.findByIdAndUpdate(id, homestayData, { new: true });
        if (!updatedHomestay) {
            return res.status(404).json({ success: false, message: 'Homestay không tồn tại' });
        }

        res.json({ success: true, message: "Homestay Updated", data: updatedHomestay });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Cập nhật trạng thái homestay
const updateHomestayStatus = async (req, res) => {
    const { id, status } = req.body;

    if (!['available', 'unavailable'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ' });
    }

    try {
        const updatedHomestay = await homestayModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedHomestay) {
            return res.status(404).json({ success: false, message: 'Homestay không tồn tại' });
        }

        res.json({ success: true, message: "Trạng thái đã được cập nhật", data: updatedHomestay });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi khi cập nhật trạng thái" });
    }
};

// Lấy homestay theo ID
const getHomestayById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }

        const homestay = await homestayModel.findById(id);
        if (!homestay) {
            return res.status(404).json({ success: false, message: 'Homestay not found' });
        }
        res.json({ success: true, data: homestay });
    } catch (error) {
        console.error("Error fetching homestay:", error);
        res.status(500).json({ success: false, message: error.message || 'Error fetching homestay' });
    }
};

export { addHomestay, listHomestay, removeHomestay, updateHomestay, updateHomestayStatus, getHomestayById };
