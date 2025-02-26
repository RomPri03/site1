document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const successPopup = document.getElementById('successPopup');
    const closePopup = document.getElementById('closePopup');
    const popupOverlay = document.getElementById('popupOverlay'); // Si tu utilises un overlay pour la popup

    // Gestionnaire pour le formulaire d'inscription
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch('http://192.168.65.17:4500/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.text();

            if (response.ok) {
                // Réinitialisation des champs du formulaire
                registerForm.reset();

                // Affiche la popup de succès
                successPopup.classList.remove('hidden');
                if (popupOverlay) {
                    popupOverlay.classList.remove('hidden');
                }
            } else {
                alert(`Erreur lors de l'inscription: ${result}`);
            }
        } catch (err) {
            console.error('Erreur lors de l\'inscription:', err);
            alert('Impossible de se connecter au serveur');
        }
    });

    // Fermeture de la popup
    closePopup.addEventListener('click', () => {
        successPopup.classList.add('hidden');
        if (popupOverlay) {
            popupOverlay.classList.add('hidden');
        }
    });
});
