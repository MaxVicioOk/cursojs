const carrito = []
let precioDelCarrito = 0
/* const fancyProduct = {id: 1, name: 'Fancy Product', price: 80}
const specialItem = {id: 2, name: 'Special Item', price: 18}
const saleItem = {id: 3, name: 'Sale Item', price: 25}
const popularItem = {id: 4, name: 'Popular Item', price: 40} */

function agregarAlCarrito(producto) {
    let precio = ''
    const nombre = prompt('Indique su nombre')
    let stock = parseInt(prompt('Numero para stock'))
    let compra = parseInt(prompt('Unidades que quiere comprar'))

    if ((stock > compra) && (compra > 0)){
        if (producto == 'Fancy Product'){
            carrito.push({id: 1, name: 'Fancy Product', price: 80})
        }
        else if (producto == 'Special Item'){
            carrito.push({id: 2, name: 'Special Item', price: 18})
        }
        else if (producto == 'Sale Item'){
            carrito.push({id: 3, name: 'Sale Item', price: 25})
        }
        else if (producto == 'Popular Item'){
            carrito.push({id: 4, name: 'Popular Item', price: 40})
        }
        console.log(nombre + ', gracias por comprar ' + compra + ' unidades de ' + producto)
        const carritoParaConsola = []
        for (const objetoEnCarrito of carrito){
                carritoParaConsola.push(objetoEnCarrito.name)
        }
        console.log(carritoParaConsola)
            for (const precio of carrito){
            precioDelCarrito += precio.price*compra
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
/*     switch (producto) {
        case 'Fancy Product': 
            precio = 80;
            break;
        case 'Special Item':
            precio = 18;
            break;
        case 'Sale Item':
            precio = 25;
            break;
        case 'Popular Item':
            precio = 40;
            break;
            default: precio = 0;
            break;
    }
    if (((stock > compra) && (compra > 0)) || (nombre == ('Fran' || 'fran' || 'Franco' || 'franco' || 'FRANCO' || 'FRAN'))){
    console.log('El monto total por el producto es de $' + compra*precio)}
} */

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