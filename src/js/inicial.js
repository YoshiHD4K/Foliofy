document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Función para mostrar el formulario de Login
    const showLoginForm = () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        
        // Usar setTimeout para manejar la transición de opacidad
        registerForm.classList.add('hidden');
        setTimeout(() => {
            loginForm.style.display = 'block';
            loginForm.classList.remove('hidden');
            registerForm.style.display = 'none';
        }, 100); // Pequeña espera para ocultar el otro
    };

    // Función para mostrar el formulario de Registro
    const showRegisterForm = () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        
        loginForm.classList.add('hidden');
        setTimeout(() => {
            registerForm.style.display = 'block';
            registerForm.classList.remove('hidden');
            loginForm.style.display = 'none';
        }, 100);
    };

    // Asignar eventos a los botones
    loginTab.addEventListener('click', showLoginForm);
    registerTab.addEventListener('click', showRegisterForm);

    // Inicializar para asegurar que el Login se muestre por defecto
    showLoginForm();

    // Notas:
    // Aquí es donde se añadiría la lógica de validación de formularios
    // y la comunicación con el backend (API) usando fetch o AJAX.
    
    // Ejemplo de cómo manejar el submit (evitar el envío por defecto):
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Login intentado.');
        // Lógica de autenticación iría aquí
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Registro intentado.');
        // Lógica de registro iría aquí
    });
});