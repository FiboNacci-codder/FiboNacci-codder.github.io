// Get the switch
const modoSwitch = document.getElementById('modoSwitch');
const navbar = document.querySelector('.navbar');

// Function to change mode
function cambiarModo() {
  if (modoSwitch.checked) {
    // Night mode (dark)
    document.body.classList.add('bg-dark', 'text-light');
    document.body.classList.remove('bg-light', 'text-dark');
    navbar.classList.add('navbar-dark', 'bg-dark');
    navbar.classList.remove('navbar-light', 'bg-light');
  } else {
    // Day mode (light)
    document.body.classList.add('bg-light', 'text-dark');
    document.body.classList.remove('bg-dark', 'text-light');
    navbar.classList.add('navbar-light', 'bg-light');
    navbar.classList.remove('navbar-dark', 'bg-dark');
  }
}

// Listen for changes on the switch
modoSwitch.addEventListener('change', cambiarModo);

// Set initial mode (dark by default)
cambiarModo();