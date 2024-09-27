var include_entradas = require("readline-sync");

var dividendos = [];
var pesos = [];
var divisor = 0;
var loop = true;
var subloop = true;

while (loop) {
  console.log("==================================");
  console.log(" Calculadoras de Medias          =");
  console.log("=                                =");
  console.log("= 1 - media aritmetica simples   =");
  console.log("= 2 - media aritmetica ponderada =");
  console.log("= 3 - sair                       =");
  console.log("==================================");
  var entrada = include_entradas.questionInt("Digite a opcao desejada: ");

  switch (entrada) {
    case 1:
      console.log("Media Aritmetica Simples\n");
      while (subloop) {
        entrada = null;
        entrada = include_entradas.question(
          "Digite o " +
            (divisor + 1) +
            "o numero ou o sinal de igual ( = ) para calcular o resultado da media\n"
        );

        if (entrada === "=") {
          if (divisor > 0) {
            subloop = false;
            loop = false;
            var resultado =
              dividendos.reduce((total, num) => total + num) / divisor;

            console.log("A média dos " + divisor + " numeros é:" + resultado);
          } else console.error("Digite ao menos um numero!");
        } else if (!isNaN(entrada)) {
          dividendos.push(parseFloat(entrada));
          divisor++;
        } else console.error("entrada inválida!");
      }
      break;
    case 2:
      console.log("Media Aritmetica Ponderada");
      while (subloop) {
        entrada = null;
        var entrada = include_entradas.question(
          "Digite o " +
            (divisor + 1) +
            "o numer ou o sinal de igual ( = ) para calcular o resultado da media: "
        );
        if (entrada === "=") {
          if (divisor > 0) {
            subloop = false;
            loop = false;
            var resultado =
              dividendos.reduce((total, num) => total + num) /
              pesos.reduce((total, num) => total + num);

            console.log("A média ponderada é: " + resultado);
          } else console.error("Digite ao menos um numero!");
        } else if (!isNaN(entrada)) {
          var aux = include_entradas.questionFloat(
            "Digite o peso do " + (divisor + 1) + "o numero: "
          );
          if (aux >= 0) {
            pesos.push(aux);
            dividendos.push(entrada * aux);
            divisor++;
          } else console.error("Peso inválido!");
        } else console.error("entrada inválida!");
      }

      break;
    case 3:
      console.log("Saindo...");
      loop = false;
      subloop = false;
      break;
    default:
      console.error("Opção inválida!");
      break;
  }
}
