// index.js

process.stdin.setEncoding("utf8");
process.stdout.setEncoding("utf8");

// Import classes and functions from hotel.js
const {
  ManipulaQuartos,
  ManipulaReservas,
  isValidAndFuture,
  dateIso,
  dataProxReserva,
} = require("./hotel");

/** INTERFACE GRAFICA (FRONT) */
//styles
const {
  styleMenuIni,
  styleMenuEnd,
  mostraPredio,
  mostraMenu,
  titleGenerator,
  readline,
  fitLine,
} = require("./frontend");

var lacoAndares = true;
while (lacoAndares) {
  var auxAndares = mostraMenu("Quantos pisos tem o hotel?", [
    "Contando com o térreo, quantos andares tem o hotel?",
  ]);
  if (auxAndares < 1 || isNaN(auxAndares)) {
    console.error("Digite um valor válido!");
    readline.question("Pressione Enter para continuar...", () => {
      // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
      readline.close();
    });
  } else lacoAndares = false;
}

const andares = auxAndares;
const gerQuartos = new ManipulaQuartos(andares);
const gerReservas = new ManipulaReservas();

var loop1 = true;
while (loop1) {
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
  let menu1 = ["Fazer Reserva", "Registros do Sistema", "Modificar Registros", "Sair"];
  var opcaoEscolhida = mostraMenu("Menu Principal", menu1);

  switch (opcaoEscolhida) {
    case 1:
      let [solteiro, duplo, suite] = gerQuartos.contarQuartos();
      if (solteiro + duplo + suite == 0) {
        console.warn("Não é possível criar reservas sem quartos cadastrados!");
        readline.question("Pressione Enter para continuar...", () => {
          // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
          readline.close();
        });
      } else {
        var dataIniInput = "DD/MM/AAAA";
        var dataFinInput = "DD/MM/AAAA";
        let hoje = dataProxReserva(new Date());
        while (!isValidAndFuture(dataIniInput, hoje)) {
          dataIniInput = mostraMenu("Fazer Reserva", ["Qual a data de entrada? (DD/MM/AAAA)"]);
          if (!isValidAndFuture(dataIniInput, hoje)) {
            console.warn(
              "Data inválida! Favor insira data posterior a: \n" +
                hoje.toDateString() +
                " e no formato DD/MM/AAAA.\n"
            );
            readline.question("Pressione Enter para continuar...", () => {
              // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
              readline.close();
            });
          }
        }

        let dataInicial = new Date(dateIso(dataIniInput) + "T17:00:00Z"); //17h UTC == 14h GMT-3 (checkin)
        while (!isValidAndFuture(dataFinInput, dataInicial)) {
          dataFinInput = mostraMenu("Fazer Reserva", ["Qual a data de saída? (DD/MM/AAAA)"]);
          if (!isValidAndFuture(dataFinInput, dataInicial)) {
            console.error(
              "Data inválida! Favor insira data posterior a: \n" +
                dataInicial.toDateString() +
                " e no formato DD/MM/AAAA.\n"
            );
            readline.question("Pressione Enter para continuar...", () => {
              // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
              readline.close();
            });
          }
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
          let menuReserva = [
            "Quartos disponíveis",
            "Reservar quarto na data",
            "Voltar ao Menu Principal",
          ];
          while (lacoReserva) {
            var opcaoReserva = mostraMenu(
              "======Fazer Reserva====== (" + dataIniInput + " ~ " + dataFinInput + ")",
              menuReserva
            );

            switch (opcaoReserva) {
              case 1:
                menuQuartos = [];
                quartosDisponiveis.forEach((quarto) => {
                  menuQuartos.push(" #" + quarto.id + " (" + quarto.tipo + ")");
                });
                mostraMenu(
                  "===Quartos disponíveis=== (" + dataIniInput + " ~ " + dataFinInput + ")",
                  menuQuartos,
                  true,
                  false,
                  true
                );

                readline.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  readline.close();
                });
                break;
              case 2:
                mostraMenu(
                  "======Fazer Reserva====== (" + dataIniInput + " ~ " + dataFinInput + ")",
                  ["Qual quarto será reservado?"],
                  true,
                  false,
                  true
                );
                var quartoEscolhido = readline.questionInt("Digite o número do quarto: ");
                if (quartosDisponiveis.find((quarto) => quarto.id === quartoEscolhido)) {
                  let selectedQuarto = quartosDisponiveis.find(
                    (quarto) => quarto.id === quartoEscolhido
                  );
                  mostraMenu(
                    "======Fazer Reserva====== (" +
                      dataIniInput +
                      " ~ " +
                      dataFinInput +
                      ") Quarto:#" +
                      quartoEscolhido +
                      " (" +
                      selectedQuarto.tipo +
                      ")",
                    ["Favor informe os dados do hóspede"],
                    true,
                    false,
                    true
                  );
                  var cpf = readline.questionInt("CPF: ");
                  if (gerReservas.listaUsuarios.find((usuario) => usuario.id === cpf))
                    console.info("Hóspede já cadastrado no sistema!");
                  else {
                    var nome = readline.question("Nome: ");
                    var endereco = readline.question("Endereço: ");
                    var telefone = readline.question("Telefone: ");
                    var sucesso = gerReservas.criaUsuario(nome, endereco, telefone, cpf);
                    if (sucesso) {
                      mostraMenu(
                        "======Fazer Reserva====== (" +
                          dataIniInput +
                          " ~ " +
                          dataFinInput +
                          ") Quarto:#" +
                          quartoEscolhido +
                          " (" +
                          selectedQuarto.tipo +
                          ")",
                        [
                          "Nome: " + nome,
                          "CPF: " + cpf,
                          "Endereço: " + endereco,
                          "telefone: " + telefone,
                        ],
                        true,
                        false,
                        true
                      );
                      console.log("Hóspede cadastrado com sucesso!");
                    } else console.warn("CPF já cadastrado no sistema!");
                  }
                  if (gerReservas.criaReserva(dataInicial, dataFinal, quartoEscolhido, cpf)) {
                    console.log("Reserva realizada com sucesso!");
                    lacoReserva = false;
                  } else console.error("A reserva não foi efetuada!");
                } else console.warn("Quarto indisponível na data!");

                readline.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  readline.close();
                });
                break;
              case 3:
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
        } //fim do else qd não há quartos disponíveis
      } //fim do else qd não tem quartos cadastrados
      break;
    case 2:
      let menuRegistros = [
        "Listar quartos",
        "Listar hóspedes",
        "Listar reservas",
        "Voltar ao Menu Principal",
      ];
      var opcaoRegistros = mostraMenu("Menu Registros", menuRegistros);

      switch (opcaoRegistros) {
        case 1:
          console.log(" =Quartos cadastrados= ");
          console.log(gerQuartos.listaQuartos);
          //mostraMenu("Quartos cadastrados", gerQuartos.listaQuartos);
          break;
        case 2:
          console.log(" =Hóspedes cadastrados= ");
          console.log(gerReservas.listaUsuarios);
          // mostraMenu("Hóspedes cadastrados", gerReservas.listaUsuarios);
          break;
        case 3:
          console.log(" =Reservas cadastradas= ");
          console.log(gerReservas.listaReservas);
          // mostraMenu("Reservas", gerReservas.listaReservas);
          break;
        case 4:
          break;
        default:
          console.error("Opção inválida!");
      }
      readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        readline.close();
      });
      break;
    case 3:
      let menuModidificar = [
        "Cadastrar novo quarto",
        "Registro de quarto",
        "Apagar reg de hóspede",
        "Apagar reg de reserva",
        "Valor das diárias",
        "Voltar ao Menu Principal",
      ];
      var opcaoAlteracao = mostraMenu("Modificar Registros", menuModidificar);
      switch (opcaoAlteracao) {
        case 1:
          var andar = mostraMenu("Cadastro de quatros", [
            "Qual o piso do quarto a ser cadastrado?",
          ]);
          if (andar > andares || andar < 1) {
            console.error("Andar inexistente!");
          } else {
            menuCadastraQuarto = ["Solteiro ", "Duplo ", "Suíte ", "CANCELAR OPERAÇÃO"];
            opcaoEscolhida = mostraMenu("Selecione o tipo do quarto", menuCadastraQuarto);

            switch (opcaoEscolhida) {
              case 1:
                console.log("Quarto solteiro cadastrado!");
                gerQuartos.addQuarto("solteiro", andar);
                break;
              case 2:
                console.log("Quarto duplo cadastrado!");
                gerQuartos.addQuarto("duplo", andar);
                break;
              case 3:
                console.log("Quarto suíte cadastrado!");
                gerQuartos.addQuarto("suite", andar);
                break;
              case 4:
                break;
              default:
                console.error("Opção inválida!");
            } //menu 'cadastro de quartos'
          } //else "andar inexistente"
          break; //fim do case '1': Cadastrar novo quarto
        case 2:
          let aux_quarto = parseInt(
            mostraMenu("Alterar registro de quarto", ["Qual o número do quarto a ser alterado?"])
          );
          if (gerQuartos.quartoExiste(aux_quarto)) {
            menuAlteraQuarto = ["Solteiro", "Duplo", "Suíte", "Desativado", "CANCELAR OPERAÇÃO"];
            opcaoEscolhida = mostraMenu(
              "Alterar registro do quarto #" + aux_quarto,
              menuAlteraQuarto
            );
            switch (opcaoEscolhida) {
              case 1:
                if (gerQuartos.alteraQuarto(aux_quarto, "solteiro"))
                  console.log("Quarto #" + aux_quarto + " alterado para 'solteiro' com sucesso!");
                break;
              case 2:
                if (gerQuartos.alteraQuarto(aux_quarto, "duplo"))
                  console.log("Quarto #" + aux_quarto + " alterado para 'duplo' com sucesso! ");
                break;
              case 3:
                if (gerQuartos.alteraQuarto(aux_quarto, "suite"))
                  console.log("Quarto #" + aux_quarto + " alterado para 'suíte' com sucesso! ");
                break;
              case 4:
                if (gerQuartos.alteraQuarto(aux_quarto, "desativado"))
                  console.log("Quarto #" + aux_quarto + " desativado com sucesso! ");
                break;
              case 5:
                break;
              default:
                console.log("Opção inválida!");
            }
          } else console.error("Quarto não encontrado!");
          break;
        case 3:
          let aux_cpf = mostraMenu("Remover registro de hóspede", ["Qual o CPF do hóspede?"]);
          if (gerReservas.removeUsuario(aux_cpf)) console.log("Hóspede removido com sucesso!");
          else console.error("CPF não cadastrado!");
          break; //fim do case '3': Remover registro de hóspede
        case 4:
          let aux_id = mostraMenu("Remover registro de reserva", ["Qual o ID da reserva?"]);
          if (gerReservas.removeReserva(aux_id)) console.log("Reserva removida com sucesso!");
          else console.error("ID de reserva não cadastrado!");
          break; //fim do case '4': Remover registro de reserva
        case 5:
          let aux_diariaSol = gerQuartos.diaSolteiro;
          while (aux_diariaSol == gerQuartos.diaSolteiro) {
            mostraMenu(
              "Alterar valor das diárias",
              ["Atual valor para quarto 'solteiro': " + gerQuartos.diaSolteiro],
              true,
              false,
              true
            );
            aux_diariaSol = readline.questionFloat("Digite o novo valor: ");
          }
          gerQuartos.diaSolteiro = aux_diariaSol;

          let aux_diariaDup = gerQuartos.diaDuplo;
          while (aux_diariaDup == gerQuartos.diaDuplo) {
            mostraMenu(
              "Alterar valor das diárias",
              [
                "NOVO valor para 'solteiro': " + gerQuartos.diaSolteiro,
                "Atual valor para 'duplo': " + gerQuartos.diaDuplo,
              ],
              true,
              false,
              true
            );
            aux_diariaDup = readline.questionFloat("Informe o novo valor: ");
          }
          gerQuartos.diaDuplo = aux_diariaDup;

          let aux_diariaSuite = gerQuartos.diaSuite;
          while (aux_diariaSuite == gerQuartos.diaSuite) {
            mostraMenu(
              "Alterar valor das diárias",
              [
                "NOVO valor para 'solteiro': " + gerQuartos.diaSolteiro,
                "NOVO valor para 'duplo': " + gerQuartos.diaDuplo,
                "Atual valor para 'suíte': " + gerQuartos.diaSuite,
              ],
              true,
              false,
              true
            );
            aux_diariaSuite = readline.questionFloat("Informe o novo valor: ");
          }
          gerQuartos.diaSuite = aux_diariaSuite;

          if (gerQuartos.atualizaDiarias()) {
            mostraMenu(
              "Alterar valor das diárias",
              [
                "NOVO valor para quarto 'solteiro': " + gerQuartos.diaSolteiro,
                "NOVO valor para quarto 'duplo': " + gerQuartos.diaDuplo,
                "NOVO valor para quarto 'suíte': " + gerQuartos.diaSuite,
              ],
              true,
              false,
              true
            );
            console.log("Valores de diária atualizados com sucesso!");
          } else console.error("Falha ao atualizar valores de diária!");
          break; //fim do case '5': Alterar valor das diarias
        case 6:
          break;
        default:
          console.error("Opção indisponível!");
      } //fim do switch =Modificar Registros=
      readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        readline.close();
      });
      break;
    case 4:
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
