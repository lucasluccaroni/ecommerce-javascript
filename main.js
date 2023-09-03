const containerHtml = document.querySelector(".container-html");
const containerCarrito = document.querySelector(".container-carrito")
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


console.log(carrito);


//CARDS DINAMICAS
const cardsAHtml = (array, contenedor) => {
    const nodos = array.reduce(( acc, element ) => {
        return acc + `
            <div class="card">
                <h2>
                    ${ element.title}
                </h2>
                <h3>
                    Price: $${ element.price }
                </h3>
                
                <figure class"container-card">
                    <img class="imagenes" src=${element.images[0]}  alt=${element.name}
                </figure>
                
                <h4>
                    ${element.description}
                </h4>
                <button class="button-carrito" id="car-${element.id}">
                    Add to cart
                </button>

                <button class="remove-carrito" id="rem-${element.id}">
                    Remove
                </button>
            </div>
        `
    },"")

    contenedor.innerHTML = nodos 
}

cardsAHtml(carrito, containerCarrito)



//PAGINADO DE LOS PRODUCTOS
let paginado = 0;
document.querySelector("#prev").onclick = () =>{
    console.log("click");
    if (paginado !== 0) {
        paginado = paginado - 30
        requestCards()
    }
}

document.querySelector("#next").onclick = () =>{
    console.log("click");
    if (paginado < 90) {
        paginado = paginado + 30
        requestCards()
    }
}


//FETCH DE API PRODUCTOS
const requestCards = () =>{
    fetch(`https://dummyjson.com/products?limit=30&skip=${paginado}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        cardsAHtml(data.products, containerHtml)
        agregarAlCarrito(data.products)

    })
    .catch(() =>console.log("ERROR EN LA REQUEST"))
}
requestCards()



//AGREGAR AL CARRITO
const agregarAlCarrito = array =>{
    const cards = document.querySelectorAll(".button-carrito");

    for (let i = 0; i < cards.length; i++){
        cards[i].onclick = (e) => {
            console.log("me hacen click");
            const id = e.target.id.slice(4)
            const buscarDato = array.find(element => element.id === Number(id))

            carrito.push(buscarDato);
            localStorage.setItem("carrito", JSON.stringify(carrito))
            cardsAHtml(carrito, containerCarrito)
        }
    }
}

//REMOVER DEL CARRITO
const remomverDeCarrito = array => {
    const cardsRemove = document.querySelectorAll(".remove-carrito")
    console.log(cardsRemove);

    for(let i = 0; i < cardsRemove.length; i++);
        cardsRemove[i].onclick = (e) => {
        console.log("remove");
        
        const id = e.target.id.slice(4)
        const buscarDato = array.filter(element => element.id === Number(id))
        console.log(buscarDato);
    }

}


//MODO OSCURO
const botonModoOscuro = document.querySelector('#boton-modo-oscuro');
const body = document.querySelector('body');

const modoPreferido = localStorage.getItem('modo-oscuro');
if (modoPreferido === 'true') {
  body.classList.add('modo-oscuro');
}

botonModoOscuro.addEventListener('click', () => {
    // Cambiar el modo de la página
    body.classList.toggle('modo-oscuro');
    const modoOscuroActivado = body.classList.contains('modo-oscuro');
    localStorage.setItem('modo-oscuro', modoOscuroActivado);
});



//FORM
let formulario = document.querySelector("form");
let inputNombre = document.querySelector("#input-nombre");
let inputApellido = document.querySelector("#input-apellido");
let inputTelefono = document.querySelector("#input-telefono");
let inputCorreo = document.querySelector("#input-correo")

const contacto = JSON.parse(localStorage.getItem("contacto")) || [];

formulario.addEventListener("submit", (event)=> {
    event.preventDefault();
    console.log("formulario enviado");
    

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputCorreo.value);
    if (!emailValido) {
        alert('Por favor ingresa un email válido');
        event.preventDefault();
        return;
    }

    if (inputNombre.value.length < 3) {
        alert('Por favor ingresa un nombre con más de 2 caracteres');
        event.preventDefault();
        return;
    }

    if (inputApellido.value.length < 3) {
        alert('Por favor ingresa un Apellido con más de 2 caracteres');
        event.preventDefault();
        return;
    }

    contacto.push({
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        telefono: inputTelefono.value,
        correo: inputCorreo.value,
    })
    console.log(contacto);

    localStorage.setItem("contacto", JSON.stringify(contacto));
    formulario.reset();
})




//SWIPER
const swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});



//ORDENAR A-Z / Z-A
// const botonOrdenarAZ = document.querySelector('#ordenar-az');
// const botonOrdenarZA = document.querySelector('#ordenar-za');


// const ordenarAz = array =>{
    
//     botonOrdenarAZ.addEventListener("click", ()=>{
//         productos.sort((a, b) => a.nombre.localeCompare(b.nombre));


//     })


// }


// function ordenarProductosZA() {
//     productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
//     mostrarProductos();
// }
