document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert("Vous devez être connecté !");
        window.location.href = "connexion.html";
        return;
    }

    const passwordForm = document.getElementById('passwordForm');
    const passwordTable = document.getElementById('passwordTable'); // Le tableau des mots de passe
    const passwordTableBody = document.querySelector('#passwordTable tbody');
    const showPasswordsButton = document.getElementById('showPasswords');

    // Masquer le tableau des mots de passe au chargement de la page
    passwordTable.style.display = "none";

    // Fonction pour récupérer et afficher les mots de passe
    async function fetchPasswords() {
        try {
            const response = await fetch(`http://192.168.65.17:4500/passwords/${userId}`);
            const passwords = await response.json();

            passwordTableBody.innerHTML = ""; // Vide le tableau avant d'afficher les nouvelles entrées

            passwords.forEach(password => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${password.site}</td>
                    <td>${password.username}</td>
                    <td>${password.password}</td>
                `;

                passwordTableBody.appendChild(row);
            });

            // Afficher le tableau uniquement si des mots de passe sont récupérés
            if (passwords.length > 0) {
                passwordTable.style.display = "table";
            } else {
                alert("Aucun mot de passe enregistré.");
            }
        } catch (err) {
            console.error("Erreur lors de la récupération :", err);
            alert("Erreur lors de la récupération des mots de passe.");
        }
    }

    // Ajouter un mot de passe sans afficher la liste après l'ajout
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const site = document.getElementById('site').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`http://192.168.65.17:4500/passwords/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idUser: userId, site, username, password }),
            });

            const result = await response.text();

            if (response.ok) {
                alert("Mot de passe ajouté avec succès !");
                passwordForm.reset();
                //  Ne pas afficher la liste des mots de passe après l'ajout
            } else {
                alert(`Erreur : ${result}`);
            }
        } catch (err) {
            console.error("Erreur :", err);
            alert("Impossible d'ajouter le mot de passe.");
        }
    });

    // Afficher les mots de passe uniquement quand on clique sur "Afficher les mots de passe"
    showPasswordsButton.addEventListener('click', fetchPasswords);
});