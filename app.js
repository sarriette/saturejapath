import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, limitToLast } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Configuration Firebase (remplace avec tes valeurs Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyAQde4UIv5sTUk3aEsl2goPJzb0AiwPof8",
    authDomain: "tchat-des-bg-et-bgettes.firebaseapp.com",
    projectId: "tchat-des-bg-et-bgettes",
    storageBucket: "tchat-des-bg-et-bgettes.firebasestorage.app",
    messagingSenderId: "999354711615",
    appId: "1:999354711615:web:e67e8961a153d41750828a",
    measurementId: "G-N26LMSE46G"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // On utilise cette variable pour interagir avec la base de données

// Références
const chatBox = document.getElementById('chat-box');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// Charger les messages
const messagesRef = ref(db, 'messages'); // Utilisation de la méthode `ref` de Firebase modulaire
onChildAdded(messagesRef, (snapshot) => { // Utilisation de la méthode `onChildAdded` avec le nouveau paramétrage
    const { username, text } = snapshot.val();
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${username}:</strong> ${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll en bas
});

// Envoyer un message
sendButton.addEventListener('click', () => {
    const username = usernameInput.value.trim() || 'Anonyme';
    const text = messageInput.value.trim();
    if (text) {
        push(messagesRef, { username, text }); // Utilisation de `push` avec la syntaxe modulaire
        messageInput.value = ''; // Réinitialiser l'input
    }
});

// Envoyer avec la touche Entrée
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendButton.click();
});
