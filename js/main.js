const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
const costoTotal = carrito.reduce((total, producto) => total + producto.price, 0);
escribirCarrito(costoTotal)
const productos = []

// llamando al .json para cargar las cards
const productosJSON = () => {
fetch ('js/productos.json')
    .then (response => response.json())
    .then (data => {
        crearCards(data),
        agregarAlCarrito(data)
        productos.push(...data)
    })
}
productosJSON()


// Carrito PopUp
function carritoPopUp(){
    document.getElementById("tabla-carrito").innerHTML = "" 
    carrito.forEach((producto) => { 
        document.getElementById("tabla-carrito").innerHTML += `<tr> 
        <th scope="row">${producto.id}</th>
        <td>${producto.title}</td>
        <td><img src="${producto.thumbnail}" style="height: 100px" ></td>
        <td>${producto.price}</td>
        <td><button type="button" class="btn btn-secondary borrar-producto" onclick="eliminarDelCarrito(${producto.id})">Remove</button></td>
    </tr>`
    })
}
carritoPopUp()

// Creación de CARDS en pantalla inicial
function crearCards(listado){
    listado.forEach(({id, title, thumbnail, price}) => { // desestructuración con operador avanzado => Lo hice esta sola vez, y no lo hice en la función "carritoPopUp" para que cuando lo vuelva a ver, yo entienda que es lo mismo escribirlo de cualquiera de las 2 formas
        document.getElementById("seccion-cards").innerHTML += `<div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="${thumbnail}" alt="${title}" />        
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${title}</h5>
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
            carritoPopUp()
            document.getElementById("alFin").innerHTML = `<h1 class="display-4 fw-bolder">Shop in style</h1>
            <p class="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>`
            Toastify({
                text: "Producto agregado al Carrito",
                duration: 2500,
                destination: "#exampleModal",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                }).showToast();
        })
    }
}

// Función de borrado del carrito
function eliminarDelCarrito(productoId) {
    const prod = carrito.find((producto) => producto.id == productoId)
    let i = carrito.indexOf(prod)
    if (i != -1) carrito.splice(i, 1) // como es en una sola linea, borré las {}, como comentó el profe
    const costoTotal = carrito.reduce((total, producto) => total + producto.price, 0)
    escribirCarrito(costoTotal)
    carritoPopUp()
    document.getElementById("alFin").innerHTML = `<h1 class="display-4 fw-bolder">Al Fin, funciona todo!🥳</h1>
    <p class="lead fw-normal text-white-50 mb-0">Por favor, apruébeme🙏🏼</p>`
    if(carrito.length == 0){Swal.fire({
        icon: 'success',
        title: 'Limpio!',
        text: 'El carrito está vacío',
    })}
}

console.log(...carrito) // como no necesitaba el spread, lo agregué acá, sólo para la entrega