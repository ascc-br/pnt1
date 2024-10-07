// index.js
const readline = require("readline-sync");

// Import classes and functions from hotel.js
const {
  ManipulaQuartos,
  ManipulaReservas,
  isValidAndFuture,
  dateIso,
  dataProxReserva,
} = require("./hotel");

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
  var auxAndares = readline.question("Quantos pisos tem o hotel? (contando com o terreo):\n");
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

  /** Mapa de Menus:
   * 1. Fazer Reserva
   *  1.1 Quartos disponíveis na data
   *  1.2 Reservar quarto em data (usando CPF e cadastrando caso novo hospede)
   *  1.3 Voltar ao menu principal
   * 2. Registros do Sistema
   *  2.1 Listar reservas por CPF
   *  2.2 Listar quartos cadastrados
   *  2.3 Listar hospedes cadastrados
   *  2.4 Listar reservas cadastradas
   * 3. Alterar Registros
   *  3.1 Cadastrar novo quarto
   *   3.1.1 solteiro
   *   3.1.2 duplo
   *   3.1.3 suite
   *  3.2 Alterar registro de quarto
   *   3.2.1 Solteiro
   *   3.2.2 duplo
   *   3.2.3 suite
   *   3.2.4 DESATIVADO
   *  3.3 Deletar registro de hospede
   *  3.4 Deletar registro de reserva
   * 4. Sair
   */
  console.log(" =Menu de opcoes= ");
  console.log("1. Fazer Reserva");
  console.log("2. Registros do Sistema");
  console.log("3. Adicionar/Remover Registros");
  console.log("4. Sair");
  var opcaoEscolhida = readline.question("Escolha a opcao desejada: ");

  switch (opcaoEscolhida) {
    case "1":
      let [solteiro, duplo, suite] = gerQuartos.contarQuartos();
      if (solteiro + duplo + suite == 0) {
        console.error("Nao eh possivel criar reservas sem quartos cadastrados!");
        readline.question("Pressione Enter para continuar...", () => {
          // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
          readline.close();
        });
      } else {
        console.clear();
        console.log(" =Fazer Reservaa= ");
        let dataIniInput = "DD/MM/AAAA";
        let dataFinInput = "DD/MM/AAAA";
        let hoje = dataProxReserva(new Date());
        while (!isValidAndFuture(dataIniInput, hoje)) {
          dataIniInput = readline.question("Data de entrada DD/MM/AAAA: ");
          if (!isValidAndFuture(dataIniInput, hoje))
            console.error(
              "Data invalida! Favor insira data posterior a: \n" +
                hoje.toDateString() +
                " e no formato DD/MM/AAAA.\n"
            );
        }

        let dataInicial = new Date(dateIso(dataIniInput) + "T17:00:00Z"); //17h UTC == 14h GMT-3 (checkin)
        while (!isValidAndFuture(dataFinInput, dataInicial)) {
          dataFinInput = readline.question("Data de saida DD/MM/AAAA: ");
          if (!isValidAndFuture(dataFinInput, dataInicial))
            console.error(
              "Data invalida! Favor insira data posterior a: \n" +
                dataInicial.toDateString() +
                " e no formato DD/MM/AAAA.\n"
            );
        }
        let dataFinal = new Date(dateIso(dataFinInput) + "T15:00:00Z"); //15h UTC == 12h GMT-3 (checkout)

        let quartosDisponiveis = gerReservas.listarQuartosDisponiveis(
          dataInicial,
          dataFinal,
          gerQuartos.listaQuartos
        );

        if (quartosDisponiveis.length < 1) {
          console.error("Nao ha quartos disponiveis nessa data!");
          readline.question("Pressione Enter para voltar ao menu principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
        } else {
          let lacoReserva = true;
          while (lacoReserva) {
            console.clear();
            console.log(" =Fazer Reserva (" + dataIniInput + " ~ " + dataFinInput + ")=");
            console.log("1. Quartos disponiveis na data");
            console.log("2. Reservar quarto na data");
            console.log("3. Voltar ao Menu Principal");
            var opcaoReserva = readline.question("Escolha a opcao desejada: ");

            switch (opcaoReserva) {
              case "1":
                console.clear();
                console.log(" =Quartos disponiveis (" + dataIniInput + " ~ " + dataFinInput + ")");
                console.log("Quartos disponiveis:");
                quartosDisponiveis.forEach((quarto) => {
                  console.log(" #" + quarto.id + " (" + quarto.tipo + ")");
                });
                readline.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  readline.close();
                });
                break;
              case "2":
                console.log("Informe os dados do hospede: ");
                var cpf = readline.questionInt("CPF: ");
                if (gerReservas.listaUsuarios.find((usuario) => usuario.id === cpf))
                  console.log("Hospede já cadastrado no sistema!");
                else {
                  var nome = readline.question("Nome: ");
                  var endereco = readline.question("Endereco: ");
                  var telefone = readline.question("Telefone: ");
                  var msgErro = gerReservas.criaUsuario(nome, endereco, telefone, cpf);
                  if (msgErro) console.log("Hospede cadastrado com sucesso!");
                  else console.log("CPF já cadastrado no sistema!");
                }
                var quartoEscolhido = readline.questionInt("Numero do quarto: ");
                if (quartosDisponiveis.find((quarto) => quarto.id === quartoEscolhido)) {
                  if (gerReservas.criaReserva(dataInicial, dataFinal, quartoEscolhido, cpf)) {
                    console.log("Reserva realizada com sucesso!");
                    lacoReserva = false;
                  } else console.error("A reserva nao foi efetuada!");
                } else console.error("Quarto indisponivel!");
                readline.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  readline.close();
                });
                break;
              case "3":
                lacoReserva = false;
                break;
              default:
                console.error("Opcao invalida!");
                readline.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  readline.close();
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
      readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        readline.close();
      });
      break;
    case "3":
      console.clear();
      console.log(" =Adicionar/Remover Registros= ");
      console.log("1. Cadastrar novo quarto");
      console.log("2. Remover registro de quarto"); //possiveis bugs com iD dos quartos
      console.log("3. Remover registro de hospede");
      console.log("4. Remover registro de reserva");
      var opcaoAlteracao = readline.question("Escolha a opcao desejada: ");
      switch (opcaoAlteracao) {
        case "1":
          console.clear();
          console.log(" =Cadastro de quartos= ");

          var andar = readline.questionInt("Digite o piso do quarto a ser cadastrado: ");
          if (andar > andares || andar < 1) {
            console.error("Andar inexistente!");
          } else {
            console.log("Selecione o tipo de quarto: ");
            console.log("1. Solteiro ");
            console.log("2. Duplo ");
            console.log("3. Suite ");
            opcaoEscolhida = readline.question("Escolha a opcao desejada: ");

            switch (opcaoEscolhida) {
              case "1":
                console.log("Quarto solteiro cadastrado!");
                gerQuartos.addQuarto("solteiro", andar);
                break;
              case "2":
                console.log("Quarto duplo cadastrado!");
                gerQuartos.addQuarto("duplo", andar);
                break;
              case "3":
                console.log("Quarto suite cadastrado!");
                gerQuartos.addQuarto("suite", andar);
                break;
              default:
                console.error("Opcao invalida!");
            } //menu 'cadastro de quartos'
          } //else "andar inexistente"
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
          break; //fim do case '1': Cadastrar novo quarto
        case "3":
          let aux_cpf = readline.questionInt("Informe o CPF do hospede: ");
          if (gerReservas.removeUsuario(aux_cpf)) console.log("Hospede removido com sucesso!");
          else console.error("CPF nao cadastrado!");
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
          break; //fim do case '3': Remover registro de hospede
        case "4":
          let aux_id = readline.questionInt("Informe o ID da reserva: ");
          if (gerReservas.removeReserva(aux_id)) console.log("Reserva removida com sucesso!");
          else console.error("ID de reserva nao cadastrado!");
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
          break; //fim do case '4': Remover registro de reserva
        default:
          console.error("OPCAO INDISPONIVEL!!!");
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
      } //fim do switch =Adicionar/Remover Registros=
      break;
    case "4":
      console.log("SAINDO...");
      loop1 = false;
      break;
    default:
      console.error("OPCAO INDISPONIVEL!!!");
      readline.question("Pressione Enter para continuar...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        readline.close();
      });
  } //fim do menu 'principal'
} //fim do while principal
