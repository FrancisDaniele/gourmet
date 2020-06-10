
    const DOMINIO = "http://localhost:8080";
    
    function init(){
        loadRestaurantes();
    }

    const loadDashboard= () => {
        document.querySelector("#titulo").innerHTML = "Dashboard";

    };
    const loadRestaurantes= () => {
        document.querySelector("#titulo").innerHTML = "Mantenimiento de restaurantes";
        renderRestaurantes("#main-screen");
    };
    const loadCategorias= () => {
        document.querySelector("#titulo").innerHTML = "Mantenimiento de categorias";
        renderCategorias("#main-screen");
    };
    const loadLocalidades= () => {
        document.querySelector("#titulo").innerHTML = "Mantenimiento de localidades";
        renderLocalidades("#main-screen");
    };

    init();