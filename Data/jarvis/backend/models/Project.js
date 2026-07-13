const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        link: {
            type: String,
            required: true
        },

        Image: {
            type: String, // store image URL or file path
            required: true
        },

        type: {
            type: String,
            enum: ['single', 'collaborated'],
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);