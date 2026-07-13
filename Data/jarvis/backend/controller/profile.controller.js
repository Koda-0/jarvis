const Profile = require('../models/Profile');

// GET PROFILE
async function getProfile(req, res) {
    try {
        let profile = await Profile.findOne({});

        // If no profile exists, create default one
        if (!profile) {
            profile = await Profile.create({
                fullName: 'NGAMBA ISHIMWE Sabri',
                headline: 'Full Stack Developer',
                bio: 'Hello, I\'m NGAMBA ISHIMWE Sabri, a student at Institut Don Bosco Kabarondo TSS with a passion for crafting innovative digital solutions from Rwanda. With experience in the tech industry, I\'ve honed my skills in web development, UI/UX design, and IT consulting. My journey began with curiosity about how things work, leading me into coding and design. Today, I specialise in building responsive websites and applications that meet client needs and deliver exceptional user experiences. When I\'m not coding, I enjoy gaming, exploring new technologies, and contributing to open-source projects. Currently exploring advanced technical skills in all fields.',
                email: 'ishimwengambasabri@gmail.com',
                phone: '+250783993391',
                location: 'Rwanda',
                yearsOfExperience: 2,
                keyTechnologies: ['React.js', 'Node.js', 'REST APIs', 'MySQL', 'MongoDB', 'Git'],
                socialLinks: {
                    github: 'https://github.com/Koda-0',
                    linkedin: 'https://www.linkedin.com/in/ishimwengamba-sabri-8ab36737b/',
                    instagram: 'https://instagram.com/smiler_sabri',
                    whatsapp: 'https://wa.me/+250783993391'
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile retrieved successfully',
            data: profile
        });
    } catch (error) {
        console.error('Get profile error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// UPDATE PROFILE (admin only)
async function updateProfile(req, res) {
    try {
        const { fullName, headline, bio, yearsOfExperience, email, phone, location, keyTechnologies, socialLinks, availability } = req.body;

        let profile = await Profile.findOne({});

        if (!profile) {
            profile = new Profile();
        }

        if (fullName) profile.fullName = fullName;
        if (headline) profile.headline = headline;
        if (bio) profile.bio = bio;
        if (yearsOfExperience) profile.yearsOfExperience = yearsOfExperience;
        if (email) profile.email = email;
        if (phone) profile.phone = phone;
        if (location) profile.location = location;
        if (keyTechnologies) profile.keyTechnologies = keyTechnologies;
        if (socialLinks) profile.socialLinks = { ...profile.socialLinks, ...socialLinks };
        if (availability) profile.availability = availability;

        // Handle CV file upload
        if (req.file && req.file.fieldname === 'cvFile') {
            profile.cvFile = `/uploads/${req.file.filename}`;
        }

        // Handle profile image upload
        if (req.file && req.file.fieldname === 'profileImage') {
            profile.profileImage = `/uploads/${req.file.filename}`;
        }

        await profile.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: profile
        });
    } catch (error) {
        console.error('Update profile error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// DOWNLOAD CV
async function downloadCV(req, res) {
    try {
        const profile = await Profile.findOne({});

        if (!profile || !profile.cvFile) {
            return res.status(404).json({
                success: false,
                message: 'CV not found'
            });
        }

        // Return the CV file path
        return res.status(200).json({
            success: true,
            message: 'CV found',
            cvUrl: `${process.env.API_URL || 'http://localhost:5120'}${profile.cvFile}`
        });
    } catch (error) {
        console.error('Download CV error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { getProfile, updateProfile, downloadCV };
