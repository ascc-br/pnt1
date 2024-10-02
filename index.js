var require = require("readline-sync");

class Quarto {
  constructor(numero, tipo, diaria) {
    this.id = numero; //ID primaria
    this.tipo = tipo; //solteiro, duplo, suite
    this.diaria = diaria;
  }
}

class ManipulaQuartos {
  constructor() {
    this.listaQuartos = []; //vetor com lista de quartos
  }

  //retorna 'true' se o quarto for adicionado com sucesso, 'false' caso contrário
  addQuarto(tipo) {
    var diaria = 0;

    switch (tipo) {
      case "solteiro":
        diaria = 100;
        break;
      case "duplo":
        diaria = 150;
        break;
      case "suite":
        diaria = 200;
        break;
      default:
        console.erro("Tipo de quarto inválido");
        return false;
    }

    const quarto = new Quarto(this.listaQuartos.length + 1, tipo, diaria); //cria um novo quarto
    this.listaQuartos.push(quarto); //insere o quarto na lista de quartos
    return true;
  }

  contarQuartos() {
    var contagemSolteiro = 0;
    var contagemDuplo = 0;
    var contagemSuite = 0;

    this.listaQuartos.forEach(quarto => {
      if (quarto.tipo === "solteiro") {
        contagemSolteiro++;
      }
    });
    this.listaQuartos.forEach(quarto => {
      if (quarto.tipo === "duplo") {
        contagemDuplo++;
      }
    });
    this.listaQuartos.forEach(quarto => {
      if (quarto.tipo === "suite") {
        contagemSuite++;
      }
    });

    return [contagemSolteiro, contagemDuplo, contagemSuite]; //retorna vetor com as 3 contagens
  }
}

class Hospede {
  constructor(nome, endereco, telefone, cpf) {
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.cpf = cpf; //id primaria
  }
}

class Reserva {
  constructor(dataInicial, dataFinal, quarto, hospede) {
    this.dataInicial = dataInicial;
    this.dataFinal = dataFinal;
    this.quarto = quarto; //id estrangeira
    this.hospede = hospede; //id estrangeira
    this.idReserva = 0; //funcao baseada na data + id do quarto + id do hospede
  }
}

class ManipulaReservas {
  constructor () {
    this.listaUsuarios = []; //vetor com lista de usuarios
    this.listaReservas = []; //vetor com lista de reservas
  }

  //retorna 'true' se o usuario for adicionado com sucesso, 'false' caso contrario
  criaUsuario(nome, endereco, telefone, cpf) {
    if (this.listaUsuarios.find(usuario => usuario.cpf === cpf))
      return false;
    else {
    const usuario = new Hospede(nome, endereco, telefone, cpf);
    this.listaUsuarios.push(usuario);
    return true;
    }
    return false;
  }

  //ajeitar essa função
  checaDisponibilidade (dataInicial, dataFinal, quarto) {
    var disponivel = true;
    for (var i = 0; i < this.listaReservas.length; i++) {
      if (this.listaReservas[i].quarto === quarto) {
        if (this.listaReservas[i].dataInicial <= dataInicial && this.listaReservas[i].dataFinal >= dataFinal) {
          disponivel = false;
        }
      }
    }
    return disponivel;
  }

  //ajeitar essa função
  //retorna 'true' se a reserva for adicionada com sucesso, 'false' caso contrario
  criaReserva(dataInicial, dataFinal, quarto, hospede) {
    const reserva = new Reserva(dataInicial, dataFinal, quarto, hospede);
    this.listaReservas.push(reserva);
    return true;
  }
}

/** INTERFACE GRAFICA (FRONT) */
var loop1 = true;

const gerQuartos = new ManipulaQuartos();
while (loop1) {
  console.clear();
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

  switch (opcaoEscolhida) {
    case "1":
      console.clear();
      console.log(" =Cadastro de quartos= ");
      console.log("Selecione o tipo de quarto: ");
      console.log("1. Solteiro ");
      console.log("2. Duplo ");
      console.log("3. Suite ");
      opcaoEscolhida = require.question("Escolha a opcao desejada: ");

      switch (opcaoEscolhida) {
        case "1":
          console.log("Quarto solteiro selecionado");
          gerQuartos.addQuarto("solteiro");
          break;
        case "2":
          console.log("Quarto duplo selecionado");
          gerQuartos.addQuarto("duplo");
          break;
        case "3":
          console.log("Quarto suite selecionado");
          gerQuartos.addQuarto("suite");
          break;
        default:
          console.error("Tipo de quarto invalido!");
          require.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            require.close();
          });
      } //fim do menu 'cadastro de quartos'
      break;
    case "2":
      if(gerQuartos.listaQuartos.length == 0) {
        console.error("Nao eh possivel cadastrar hospedes sem quartos cadastrados!");
        require.question("Pressione Enter para continuar...", () => {
          // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
          require.close();
        });
      } else {
        // console.clear();
        // console.log(" =Cadastro de hospedes= ");
        // console.log("Informe os dados do hospede: ");
        // var nome = require.question("Nome: ");
        // var endereco = require.question("Endereco: ");
        // var telefone = require.question("Telefone: ");
        // var cpf = require.question("CPF: ");

        // var hospede = new Hospede(nome, endereco, telefone, cpf);
        console.log("Hospede cadastrado com sucesso!");
        require.question("Pressione Enter para continuar...", () => {
          // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
          require.close();
        });
      }
      
      break;
    case "4":
      var contagem = gerQuartos.contarQuartos();
      console.clear();
      console.log(" =Quartos cadastrados= ");
      console.log("Quartos solteiro: " + contagem[0]);
      console.log("Quartos duplo:    " + contagem[1]);
        console.log("Quartos suite:    " + contagem[2] + '\n');
      require.question("Pressione Enter para voltar ao Menu Principal...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        require.close();
      });
      break;
    case "6":
      console.log("SAINDO...");
      loop1 = false;
      break;
    default:
      console.error("OPCAO INDISPONIVEL!!!");
      require.question("Pressione Enter para continuar...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        require.close();
      });
  } //fim do menu 'principal'
} //fim do while principal