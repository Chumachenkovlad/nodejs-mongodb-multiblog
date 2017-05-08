import mongoose, { Schema } from 'mongoose';

var PostSchema = new Schema({
    title: {
        type: String,
        require: true,
        index: true
    },
    body: {
        type: String,
        require: true,
        index: true
    },
    url: {
        type: String,
        require: true,
        unique: true
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPublic: {
        type: Boolean,
        require: true,
        default: false
    }
})
    .index({title: 'text', body: 'text'});

export default mongoose.model('Post', PostSchema);