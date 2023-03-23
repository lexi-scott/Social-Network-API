const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true, trim: true}, 
    email: {type: String, required: true, unique: true, match: '/.+\@.+\..+/'},
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
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
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema.virtual('friendCount').get(function () {
  return this.comments.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;