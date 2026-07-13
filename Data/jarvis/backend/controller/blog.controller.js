const Blog = require('../models/Blog');

async function createBlog(req, res) {
    try {
        const body = req.body || {};
        const { blogTitle, desc} = body;

        const image = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        if (!blogTitle || !desc || !image) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const blog = await Blog.create({
            blogTitle,
            desc,
            image
        });

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog
        });

    } catch (error) {
        console.error('Blog create/update error:', error);
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
}


async function getBlogs(req,res){
    try{
        const blogs = await Blog.find({});
        return res.status(200).json({
            success: true,
            message: 'List of Blogs',
            data: blogs
        })
    }
    catch (error){
        console.error(err.stack);
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
}


async function updateBlog(req, res) {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        const body = req.body || {};
        const { blogTitle, desc } = body;

        if (blogTitle) blog.blogTitle = blogTitle;
        if (desc) blog.desc = desc;

        if (req.file) {
            blog.image = `/uploads/${req.file.filename}`;
        }

        await blog.save();

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createBlog,
    updateBlog,
    getBlogs
};
