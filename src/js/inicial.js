// js/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Función para mostrar el formulario de Login
    const showLoginForm = () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        
        // Ocultar registro y mostrar login con transición
        registerForm.classList.add('hidden');
        setTimeout(() => {
            loginForm.style.display = 'block';
            loginForm.classList.remove('hidden');
            registerForm.style.display = 'none';
        }, 300); // Coincide con la duración de la transición en CSS
    };

    // Función para mostrar el formulario de Registro
    const showRegisterForm = () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        
        // Ocultar login y mostrar registro con transición
        loginForm.classList.add('hidden');
        setTimeout(() => {
            registerForm.style.display = 'block';
            registerForm.classList.remove('hidden');
            loginForm.style.display = 'none';
        }, 300); // Coincide con la duración de la transición en CSS
    };

    // Asignar eventos a los botones
    loginTab.addEventListener('click', showLoginForm);
    registerTab.addEventListener('click', showRegisterForm);

    // Asegurarse de que el formulario de Login esté activo al cargar
    showLoginForm();

    // --- Aquí iría la lógica de validación y envío de formularios ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Intento de inicio de sesión...');
        // Por ejemplo: enviar datos a un API con fetch()
        alert('Inicio de sesión simulado. Abre la consola para ver el log.');
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Intento de registro...');
        // Por ejemplo: enviar datos a un API con fetch()
        alert('Registro simulado. Abre la consola para ver el log.');
    });
});