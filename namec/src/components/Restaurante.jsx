import react from "react"
//para destruccturacion
function Restaurante({nombre, descripcion}){
    return(
        //debe haber uno componente contenedor
        <div>
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
            
       </div>
    );
}

/*function Restaurante({props}){
    return(
        //debe haber uno componente contenedor
        <div>
            <h2>{props.nombre}</h2>
            <p>{props.descripcion}</p>
       </div>
    );
}
*/
export default Restaurante;