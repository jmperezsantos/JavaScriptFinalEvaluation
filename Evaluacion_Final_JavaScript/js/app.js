
/**
 * Inicio Calculadora
 */
var Calculadora = (function () {

    //Se va guardando la operación que está teniendo efecto
    var memoryOperation;

    //Se guarda una referencia de la pantalla de la calculadora
    var display;

    //Aquí se guarda el primer operando mientras se realiza una operación
    var numMemoria;

    //Aquí se guarda el segundo operando luego de realizar una operación
    var numMemoria2;

    //Se guardan los dígitos que se van mostrando en la pantalla de la calculadora
    var numberToDisplay;


    //Se manda inicializar los componentes
    inicializar();

    function inicializar() {
        display = document.getElementById("display");
        showNumber("0");
        numMemoria = "";
        numMemoria2 = "";
        memoryOperation = "";
    }

    //Agregar una cifra al numero actual. Se invoca al pulsar un número
    function addNumber(number) {
        if (number == 0 && numberToDisplay == "0") {
            return;
        } else {
            if (numberToDisplay == "0") {
                showNumber(number.toString());
            } else {
                showNumber(numberToDisplay + number.toString());
            }
        }
    }

    //Cuenta los dígitos del número.
    function countDigits(txtNumero) {
        var count = 0;
        for (var i = 0; i < txtNumero.length; i++) {
            if (!isNaN(parseInt(txtNumero[i]))) {
                //Si el caracter es un dígito
                count++;
            }
        }
        return count;
    }

    //Reemplaza el número que esté en el display por el parámetro enviado
    function showNumber(numberToShow) {
        var textoNum = trunkTo8Digits(numberToShow);
        numberToDisplay = textoNum;
        display.innerHTML = numberToDisplay;
    }

    //"Corta" el número ingresado para que tenga 8 dígitos o menos.
    //      No se cuenta el punto (.) o el menos (-) como dígito
    function trunkTo8Digits(finalNumber) {

        var digits = 0;
        var remainingText = "";

        for (var i = 0; i < finalNumber.length; i++) {
            if (!isNaN(parseInt(finalNumber[i]))) {
                //Si el caracter es un dígito
                digits++;
                if (digits > 8) {
                    break;
                }
            }

            remainingText += finalNumber[i];

        }

        return remainingText;

    }

    //Suma
    function addOperation(num1, num2) {
        return num1 + num2;
    }

    //Resta
    function substractOperation(num1, num2) {
        return num1 - num2;
    }

    //División
    function divideOperation(num1, num2) {

        if (num2 == 0) {
            alert("no se puede dividir entre cero")

            return;
        }

        return num1 / num2;
    }

    //Multiplicación
    function multiplyOperation(num1, num2) {
        return num1 * num2;
    }

    //Raiz Cuadrada
    function raiz(num) {
        return Math.sqrt(num);
    }

    //Realiza la operación enviada por parámetro y la muestra en pantalla
    function calcularMostrar(operacion, num1, num2) {
        var result;

        if (operacion == "add") {
            result = addOperation(num1, num2);
        } else if (operacion == "substract") {
            result = substractOperation(num1, num2);
        } else if (operacion == "multiply") {
            result = multiplyOperation(num1, num2);
        } else if (operacion == "divide") {
            result = divideOperation(num1, num2);
        } else if (operacion == "raiz") {
            result = raiz(num1);
        }

        showNumber(result.toString());

    }

    return {
        
        /**
         * Para la tecla "ON"
         */
        pushOnKey: function () {
            showNumber("0");
        },

        /**
         * Para las teclas de número
         */
        pushNumberKey: function (numero) {
            addNumber(numero);
        },

        /**
         * Para las teclas de operaciones
         */
        pushOperationKey: function (operacion) {
            if (numberToDisplay != "") { //Puede estar vacío por pulsar dos veces seguidas teclas de operación
                numMemoria = parseFloat(numberToDisplay);
                showNumber("");
            }
            memoryOperation = operacion;
        },

        /**
         * Para la tecla "-" signo
         */
        PushSignKey: function () {
            var estaSigno = numberToDisplay[0] == "-";
            if (estaSigno) {
                showNumber(numberToDisplay.substring(1));
            } else {
                if (numberToDisplay != "0") {
                    showNumber("-" + numberToDisplay);
                }
            }
        },

        /**
         * Para la tecla "=" igual
         */
        pushResultKey: function () {
            if (numberToDisplay != "") { 
                //Esto ocurre al oprimir el igual después de una tecla de operación
                var resultado;
                var numActual = parseFloat(numberToDisplay);

                /**
                 * Operación Normal
                 */

                if (numMemoria != "") { 
                    // Si hay un primer operando en memoria
                    calcularMostrar(memoryOperation, numMemoria, numActual);
                    numMemoria = ""; 
                    numMemoria2 = numActual; 
                    
                    /**
                     * Repetir última operación
                     */
                } else if (numMemoria2 != "") { //Hay un segundo operando en memoria (operación reciente)
                    calcularMostrar(memoryOperation, numActual, numMemoria2);
                }
            }
        },

        /**
         * Para la tecla "." punto
         */
        pushPointKey: function () {
            //Si el número NO tiene punto y hay menos de 8 dígitos
            if (numberToDisplay.indexOf(".") == -1 && countDigits(numberToDisplay) < 8) {
                showNumber(numberToDisplay + ".");
            }
        }
        
    }
})();
/** FIN Calculadora */

