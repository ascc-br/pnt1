var require = require("readline-sync");

class Quarto {
  constructor (numero, tipo, diaria) {
    this.id = numero; //ID primaria
    this.tipo = tipo; //solteiro, duplo, suite
    this.diaria = diaria;
  }
}

class ManipulaQuartos {
  constructor () {
    this.listaQuartos = []; //vetor com lista de quartos
  }

  //retorna 'true' se o quarto for adicionado com sucesso, 'false' caso contrário
  addQuarto(tipo) { 
  var diaria = 0;

  switch (tipo) {
      case 'solteiro':
        diaria = 100;
        break;
      case 'duplo':
        diaria = 150;
        break;
      case 'suite':
        diaria = 200;
        break;
      default:
        console.erro('Tipo de quarto inválido');
        return false;
    }

    const quarto = new Quarto(this.listaQuartos.length + 1, tipo, diaria); //cria um novo quarto
    this.listaQuartos.push(quarto); //insere o quarto na lista de quartos
    return true;
  }
}

class Hospede {
  constructor (nome, endereco, telefone, cpf) {
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.cpf = cpf; //id primaria
  }
}

class Reserva {
  constructor (dataInicial, dataFinal, quarto, hospede) {
    this.dataInicial = dataInicial;
    this.dataFinal = dataFinal;
    this.quarto = quarto; //id estrangeira
    this.hospede = hospede;  //id estrangeira
    this.idReserva = 0; //funcao baseada na data + id do quarto + id do hospede
  }
}




const { error } = require("console");
/** INTERFACE GRAFICA (FRONT) */
var loop1 = true;

const gerQuartos = new ManipulaQuartos;
while (loop1) {

  console.log("                 _ _.-'`-._ _");
  console.log("                ;.'________'.;");
  console.log("     _________n.[____________].n_________");
  console.log("    |LI LI LI LI||LI||LI||LI||LI LI LI LI|");
  console.log("    |.. .. .. ..||..||..||..||.. .. .. ..|");
  console.log("    |LI LI LI LI||LI||LI||LI||LI LI LI LI|");
  console.log("    |.. .. .. ..||..||..||..||.. .. .. ..|");
  console.log("    |LI LI LI LI||LI||LI||LI||LI LI LI LI|");
  console.log(" ,,;;,;;;,;;;,;;;,;;;,;;;,;;;,;;,;;;,;;;,;;,,");
  console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n");

  console.log(" =Menu de opcoes= ");
  console.log("1. Cadastro de quartos");
  console.log("2. Cadastro de hospedes");
  console.log("3. Registro de reservas");
  console.log("4. Listagem de quartos, hospedes e reservas");
  console.log("5. Atualizacao e exclusao de regitros");
  console.log("6. sair");
  var opcaoEscolhida = require.question("Escolha a opcao desejada: ");

  if (opcaoEscolhida == 1) {
    console.log(" =Cadastro de quartos= ");
    console.log("Selecione o tipo de quarto: ");
    console.log("1. Solteiro ");
    console.log("2. Duplo ");
    console.log("3. Suite ");
    opcaoEscolhida = require.question("Escolha a opcao desejada: ");

    if (opcaoEscolhida == 1) {
      console.log("Quarto solteiro selecionado");
      gerQuartos.addQuarto('solteiro');
    }
  } else if (opcaoEscolhida == 6){ //else do primeiro menu
    console.log("SAINDO...");
    loop1 = false;
  } else { //else do primeiro menu
    console.log("opcao indisponivel");
  }

  console.clear();
}
