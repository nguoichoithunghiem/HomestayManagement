import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Middleware xác thực JWT (verifyToken)
export const verifyToken = async (req, res, next) => {
    // Lấy token từ header 'Authorization'
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Kiểm tra Authorization header

    // Nếu không có token trong header
    if (!token) {
        return res.status(401).json({ message: 'Vui lòng đăng nhập để truy cập thông tin.' });
    }

    try {
        // Giải mã token với secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Sử dụng secret key trong môi trường

        // Kiểm tra xem token có chứa ID người dùng không
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Token không hợp lệ.' });
        }

        // Tìm kiếm người dùng trong DB sử dụng ID từ token
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'Người dùng không tồn tại.' });
        }

        // Gán thông tin người dùng vào req.user để sử dụng trong các route tiếp theo
        req.user = user;  // Đây là nơi lưu thông tin người dùng vào request
        next();  // Tiếp tục với các route tiếp theo
    } catch (error) {
        // Log lỗi để dễ dàng kiểm tra nếu có sự cố
        console.error(error);  
        // Nếu token không hợp lệ hoặc đã hết hạn
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};
