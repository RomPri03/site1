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


document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const successPopup = document.getElementById("successPopup");
    const closePopup = document.getElementById("closePopup");
    const popupOverlay = document.getElementById("popupOverlay"); // Overlay pour l'effet visuel (si utilisé)

    // Gestion de l'envoi du formulaire
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Réinitialise les champs du formulaire
        registerForm.reset();

        // Affiche la popup et l'overlay
        successPopup.classList.remove("hidden");
        if (popupOverlay) {
            popupOverlay.classList.remove("hidden");
        }
    });

    // Fermeture de la popup
    closePopup.addEventListener("click", () => {
        successPopup.classList.add("hidden");
        if (popupOverlay) {
            popupOverlay.classList.add("hidden");
        }
    });
});
