var isUpdate = false;
var id = null;

var nombreInput, precioInput, stockInput, contenedorCards;

const deleteProduct = async (id) =>{
    const response = await fetch(`http://localhost:3000/api/v1/` + id,{
            method : "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    if(response.status == 204){
        alert("Producto eliminado correctamente")
        getDataApi();
    }else{
        if(response.ok){
            const respuesta = await response.json();
            alert(respuesta.message || "Ocurrio un error al intentar eliminar")
        }else{
            alert("Ocurrio un problema al comunicarse con el servidor. Intente de nuevo más tarde")
        }
    }
}

window.editProduct = (producto) => {
    isUpdate = true;
    id = producto.id;
    nombreInput.value = producto.nombre;
    precioInput.value = producto.precio;
    stockInput.value = producto.stock;
}

document.addEventListener("DOMContentLoaded", () => {

    contenedorCards = document.getElementById('contenedor-cards');
    const formulario = document.getElementById('formulario');
    nombreInput = document.getElementById('nombre-input');
    precioInput = document.getElementById('precio-input');
    stockInput = document.getElementById('stock-input');
    const btnLimpiar = document.getElementById('boton'); // Cambiado a 'boton'

    btnLimpiar.addEventListener("click", ()=>{
        formulario.reset()
        isUpdate = false
        id = null;
    })

    const getDataApi = async () => {
            const response = await fetch('http://localhost:3000/api/v1');
            if (response.ok) {
                const productos = await response.json();
                contenedorCards.innerHTML = '';
                productos.map(producto => {
                    contenedorCards.innerHTML += `
                    <li class="w-5/12 md:w-3/12 lg:w-2/10 p-3 rounded shadow-lg hover:bg-amber-100 hover:shadow-xl hover:scale-105 transition ease-in-out duration-300">
                    <h3 class="font-bold">${producto.nombre}</h3>
                    <div class="flex justify-between items-center">
                    <p class="flex-1">Precio:</p>
                    <span class="block text-green-500 text-sm mb-2">$${producto.precio}</span>
                    </div>
                    <p class="block text-sm text-gray-500 mb-2">${producto.stock}</p>
                    <div class="flex justify-between">

                    <button onclick='editProduct(${JSON.stringify(producto)})'
                    class="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200">
                    <i class="bi bi-pencil-square"></i> Editar
                    </button>

                    <button onclick="deleteProduct(${producto.id})"
                    class="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-800 transition duration-300">
                    <i class="bi bi-x-square-fill"></i> Eliminar
                    </button>
                    </div>
                    </li>`;
                });
            } else {
                alert("Ocurrió un problema al obtener los datos de la API");
            }
    };

    const createProduct = async (e) =>{
        e.preventDefault();
        const nombre = nombreInput.value;
        const precio = precioInput.value;
        const stock = stockInput.value;
        const nuevoProducto = {nombre, precio, stock};
    
        if(!isUpdate){
            const response = await fetch('http://localhost:3000/api/v1',{
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoProducto)
            });
            if(response.status == 201){
                alert("Producto creado correctamente")
                formulario.reset();
                getDataApi();
            }else{
                alert("Ocurrio un problema al agregar el producto")
            }
        }else{
            const response = await fetch(`http://localhost:3000/api/v1/${id}`,{
                method : "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoProducto)
            });
            if (response.ok){
                alert("Producto actualizado correctamente")
                formulario.reset();
                isUpdate = false;
                id = null;
                getDataApi();
            }else{
                alert("Ocurrio un problema al actualizar el producto")
            }
        }
    }
    formulario.addEventListener("submit", createProduct);
    getDataApi();
});