function cerrarSesion(){
    //console.log("cerrando sesion");
    const botonCerrarSesion= document.getElementById("btnCerrarSesion");
    console.log(botonCerrarSesion);
    //botonCerrarSesion.textContent="Abrir sesión";
    if(botonCerrarSesion.textContent==="Abrir sesión"){
        botonCerrarSesion.textContent="Cerrar sesión";
    }else if(botonCerrarSesion.textContent==="Cerrar sesión"){
        botonCerrarSesion.textContent="Abrir sesión";
    }
}
