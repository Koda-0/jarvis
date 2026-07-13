const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            default: 'NGAMBA ISHIMWE Sabri'
        },

        headline: {
            type: String,
            required: true,
            trim: true,
            default: 'Full Stack Developer'
        },

        bio: {
            type: String,
            required: true,
            trim: true
        },

        yearsOfExperience: {
            type: Number,
            default: 2
        },

        profileImage: {
            type: String,
            default: null
        },

        cvFile: {
            type: String,
            default: null
        },

        email: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            default: null
        },

        location: {
            type: String,
            default: 'Rwanda'
        },

        keyTechnologies: [{
            type: String
        }],

        socialLinks: {
            github: String,
            linkedin: String,
            instagram: String,
            twitter: String,
            whatsapp: String
        },

        availability: {
            type: String,
            enum: ['available', 'unavailable'],
            default: 'available'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
