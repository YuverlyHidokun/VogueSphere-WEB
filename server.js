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


app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const mailOptions = {
    from: process.env.EMAIL_USER, // Se envía desde la cuenta autenticada
    replyTo: email, // Esto permite que al responder el correo vaya al usuario
    to: "yuverlyverdezoto@gmail.com", // Tu correo donde recibirás los mensajes
    subject: "Feedback del servicio", // Asunto fijo
    text: `Nombre: ${name}\n\nMensaje: ${message}` // Contenido del correo
};

    transporter.sendMail(mailOptions)
        .then(info => {
            console.log("Correo enviado:", info.response);
            res.json({ message: "Mensaje enviado correctamente." });
        })
        .catch(error => {
            console.error("Error al enviar el correo:", error);
            res.status(500).json({ message: "Error al enviar el mensaje." });
        });
});

console.log("EMAIL_USER:", process.env.EMAIL_USER); // Para verificar que se está leyendo bien
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);