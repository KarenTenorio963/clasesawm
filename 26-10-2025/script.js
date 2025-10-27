document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener los elementos del DOM
    const tituloInput = document.getElementById('titulo');
    const anioInput = document.getElementById('anio');
    const categoriaSelect = document.getElementById('categoria');
    const urlInput = document.getElementById('url');
    const btnAgregar = document.getElementById('btnAgregar');
    const listadoPeliculas = document.getElementById('listadoPeliculas');
    const bgColorRadios = document.querySelectorAll('input[name="bg-color"]');
    const contenedorApp = document.getElementById('contenedor'); // El contenedor principal que queremos cambiar de color

    // --- Funciones de Validación ---
    
    /**
     * Realiza las validaciones de los campos de entrada.
     * Requisitos: 1. Todos los campos obligatorios. 2. Año no mayor a 2023.
     */
    function validarCampos(titulo, anio, url) {
        // 1. Validación de campos vacíos (1.5 puntos) [cite: 35]
        if (!titulo.trim() || !anio.trim() || !url.trim() || categoriaSelect.value === "") {
            alert("Todos los campos son obligatorios");
            return false;
        }

        // 2. Validación del año de filmación (1 punto) [cite: 39]
        const anioPelicula = parseInt(anio);
        const anioMaximo = 2023;

        if (anioPelicula > anioMaximo) {
            alert("¿Ha filmado una película en el futuro?");
            return false;
        }
        
        return true;
    }

    // --- Función para Agregar Película ---

    /**
     * Maneja el clic en el botón 'Agregar': valida y añade la película si es válida. (3 puntos)
     */
    function agregarPelicula() {
        const titulo = tituloInput.value;
        const anio = anioInput.value;
        const categoria = categoriaSelect.options[categoriaSelect.selectedIndex].text; // Obtiene el texto visible (e.g., "Ciencia Ficción")
        const url = urlInput.value;

        // Si la validación falla, detenemos la ejecución
        if (!validarCampos(titulo, anio, url)) {
            return;
        }

        // Crear el nuevo elemento 'div' para la película
        const nuevaPelicula = document.createElement('div');
        nuevaPelicula.classList.add('pelicula');
        nuevaPelicula.setAttribute('data-tittle', titulo);

        // Contenido HTML de la tarjeta de película (cargar la imagen usando la URL) 
        nuevaPelicula.innerHTML = `
            <div class="info">
                <p><strong>Título:</strong> ${titulo}</p>
                <p><strong>Año:</strong> ${anio}</p>
                <p><strong>Categoría:</strong> ${categoria}</p>
            </div>
            <img src="${url}" alt="Carátula de ${titulo}" class="portada">
        `;

        // Añadir la nueva película al listado
        listadoPeliculas.appendChild(nuevaPelicula);

        // Opcional: Limpiar los campos después de agregar
        tituloInput.value = '';
        anioInput.value = '';
        urlInput.value = '';
        categoriaSelect.value = 'accion'; // O resetear al valor inicial deseado
    }

    // --- Función para Cambiar Color de Fondo ---

    /**
     * Cambia el color de fondo del contenedor principal de la aplicación. (2 puntos) 
     */
    function cambiarColorFondo(event) {
        // Obtenemos el valor del radio button seleccionado ('aqua' o 'burlywood')
        const color = event.target.value; 
        
        // El color de fondo debe ser cambiado en el cuerpo (body) o en un contenedor principal
        // Aquí usaremos el body para cambiar todo el fondo de la página, como se hace en el CSS
        document.body.style.backgroundColor = color; 
        
        // Si quisieras cambiar el color solo del 'contenedor', usarías:
        // contenedorApp.style.backgroundColor = color; 
    }

    // --- Asignación de Event Listeners ---

    // 1. Al dar clic en el botón 'Agregar' 
    btnAgregar.addEventListener('click', agregarPelicula);

    // 2. Al cambiar la selección de color de fondo 
    bgColorRadios.forEach(radio => {
        radio.addEventListener('change', cambiarColorFondo);
    });

    // Inicialización: Asegurar que el color por defecto (Aqua) esté aplicado, si el CSS no lo maneja
    // Como el HTML indica 'Aqua' como checked, el CSS debería manejar el estilo inicial.
    // Si quisieras forzarlo vía JS:
    // document.body.style.backgroundColor = 'aqua';
});