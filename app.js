// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3LQ4VOp--zMKzLCnNQnT9Yu00YzGqf0g",
  authDomain: "hola-mundo-1f55e.firebaseapp.com",
  projectId: "hola-mundo-1f55e",
  storageBucket: "hola-mundo-1f55e.firebasestorage.app",
  messagingSenderId: "1031359926208",
  appId: "1:1031359926208:web:70dbbda3f09c4e9fa5c225",
  measurementId: "G-SGVM8VFK5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Manejo del formulario de contacto
const contactForm = document.getElementById("contact-form");
const statusMsg = document.getElementById("contact-status");
const submitBtn = document.getElementById("submit-btn");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !correo || !mensaje) {
      if (statusMsg) {
        statusMsg.textContent = "Por favor completa todos los campos.";
        statusMsg.className = "form-status error";
      }
      return;
    }

    try {
      // Estado enviando
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }
      if (statusMsg) {
        statusMsg.textContent = "";
        statusMsg.className = "form-status";
      }

      // Guardar en la colección "mensajes"
      await addDoc(collection(db, "mensajes"), {
        nombre: nombre,
        correo: correo,
        mensaje: mensaje,
        fecha: serverTimestamp()
      });

      // Éxito
      contactForm.reset();
      if (statusMsg) {
        statusMsg.textContent = "¡Mensaje enviado con éxito! Gracias por comunicarte.";
        statusMsg.className = "form-status success";
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      if (statusMsg) {
        statusMsg.textContent = "Hubo un error al enviar el mensaje. Intenta de nuevo más tarde.";
        statusMsg.className = "form-status error";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
      }
    }
  });
}
