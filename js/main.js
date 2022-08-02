const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
document.getElementById('total-carrito').innerHTML = carrito.length;

const productos = [
    {id: 1, name: 'Remera León', price: 2000, img: "images/remera-leon.png", category: "Remeras"},
    {id: 2, name: 'Remera Roja', price: 1500, img: "images/remera-roja.png", category: "Remeras"},
    {id: 3, name: 'Pantalón Azul', price: 3400, img: "images/pantalon-azul.png", category: "Pantalones"},
    {id: 4, name: 'Pantalón Gris', price: 4600, img: "images/pantalon-gris.png", category: "Pantalones"}
]

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
        document.getElementById("total-carrito").innerHTML = carrito.length;
        console.log(carrito)
    })
}

// Función de borrado del carrito
function eliminarDelCarrito(producto) {
    let i = carrito.indexOf(producto)
    if (i != -1) {carrito.splice(i, 1)}
}