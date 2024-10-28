import jwt from "jsonwebtoken";

// Middleware kiểm tra token và xác thực quyền admin
export const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Không có quyền truy cập" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Chỉ admin mới có thể truy cập" });
        }
        req.user = decoded; // Lưu thông tin người dùng vào request để sử dụng trong các route
        next();
    });
};

// Middleware kiểm tra token cho người dùng (có thể là user hoặc admin)
export const verifyUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Không có quyền truy cập" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Token không hợp lệ" });
        }
        req.user = decoded; // Lưu thông tin người dùng vào request
        next();
    });
};

// Middleware kiểm tra vai trò người dùng
export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Không đủ quyền truy cập" });
        }
        next();
    };
};

// Middleware kiểm tra token cho người dùng mà không cần vai trò
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token không hợp lệ' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token không hợp lệ' });
        }

        req.user = user; // Lưu thông tin người dùng vào req
        next();
    });
};

