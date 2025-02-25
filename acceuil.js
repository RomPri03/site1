document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId'); // Stocké après connexion

    if (!userId) {
        alert("Vous devez être connecté !");
        window.location.href = "connexion.html";
        return;
    }

    const passwordForm = document.getElementById('passwordForm');
    const passwordList = document.getElementById('passwordList');
    const showPasswordsButton = document.getElementById('showPasswords');

    // 🔹 Fonction pour récupérer et afficher les mots de passe
    async function fetchPasswords() {
        try {
            const response = await fetch(`http://192.168.65.17:4500/passwords/${userId}`);
            const passwords = await response.json();

            passwordList.innerHTML = ""; // Vide la liste avant de l'afficher

            passwords.forEach(password => {
                const listItem = document.createElement('li');
                listItem.textContent = `${password.site} - ${password.username} : ${password.password}`;
                passwordList.appendChild(listItem);
            });
        } catch (err) {
            console.error("Erreur lors de la récupération :", err);
            alert("Erreur lors de la récupération des mots de passe.");
        }
    }

    // 🔹 Ajouter un mot de passe
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const site = document.getElementById('site').value;
        const username = "test_user"; // Ajoute un champ si nécessaire
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`http://192.168.65.17:4500/passwords/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, site, username, password }),
            });

            const result = await response.text(); // Réponse en texte brut

            if (response.ok) {
                alert("Mot de passe ajouté avec succès !");
                passwordForm.reset();
                fetchPasswords(); // Recharge la liste des mots de passe
            } else {
                alert(`Erreur : ${result}`);
            }
        } catch (err) {
            console.error("Erreur :", err);
            alert("Impossible d'ajouter le mot de passe.");
        }
    });

    // 🔹 Afficher les mots de passe au clic sur le bouton
    showPasswordsButton.addEventListener('click', fetchPasswords);
});