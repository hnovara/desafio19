document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const productName = document.getElementById('productName').value;

    try {
        const productos = await buscarProducto(productName);
        mostrarResultados(productos);
    } catch (error) {
        mostrarError(error);
    }
});

async function buscarProducto(productName) {
    const response = await fetch(`url_de_tu_api/productos?nombre=${encodeURIComponent(productName)}`);
// Asegúrate de reemplazar 'url_de_tu_api/productos?nombre=' con la URL real de tu API donde se buscarán los productos. 
if (!response.ok) {
        throw new Error('No se pudo completar la solicitud');
    }
    return response.json();
}

function mostrarResultados(productos) {
    const searchResults = document.getElementById('searchResults');

    if (productos.length > 0) {
        const listaProductos = document.createElement('ul');
        productos.forEach(function(producto) {
            const listItem = document.createElement('li');
            listItem.textContent = `${producto.nombre} - Precio: ${producto.precio}`;
            listaProductos.appendChild(listItem);
        });
        searchResults.innerHTML = '';
        searchResults.appendChild(listaProductos);
    } else {
        searchResults.innerHTML = 'No se encontraron productos';
    }
}

function mostrarError(error) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `Error: ${error.message}`;
}
