function renderProductosCarrito(){
  const productos = cargarProductosCarrito();
  let contenido = "";

  productos.forEach((producto) => {

      

      contenido += `<div class="col-md-3">
      <div class="card" style="width: 18rem; height: 400px; margin: 20px 20px;">
      <img src="img/productos/${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="width: 100%; height: 60%;">
      <div class="card-body text-center">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <a href="#" class="btn" id="btn-render" onclick="agregarProducto(${producto.id})">Agregar</a>
        <a href="#" class="btn" id="btn-render" onclick="quitarProducto(${producto.id})">Quitar</a>
      </div>
    </div>
    </div>`;
  });

  document.getElementById("productos").innerHTML = contenido;

}

renderProductosCarrito();

actualizarBotonCarrito();