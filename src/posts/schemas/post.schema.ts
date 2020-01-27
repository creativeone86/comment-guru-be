import * as mongoose from 'mongoose';
import * as MUUID from 'uuid-mongodb';
import {UserSchema} from "../../users/schemas/user.schema";
const Schema = mongoose.Schema;

export const PostSchema = new Schema({
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
    comments: [{
        type: Object,
        value: {type: Buffer},
        ref: 'Comment'
    }],
    created: {
        type: Object,
        value: {type: Date},
        default: () => Date.now()
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

PostSchema.virtual('postId').get(function() {
    return MUUID.from(this._id).toString();
});




