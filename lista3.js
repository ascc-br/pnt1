//Lista 3
var require = require("readline-sync");

//questão 1
// var status = require.question("Digite o status do pedido: ");
// if (status === "pendente") {
//   console.log("O pedido está em andamento, aguarde");
// } else if (status === "preparando") {
//   console.log("Pedido em preparo");
// } else if (status === "pronto") {
//   console.log("Pedido pronto para retirada");
// } else if (status === "entregue") {
//   console.log("Pedido entregue com sucesso");
// } else {
//   console.log("Estado do pedido desconhecido");
// }

// // Questão 2

// var estoque = require.questionInt("Digite a quantidade em estoque: ");
// if (estoque > 0) {
//   console.log("Produto disponível para compra");
// } else if (estoque == 0) {
//   console.log("Produto esgotado");
// }
// // Questão 3
// var nota = require.question("Digite a nota do funcionário: ");
// if (nota >= 9) {
//   console.log("Excelente desempenho");
// } else if (nota >= 7 && nota <= 8.9) {
//   console.log("Bom desempenho");
// } else if (nota >= 5 && nota <= 6.9) {
//   console.log("Desempenho razoável");
// } else if (nota < 5) {
//   console.log("Desempenho insatisfatório");
// }

// //4
// var projeto = require.question("Digite a urgência: ");
// if (projeto === "urgente") {
//   console.log("Iniciar imediatamente");
// } else if (projeto === "importante") {
//   console.log("Programar para esta semana");
// } else if (projeto === "normal") {
//   console.log("Programar para o próximo mês");
// } else if (projeto === "baixa prioridade") {
//   console.log("Programar para o próximo trimestre");
// }

// //5
// var usuario = require.question("Digite a credencial: ");
// if (usuario === "admin") {
//   console.log("Acesso concedido como administrador");
// } else if (usuario === "funcionário") {
//   console.log("Acesso concedido como funcionário");
// } else {
//   console.log("Credenciais inválidas");
// }

// //6
// var usuario = require.questionInt("Digite a idade do usuário: ");
// if (usuario >= 18) {
//   console.log("Acesso total permitido");
// } else if (usuario < 18) {
//   console.log("Acesso restrito para maiores de 18 anos");
// }

//7
// var usuario = require.question("Digite os numeros do cartão de credito: ");
// switch (usuario[0] ) {
//   case '4':
//     console.log("Visa");
//   break;
//   case '5':
//     console.log("Mastercard");
//     break;
//   case '3':
//     console.log("American Express");
//     break;
//   default:
//     console.log("Bandeira desconhecida");
// }

//8
//8
// const status = ['aprovado', 'pendente', 'recusado', 'cancelado'];
// var status_sorteado = status[Math.floor(Math.random() * 4)]
// console.log(status_sorteado);
// switch (status_sorteado) {
//   case 'aprovado':
//     console.log("O pagamento foi aprovado com sucesso!");
//     break;
//   case 'pendente':
//     console.log("Aguardando confirmação do pagamento");
//     break;
//   case 'recusado':
//     console.log("Pagamento recusado!!!");
//     break;
//   case 'cancelado':
//     console.log("Pagamento cancelado pelo usuário");
//     break;
// }

//9
const veiculo = ["carro", "caminhão", "moto", 874654654];
var veiculo_sorteado = veiculo[Math.floor(Math.random() * 4)]; 
console.log(veiculo_sorteado);
switch (veiculo_sorteado) {
  case "carro":
    console.log("Categoria: veículo de passeio");
    break;
  case "caminhão":
    console.log("Categoria:  Veículo de carga");
    break;
  case "moto":
    console.log("Categoria: Motocicleta");
    break;
  default:
    console.log("Categoria desconhecida");
}

//10
var loop = true;
while (loop) {
  console.log("Métodos de pagamento: ");
  console.log("1 - cartão de crédito");
  console.log("2 - boleto bancário");
  console.log("3 - transferência");
  console.log("4 - cancelar pagamento");
  var metodo = require.question("Escolha a opcao: ");

  switch (metodo) {
    case "1":
      console.log("cartão de credito");
      loop = false;
      break;
    case "2":
      console.log("boleto bancário");
      loop = false;
      break;
    case "3":
      console.log("transferência bancária");
      loop = false;
      break;
    case "4":
      console.log("pagamento cancelado");
      loop = false;
      break;
    default:
      console.log(
        "Método de pagamento não suportado. Por favor, escolha outra opção.",
      );
  }
}
