const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
    {
        blogTitle: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            unique: true
        },

        desc: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

blogSchema.pre('save', function () {
    if (this.blogTitle) {
        this.slug = slugify(this.blogTitle, {
            lower: true,
            strict: true
        });
    }
});

module.exports = mongoose.model('Blog', blogSchema);
