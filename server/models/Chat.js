import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    name: {
        type: String,
        required: function() {
            return this.type === 'group';
        }
    },
    type: {
        type: String,
        enum: ['private', 'group'],
        required: true,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: function() {
            return this.type === 'group';
        }
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
    },
    lastMessageAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Chat = model('Chat', chatSchema);

export default Chat;






