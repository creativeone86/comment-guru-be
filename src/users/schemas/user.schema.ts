import * as mongoose from 'mongoose';
import * as MUUID from 'uuid-mongodb';
import * as bcryptjs from 'bcryptjs';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    _id: {
        type: Object,
        value: {type: Buffer},
        default: () => MUUID.v1()
    },
    username: { type: String, required: true, unique: true},
    passwordHash: { type: String, required: true }
});

UserSchema.methods.validPassword = function(password) {
    return bcryptjs.compareSync(password, this.passwordHash);
};
UserSchema.virtual('password').set(function(value) {
    this.passwordHash = bcryptjs.hashSync(value, 12);
});


