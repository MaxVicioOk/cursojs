function agregarAlCarrito(producto) {
    let precio = ''
    const nombre = prompt('Indique su nombre')
    let stock = parseInt(prompt('Numero para stock'))
    let compra = parseInt(prompt('Unidades que quiere comprar'))

    if ((stock > compra) && (compra > 0)){
        console.log(nombre + ', gracias por comprar ' + compra + ' unidades de ' + producto)
    }
    else if (stock < compra){
        if (nombre != ('Fran' || 'fran' || 'Franco' || 'franco' || 'FRANCO' || 'FRAN')){
            console.log('No hay stock de ' + producto)
        }
        else {
            console.log('Para el tutor siempre hay stock')
        }
    }

    switch (producto) {
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
    console.log('El monto total de su compra es de $' + compra*precio)}
}