document.addEventListener("DOMContentLoaded", function () {
  const contador = document.getElementById("contador");
  const accion = document.getElementById("accion");
  const ciclos = document.querySelector(".ciclos");
  const buttonIniciar = document.querySelector(".button_start");
  const container = document.querySelector(".container");
  const audioBip = document.getElementById("audio");
  const audioBip2 = document.getElementById("audio2");
  const audioStop = document.getElementById("audio3");
  const audioIconActive = document.getElementById("volumeActive");
  const audioIconMute = document.getElementById("volumeMute");
  const buttonStop = document.getElementById("buttonStop");
  const buttonRestart = document.getElementById("buttonRestart");

  let estado = 1; // 1: inspirar, 2: aguantar, 3: exhalar
  let numero = 0;
  let totalSegundos = 0;
  const limiteSegundos = 5 * 60; // 5 minutos
  let contadorCiclos = 21;
  let temporizador = null;
  let sonido = false;

  buttonStop.addEventListener("click", () => {
    if (sonido) {
      audioStop.play();
    }

    contador.textContent = "¡Pausado!";
    accion.textContent = "";

    clearInterval(temporizador);
    buttonStop.classList.add("invisible");
    buttonRestart.classList.remove("invisible");
  });

  audioIconActive.addEventListener("click", () => {
    sonido = !sonido;
    audioIconActive.classList.add("invisible");
    audioIconMute.classList.remove("invisible");
  });

  audioIconMute.addEventListener("click", () => {
    sonido = !sonido;
    audioIconActive.classList.remove("invisible");
    audioIconMute.classList.add("invisible");
  });

  const reiniciarSistema = () => {
    buttonIniciar.classList.remove("button_start__hidden");
    contador.textContent = "";
    estado = 1; // 1: inspirar, 2: aguantar, 3: exhalar
    numero = 0;
    totalSegundos = 0;
    contadorCiclos = 21;
  };

  const hacerBip = () => {
    if (!sonido) {
      return;
    }
    if (estado === 1 && numero < 1) {
      audioBip.play();
    } else if (estado === 2 && numero < 1) {
      audioBip.play();
    } else if (estado === 3 && numero > 4) {
    }
  };

  const actualizarUI = () => {
    switch (estado) {
      case 1:
        accion.textContent = "Inspirar";
        container.style.backgroundColor = "#05C3D9";
        break;
      case 2:
        accion.textContent = "Aguantar";
        container.style.backgroundColor = "#53F011";
        break;
      case 3:
        accion.textContent = "Exhalar";
        container.style.backgroundColor = "yellow";
        break;
    }

    ciclos.textContent = `${contadorCiclos} ciclos pendientes`;
  };

  const actualizarContador = () => {
    contador.textContent = numero.toString();
  };

  const iniciarApp = () => {
    buttonIniciar.classList.add("invisible");
    buttonStop.classList.remove("invisible");
    actualizarUI();
    hacerBip();

    temporizador = setInterval(() => {
      if (estado === 3) {
        if (numero === "") {
          numero = 5;
        }

        numero--;
      } else {
        numero++;
      }

      totalSegundos++;

      if (estado === 1 && numero > 4) {
        estado++;
        numero = "";
        actualizarUI();
      } else if (estado === 2 && numero > 4) {
        estado = 3;
        numero = "";
        actualizarUI();
        if (sonido) {
          audioBip.play();
        }
      } else if (estado === 3 && numero < 1) {
        estado = 1;
        numero = "";
        contadorCiclos--;
        actualizarUI();
      }

      actualizarContador();
      hacerBip();

      if (contadorCiclos === 0) {
        clearInterval(temporizador);
        contador.textContent = "¡Hecho!";
        accion.textContent = "Completo";
        reiniciarSistema();
        buttonStop.classList.add("invisible");
        buttonRestart.classList.remove("invisible");
      }
    }, 1000);
  };

  buttonIniciar.addEventListener("click", iniciarApp);
  buttonRestart.addEventListener("click", () => {
    buttonRestart.classList.add("invisible");
    buttonStop.classList.remove("invisible");
    contador.textContent = numero.toString();
    iniciarApp();
  });
});
