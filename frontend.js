const readline = require("readline-sync");

const reset = "\x1b[0m"; // Resetar estilos no final de cada linha
const resetBg = "\x1b[48;5;0m"; // Resetar estilos no final de cada linha
const resetFg = "\x1b[38;5;0m"; // Resetar estilos no final de cada linha

const bold = "\x1b[1m"; // Negrito
const underline = "\x1b[4m"; // sublinhado
const italic = "\x1b[3m"; // italic

const bgTitle = "\x1b[48;5;58m"; //cor da parede do prédio
const fgTitle = "\x1b[38;5;214m"; //Cor do título no prédio

const bgBuilding = "\x1b[48;5;222m"; //cor da parede do prédio
const fgBuilding = "\x1b[38;5;210m"; //cor detalhes do prédio

const bgDoor = "\x1b[48;5;58m"; //cor da parede do prédio
const fgWindow = "\x1b[38;5;14m"; //cor das janelas

const bgFloor = "\x1b[48;5;22m"; //cor do chão
const fgFloor = "\x1b[38;5;46m"; //cor da grama

const stMargin = "\x1b[48;5;52m"; //style da margem do menu
const bgMenu = "\x1b[48;5;217m"; //cor do bg menu
const fgMenu = "\x1b[38;5;22m"; //cor da letra no menu
const borda = "   ";
const styleMenuIni = stMargin + borda + bgMenu + fgMenu + italic + bold;
const styleMenuEnd = stMargin + borda + reset;

function mostraPredio(size = 40) {
  let margem = "";
  for (let i = 0; i < (size - 32) / 2; i++) {
    margem += " ";
  }

  console.log(
    bold +
      fgBuilding +
      margem +
      "   ____" +
      bold +
      underline +
      "\x1b[48;5;16m" +
      "[ " +
      "\x1b[38;5;33m" +
      "HOTEL MANAGER" +
      fgBuilding +
      " ]" +
      resetBg +
      bold +
      "____" +
      reset
  );
  console.log(
    "   " +
      margem +
      bold +
      bgBuilding +
      fgBuilding +
      "|" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "||" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "||" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "|| " +
      fgWindow +
      "▧ " +
      fgBuilding +
      "||" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "|" +
      reset
  );
  console.log(
    "   " + margem + bold + bgBuilding + fgBuilding + "|....||..||__|| ..||....|" + reset
  );
  console.log(
    "   " +
      margem +
      bold +
      bgBuilding +
      fgBuilding +
      "|" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "||" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "||" +
      bgDoor +
      "╬╬" +
      bgBuilding +
      "|| " +
      fgWindow +
      "▧ " +
      fgBuilding +
      "||" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "" +
      fgWindow +
      "▧ " +
      fgBuilding +
      "|" +
      reset
  );
  console.log(
    fgFloor +
      margem +
      ",," +
      bgFloor +
      ";;,;;;,;;;,," +
      "\x1b[48;5;243m" +
      "  " +
      bgFloor +
      ",,;;;,;;;,;;;" +
      resetBg +
      ",," +
      reset +
      "\n"
  );
}

function titleGenerator(title, size = 40) {
  let margem = "";
  let margem2 = "";
  let retorno = "opa";

  if (title != undefined) {
    for (let i = 0; i < (size - 4 - title.length) / 2; i += borda.length) margem += borda;
    margem2 = margem;

    var tamanhoBruto = margem.length * 2 + title.length + 4;
    while (tamanhoBruto > size) {
      if ((tamanhoBruto - size) % 2 == 0) {
        margem = margem.slice(0, margem.length - 1);
        margem2 = margem;
      } else margem2 = margem.slice(0, margem.length - 1);

      tamanhoBruto = margem.length + margem2.length + title.length + 4;
    }
    retorno =
      stMargin +
      margem +
      bgTitle +
      fgTitle +
      underline +
      bold +
      "[ " +
      title +
      " ]" +
      reset +
      stMargin +
      margem2;
  } else {
    for (let i = 0; i < size; i += borda.length) margem += borda;
    retorno = stMargin + margem.slice(0, size);
  }

  return retorno + reset;
}

function menuLineGenerator(texto, size = 40) {
  let preenchimento = "";
  let retorno = "opa";

  if (texto != undefined) {
    for (let i = 0; i < (size - texto.length - borda.length * 2) / 2; i++) preenchimento += " ";

    retorno =
      stMargin +
      borda +
      bgMenu +
      fgMenu +
      italic +
      preenchimento +
      texto +
      preenchimento.slice(0, preenchimento.length - (texto.length % 2)) +
      stMargin +
      borda;
  } else {
    for (let i = 0; i < size; i += borda.length) preenchimento += borda;

    retorno = stMargin + margem;
  }

  return retorno + reset;
}

