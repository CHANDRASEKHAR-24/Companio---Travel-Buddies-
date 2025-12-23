import { Schema, model } from 'mongoose';

const tripSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    totalDays: {
        type: Number,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        }
    }],
    invitations: [
        {
            email: {
                type: String,
            },
            status: {
                type: String,
                enum: ['pending', 'accepted', 'declined'],
                default: 'pending'
            },
            invitedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
}, {
    timestamps: true,
});

const Trip = model('Trip', tripSchema);

export default Trip;
