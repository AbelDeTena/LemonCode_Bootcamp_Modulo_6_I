// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
  {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
  {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];

//1 CREACION DE LOS ELEMENTOS EN EL DOM

//1º Se crea una lista con un h2 y se vincula al DIV "carrito"

var list = document.createElement("ol");
var title = document.createElement("h2");
title.textContent = "Carrito de la compra";
title.setAttribute("class", "titulo");
list.setAttribute("class", "box");
list.appendChild(title);
document.getElementById("carrito").appendChild(list);
// 2º Se crea un Fragment para evitar reflow
var fragment = document.createDocumentFragment();
//3ª Se recorre la array creando todos los elementos.
//En este caso, tendremos los (li), de la lista que hemos creado previamente.
//Y cada uno de esos (li) estara formado por un (input) y un (label).
products.forEach((product) => {
  //Crea el (li)
  var list = document.createElement("li");
  //crea el (input)
  var input = document.createElement("input");
  input.setAttribute("id", product.description);
  input.setAttribute("name", "calculo"); //para vincular el input al label
  input.setAttribute("type", "number");
  input.setAttribute("min", product.units); // cantidad minima posible.
  input.setAttribute("max", product.stock); //cantidad máxima posible, limitado por el stock.
  input.setAttribute("class", "input");
  input.value = product.units; //valor inicial
  input.addEventListener("change", habilitar); //OBJETIVO EXTRA
  //crea el (label)
  var name = product.description; //primer elemento del label
  var price = product.price; //segundo elemento del label
  var etiqueta = document.createElement("label");
  etiqueta.setAttribute("for", "calculo"); //para vincular el input al label
  etiqueta.textContent = `${name}-${price}€/ud.`; //contenido del label
  //se enlazan
  list.appendChild(etiqueta);
  list.appendChild(input);
  fragment.appendChild(list);
});
//Se añade todo el contenido dinámico al DOM
list.appendChild(fragment);

//2 CALCULOS

//Objetivo Extra. Sirve para habilitar y deshabilitar el botón de calcular.
function habilitar() {
  var productos = 0;
  products.forEach((product) => {
    var units = () => document.getElementById(product.description).value;
    productos += units();
    if (productos <= 0) {
      document.getElementById("calcular").disabled = true;
    } else {
      document.getElementById("calcular").disabled = false;
    }
  });
}
habilitar(); //deshabilita el boton al cargar.

//Llama a todas las funciones de calculos al clickar.
document.getElementById("calcular").addEventListener("click", calculos); //Calcular los resultados
//Calcula todos los datos de salida
function calculos() {
  subtotalizador();
  calcularIVA();
  totalizador();
}
//calcula el subtotal
function subtotalizador() {
  var totalizado = 0;
  products.forEach((product) => {
    var input = () => document.getElementById(product.description).value;
    totalizado += product.price * input();
  });
  document.getElementById("subtotal").textContent =
    totalizado.toFixed(2) + "€.";
  return totalizado;
}
//calcula el IVA
function calcularIVA() {
  var totalIVA = 0;
  products.forEach((product) => {
    var input = () => document.getElementById(product.description).value;
    totalIVA += (input() * product.price * product.tax) / 100;
  });
  document.getElementById("iva").textContent = totalIVA.toFixed(2) + "€.";
  return totalIVA;
}
//calcula el total
function totalizador() {
  var totale = calcularIVA() + subtotalizador();
  document.getElementById("total").textContent = totale.toFixed(2) + "€.";
  return totale;
}
