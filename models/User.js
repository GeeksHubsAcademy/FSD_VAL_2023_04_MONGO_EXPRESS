const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema);

module.exports = User;