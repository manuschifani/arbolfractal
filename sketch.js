// Variables globales
let trees = []; // Array para almacenar los árboles generados

function setup() {
  // Crear un lienzo que ocupe toda la ventana
  createCanvas(windowWidth, windowHeight);
  // Fondo inicial
  background(240);
}

function draw() {
  // Limpiar el fondo en cada frame
  background(240);
  
  // Dibujar todos los árboles almacenados
  for (let tree of trees) {
    drawTree(tree.x, tree.y, tree.length, tree.angle, tree.depth);
  }
}

// Función para dibujar un árbol fractal recursivamente
function drawTree(x, y, len, angle, depth) {
  // Configurar el trazo
  stroke(70, 40, 20);
  strokeWeight(len * 0.1);
  
  // Calcular la posición final de esta rama
  let endX = x + len * sin(angle);
  let endY = y - len * cos(angle);
  
  // Dibujar la línea (rama)
  line(x, y, endX, endY);
  
  // Condición de parada para la recursión
  if (depth > 0) {
    // Color de las hojas para las ramas más pequeñas
    if (depth < 3) {
      stroke(0, 150 + random(50), 0, 150);
      strokeWeight(depth);
    }
    
    // Ángulo de ramificación con algo de aleatoriedad
    let angleVariation = random(0.3, 0.7);
    
    // Longitud de las ramas hijas (más cortas que la rama padre)
    let newLen = len * 0.67;
    
    // Recursión para las ramas izquierda y derecha
    drawTree(endX, endY, newLen, angle - PI/6 - angleVariation, depth - 1);
    drawTree(endX, endY, newLen, angle + PI/6 + angleVariation, depth - 1);
    
    // Añadir una rama central con probabilidad del 40%
    if (random() < 0.4) {
      drawTree(endX, endY, newLen * 0.8, angle, depth - 1);
    }
  }
}

// Función que se ejecuta cuando se hace clic en el lienzo
function mousePressed() {
  // Crear un nuevo árbol en la posición del clic
  let newTree = {
    x: mouseX,
    y: mouseY,
    length: random(80, 120), // Longitud inicial aleatoria
    angle: -PI/2, // Ángulo inicial (hacia arriba)
    depth: floor(random(6, 10)) // Profundidad aleatoria
  };
  
  // Añadir el árbol al array
  trees.push(newTree);
  
  // Limitar el número de árboles para mantener el rendimiento
  if (trees.length > 5) {
    trees.shift(); // Eliminar el árbol más antiguo
  }
  
  // Evitar comportamientos predeterminados del navegador
  return false;
}

// Ajustar el tamaño del lienzo cuando cambia el tamaño de la ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(240);
}