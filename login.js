const backendUrl = 'http://192.168.65.17:4000';

// Gestionnaire pour le formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', async (e) => {
e.preventDefault();
const email = document.getElementById('email').value.trim();
const password = document.getElementById('password').value.trim();

try {
const response = await fetch(`${backendUrl}/auth/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
});

if (response.ok) {
// Connexion réussie
const data = await response.json();
alert('Connexion réussie ! Bienvenue.');
window.location.href = 'accueil.html'; // Redirige vers une autre page
} else if (response.status === 401) {
// Email ou mot de passe incorrect
alert('Email ou mot de passe incorrect. Veuillez réessayer.');
} else {
// Autre erreur (ex : serveur indisponible)
alert('Erreur lors de la connexion. Veuillez réessayer plus tard.');
}
} catch (err) {
console.error('Erreur lors de la communication avec le backend :', err);
alert('Impossible de se connecter au serveur.');
}
});

