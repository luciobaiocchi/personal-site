addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    header = document.getElementById("header-custom").innerHTML;
    header.innerHTML = createHeader();
});

function createHeader(){
    return`
    <!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lucio Baiocchi</title>
    <link rel="icon" type="image/x-icon" href="img/LB.png">
    <meta name="description" content="Lucio Baiocchi - Portfolio e Contatti">
    <meta name="keywords" content="Lucio Baiocchi, sviluppo, programmazione, portfolio">
    <meta name="author" content="Lucio Baiocchi">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/theme.css">
    <style>

    </style>
</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
                <!-- Aggiungi il logo usando un tag <img> dentro a navbar-brand -->
            <a class="navbar-brand" href="index.html">
                <img src="img/LB.png" alt="Logo Lucio Baiocchi" class="logo"/>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#about">Chi sono</a></li>
                    <li class="nav-item"><a class="nav-link" href="projects.html">Progetti</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contacts">Contatti</a></li>
                </ul>
            </div>
            <button id="theme-toggle" class="btn btn-outline-light ms-auto me-2">
                <i class="fas fa-moon"></i> <!-- Icona per il tema scuro -->
            </button>
        </div>
    </nav>

<!-- Header -->
    <header class="text-center text-white bg-secondary py-5">
        <img src="img/lucio.jpg" alt="Lucio Baiocchi" class="profile-pic mb-3">
        <p>Studente e appassionato di tecnologia</p>
    </header>    
    `;
}