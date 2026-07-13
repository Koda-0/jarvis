const Skill = require('../models/Skill');

// CREATE SKILL
exports.createSkill = async (req, res) => {
    try {
        const body = req.body || {};
        const { skillName, category, level } = body;
        const requiredFields = ['skillName', 'category', 'level'];
        const missingFields = requiredFields.filter((field) => body[field] === undefined || body[field] === '');

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required field(s): ${missingFields.join(', ')}`
            });
        }

        const skill = await Skill.create({
            skillName,
            category,
            level
        });

        return res.status(201).json({
            success: true,
            message: 'Skill created successfully',
            data: skill
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL SKILLS
exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();

        return res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateSkill = async (req,res)=>{
    try {
        const skillId = req.params.id;
        const { skillName, category, level} = req.body;

        const skill = await Skill.findById(skillId);
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Skill not found'
            });
        }
        skill.skillName = skillName || skill.skillName;
        skill.category = category || skill.category;
        skill.level = level || skill.level;

        await skill.save();

        return res.status(200).json({
            success: true,
            message: 'Skill updated successfully',
            data: skill
        })
    }

    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteSkill = async (req,res)=>{
    try {
        const skillId = req.params.id;
        const skill = await Skill.findById(skillId);
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Skill not found'
            });
        }
        await Skill.deleteOne({ _id: skillId });
        
        return res.status(200).json({
            success: true,
            message: 'Skill deleted successfully',
            data: skill
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}