const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

require("dotenv").config();

const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

// Configurar middlewares
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Servir las carpetas 'images' y 'models' como estáticas
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/models", express.static(path.join(__dirname, "models")));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Ruta para manejar el envío del formulario
app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: "contacto@tecnology.com",
        subject: `Mensaje de ${name}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error al enviar el correo:", error);
            res.status(500).json({ message: "Error al enviar el mensaje." });
        } else {
            console.log("Correo enviado:", info.response);
            res.json({ message: "Mensaje enviado correctamente." });
        }
    });
});
