fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data => {
    console.log(data);
    cardsAHtml(data.products, containerHtml)
})


const containerHtml = document.querySelector(".container-html");
console.log(containerHtml);


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
                ${ element.description }
                </h4>
                
                <button class="button-fav" id="fav-${ element.id }">
                    Añadir a carrito
                </button>
            </div>
        `
    },"")

    contenedor.innerHTML = nodos 
}

// cardsAHtml(episodiosFavoritos, containerFavoritos)
// console.log(episodiosFavoritos)