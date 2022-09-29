
function renderProductosCarrito(){
  const productos = cargarProductosCarrito();
  let contenido = "";


    if (productos.lenght = 0){
      contenido += `<div class="empty-cart">hola</div>`;  
    }else {
      productos.forEach((producto) => {
        
        contenido += 
        `
        <div class="col-md-3">
        <div class="card" style="width: 18rem; height: 400px; margin: 20px 20px;">
        <img src="img/productos/${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="width: 100%; height: 60%;">
        <div class="card-body text-center">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.precio} (${producto.precio * producto.cantidad})</p>
          <button class="btn" id="btn-render" onclick="agregarItem(${producto.id})">Agregar</button>
          <button class="btn" id="btn-render">${producto.cantidad}</button>
          <button class="btn" id="btn-render" onclick="eliminarItem(${producto.id})">Quitar</button>
        </div>
      </div>
      </div>
      `;
    });
  
      contenido += `<div class="ticket-compra">
      <table>
        <tr>
          <td><b>Total a pagar</b></td>
          <td id="total-price">: $${totalAPagar()}</td>
          <button class="btn" id="btn-render" onclick="cuponPago()">Pagar</button>  
        </tr>
      </table>
      </div>
    `
    }
    document.getElementById("productos").innerHTML = contenido;
}

function cuponPago(){
  Swal.fire({
    title: '¡Gracias por tu compra!',
    text: 'En breve enviaremos los datos de facturación a tú correo.',
    imageUrl: 'https://res.cloudinary.com/da2dft2hn/image/upload/v1664492394/logo_usi2wx.png',
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })
}


renderProductosCarrito(); 

actualizarBotonCarrito();