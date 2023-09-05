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
                    <img class="imagenes" src=${element.images[0]}  alt=${element.name}>
                </figure>

                <h4>
                    ${element.description}
                </h4>
                <button class="button-carrito" id="car-${element.id}">
                    <i class="fa-solid fa-cart-arrow-down fa-xl"></i>
                </button>

                <button class="remove-carrito" id="rem-${element.id}">
                    <i class="fa-solid fa-xmark fa-xl"></i>
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
        removerDelCarrito(carrito)
        //ordenarAZ(data.products)
        //ordenarZA(data.products)
        ordenarCards(data.products)
    })
    .catch((error) =>console.log(error))
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
            console.log(buscarDato);
            carrito.push(buscarDato);
            localStorage.setItem("carrito", JSON.stringify(carrito))
            cardsAHtml(carrito, containerCarrito)
        }
    }
}

//REMOVER DEL CARRITO
const removerDelCarrito = array => {
    const cardsRemove = document.querySelectorAll(".remove-carrito")
    console.log(cardsRemove);

    for(let i = 0; i < cardsRemove.length; i++){
        cardsRemove[i].onclick = (e) => {
            console.log("remove");
            const id = e.target.id.slice(4)
            const carritoModificado = array.filter(element => element.id !== Number(id))
            console.log(carritoModificado);
            // carrito.push(carritoModificado);
            localStorage.setItem("carrito",JSON.stringify(carritoModificado));
            cardsAHtml(carritoModificado, containerCarrito)
        }
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
    Toastify({
        className: "toastOsc",
        backgroundColor: " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 13%, rgba(0,212,255,1) 100%)",
        text: "Dark Mode switched",
        duration: 2000,
        onClick: () => {console.log("MODO OSCURO")}
    }).showToast();
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
        Swal.fire("Please enter a valid e-mail", "", "error")
        event.preventDefault();
        return;

    } else if(inputNombre.value.length < 3) {
        Swal.fire("Please enter a First Name with more than 2 characters", "", "error")
        event.preventDefault();
        return;

    } else if (inputApellido.value.length < 3) {
        Swal.fire("Please enter a Last Name with more than 2 characters", "", "error")
        event.preventDefault();
        return;

    } else if (inputTelefono.value.length < 8) {
        Swal.fire("Please enter a valid phone number", "", "error")
        e.preventDefault();
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

    Swal.fire("Submitted Form.", "¡Check your email for exclusive offers!", "success")
})




//SWIPER
const swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});



//ORDENAR A-Z / Z-A
const botonOrdenarAZ = document.querySelector('#ordenar-az');
const botonOrdenarZA = document.querySelector('#ordenar-za');
const selectorOrden = document.querySelector("#selectorOrden")

const ordenarCards = array =>{
    document.addEventListener("change", (e)=>{
        console.log(e.target.value);

        if (e.target.value === "default") {
            cardsAHtml(array, containerHtml);

        } else if (e.target.value === "az"){
            cardsOrdenadasAz = array.sort(function(a, b) {
                let orden = a.title.localeCompare(b.title);
                //console.log(array);
                return orden
            });
            cardsAHtml(cardsOrdenadasAz, containerHtml)

        } else if (e.target.value === "za"){
            cardsOrdenadasZa = array.sort(function(a, b) {
                let orden = b.title.localeCompare(a.title);
                //console.log(array);
                return orden
            });
            cardsAHtml(cardsOrdenadasZa, containerHtml)
        }
    })

}


//ORDENAR AZ DOS BOTONES
// const ordenarAZ = array =>{
//     botonOrdenarAZ.addEventListener("click", () =>{
        
//         cardsOrdenadas = array.sort(function(a, b) {
//             let prueba = a.title.localeCompare(b.title);
//             //console.log(array);
//             return prueba
//         });
//         cardsAHtml(cardsOrdenadas, containerHtml)
//     })
// }

// const ordenarZA = array =>{
//     botonOrdenarZA.addEventListener("click", () =>{
        
//         cardsOrdenadas = array.sort(function(a, b) {
//             let prueba = b.title.localeCompare(a.title);
//             //console.log(array);
//             return prueba
//         });
//         cardsAHtml(cardsOrdenadas, containerHtml)
//     })
// }
//----------------------------------------------------------------------


//Swal.fire("Titulo", "subtitulo", "warning")

{/* <figure class"container-card">
<img class="imagenes" src=${element.images[0]}  alt=${element.name}>
</figure> */}