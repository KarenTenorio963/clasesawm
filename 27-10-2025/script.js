document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM (ya en camelCase)
    const equipo1Select = document.getElementById('equipo1');
    const marcador1Input = document.getElementById('marcador1');
    const equipo2Select = document.getElementById('equipo2');
    const marcador2Input = document.getElementById('marcador2');
    const comentarioInput = document.getElementById('comentario');
    const btnAgregar = document.getElementById('btnAgregar');
    const listaPronosticos = document.getElementById('listaPronosticos');
    const penalesControl = document.getElementById('penalesControl');
    const penales1Checkbox = document.getElementById('penales1');
    const penales2Checkbox = document.getElementById('penales2');

    // Lista de equipos del Grupo A para inicializar los selects
    const equiposGrupoA = ["Ecuador", "Senegal", "Países Bajos", "Qatar"];

    // Función para llenar los select de equipos
    const llenarSelects = () => {
        equipo1Select.innerHTML = '';
        equipo2Select.innerHTML = '';

        equiposGrupoA.forEach(equipo => {
            const option1 = document.createElement('option');
            option1.value = equipo;
            option1.textContent = equipo;
            equipo1Select.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = equipo;
            option2.textContent = equipo;
            equipo2Select.appendChild(option2);
        });

        // Seleccionar los valores por defecto del wireframe
        equipo1Select.value = "Ecuador";
        equipo2Select.value = "Qatar";
    };

    // Función para alternar la visibilidad de los controles de penales
    const togglePenales = () => {
        const marcador1 = parseInt(marcador1Input.value, 10);
        const marcador2 = parseInt(marcador2Input.value, 10);

        // Se muestra si es empate Y los marcadores no están vacíos
        if (marcador1 === marcador2 && marcador1 !== '' && marcador2 !== '') {
            penalesControl.classList.remove('hidden');
        } else {
            penalesControl.classList.add('hidden');
            // Asegurarse de que las casillas de penales estén desmarcadas si ya no hay empate
            penales1Checkbox.checked = false;
            penales2Checkbox.checked = false;
        }
    };

    // Manejador para la selección de ganador de penales (solo puede haber uno)
    const handlePenalesCheck = (event) => {
        if (event.target.id === 'penales1') {
            penales2Checkbox.checked = false;
        } else if (event.target.id === 'penales2') {
            penales1Checkbox.checked = false;
        }
    };

    // Función para agregar el pronóstico a la lista
    const agregarPronostico = () => {
        const equipo1 = equipo1Select.value;
        const marcador1 = marcador1Input.value.trim();
        const equipo2 = equipo2Select.value;
        const marcador2 = marcador2Input.value.trim();
        const comentario = comentarioInput.value.trim() || '¡Hoy ganamos, Ecuador!';

        // 1. Validación de marcadores vacíos
        if (marcador1 === '' || marcador2 === '') {
            alert('El marcador es obligatorio'); // Alerta solicitada
            return;
        }

        const score1 = parseInt(marcador1, 10);
        const score2 = parseInt(marcador2, 10);

        // 2. Determinar ganador y si fue por penales
        let ganador = '';
        let porPenales = false;

        if (score1 > score2) {
            ganador = equipo1;
        } else if (score2 > score1) {
            ganador = equipo2;
        } else { // Empate
            porPenales = true;
            if (penales1Checkbox.checked) {
                ganador = equipo1;
            } else if (penales2Checkbox.checked) {
                ganador = equipo2;
            }
            if (!ganador) {
                ganador = "N/A (Empate)";
            }
        }

        // 3. Crear el elemento del pronóstico
        const itemHTML = `
            <div class="scoreLine">
                <div class="equipoScore">
                    ${porPenales ? '<span class="penalesIcon">🟣</span>' : ''} 
                    ${equipo1} ${score1}
                </div>
                <span class="separador">vs.</span>
                <div class="equipoScore">
                    ${score2} ${equipo2}
                    ${ganador === equipo2 ? '<span class="ganadorIcon">🏆</span>' : ''}
                </div>
            </div>
            ${ganador === equipo1 ? '<div class="ganadorLinea">🏆 ' + equipo1 + '</div>' : ''}
            ${ganador !== equipo1 && ganador !== equipo2 ? '<div class="ganadorLinea">Resultado: Empate</div>' : ''}
            <div class="comentarioResultado">${comentario}</div>
        `;

        const nuevoPronostico = document.createElement('div');
        // CLASE ACTUALIZADA A camelCase
        nuevoPronostico.classList.add('pronosticoItem'); 
        nuevoPronostico.innerHTML = itemHTML;

        // Añadir el nuevo pronóstico al inicio de la lista
        listaPronosticos.prepend(nuevoPronostico);
    };

    // Inicialización y Listeners
    llenarSelects();
    togglePenales(); 

    // Escuchar cambios en los marcadores para alternar la sección de penales
    marcador1Input.addEventListener('input', togglePenales);
    marcador2Input.addEventListener('input', togglePenales);

    // Escuchar el botón Agregar
    btnAgregar.addEventListener('click', agregarPronostico);

    // Escuchar los checkboxes de penales para la selección exclusiva
    penales1Checkbox.addEventListener('change', handlePenalesCheck);
    penales2Checkbox.addEventListener('change', handlePenalesCheck);
});