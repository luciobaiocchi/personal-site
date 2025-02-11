document.addEventListener('DOMContentLoaded', function() {
    const toggleViewButton = document.getElementById('toggleView');
    const projectsContainer = document.getElementById('projectsContainer');
    let isListView = false;

    // Funzione per cambiare la vista
    toggleViewButton.addEventListener('click', function() {
        isListView = !isListView;
        projectsContainer.classList.toggle('list-view', isListView);
        toggleViewButton.textContent = isListView ? 'Vista Griglia' : 'Vista Lista';
    });
});