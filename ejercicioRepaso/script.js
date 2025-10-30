document.addEventListener('DOMContentLoaded', () => {
    
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

    
    const equiposGrupoA = ["Ecuador", "Senegal", "Países Bajos", "Qatar"];

    
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

        
        equipo1Select.value = "Ecuador";
        equipo2Select.value = "Qatar";
    };

    
    const togglePenales = () => {
        const marcador1 = parseInt(marcador1Input.value, 10);
        const marcador2 = parseInt(marcador2Input.value, 10);

        
        if (marcador1 === marcador2 && marcador1 !== '' && marcador2 !== '') {
            penalesControl.classList.remove('hidden');
        } else {
            penalesControl.classList.add('hidden');
            
            penales1Checkbox.checked = false;
            penales2Checkbox.checked = false;
        }
    };

    
   

    
    const agregarPronostico = () => {
        const equipo1 = equipo1Select.value;
        const marcador1 = marcador1Input.value.trim();
        const equipo2 = equipo2Select.value;
        const marcador2 = marcador2Input.value.trim();
        const comentario = comentarioInput.value.trim() || '¡Hoy ganamos, Ecuador!';

        
        if (marcador1 === '' || marcador2 === '') {
            alert('El marcador es obligatorio'); 
            return;
        }

        const score1 = parseInt(marcador1, 10);
        const score2 = parseInt(marcador2, 10);

        
        let ganador = '';
        let porPenales = false;

        if (score1 > score2) {
            ganador = equipo1;
        } else if (score2 > score1) {
            ganador = equipo2;
        } else { 
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

        
        const itemHTML = `
            <div class="puntajes">
                <div class="puntajeEquipo">
                    ${porPenales ? '<span class="penalesIcon">🟣</span>' : ''} 
                    ${equipo1} ${score1}
                </div>
                <span class="separador">vs.</span>
                <div class="puntajeEquipo">
                    ${score2} ${equipo2}
                    ${ganador === equipo2 ? '<span class="ganadorIcon">🏆</span>' : ''}
                </div>
            </div>
            ${ganador === equipo1 ? '<div class="ganadorLinea">🏆 ' + equipo1 + '</div>' : ''}
            ${ganador !== equipo1 && ganador !== equipo2 ? '<div class="ganadorLinea">Resultado: Empate</div>' : ''}
            <div class="comentarioResultado">${comentario}</div>
        `;

        const nuevoPronostico = document.createElement('div');
        
        nuevoPronostico.classList.add('pronosticoItem'); 
        nuevoPronostico.innerHTML = itemHTML;

        
        listaPronosticos.prepend(nuevoPronostico);
    };

    
    llenarSelects();
    togglePenales(); 

    
    marcador1Input.addEventListener('input', togglePenales);
    marcador2Input.addEventListener('input', togglePenales);

    
    btnAgregar.addEventListener('click', agregarPronostico);

    penales1Checkbox.addEventListener('change', handlePenalesCheck);
    penales2Checkbox.addEventListener('change', handlePenalesCheck);
});