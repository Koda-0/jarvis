const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
    {
        skillName: {
            type: String,
            required: true,
            trim: true
        },
       
        category: {
            type: String,
            required: true,
            enum: ['frontend', 'backend', 'database', 'devops', 'other']
        },

        level: {
            type: Number,
            required: true,
            min: 1,
            max: 100
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