function fitLine(line, size = 40, isTitulo = false) {
  maxSize =
    size -
    2 - //bordas internas
    borda.length * 2 - //bordas externas
    3; //caracteres prefixos de opcao do menu
  let result;
  if (!isTitulo) {
    result = menuLineGenerator(line, size);

    // Verifica se a linha tem mais que maxSize caracteres
    if (line.length > maxSize) {
      // Busca o último espaço antes do 36º caractere
      let lastSpace = line.lastIndexOf(" ", maxSize);

      // Se houver um espaço, insere o "\n" após o último espaço
      if (lastSpace !== -1) {
        result =
          menuLineGenerator(line.slice(0, lastSpace), size) +
          "\n" +
          fitLine(line.slice(lastSpace + 1), size);
      } else {
        // Se não houver espaço, busca a última vogal antes do maxSizeº caractere
        const vogais = "aeiouAEIOU";
        let lastVowel = -1;

        for (let i = 0; i < maxSize; i++) {
          if (vogais.includes(line[i])) {
            lastVowel = i;
          }
        }

        // Se uma vogal for encontrada, insere "-\n" após a última vogal
        if (lastVowel !== -1) {
          result =
            menuLineGenerator(line.slice(0, lastVowel + 1) + "-", size) +
            "\n" +
            fitLine(line.slice(lastVowel + 1, size), size);
        } else {
          // Se nenhuma vogal for encontrada (caso improvável), insere "-\n" no maxSizeº caractere
          result =
            menuLineGenerator(line.slice(0, maxSize) + "-", size) +
            "\n" +
            fitLine(line.slice(maxSize, size), size);
        }
      }
    }
  } else {
    if (line.length > maxSize) {
      // Busca o último espaço antes do 36º caractere
      let lastSpace = line.lastIndexOf(" ", maxSize);

      // Se houver um espaço, insere o "\n" após o último espaço
      if (lastSpace !== -1) {
        result =
          titleGenerator(line.slice(0, lastSpace), size) +
          "\n" +
          fitLine(line.slice(lastSpace + 1), size, true);
      } else {
        // Se não houver espaço, busca a última vogal antes do maxSizeº caractere
        const vogais = "aeiouAEIOU";
        let lastVowel = -1;

        for (let i = 0; i < maxSize; i++) {
          if (vogais.includes(line[i])) {
            lastVowel = i;
          }
        }

        // Se uma vogal for encontrada, insere "-\n" após a última vogal
        if (lastVowel !== -1) {
          result =
            titleGenerator(line.slice(0, lastVowel + 1) + "-", size) +
            "\n" +
            fitLine(line.slice(lastVowel + 1, size), size, true);
        } else {
          // Se nenhuma vogal for encontrada (caso improvável), insere "-\n" no maxSizeº caractere
          result =
            titleGenerator(line.slice(0, maxSize) + "-", size) +
            "\n" +
            fitLine(line.slice(maxSize, size), size, true);
        }
      }
    } else result = titleGenerator(line, size);
  }

  return result;
}

function isArrayOfStr(variable) {
  // Verifica se é um array e se todos os elementos são strings
  return Array.isArray(variable) && variable.every((element) => typeof element === "string");
}

function mostraMenu(title, opcoes, apagaTela = true, recursiva = true, noInput = false, size = 40) {
  var input = 0;
  if (isArrayOfStr(opcoes)) {
    //check if opcoes is an array
    if (apagaTela) {
      console.clear();
      mostraPredio(size);
    }

    if (opcoes.length == 1) {
      //não verifica se a opção é invalida!!!
      console.log(fitLine(title, size, true));
      if (noInput) {
        console.log(fitLine(opcoes[0], size));
        console.log(titleGenerator(undefined, size));
        input = null;
      } else
        input = readline.question(
          fitLine(opcoes[0], size) +
            "\n" +
            titleGenerator(undefined, size) +
            "\n Digite a informação: "
        );
    } else {
      //parte recursiva (repete se o input é inválido)
      console.log(fitLine(title, size, true));
      if (!noInput)
        for (let i = 0; i < opcoes.length; i++) {
          //console.log(`${styleMenuIni}${i + 1}. ${fitLine(opcoes[i], size)}${styleMenuEnd}`);
          console.log(fitLine(`${i + 1}. ${opcoes[i]}`, size));
        }
      else
        for (let i = 0; i < opcoes.length; i++) {
          //console.log(`${styleMenuIni}${i + 1}. ${fitLine(opcoes[i], size)}${styleMenuEnd}`);
          console.log(fitLine(` ${opcoes[i]}`, size));
        }
      console.log(titleGenerator(undefined, size));
      if (!noInput) {
        input = readline.questionInt("Digite a opção desejada: ", opcoes.length);
        if (!(input > 0 && input <= opcoes.length)) {
          console.warn("Opção inválida!");
          readline.question("Pressione Enter para continuar...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
          if (recursiva) input = mostraMenu(title, opcoes, apagaTela, recursiva, false, size);
        }
      } else input = null;
    }

    return input;
  } else return null;
}

module.exports = {
  styleMenuIni,
  styleMenuEnd,
  mostraPredio,
  mostraMenu,
  titleGenerator,
  fitLine,
  menuLineGenerator,
  isArrayOfStr,
  fgBuilding,
  fgWindow,
  readline,
};
