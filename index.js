document.addEventListener("DOMContentLoaded", () => {
    const contenedorCards = document.getElementById('contenedor-cards');
    

    const getDataApi = async () => {
        // Fetch conect with the route that it use
        const response = await fetch('http://localhost:3000/api/v1')
        if (response.ok){
            // Extract all the data 
            const productos = await response.json();
            contenedorCards.innerHTML='';
            // Map is to search all the elememts in productos
            productos.map(producto=>{
                contenedorCards.innerHTML += `
                <li class="w-5/12 md:w-3/12 lg:w-2/10 p-3 rounded shadow-lg hover:bg-amber-100 hover:shadow-xl hover:scale-105 transition ease-in-out duration-300">
                <h3 class="font-bold">${producto.nombre}</h3>
                <div class="flex justify-between items-center">
                <p class="flex-1">Precio:</p>
                <span class="block text-green-500 text-sm mb-2">$${producto.precio}</span>
                </div>
                <p class="block text-sm text-gray-500 mb-2">${producto.stock}</p>
                <div class="flex justify-between">

                <button 
                class="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200">
                <i class="bi bi-pencil-square"></i> Editar
                </button>

                <button onclick="deleteProduct(${producto.id})"
                class="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-800 transition duration-300">
                <i class="bi bi-x-square-fill"></i> Eliminar
                </button>
                </div>
                </li>`
            });
        }
    }
    getDataApi();
})

const deleteProduct = async (id) =>{
    const responde = await fetch(`http://localhost:3000/api/v1/` + id,{
            method : "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            //* body: JSON.stringify({saludo: "hola"})
        });
    if(responde.status == 204){
        alert("Producto eliminado correctamente")
    }else{
        if(response.ok){
            const respuesta = await response.json();
            alert(respuesta.message || "Ocurrio un error al intentar eliminar")
        }else{
            alert("Ocurrio un problema al comunicarse con el servidor. Intente de nuevo más tarde")
        }
    }

}