const containerHtml = document.querySelector(".container-html");
const containerCarrito = document.querySelector(".container-carrito")
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log(carrito);



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
                    Añadir al carrito
                </button>

                <button class="remove-carrito" id="rem-${element.id}">
                    Eliminar
                </button>
            </div>
        `
    },"")

    contenedor.innerHTML = nodos 
}

cardsAHtml(carrito, containerCarrito)




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

const requestCards = () =>{
    fetch(`https://dummyjson.com/products?limit=30&skip=${paginado}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        cardsAHtml(data.products, containerHtml)
        agregarAlCarrito(data.products)
        //remomverDeCarrito(data.products)
    })
    .catch(() =>console.log("ERROR EN LA REQUEST"))
}
requestCards()


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

const remomverDeCarrito = array => {
    const cardsRemove = document.querySelectorAll(".remove-carrito")
    console.log(cardsRemove);

    for(let i = 0; i < cardsRemove.length; i++);
        cardsRemove[i].onclick = (e) => {
        console.log("remove");
    }

}