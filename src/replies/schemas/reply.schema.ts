import * as mongoose from 'mongoose';
import * as MUUID from 'uuid-mongodb';
const Schema = mongoose.Schema;

export const ReplySchema = new Schema({
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
    created: {
        type: Object,
        value: {type: Date},
        default: () => Date.now()
    }
});
