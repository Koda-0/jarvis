const Project = require("../models/Project");

function getUploadedProjectImage(req) {
    const file = req.file || req.files?.image?.[0] || req.files?.images?.[0] || req.files?.Image?.[0];
    return file ? `/uploads/${file.filename}` : null;
}

async function createProject(req, res) {
    try {
        const body = req.body || {};
        const { title, description, url, link, image, Image, type } = body;
        const projectLink = link || url;
        const projectImage = getUploadedProjectImage(req) || Image || image;

        if (!title || !description || !projectLink || !projectImage || !type) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const project = await Project.create({
            title,
            description,
            link: projectLink,
            Image: projectImage,
            type
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// GET ALL PROJECTS
async function getProjects(req, res) {
    try {
        const projects = await Project.find();

        return res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function updateProject(req, res) {
    try {
        const project = await Project.findById(req.params.id.trim());

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const { title, description, link, Image, type } = req.body;

        if (title) project.title = title;
        if (description) project.description = description;
        if (link) project.link = link;
        if (Image) project.Image = Image;
        if (type) project.type = type;

        await project.save();

        res.status(200).json({
            message: "Project updated successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
async function deleteProject(req,res){
    try {
        const projectId = req.params.id.trim();
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        await Project.deleteOne({ _id: projectId });
        
        return res.status(200).json({
            success: true,
            message: 'project deleted successfully',
            data: project
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
}
