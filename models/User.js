const { Schema, model, SchemaTypes } = require('mongoose');
var mongoose = require('mongoose');
require('mongoose-type-email');

//username and email, thought(other model) and friends(self-referencing) 
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'You need to provide a username',
        trim: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: 'You need to provide an email'
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
