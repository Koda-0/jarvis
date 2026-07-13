const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { createProject, getProjects, updateProject, deleteProject } = require('../controller/project.controller');
const { createSkill, getSkills, updateSkill, deleteSkill } = require('../controller/skill.controller');
const { createBlog, getBlogs,updateBlog } = require('../controller/blog.controller');
const upload = require('../config/upload');
const { addService, getServices, updateService, deleteService} = require('../controller/service.controller');
const { sendContactEmail } = require('../controller/mail.controller');
const { getProfile, updateProfile, downloadCV } = require('../controller/profile.controller');
const { authenticate, authorizeRole } = require('../middleware/authmiddleware');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user (Passport Local Strategy)
 *     tags: [Authentication]
 *     description: Authenticate user using email and password, returns JWT token in cookie and response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@online.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *     
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
router.post(
    '/login',
    (req, res, next) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: info?.message || 'Invalid email or password'
                });
            }

            if (!JWT_SECRET) {
                return res.status(500).json({
                    success: false,
                    message: 'JWT_SECRET is not defined'
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token
            });
        })(req, res, next);
    }
);

// CREATE
router.post(
    "/projects",
    authenticate,
    authorizeRole('admin'),
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "images", maxCount: 1 },
        { name: "Image", maxCount: 1 }
    ]),
    createProject
);
// GET ALL
router.get('/projects',getProjects);

// CREATE
router.post('/skills', authenticate, authorizeRole('admin'), createSkill);

// GET ALL SKILLS
router.get('/skills', getSkills);

// UPDATE SKILL
router.put('/skills/:id', authenticate, authorizeRole('admin'), updateSkill);
router.delete('/skills/:id', authenticate, authorizeRole('admin'), deleteSkill);

// UPDATE PROJECT
router.put('/projects/:id', authenticate, authorizeRole('admin'), upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 1 },
    { name: "Image", maxCount: 1 }
]), updateProject);

router.delete('/projects/:id', authenticate, authorizeRole('admin'), deleteProject);
// blogs
router.get('/blogs', getBlogs);
router.post('/blogs', authenticate, authorizeRole('admin'), upload.single('image'), createBlog);
router.put('/blogs/:id', authenticate, authorizeRole('admin'), upload.single('image'), updateBlog);

//Services

router.post('/services', authenticate, authorizeRole('admin'), addService);
router.get('/services', getServices);
router.put('/services/:id', authenticate, authorizeRole('admin'), updateService);
router.delete('/services/:id', authenticate, authorizeRole('admin'), deleteService);

// Contact Email

router.post('/message_me', sendContactEmail)

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', authenticate, authorizeRole('admin'), upload.single('cvFile'), updateProfile);
router.get('/profile/download-cv', downloadCV);

module.exports = router;
