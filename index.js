var require = require("readline-sync");

class Quarto {
  constructor(numero, tipo, diaria) {
    this.id = numero; //ID primaria
    this.tipo = tipo; //solteiro, duplo, suite
    this.diaria = diaria;
  }
}

class ManipulaQuartos {
  constructor(andares) {
    this.listaQuartos = []; //vetor de vetores com lista de quartos por andar

    for (let i = 0; i < andares; i++) {
      this.listaQuartos[i] = [];
    }
  }

  //retorna 'true' se o quarto for adicionado com sucesso, 'false' caso contrário
  addQuarto(tipo, andar) {
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
        //console.error("Tipo de quarto inválido");
        return false;
    }

    const quarto = new Quarto(
      (andar - 1) * 100 + this.listaQuartos[andar - 1].length + 1,
      tipo,
      diaria
    ); //cria um novo quarto

    this.listaQuartos[andar - 1].push(quarto); //insere o quarto na lista de quartos

    return true;
  }

  contarQuartos() {
    var contagemSolteiro = 0;
    var contagemDuplo = 0;
    var contagemSuite = 0;

    this.listaQuartos.forEach((piso) => {
      piso.forEach((quarto) => {
        if (quarto.tipo === "solteiro") contagemSolteiro++;
        else if (quarto.tipo === "duplo") contagemDuplo++;
        else if (quarto.tipo === "suite") contagemSuite++;
      });
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
  constructor(dataInicial, dataFinal, idQuarto, cpfHospede) {
    this.dataInicial = dataInicial;
    this.dataFinal = dataFinal;
    this.idQuarto = idQuarto; //id estrangeira
    this.idHospede = cpfHospede; //id estrangeira
    this.idReserva = this.idGenerator(dataInicial, idQuarto);
  }

  //Função pra gerar uma id unica da reserva baseada na data inicial e no numeor do quarto
  idGenerator(dataInicial, quarto) {
    let [dd, mm, aa] = dataInicial.toLocaleDateString().split("/");
    return aa + mm + dd + quarto.toString().padStart(4, "0");
  }
}

class ManipulaReservas {
  constructor() {
    this.listaUsuarios = []; //vetor com lista de usuarios
    this.listaReservas = []; //vetor com lista de reservas
  }

  //retorna 'true' se o usuario for adicionado com sucesso, 'false' caso contrario
  criaUsuario(nome, endereco, telefone, cpf) {
    if (this.listaUsuarios.find((usuario) => usuario.cpf === cpf)) return false;
    else {
      const usuario = new Hospede(nome, endereco, telefone, cpf);
      this.listaUsuarios.push(usuario);
      return true;
    }
    return false;
  }

  checaDisponibilidade(dataInicial, dataFinal, quarto) {
    var disponivel = true;
    for (var i = 0; i < this.listaReservas.length; i++) {
      if (this.listaReservas[i].quarto === quarto) {
        if (
          this.listaReservas[i].dataInicial <= dataInicial &&
          this.listaReservas[i].dataFinal >= dataFinal
        ) {
          disponivel = false;
        }
      }
    }
    return disponivel;
  }

  listarQuartosDisponiveis(dataInicial, dataFinal, listaDeQuartos) {
    var vetorQuartosDisponiveis = [];

    // Percorre cada andar
    if (listaDeQuartos != undefined) {
      listaDeQuartos.forEach((andar) => {
        // Percorre cada quarto dentro do andar
        andar.forEach((quarto) => {
          if (this.checaDisponibilidade(dataInicial, dataFinal, quarto.id)) {
            vetorQuartosDisponiveis.push(quarto);
          }
        });
      });
      console.log(vetorQuartosDisponiveis);
      return vetorQuartosDisponiveis;
    } else return null;
  }

  //retorna 'true' se a reserva for adicionada com sucesso, 'false' caso contrario
  criaReserva(dataInicial, dataFinal, quarto, hospede) {
    if (!this.checaDisponibilidade(dataInicial, dataFinal, quarto)) {
      return false;
    } else {
      const reserva = new Reserva(dataInicial, dataFinal, quarto, hospede);
      this.listaReservas.push(reserva);
      return true;
    }
  }
}

// FUNÇÕES DO FRONT
function isValidAndFuture(stringData, today) {
  let dateParts = stringData.split("/");

  // Ensure the input has 3 parts (DD/MM/YYYY)
  if (dateParts.length !== 3) {
    return false; // If input doesn't have exactly 3 parts, it's invalid
  }

  let [dia, mes, ano] = dateParts;

  // Create the date object (YYYY-MM-DD format)
  let dateObj = new Date(`${ano}-${mes}-${dia}`);

  // Check if the date is valid and in the future
  return dateObj instanceof Date && !isNaN(dateObj.getTime()) && dateObj > today;
}

function dateIso(date) {
  let [dia, mes, ano] = date.split("/");

  // Pad dia and mes with '0' if they are a single digit
  dia = dia.padStart(2, "0");
  mes = mes.padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

/** INTERFACE GRAFICA (FRONT) */

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

var lacoAndares = true;
while (lacoAndares) {
  var auxAndares = require.question("Quantos pisos tem o hotel? (contando com o terreo):\n");
  if (auxAndares < 1 || isNaN(auxAndares)) {
    console.error("Digite um valor valido!");
  } else lacoAndares = false;
}

const andares = auxAndares;
const gerQuartos = new ManipulaQuartos(andares);
const gerReservas = new ManipulaReservas();

var loop1 = true;
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

  /** Hierarquia de Menus:
   * 1. Fazer Reserva
   *  1.1 Quartos disponíveis na data (quantidade por tipo e ids)
   *  1.2 Reservar quarto em data (usando CPF e cadastrando caso novo hospede)
   * 2. Registros do Sistema
   *  2.1 Listar quartos cadastrados
   *  2.2 Listar hospedes cadastrados
   *  2.3 Listar reservas
   * 3. Alterar Registros
   *  3.1 Cadastrar novo quarto
   *  3.2 Deletar registro de quarto
   *  3.3 Deletar registro de hospede
   *  3.4 Deletar registro de reserva
   * 4. Sair
   */
  console.log(" =Menu de opcoes= ");
  console.log("1. Fazer Reserva");
  console.log("2. Registros do Sistema");
  console.log("3. Alterar Registros");
  console.log("4. Sair");
  var opcaoEscolhida = require.question("Escolha a opcao desejada: ");

  switch (opcaoEscolhida) {
    case "1":
      let [solteiro, duplo, suite] = gerQuartos.contarQuartos();
      if (solteiro + duplo + suite == 0) {
        console.error("Nao eh possivel criar reservas sem quartos cadastrados!");
        require.question("Pressione Enter para continuar...", () => {
          // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
          require.close();
        });
      } else {
        console.clear();
        console.log(" =Fazer Reservaa= ");
        let dataIniInput = "DD/MM/AAAA";
        let dataFinInput = "DD/MM/AAAA";
        let hoje = new Date();
        while (!isValidAndFuture(dataIniInput, hoje)) {
          dataIniInput = require.question("Data de entrada DD/MM/AAAA: ");
          if (!isValidAndFuture(dataIniInput, hoje))
            console.error(
              "Data invalida! Favor insira data posterior a:\n" + hoje + "\ne no formato DD/MM/AAAA"
            );
        }

        let dataInicial = new Date(dateIso(dataIniInput) + "T14:00:00");
        while (!isValidAndFuture(dataFinInput, dataInicial)) {
          dataFinInput = require.question("Data de saida DD/MM/AAAA: ");
          if (!isValidAndFuture(dataFinInput, dataInicial))
            console.error(
              "Data invalida! Favor insira data posterior a:\n" +
                dataInicial +
                "\ne no formato DD/MM/AAAA"
            );
        }
        let dataFinal = new Date(dateIso(dataFinInput) + "T10:00:00");

        var quartosDisponiveis = gerReservas.listarQuartosDisponiveis(
          dataInicial,
          dataFinal,
          gerQuartos.listaQuartos
        );

        if (quartosDisponiveis == null) {
          console.error("Nao ha quartos disponiveis nessa data!");
          require.question("Pressione Enter para voltar ao menu principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            require.close();
          });
        } else {
          let lacoReserva = true;
          while (lacoReserva) {
            console.clear();
            console.log(" =Fazer Reserva (" + dataIniInput + " ~ " + dataFinInput + ")");
            console.log("1. Quartos disponiveis na data");
            console.log("2. Reservar quarto na data");
            console.log("3. Voltar ao Menu principal");
            var opcaoReserva = require.question("Escolha a opcao desejada: ");

            switch (opcaoReserva) {
              case "1":
                console.clear();
                console.log(" =Quartos disponiveis (" + dataIniInput + " ~ " + dataFinInput + ")");
                console.log("Quartos disponiveis:");
                quartosDisponiveis.forEach((quarto) => {
                  console.log(" #" + quarto.id + " (" + quarto.tipo + ")");
                });
                require.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  require.close();
                });
                break;
              case "2":
                console.log("Informe os dados do hospede: ");
                var cpf = require.question("CPF: ");
                if (gerReservas.listaUsuarios.find((usuario) => usuario.cpf === cpf))
                  console.log("Hospede já cadastrado no sistema!");
                else {
                  var nome = require.question("Nome: ");
                  var endereco = require.question("Endereco: ");
                  var telefone = require.question("Telefone: ");
                  var msgErro = gerReservas.criaUsuario(nome, endereco, telefone, cpf);
                  if (msgErro) console.log("Hospede cadastrado com sucesso!");
                  else console.log("CPF já cadastrado no sistema!");
                }
                var quartoEscolhido = require.questionInt("Numero do quarto: ");
                if (quartosDisponiveis.find((quarto) => quarto.id === quartoEscolhido)) {
                  if (gerReservas.criaReserva(dataInicial, dataFinal, quartoEscolhido, cpf)) {
                    console.log("Reserva realizada com sucesso!");
                    lacoReserva = false;
                  } else console.error("A reserva nao foi efetuada!");
                } else console.error("Quarto indisponivel!");
                require.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  require.close();
                });
                break;
              case "3":
                lacoReserva = false;
                break;
              default:
                console.error("Opcao invalida!");
                require.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  require.close();
                });
                break;
            } //fim do switch
          } //fim do laço
        } //fim do else o qual há quartos disponíveis
      } //fim do else o qual acontece o case '1'
      break;
    case "2":
      console.clear();
      console.log(" =Registros do Sistema= ");
      console.log("1. Listar quartos");
      console.log("2. Listar hospedes cadastrados");
      console.log("3. Listar reservas");
      var contagem = gerQuartos.contarQuartos();
      console.clear();
      console.log(" =Quartos cadastrados= ");
      console.log(gerQuartos.listaQuartos);
      console.log(" =Hospedes cadastrados= ");
      console.log(gerReservas.listaUsuarios);
      console.log(" =Reservas cadastradas= ");
      console.log(gerReservas.listaReservas);
      // console.log(" =Quartos cadastrados= ");
      // console.log("Quartos solteiro: " + contagem[0]);
      // console.log("Quartos duplo:    " + contagem[1]);
      // console.log("Quartos suite:    " + contagem[2] + "\n");
      require.question("Pressione Enter para voltar ao Menu Principal...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        require.close();
      });
      break;
    case "3":
      console.clear();
      console.log(" =Alterar Registros= ");
      console.log("1. Cadastrar novo quarto");
      console.log("2. Deletar registro de quarto"); //possiveis bugs com iD dos quartos
      console.log("3. Deletar registro de hospede");
      console.log("4. Deletar registro de reserva");
      var opcaoAlteracao = require.question("Escolha a opcao desejada: ");
      switch (opcaoAlteracao) {
        case "1":
          console.clear();
          console.log(" =Cadastro de quartos= ");

          var andar = require.questionInt("Digite o piso do quarto a ser cadastrado: ");
          if (andar > andares || andar < 1) {
            console.error("Andar inexistente!");
          } else {
            console.log("Selecione o tipo de quarto: ");
            console.log("1. Solteiro ");
            console.log("2. Duplo ");
            console.log("3. Suite ");
            opcaoEscolhida = require.question("Escolha a opcao desejada: ");

            switch (opcaoEscolhida) {
              case "1":
                console.log("Quarto solteiro selecionado");
                gerQuartos.addQuarto("solteiro", andar);
                break;
              case "2":
                console.log("Quarto duplo selecionado");
                gerQuartos.addQuarto("duplo", andar);
                break;
              case "3":
                console.log("Quarto suite selecionado");
                gerQuartos.addQuarto("suite", andar);
                break;
              default:
                console.error("Opcao invalida!");
            } //fim do menu 'cadastro de quartos'
          }
          require.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            require.close();
          });
      }
      break;
    case "4":
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
