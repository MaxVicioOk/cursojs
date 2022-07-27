const carrito = []
const fancyProduct = document.querySelectorAll('.fancy-product')
const specialItem = document.querySelectorAll('.special-item')
const saleItem = document.querySelectorAll('.sale-item')
const popularItem = document.querySelectorAll('.popular-item')
const productos = [
    {id: 1, name: 'Fancy Product', price: 80},
    {id: 2, name: 'Special Item', price: 18},
    {id: 3, name: 'Sale Item', price: 25},
    {id: 4, name: 'Popular Item', price: 40}
]

function agregarAlCarrito(producto) {
    let nombre = prompt('Indique su nombre')
    let stock = parseInt(prompt('Numero para stock'))
    let compra = parseInt(prompt('Unidades que quiere comprar'))
    if ((stock >= compra) && (compra > 0)){
        if (producto == 'Fancy Product'){
            carrito.push(productos[0])
        }
        else if (producto == 'Special Item'){
            carrito.push(productos[1])
        }
        else if (producto == 'Sale Item'){
            carrito.push(productos[2])
        }
        else if (producto == 'Popular Item'){
            carrito.push(productos[3])
        }
        console.log(nombre + ', gracias por comprar ' + compra + ' unidades de ' + producto)
        const carritoParaConsola = []
        for (const objetoEnCarrito of carrito){
            carritoParaConsola.push(objetoEnCarrito.name)
        }
        console.log('En su carrito: ' + carritoParaConsola)

        let precioDelCarrito = 0
        for (const precio of carrito){
            precioDelCarrito += (precio.price*compra)
        }
        console.log('El monto total de su compra es de: $' + precioDelCarrito)
    }
    else if (stock < compra){
        if (nombre != ('Fran' || 'fran' || 'Franco' || 'franco' || 'FRANCO' || 'FRAN')){
            console.log('No hay stock de ' + producto)
        }
        else {
            console.log('Para el tutor siempre hay stock')
        }
    }
}

/* 
fancyProduct[0].addEventListener('click', () => {agregarAlCarrito('Fancy Product')})
fancyProduct[1].addEventListener('click', () => {agregarAlCarrito('Fancy Product')})
specialItem[0].addEventListener('click', () => {agregarAlCarrito('Special Item')})
specialItem[1].addEventListener('click', () => {agregarAlCarrito('Special Item')})
saleItem[0].addEventListener('click', () => {agregarAlCarrito('Sale Item')})
saleItem[1].addEventListener('click', () => {agregarAlCarrito('Sale Item')})
popularItem[0].addEventListener('click', () => {agregarAlCarrito('Popular Item')})
popularItem[1].addEventListener('click', () => {agregarAlCarrito('Popular Item')})
*/

for (const boton1 of fancyProduct){
    boton1.addEventListener('click', () => {agregarAlCarrito('Fancy Product')})
}
for (const boton2 of specialItem){
    boton2.addEventListener('click', () => {agregarAlCarrito('Special Item')})
}
for (const boton3 of saleItem){
    boton3.addEventListener('click', () => {agregarAlCarrito('Sale Item')})
}
for (const boton4 of popularItem){
    boton4.addEventListener('click', () => {agregarAlCarrito('Popular Item')})
}


function eliminarDelCarrito(producto) {
    let i = carrito.indexOf(producto)
    if (i != -1) {carrito.splice(i, 1)}
}


/* for (const objetoEnCarrito of carrito){
    if (indexOf(objetoEnCarrito) === 0){
        console.log ('En su carrito: (' + objetoEnCarrito.name)
    }
    else if (indexOf(objetoEnCarrito) === carrito.length){
        console.log (objetoEnCarrito.name + ')')
    }
    else console.log(objetoEnCarrito.name)
} */