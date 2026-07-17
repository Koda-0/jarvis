require("dotenv").config({
    path: require("path").join(__dirname, ".env"),
});

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ishimwengambasabri@gmail.com',
        pass: 'nuic ycdh nyxp gkna',
    },
});

const sendContactEmail = async (req, res) => {
    try {
        let { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required.",
            });
        }

        name = name.trim();
        email = email.trim();
        message = message.trim();

        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `📩 New Contact Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
                    <h2 style="color:#2563eb;">New Contact Message</h2>

                    <table style="width:100%; border-collapse:collapse;">
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>${name}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>${email}</td>
                        </tr>
                    </table>

                    <hr>

                    <h3>Message</h3>
                    <p>${message.replace(/\n/g, "<br>")}</p>

                    <hr>

                    <small>
                        This email was sent from your website contact form.
                    </small>
                </div>
            `,
        });

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully.",
        });
    } catch (error) {
        console.error("Email Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send email.",
            error: error.message,
        });
    }
};

module.exports = {
    sendContactEmail,
};