
    // Funzione per attivare/disattivare il tema scuro
    function toggleDarkTheme() {
        const body = document.body;
        const themeToggleBtn = document.getElementById('theme-toggle');
        
        // Cambia il tema
        body.classList.toggle('dark-theme');
        
        // Cambia l'icona del pulsante
        if (body.classList.contains('dark-theme')) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Icona per il tema chiaro
            localStorage.setItem('theme', 'dark'); // Salva la preferenza
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Icona per il tema scuro
            localStorage.setItem('theme', 'light'); // Salva la preferenza
        }
    }

    // Controlla il tema salvato al caricamento della pagina
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        const body = document.body;
        const themeToggleBtn = document.getElementById('theme-toggle');
        
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Aggiungi l'event listener al pulsante
    document.getElementById('theme-toggle').addEventListener('click', toggleDarkTheme);