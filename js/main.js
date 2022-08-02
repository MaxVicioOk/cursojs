const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
const costoTotal = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0); // total de la suma de precios de productos en el carrito
document.getElementById("total-carrito").innerHTML = carrito.length + " - $"+costoTotal;

const productos = [
    {id: 1, name: 'Remera León', price: 2000, img: "images/remera-leon.png", category: "Remeras"},
    {id: 2, name: 'Remera Roja', price: 1500, img: "images/remera-roja.png", category: "Remeras"},
    {id: 3, name: 'Pantalón Azul', price: 3400, img: "images/pantalon-azul.png", category: "Pantalones"},
    {id: 4, name: 'Pantalón Gris', price: 4600, img: "images/pantalon-gris.png", category: "Pantalones"}
]

// Carrito PopUp
carrito.forEach((producto) => {
    document.getElementById("tabla-carrito").innerHTML += `<tr>
    <th scope="row">${producto.id}</th>
    <td>${producto.name}</td>
    <td><img src="${producto.img}" style="height: 100px" ></td>
    <td>${producto.price}</td>
    <td><button type="button" class="btn btn-secondary borrar-producto" info-borrar="${producto}">Remove</button></td>
</tr>`
})

// Creación de CARDS
productos.forEach((producto) => {
    document.getElementById("seccion-cards").innerHTML += `<div class="col mb-5">
        <div class="card h-100">
            <img class="card-img-top" src="${producto.img}" alt="${producto.name}" />        
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">${producto.name}</h5>
                    $${producto.price}
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                    <a class="btn btn-outline-dark mt-auto" id="btn-agregar${producto.id}" href="#">Add to cart</a>
                </div>
            </div>
        </div>
    </div>`
})

// Función de filtrado
function filtroPorCategoria(categoria){
    document.getElementById("seccion-cards").innerHTML = "" //borrando las cards de todos los productos
    const productosFiltrados = productos.filter((producto) => producto.category === categoria) //Filtrando los productos
    productosFiltrados.forEach((producto) => { //Agregando las cards de los productos filtrados
        document.getElementById("seccion-cards").innerHTML += `<div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="${producto.img}" alt="${producto.name}" />        
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${producto.name}</h5>
                        $${producto.price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto" id="btn-agregar${producto.id}" href="#">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>`
    })
}

// Aplicando la función de forma dinámica
for (const botonFiltro of document.getElementsByClassName('filtro-categoria')){
    botonFiltro.addEventListener('click', (elEventitoLoco) =>{ // puse este nombre al event sólo para que cuando yo vuelva a ver esto, entienda que puede llevar cualquier nombre
        const categoria = elEventitoLoco.target.getAttribute('info-categoria');
        filtroPorCategoria(categoria)
    })
}

//Repite el forEach para suscribir a las cards creadas anteriormente y agregarle la función, en este caso, agregar carrito
for(const producto of productos) {
    document.getElementById("btn-agregar"+producto.id).addEventListener("click", () => {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        const costoTotal = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0)
        document.getElementById("total-carrito").innerHTML = carrito.length + " - $"+costoTotal;
        console.log(carrito)
        document.getElementById("tabla-carrito").innerHTML = ``
        carrito.forEach((producto) => {
            document.getElementById("tabla-carrito").innerHTML += `<tr>
            <th scope="row">${producto.id}</th>
            <td>${producto.name}</td>
            <td><img src="${producto.img}" style="height: 100px" ></td>
            <td>${producto.price}</td>
            <td><button type="button" class="btn btn-secondary borrar-producto" info-borrar="${producto}">Remove</button></td>
        </tr>`
        })
    })
}

for(const botonBorrar of document.querySelectorAll('.borrar-producto')){
    botonBorrar.onclick = (e) => {
        productoParaBorrar = e.target.getAttribute('info-borrar');
        eliminarDelCarrito(productoParaBorrar)
    }
}

// Función de borrado del carrito
function eliminarDelCarrito(producto) {
    let i = carrito.indexOf(producto)
    if (i != -1) {carrito.splice(i, 1)}
}