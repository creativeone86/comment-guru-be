import * as mongoose from 'mongoose';
import * as MUUID from 'uuid-mongodb';
import {PostSchema} from "../../posts/schemas/post.schema";
const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
    _id: {
        type: Object,
        value: {type: Buffer},
        default: () => MUUID.v1()
    },
    content: { type: String, required: true},
    author: {
        type: Object,
        value: {type: Buffer},
        ref: 'User'
    },
    replies: [{
        type: Object,
        value: {type: Buffer},
        ref: 'Reply'
    }],
    created: {
        type: Object,
        value: {type: Date},
        default: () => Date.now()
    }
});

PostSchema.virtual('commentId').get(function() {
    return MUUID.from(this._id).toString();
});






