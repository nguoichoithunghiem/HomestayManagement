// models/postModel.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Du lịch', 'Kinh nghiệm'] // Chỉ cho phép hai lựa chọn này
    },
    content: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.now
    },
    postImage: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