/**
 * Teclas
 */
var keyOn = document.getElementById("on");
var keyAdd = document.getElementById("mas");
var keySubstract = document.getElementById("menos");
var keyMultiply = document.getElementById("por");
var keyDivide = document.getElementById("dividido");
var keyRaiz = document.getElementById("raiz")
var keySign = document.getElementById("sign");
var keypoint = document.getElementById("punto");
var keyResult = document.getElementById("igual");

var numberKeys = [];
for (var i = 0; i <= 9; i++) {
    numberKeys[i] = document.getElementById(i.toString());
}

var listaTeclas = [keyOn, keyAdd, keySubstract, keyMultiply, keyDivide,
    keyRaiz, keySign, keypoint, keyResult, numberKeys[0],
    numberKeys[1], numberKeys[2], numberKeys[3],
    numberKeys[4], numberKeys[5], numberKeys[6],
    numberKeys[7], numberKeys[8], numberKeys[9]];


/**
 * Animación teclas
 */

/**Pulsar tecla se anima para que se haga pequeña y parezca que se presiona
 */
function achicarTecla(tecla) {
    tecla.style.transform = "scale(0.95, 0.92)";
}

/**Soltar tecla se anima para que se haga grande y parezca que se suelta
 */
function soltarTecla(tecla) {
    tecla.style.transform = "";
}


/**Eventos mousedown para las teclas de la calculadora
 */

keyOn.addEventListener("mousedown", function (e) {
    Calculadora.pushOnKey();
    achicarTecla(e.target);
});

keyAdd.addEventListener("mousedown", function (e) {
    Calculadora.pushOperationKey("add");
    achicarTecla(e.target);
});

keySubstract.addEventListener("mousedown", function (e) {
    Calculadora.pushOperationKey("substract");
    achicarTecla(e.target);
});

keyMultiply.addEventListener("mousedown", function (e) {
    Calculadora.pushOperationKey("multiply");
    achicarTecla(e.target);
});

keyDivide.addEventListener("mousedown", function (e) {
    Calculadora.pushOperationKey("divide");
    achicarTecla(e.target);
});

keyRaiz.addEventListener("mousedown", function (e) {
    Calculadora.pushOperationKey("raiz");
    Calculadora.calcularMostrar("raiz", Calculadora.numMemoria, 0);
});

keySign.addEventListener("mousedown", function (e) {
    Calculadora.PushSignKey();
    achicarTecla(e.target);
});

keypoint.addEventListener("mousedown", function (e) {
    Calculadora.pushPointKey();
    achicarTecla(e.target);
});

keyResult.addEventListener("mousedown", function (e) {
    Calculadora.pushResultKey();
    achicarTecla(e.target);
});

for (var i = 0; i <= 9; i++) {
    numberKeys[i].addEventListener("mousedown", function (e) {
        Calculadora.pushNumberKey(e.target.id);
        achicarTecla(e.target);
    })
}

for (var i = 0; i < listaTeclas.length; i++) {
    listaTeclas[i].addEventListener("mouseup", function (e) {
        soltarTecla(e.target);
    });
    listaTeclas[i].addEventListener("mouseout", function (e) {
        soltarTecla(e.target);
    });
} 