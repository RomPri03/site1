// Formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
    // Envoi des données vers le backend pour la connexion
    const response = await fetch('http://192.168.65.17:4000/auth/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
    // Connexion réussie, redirection vers la page d'accueil
    window.location.href = 'acceuil.html';
    } else {
    // Affichage de l'erreur en cas de réponse négative
    alert(`Erreur : ${data.message}`);
    }
    } catch (err) {
    console.error('Erreur de connexion avec le serveur.', err);
    alert('Erreur lors de la connexion avec le serveur.');
    }
    });
    
    // Formulaire d'inscription
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
    // Envoi des données vers le backend pour l'inscription
    const response = await fetch('http://192.168.65.17:4000/auth/register', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    });
    
    const message = document.getElementById('message'); // Message de retour dans la page HTML
    
    if (response.ok) {
    const data = await response.text();
    // Affichage du message de succès
    message.textContent = data;
    message.style.color = 'green';
    } else {
    const errorText = await response.text();
    // Affichage du message d'erreur
    message.textContent = `Erreur : ${errorText}`;
    message.style.color = 'red';
    }
    } catch (err) {
    console.error('Erreur avec le serveur.', err);
    const message = document.getElementById('message');
    message.textContent = 'Erreur de connexion avec le serveur.';
    message.style.color = 'red';
    }
    });