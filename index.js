// index.js
process.stdout.setEncoding("utf8");
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
  var auxAndares = readline.question("Quantos pisos tem o hotel? (contando com o térreo):\n");
  if (auxAndares < 1 || isNaN(auxAndares)) {
    console.error("Digite um valor válido!");
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
   *  1.2 Reservar quarto em data (usando CPF e cadastrando caso novo hóspede)
   *  1.3 Voltar ao Menu Principal
   * 2. Registros do Sistema
   *  2.1 Listar reservas por CPF
   *  2.2 Listar quartos cadastrados
   *  2.3 Listar hóspedes cadastrados
   *  2.4 Listar reservas cadastradas
   * 3. Alterar Registros
   *  3.1 Cadastrar novo quarto
   *   3.1.1 solteiro
   *   3.1.2 duplo
   *   3.1.3 suíte
   *  3.2 Alterar registro de quarto
   *   3.2.1 Solteiro
   *   3.2.2 duplo
   *   3.2.3 suíte
   *   3.2.4 DESATIVADO
   *  3.3 Deletar registro de hóspede
   *  3.4 Deletar registro de reserva
   * 4. Sair
   */
  console.log(" =Menu de Opções= ");
  console.log("1. Fazer Reserva");
  console.log("2. Registros do Sistema");
  console.log("3. Adicionar/Remover Registros");
  console.log("4. Sair");
  var opcaoEscolhida = readline.question("Escolha a opção desejada: ");

  switch (opcaoEscolhida) {
    case "1":
      let [solteiro, duplo, suite] = gerQuartos.contarQuartos();
      if (solteiro + duplo + suite == 0) {
        console.error("Não é possível criar reservas sem quartos cadastrados!");
        readline.question("Pressione Enter para continuar...", () => {
          // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
          readline.close();
        });
      } else {
        console.clear();
        console.log(" =Fazer Reserva= ");
        let dataIniInput = "DD/MM/AAAA";
        let dataFinInput = "DD/MM/AAAA";
        let hoje = dataProxReserva(new Date());
        while (!isValidAndFuture(dataIniInput, hoje)) {
          dataIniInput = readline.question("Data de entrada DD/MM/AAAA: ");
          if (!isValidAndFuture(dataIniInput, hoje))
            console.error(
              "Data inválida! Favor insira data posterior a: \n" +
                hoje.toDateString() +
                " e no formato DD/MM/AAAA.\n"
            );
        }

        let dataInicial = new Date(dateIso(dataIniInput) + "T17:00:00Z"); //17h UTC == 14h GMT-3 (checkin)
        while (!isValidAndFuture(dataFinInput, dataInicial)) {
          dataFinInput = readline.question("Data de saída DD/MM/AAAA: ");
          if (!isValidAndFuture(dataFinInput, dataInicial))
            console.error(
              "Data inválida! Favor insira data posterior a: \n" +
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
          console.error("Não há quartos disponíveis nessa data!");
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
        } else {
          let lacoReserva = true;
          while (lacoReserva) {
            console.clear();
            console.log(" =Fazer Reserva (" + dataIniInput + " ~ " + dataFinInput + ")=");
            console.log("1. Quartos disponíveis na data");
            console.log("2. Reservar quarto na data");
            console.log("3. Voltar ao Menu Principal");
            var opcaoReserva = readline.question("Escolha a opção desejada: ");

            switch (opcaoReserva) {
              case "1":
                console.clear();
                console.log(" =Quartos disponíveis (" + dataIniInput + " ~ " + dataFinInput + ")");
                console.log("Quartos disponíveis:");
                quartosDisponiveis.forEach((quarto) => {
                  console.log(" #" + quarto.id + " (" + quarto.tipo + ")");
                });
                readline.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  readline.close();
                });
                break;
              case "2":
                console.log("Informe os dados do hóspede: ");
                var cpf = readline.questionInt("CPF: ");
                if (gerReservas.listaUsuarios.find((usuario) => usuario.id === cpf))
                  console.log("Hóspede já cadastrado no sistema!");
                else {
                  var nome = readline.question("Nome: ");
                  var endereco = readline.question("Endereço: ");
                  var telefone = readline.question("Telefone: ");
                  var msgErro = gerReservas.criaUsuario(nome, endereco, telefone, cpf);
                  if (msgErro) console.log("Hóspede cadastrado com sucesso!");
                  else console.log("CPF já cadastrado no sistema!");
                }
                var quartoEscolhido = readline.questionInt("Numero do quarto: ");
                if (quartosDisponiveis.find((quarto) => quarto.id === quartoEscolhido)) {
                  if (gerReservas.criaReserva(dataInicial, dataFinal, quartoEscolhido, cpf)) {
                    console.log("Reserva realizada com sucesso!");
                    lacoReserva = false;
                  } else console.error("A reserva não foi efetuada!");
                } else console.error("Quarto indisponível!");
                readline.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  readline.close();
                });
                break;
              case "3":
                lacoReserva = false;
                break;
              default:
                console.error("Opção inválida!");
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
      console.log("2. Listar hóspedes cadastrados");
      console.log("3. Listar reservas");
      var contagem = gerQuartos.contarQuartos();
      console.clear();
      console.log(" =Quartos cadastrados= ");
      console.log(gerQuartos.listaQuartos);
      console.log(" =Hóspedes cadastrados= ");
      console.log(gerReservas.listaUsuarios);
      console.log(" =Reservas cadastradas= ");
      console.log(gerReservas.listaReservas);
      // console.log(" =Quartos cadastrados= ");
      // console.log("Quartos solteiro: " + contagem[0]);
      // console.log("Quartos duplo:    " + contagem[1]);
      // console.log("Quartos suíte:    " + contagem[2] + "\n");
      readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        readline.close();
      });
      break;
    case "3":
      console.clear();
      console.log(" =Adicionar/Remover Registros= ");
      console.log("1. Cadastrar novo quarto");
      console.log("2. Alterar registro de quarto");
      console.log("3. Remover registro de hóspede");
      console.log("4. Remover registro de reserva");
      var opcaoAlteracao = readline.question("Escolha a opção desejada: ");
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
            console.log("3. Suíte ");
            opcaoEscolhida = readline.question("Escolha a opção desejada: ");

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
                console.log("Quarto suíte cadastrado!");
                gerQuartos.addQuarto("suite", andar);
                break;
              default:
                console.error("Opção inválida!");
            } //menu 'cadastro de quartos'
          } //else "andar inexistente"
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
          break; //fim do case '1': Cadastrar novo quarto
        case "2":
          let aux_quarto = readline.questionInt("Digite o número do quarto a ser alterado: ");
          let quarto = gerQuartos.listaQuartos.find((quarto) => quarto.id === aux_quarto);
          if (quarto) {
            console.clear();
            console.log(" =Alterar registro de quarto (#" + aux_quarto + ")= ");
            console.log("1. Solteiro");
            console.log("2. Duplo");
            console.log("3. Suíte");
            console.log("4. Desativado");
            opcaoEscolhida = readline.questionInt("Escolha a opção desejada: ");
            switch (opcaoEscolhida) {
              case "1":
                if (alteraQuarto(quarto, "solteiro"))
                  console.log("Quarto #" + aux_quarto + " alterado para 'solteiro' com sucesso!");
                break;
              case "2":
                if (alteraQuarto(quarto, "duplo"))
                  console.log("Quarto #" + aux_quarto + " alterado para 'duplo' com sucesso! ");
                break;
              case "3":
                if (alteraQuarto(quarto, "suite"))
                  console.log("Quarto #" + aux_quarto + " alterado para 'suíte' com sucesso! ");
                break;
              case "4":
                if (alteraQuarto(quarto, "desativado"))
                  console.log("Quarto #" + aux_quarto + " desativado com sucesso! ");
              default:
                console.log("Opção inválida!");
            }
          } else console.error("Quarto não encontrado!");
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
          break;
        case "3":
          let aux_cpf = readline.questionInt("Informe o CPF do hóspede: ");
          if (gerReservas.removeUsuario(aux_cpf)) console.log("Hóspede removido com sucesso!");
          else console.error("CPF não cadastrado!");
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
          break; //fim do case '3': Remover registro de hóspede
        case "4":
          let aux_id = readline.questionInt("Informe o ID da reserva: ");
          if (gerReservas.removeReserva(aux_id)) console.log("Reserva removida com sucesso!");
          else console.error("ID de reserva não cadastrado!");
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
          break; //fim do case '4': Remover registro de reserva
        default:
          console.error("Opção indisponível!");
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
      console.error("Opção indisponível!");
      readline.question("Pressione Enter para continuar...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        readline.close();
      });
  } //fim do menu 'principal'
} //fim do while principal
