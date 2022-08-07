const carrito = JSON.parse(localStorage.getItem('carrito')) || []; // cambié el ?? por el || sólo porque lo pide esta entrega, despues vuelvo a poner el ??
const costoTotal = carrito.reduce((total, producto) => total + producto.price, 0);
escribirCarrito(costoTotal)

const productos = [
    {id: 1, name: 'Remera León', price: 1700, img: "images/remera-leon.png", category: "Remeras"},
    {id: 2, name: 'Remera Roja', price: 1590, img: "images/remera-roja.png", category: "Remeras"},
    {id: 3, name: 'Pantalón Azul', price: 3430, img: "images/pantalon-azul.png", category: "Pantalones"},
    {id: 4, name: 'Pantalón Gris', price: 4370, img: "images/pantalon-gris.png", category: "Pantalones"}
]

// Carrito PopUp
function CarritoPopUp(){
    document.getElementById("tabla-carrito").innerHTML = "" 
    carrito.forEach((producto) => { 
        document.getElementById("tabla-carrito").innerHTML += `<tr> 
        <th scope="row">${producto.id}</th>
        <td>${producto.name}</td>
        <td><img src="${producto.img}" style="height: 100px" ></td>
        <td>${producto.price}</td>
        <td><button type="button" class="btn btn-secondary borrar-producto" onclick="eliminarDelCarrito(${producto.id})" info-borrar="${producto.id}">Remove</button></td>
    </tr>`
    })
}
CarritoPopUp()

// Creación de CARDS en pantalla inicial
function crearCards(listado){
    listado.forEach(({id, name, img, price}) => { // desestructuración con operador avanzado => Lo hice esta sola vez, y no lo hice en la función "carritoPopUp" para que cuando lo vuelva a ver, yo entienda que es lo mismo escribirlo de cualquiera de las 2 formas
        document.getElementById("seccion-cards").innerHTML += `<div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="${img}" alt="${name}" />        
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${name}</h5>
                        $${price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto" id="btn-agregar${id}" href="#">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>`
    })
}
crearCards(productos)

// Creo esta función para no repetir codigo
function escribirCarrito(parametroCosto){
    localStorage.setItem("carrito", JSON.stringify(carrito));
    document.getElementById("total-carrito").innerHTML = carrito.length + " - $"+parametroCosto;
}

// Función de filtrado
function filtroPorCategoria(categoria){
    document.getElementById("seccion-cards").innerHTML = "" //borrando las cards de todos los productos
    const productosFiltrados = productos.filter((producto) => producto.category === categoria) //Filtrando los productos
    crearCards(productosFiltrados)
    agregarAlCarrito(productosFiltrados)
}

// Aplicando la función de filtrado de forma dinámica
for (const botonFiltro of document.getElementsByClassName('filtro-categoria')){
    botonFiltro.addEventListener('click', (elEventitoLoco) =>{ // puse este nombre al event sólo para que cuando yo vuelva a ver esto, entienda que puede llevar cualquier nombre
        const categoria = elEventitoLoco.target.getAttribute('info-categoria');
        filtroPorCategoria(categoria)
    })
}

//Repite el forEach para suscribir a las cards creadas anteriormente y agregarle la función, en este caso, agregar carrito
function agregarAlCarrito (lista) {
    for(const producto of lista) {
        document.getElementById("btn-agregar"+producto.id).addEventListener("click", () => {
            carrito.push(producto);
            const costoTotal = carrito.reduce((total, producto) => total + producto.price, 0)
            escribirCarrito(costoTotal);
            console.log(carrito)
            CarritoPopUp()
            document.getElementById("alFin").innerHTML = `<h1 class="display-4 fw-bolder">Shop in style</h1>
            <p class="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>`
        })
    }
}
agregarAlCarrito(productos)

// Función de borrado del carrito
function eliminarDelCarrito(productoId) {
    const prod = carrito.find((producto) => producto.id == productoId)
    let i = carrito.indexOf(prod)
    if (i != -1) carrito.splice(i, 1) // como es en una sola linea, borré las {}, como comentó el profe
    const costoTotal = carrito.reduce((total, producto) => total + producto.price, 0)
    escribirCarrito(costoTotal)
    CarritoPopUp()
    document.getElementById("alFin").innerHTML = `<h1 class="display-4 fw-bolder">Al Fin, funciona todo!🥳</h1>
    <p class="lead fw-normal text-white-50 mb-0">Por favor, apruébeme🙏🏼</p>`
}

console.log(...carrito) // como no necesitaba el spread, lo agregué acá, sólo para la entrega