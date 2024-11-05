import roomModel from "../models/roomModel.js";
import fs from 'fs';

// Thêm phòng
const addRoom = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const room = new roomModel({
        roomNumber: req.body.roomNumber,
        roomType: req.body.roomType,
        roomPrice: req.body.roomPrice,
        roomDescription: req.body.roomDescription,
        homestayId: req.body.homestayId,
        roomStatus: req.body.roomStatus || 'available', // Mặc định là 'available'
        roomImage: image_filename // Nếu có hình ảnh
    });

    try {
        await room.save();
        res.json({ success: true, message: "Room Added" });
    } catch (error) {
        console.error("Error adding room:", error);
        res.status(500).json({ success: false, message: "Error adding room" });
    }
};

// Liệt kê tất cả phòng
const listRooms = async (req, res) => {
    try {
        const rooms = await roomModel.find().populate('homestayId'); // Populating to get homestay details
        res.json({ success: true, data: rooms });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ success: false, message: "Error fetching rooms" });
    }
};

// Xóa phòng
const removeRoom = async (req, res) => {
    try {
        const room = await roomModel.findById(req.body.id);
        if (room) {
            if (room.roomImage) {
                fs.unlink(`uploads/${room.roomImage}`, (err) => {
                    if (err) console.error("Error deleting image:", err);
                });
            }
            await roomModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Room Removed" });
        } else {
            res.status(404).json({ success: false, message: "Room not found" });
        }
    } catch (error) {
        console.error("Error removing room:", error);
        res.status(500).json({ success: false, message: "Error removing room" });
    }
};

// Cập nhật phòng
const updateRoom = async (req, res) => {
    const { id } = req.params; // Lấy id từ params
    const roomData = {
        roomNumber: req.body.roomNumber,
        roomType: req.body.roomType,
        roomPrice: req.body.roomPrice,
        roomDescription: req.body.roomDescription,
        homestayId: req.body.homestayId,
        roomStatus: req.body.roomStatus // Thêm trường roomStatus
    };

    try {
        // Nếu có hình ảnh mới, cập nhật trường hình ảnh
        if (req.file) {
            const room = await roomModel.findById(id);
            if (room && room.roomImage) {
                fs.unlink(`uploads/${room.roomImage}`, (err) => {
                    if (err) console.error("Error deleting old image:", err);
                }); // Xóa hình ảnh cũ
                roomData.roomImage = req.file.filename; // Gán tên file hình ảnh mới
            }
        }

        const updatedRoom = await roomModel.findByIdAndUpdate(id, roomData, { new: true });
        if (!updatedRoom) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        res.json({ success: true, message: "Room Updated", data: updatedRoom });
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ success: false, message: "Error updating room" });
    }
};

// Cập nhật trạng thái phòng
const updateRoomStatus = async (req, res) => {
    const { id, roomStatus } = req.body; // Lấy id và roomStatus từ body

    // Kiểm tra trạng thái hợp lệ
    if (!['available', 'unavailable'].includes(roomStatus)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    try {
        const updatedRoom = await roomModel.findByIdAndUpdate(id, { roomStatus }, { new: true });
        if (!updatedRoom) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        res.json({ success: true, message: "Status updated", data: updatedRoom });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ success: false, message: "Error updating status" });
    }
};
const fetchRoom = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        // Sử dụng populate để lấy thông tin homestay
        const room = await roomModel.findById(id).populate('homestayId', 'homestayName');
        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }
        res.json({ success: true, data: room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching room" });
    }
};



export { addRoom, listRooms, removeRoom, updateRoom, updateRoomStatus, fetchRoom };
