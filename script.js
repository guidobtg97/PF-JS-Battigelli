let productos = [
    {id: 1, nombre: "Red Velvet", precio: 2750, imagen: "red-velvet.jpg", category: "Tortas"},
    {id: 2, nombre: "Chocotorta", precio: 2000, imagen: "chocotorta.jpg", category: "Tortas"},
    {id: 3, nombre: "Oreo", precio: 20000, imagen: "oreo.jpg", category: "Tortas"},
    {id: 4, nombre: "Tarta de frutillas", precio: 3000, imagen: "tarta-frutillas.jpg", category: "Tartas"},
    {id: 5, nombre: "Merengada", precio: 1500, imagen: "merengada.jpg", category: "Tartas"},
    {id: 6, nombre: "Brownie", precio: 1500, imagen: "brownie.jpg", category: "Tartas"},
    {id: 7, nombre: "Pastafrola", precio: 800, imagen: "pastafrola.jpg", category: "Tartas"},
    {id: 8, nombre: "Selva Negra", precio: 2500, imagen: "selva-negra.jpg", category: "Tortas"},
    {id: 9, nombre: "Pastel del Diablo", precio: 2250, imagen: "diablo.jpg", category: "Tortas"},
    {id: 10, nombre: "Frutos del Bosque", precio: 3000, imagen: "frutos-rojos.jpg", category: "Tortas"},
    {id: 11, nombre: "Cheesecake", precio: 2350, imagen: "cheesecake.jpg", category: "Tortas"},
    {id: 12, nombre: "Torta Balcarce", precio: 2500, imagen: "balcarce.jpg", category: "Tortas"}
];



/* FUNCIONES ARRAY DE PRODUCTOS Y RENDERIZADO */

function guardarProductosLS(productos){
    localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductosLS(){
    return JSON.parse(localStorage.getItem("productos")) || [];
}


/*fetch('productos.json')
.then((response) => response.json())
.then((data) => {

    let contenido = "";

    data.forEach((valor) => {
        contenido += `<div class="col-md-3">
        <div class="card" style="width: 18rem; height: 400px; margin: 20px 20px;">
        <img src="img/productos/${valor.imagen}" class="card-img-top" alt="${valor.nombre}" style="width: 100%; height: 60%;">
        <div class="card-body text-center">
          <h5 class="card-title">${valor.nombre}</h5>
          <p class="card-text">$${valor.precio}</p>
          <a href="#" class="btn" id="btn-render" onclick="agregarProducto(${valor.id})">Agregar</a>
        </div>
      </div>
      </div>`;
    });

    document.getElementById("productos").innerHTML = contenido;

})
*/

function renderProductos(){
    const productos = cargarProductosLS();
    let contenido = "";

    productos.forEach((producto) => {
        contenido += `<div class="col-md-3">
        <div class="card" style="width: 18rem; height: 400px; margin: 20px 20px;">
        <img src="img/productos/${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="width: 100%; height: 60%;">
        <div class="card-body text-center">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <a class="btn" id="btn-render" onclick="agregarProducto(${producto.id})">Agregar</a>
        </div>
      </div>
      </div>`;
    });

    document.getElementById("productos").innerHTML = contenido;

}

/* FUNCIONES DEL CARRITO */


function guardarProductosCarrito(productos){
    localStorage.setItem("productos_carrito", JSON.stringify(productos));
}

function cargarProductosCarrito(){
    return JSON.parse(localStorage.getItem("productos_carrito")) || [];
}

function buscarProducto(id){
    const productos = cargarProductosLS();

    return productos.find(item => item.id === id);
}

function agregarProducto(id){
    const productos_carrito = cargarProductosCarrito();
    let pos = productos_carrito.findIndex(item => item.id === id);
    if (pos > -1){
        productos_carrito[pos].cantidad += 1;
    }else {
        const producto = buscarProducto(id);
        producto.cantidad = 1;
        productos_carrito.push(producto);
    }
    
    guardarProductosCarrito(productos_carrito);
    renderProductosCarrito();
    actualizarBotonCarrito();
}

function eliminarProducto(id){
    const productos_carrito = cargarProductosCarrito();
    let pos = productos_carrito.findIndex(item => item.id === id);
    productos_carrito[pos].cantidad -= 1;

    if ( productos_carrito[pos].cantidad == 0){
        productos_carrito.splice(pos, 1);
    }
    
    guardarProductosCarrito(productos_carrito);
    renderProductosCarrito();
    actualizarBotonCarrito();
}

function eliminarItem(id){
    renderProductosCarrito();
    eliminarProducto(id);
    
}

function agregarItem(id){
    renderProductosCarrito();
    agregarProducto(id);
}


function actualizarBotonCarrito(){
    const productos_carrito = cargarProductosCarrito();

    let contenido = `<button type="button" class="btn position-relative">
    <img src="img/carrito.png" alt="Carrito" width="32px">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${totalProductos()}</span>
    </button>`;

    document.getElementById("boton_carrito").innerHTML = contenido;
}

function totalProductos() {
    const productos_carrito = cargarProductosCarrito();

    return productos_carrito.reduce((acumulador, prod) => acumulador  + prod.cantidad, 0)

}

function totalAPagar() {
    const productos_carrito = cargarProductosCarrito();

    return productos_carrito.reduce((acumulador, prod) => acumulador  + (prod.cantidad * prod.precio), 0)

}

/* PROCESAMIENTO DE FORMULARIOS */

let usuarios = [];

function guardarUsuarioLS(usuarios){
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function cargarUsuariosLS(){
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function procesarFormulario(){
    let proceso = document.getElementById("btn-register");
    proceso.addEventListener("click", procesarRegistro);  
}

function procesarRegistro() {

    const nuevo_usuario = cargarUsuariosLS();
    let nombre = document.getElementById("name").value;
    let apellido = document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    if (nombre.trim() === null  || nombre.trim() === "" || nombre.length < 2){
        mostrarError("Nombre")
        return false
    }

    if (apellido.trim() === null  || apellido.trim() === "" || apellido.length < 2){
        mostrarError("Apellido")
        return false
    }

    if (email.trim() === null  || email.trim() === ""){
        mostrarError("Email")
        return false
    }

    if (password.trim() === null  || password.trim() === "" || password.length < 8){
        mostrarError("Contraseña")
        return false
    }

    let usuario = {nombre: nombre, apellido: apellido, email: email, password: password};

    console.log(usuario.nombre);
    nuevo_usuario.push(usuario);
    guardarUsuarioLS(nuevo_usuario);

}

function procesarSesion(){
    let proceso = document.getElementById("login-btn");
    proceso.addEventListener("click", buscarUsuario);  
}

function buscarUsuario(){
    const productos = cargarUsuariosLS();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const busqueda = productos.find(usuario => usuario.email === email && usuario.password === password)

    
        if(busqueda == true){
            console.log("Iniciaste sesión correctamente")
        }else(
            console.log("No existe usuario con esos datos")
        )
   


}

/* SWEET ALERTS */

function mostrarEnvios(){
    Swal.fire(
        'Envios',
        'Se realizan envios todos los días a todo GBA y CABA. Precio a convenir según la zona.',
        'question'
      )   
}

function mostrarError(dato){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes completar el campo: ' + dato,
        timer: 5000
      })     
}




/* LLAMADO Y EJECUCIÓN DE FUNCIOONES */


guardarProductosLS(productos);
renderProductos();
actualizarBotonCarrito();

