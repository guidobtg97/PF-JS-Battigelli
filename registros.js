

function mostrarError(dato){
    Swal.fire({
        icon: 'error',
        title: '¡Intenta de nuevo!',
        text: 'Dato erróneo: ' + dato,
        timer: 5000
      })     
}

function registroExitoso(dato){
    Swal.fire(
        'Bienvenidx ' + dato.nombre,
        'Te registraste exitosamente y ya podes iniciar sesión',
        'success'
      )
}

function registroFallido(){
    Swal.fire({
        icon: 'error',
        title: '¡Intenta de nuevo!',
        text: 'Ya existe una cuenta con esos datos',
        timer: 5000
      })   
}

function sesionFallida(dato){
    Swal.fire({
        icon: 'error',
        title: '¡Intenta de nuevo!',
        text: 'Email o contraseña equivocados.',
        timer: 5000
      })     
}

function sesionExitosa(dato){
    Swal.fire(
        'Bienvenidx ' + dato.nombre,
        'Iniciaste sesión correctamente. Seras redireccionado al carrito',
        'success'
      )
}


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

    const busqueda = nuevo_usuario.find(usuario => usuario.email === email);

    if (busqueda === undefined){
        let usuario = {nombre: nombre, apellido: apellido, email: email, password: password};
        nuevo_usuario.push(usuario);
        guardarUsuarioLS(nuevo_usuario);
        registroExitoso(usuario);
        setTimeout(() => {
            location.href='https://guidobtg97.github.io/PF-JS-Battigelli/login.html'
        }, 5000);
    
    }else {
        registroFallido()
    }

   
}



function procesarSesion(){
    let proceso = document.getElementById("login-btn");
    proceso.addEventListener("click", buscarUsuario);  
}

function buscarUsuario(){
    const usuarios = cargarUsuariosLS();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const busqueda = usuarios.find(usuario => usuario.email === email && usuario.password === password)

    if (busqueda === undefined){
        sesionFallida()
        return false
    }else if(busqueda.email === email && busqueda.password === password){
        sesionExitosa(busqueda)
        setTimeout(() => {
            location.href='https://guidobtg97.github.io/PF-JS-Battigelli/tienda.html'
        }, 5000);
    }
}


