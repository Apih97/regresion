var order=2, n=9;

loadSample([[0,0,1,2,0,1,2,2,1],[0,2,2,4,4,6,6,2,1],[14,21,11,12,23,23,14,6,11]]); //carga valores de ejemplo en la matriz

function crearTabla(rows, cols) {
  var esp = document.querySelector(".datainput");
  if (esp.firstChild) esp.removeChild(esp.firstChild);

  var tabla = document.createElement("table");

  for (var i = 0; i <= rows; i++) {
    var fila = document.createElement("tr");
    for (var j = 0; j <= cols; j++) {
      var celda = document.createElement("td");
      if (i==0) {
        if (j>0)
          celda.innerHTML = (j==cols ? "Y":"X<sub>" + j +"</sub>");
      }
      else
        celda.innerHTML = (j==0 ? "<sub>" + i + "</sub>": "<input>");
      fila.append(celda);
    }
    tabla.append(fila);
  }

  esp.append(tabla);
}

document.querySelector("#order").addEventListener("input", function(e) { //agrega manejador de evento cuando cambia el numero en recuadro
  order = +e.target.value;
  crearTabla(n,order+1);
});

document.querySelector("#n").addEventListener("input", function(e) {  //agrega manejador de evento cuando cambia el numero en recuadro
  n = +e.target.value;
  crearTabla(n,order+1);
});


function loadSample(sample) {
  var cols = sample.length;
  var rows = sample[0].length;
  crearTabla(rows,cols);
  
  var elementos = document.querySelectorAll("table input");
  
  for (var i=0; i<cols; i++)
    for (var j=0; j<rows; j++)
      elementos[i+cols*j].value = sample[i][j];
}

document.querySelector("button").addEventListener("click", function() {
  var data = [];
  
  var elementos = document.querySelectorAll("table input");

  for (var i = 0; i < elementos.length; i++) { //leer valores input y los inserta en data ordenadamente
    var v = +elementos[i].value;
    if (i <= order) {
      data.push([]);  //ingresar en una dimension                            
      data[i].push(v);  //ingresar en otra dimension
    }
    else
      data[i%(order+1)].push(v);
  }

  var reg = regresion(data);
  
  var results = document.querySelector("#results");
  var txt = "<h1>Resultados</h1>Ecuación: " + equation(reg[0]) + "<br>";
  txt += "Error estándar: " + reg[1].toFixed(3) + "<br>";   //tofixed deja (n) decimales en este caso 3
  txt += "R cuadrado: " + reg[2].toFixed(3);
  results.innerHTML = txt;
});

function equation(coefs) {
  return coefs.reduce(function(str,coef,i) {
    str += (coef > 0 ? "+ ":"- ") + Math.abs(coef.toFixed(3)) + " ";
    if (i>0) str += "X<sub>" + i + "</sub> ";
    return str;
  },"")
}
