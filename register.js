// Gestionnaire pour le formulaire d'inscription
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
    const response = await fetch('http://192.168.65.17:4000/auth/register', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    });
    
    const result = await response.text();
    
    if (response.ok) {
    alert('Inscription réussie !');
    } else {
    alert(`Erreur lors de l'inscription: ${result}`);
    }
    } catch (err) {
    console.error('Erreur lors de l\'inscription:', err);
    alert('Impossible de se connecter au serveur');
    }
    });
    });