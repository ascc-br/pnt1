// Atividade saída de dados - Slide 06
console.log("Olá Mundo");
console.log(10);
console.log("JavaScript é incrível");
console.log(5);
console.log("Estou Aprendendo JavaScript");
console.log("3,14");
console.log("Hello World!");
console.log(100);
console.log("OpenAI é uma empresa de tecnologia");
console.log(7);


// Atividade entrada de dados - Slide 06

var idade = 18;
console.log(idade);
var nome = "João";
console.log(nome);
var temFilhos = true;
console.log(temFilhos);
var salario = 0.0;
console.log(salario);
var isEstudante = false;
console.log(isEstudante);
var valorNulo = null;
console.log(valorNulo);
var iniciais = "JGS";
console.log(iniciais);
var horasDeSono = 8;
console.log(horasDeSono);
var valorIndefinido = undefined;
console.log(valorIndefinido);
var temPet = false;
console.log(temPet);

// Atividade entrada de dados - Slide 06
var input = require("readline-sync");
console.log("Por favor, digite as informações solicitadas a seguir.");
var nome = input.question("->Seu nome: ");
console.log("Informação inserida: " + nome);
var idade = input.questionInt("->Sua idade atual: ");
console.log("Informação inserida:" + idade);
var fav_cor = input.question("->Sua cor favorita: ");
console.log("Informação inserida: " + fav_cor);
var tel = input.questionInt("->Seu número de telefone: ");
console.log("Informação inserida: " + tel);
var pet = input.question("->Nome do seu pet: ");
console.log("Informação inserida: " + pet);
var capital = input.question("->Capital do Brasil: ");
console.log("Informação inserida: " + capital);
var qtd_irmao = input.questionInt("->Quantos irmãos você tem: ");
console.log("Informação inserida: " + qtd_irmao);
var fav_food = input.question("->Sua comida favorita: ");
console.log("Informação inserida: " + fav_food);
var fav_movie = input.question("Seu filme favorito: ");
console.log("Informação inserida: " + fav_movie);
var fav_artist = input.question("Sua banda ou artista favorito: ");
console.log("Informação inserida: " + fav_artist);
