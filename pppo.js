document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.getElementById('carrito');
    const elementos1 = document.getElementById('lista-1');
    const lista = document.querySelector('#lista-carrito tbody');
    const vaciarcarritobtn = document.getElementById('vaciar-carrito');

    cargarEventListeners();

    function cargarEventListeners() {
        elementos1.addEventListener('click', comprarElemento);
        carrito.addEventListener('click', eliminarElemento);
        vaciarcarritobtn.addEventListener('click', vaciarCarrito);
    }

    function comprarElemento(e) {
        e.preventDefault();

        if (e.target.classList.contains('agregar-carrito')) {
            const elemento = e.target.parentElement;
            leerDatosElementos(elemento);
            animarImagenHaciaCarrito(elemento.querySelector('img'));
        }
    }

    function leerDatosElementos(elemento) {
        const infoElemento = {
            imagen: elemento.querySelector('img').src,
            titulo: elemento.querySelector('h3').textContent,
            precio: elemento.querySelector('.precio').textContent,
            id: elemento.querySelector('.agregar-carrito').getAttribute('data-id'),
        };

        insertarCarrito(infoElemento);
    }

    function insertarCarrito(elemento) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${elemento.imagen}" width="100" />
            </td>
            <td>
                ${elemento.titulo}
            </td>
            <td>
                ${elemento.precio}
            </td>
            <td>
                <a href="#" class="borrar" data-id="${elemento.id}">X</a>
            </td>
        `;

        lista.appendChild(row);
    }

    function eliminarElemento(e) {
        e.preventDefault();
        let elemento, elementotoid;
        if (e.target.classList.contains('borrar')) {
            e.target.parentElement.parentElement.remove();
            elemento = e.target.parentElement.parentElement;
            elementotoid = elemento.querySelector('a').getAttribute('data-id');
        }
    }

    function vaciarCarrito() {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        return false;
    }

    function animarImagenHaciaCarrito(imagen) {
        const imagenClonada = imagen.cloneNode(true);
        document.body.appendChild(imagenClonada);

        const rectImagen = imagen.getBoundingClientRect();
        const rectCarrito = carrito.getBoundingClientRect();

        const topOffset = rectCarrito.top - rectImagen.top;
        const leftOffset = rectCarrito.left - rectImagen.left;

        imagenClonada.style.position = 'fixed';
        imagenClonada.style.top = `${rectImagen.top}px`;
        imagenClonada.style.left = `${rectImagen.left}px`;
        imagenClonada.style.transition = 'transform 0.5s ease-out';

        setTimeout(() => {
            imagenClonada.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;
        }, 10);

        setTimeout(() => {
            document.body.removeChild(imagenClonada);
        }, 500);
    }
});
