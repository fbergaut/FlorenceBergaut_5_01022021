let number1 = 152;
let number2 = 6;
let result = Number(number1) + number2;

console.log(result);
console.log(typeof(number1));

// if (number2 % 3 == 0) {
//     number1 = 25;
//     console.log(number1);
// }

// number1 = prompt('Entrer un nombre');

// if (number1 > 100) {
//     console.log('Le nombre est supérieur à 100.');
// } else {
//     console.log("Le nombre est inférieur à 100.");
// }

// if (number1 % 2 == 0) {
//   console.log("Le nombre est paire.");
// } else {
//   console.log("Le nombre est impaire.");
// }






// Exercice 1.1
// Quelles seront les valeurs des variables A et B après exécution des instructions suivantes ?
// Variables A, B en Entier
// Début
// A ← 1            réponse 1
// B ← A + 3        réponse 4
// A ← 3            réponse 6
// Fin

// let A = 3;
// let B = A + 3;

// console.log(B);

// Réponse A = 6 et B = 4

// -------------------------------------------------

// Exercice 1.2
// Quelles seront les valeurs des variables A, B et C après exécution des instructions suivantes ?
// Variables A, B, C en Entier
// Début
// A ← 5            réponse 5
// B ← 3            réponse 3
// C ← A + B        réponse 8
// A ← 2            réponse 5
// C ← B – A        réponse 1
// Fin

// let A = 2;
// let B = 3;
// let C = B - A;

// console.log(C);

// Réponse A = 5 et B = 3 et C = 1

// -------------------------------------------------

// Exercice 1.3
// Quelles seront les valeurs des variables A et B après exécution des instructions suivantes ?
// Variables A, B en Entier
// Début
// A ← 5            réponse 5
// B ← A + 4        réponse 9
// A ← A + 1        réponse 6
// B ← A – 4        réponse 2
// Fin

// let A = 6;
// let B = A - 4;

// console.log(B);

// Réponse A = 6 et B = 2

// -------------------------------------------------

// Exercice 1.4
// Quelles seront les valeurs des variables A, B et C après exécution des instructions suivantes ?
// Variables A, B, C en Entier
// Début
//  A ← 3           réponse 3
// B ← 10           réponse 10
// C ← A + B        réponse 13
// B ← A + B        réponse 13
// A ← C            réponse 16
// Fin

// let A = 3;
// let B = 13;
// let C = A + B;


// console.log(C);

// Réponse A = 16 et B = 13 et C = 16

// -------------------------------------------------

// Exercice 1.5
// Quelles seront les valeurs des variables A et B après exécution des instructions suivantes ?
// Variables A, B en Entier
// Début
// A ← 5            réponse 5
// B ← 2            réponse 2
// A ← B            réponse 2
// B ← A            réponse 2
// Fin
// Moralité : les deux dernières

// let A = 5;
// let B = 2;

// Réponse A et B = 2

// -------------------------------------------------

// Exercice 3.6
// Ecrire un algorithme qui demande l’âge d’un enfant à l’utilisateur. Ensuite, il l’informe de sa catégorie :
// "Poussin" de 6 à 7 ans
// "Pupille" de 8 à 9 ans
// "Minime" de 10 à 11 ans
// "Cadet" après 12 ans
// Peut-on concevoir plusieurs algorithmes équivalents menant à ce résultat ?  Non

// let Camille = 9;

// if (Camille >= 6 && Camille <= 7) {
//     console.log('Tu es dans le groupe "Poussins".');
// } else if (Camille >= 8 && Camille <= 9) {
//   console.log('Tu es dans le groupe "Pupille".');
// } else if (Camille >= 10 && Camille <= 11) {
//   console.log('Tu es dans le groupe "Minine".');  
// } else if (Camille >= 12) {
//   console.log('Tu es dans le groupe "Cadet".');  
// }

// -------------------------------------------------

// Exercice 4.1
// Formulez un algorithme équivalent à l’algorithme suivant :
// Si Tutu > Toto + 4 OU Tata = "OK" Alors
//   Tutu ← Tutu + 1
// Sinon
//   Tutu ← Tutu – 1
// Fin

// let Tutu = 3;
// let Toto = 2;
// let Tata = "O";

// if (Tutu > Toto + 4 || Tata == "OK") {
//     console.log(Tutu + 1);
// } else {
//     console.log(Tutu - 1);
// }

// -------------------------------------------------

// Exercice 4.2
// Cet algorithme est destiné à prédire l'avenir, et il doit être infaillible !
// Il lira au clavier l’heure et les minutes, et il affichera l’heure qu’il sera une minute plus tard. Par exemple, si l'utilisateur tape 21 puis 32, l'algorithme doit répondre :
// "Dans une minute, il sera 21 heure(s) 33".
// NB : on suppose que l'utilisateur entre une heure valide. Pas besoin donc de la vérifier.
// corrigé - retour au cours

// let heure;
// let minute;

// heure = prompt("Entrer l'heure :");
// minute = prompt("Entrer les minutes");

// function plusMinute() {
//     if (heure <= 23 && minute <= 59) {
//         minute ++;
//     }
// }

// plusMinute()
// console.log("Dans une minute, il sera " + heure + "heure(s) " + minute);

// -------------------------------------------------

// De même que le précédent, cet algorithme doit demander une heure et en afficher une autre. Mais cette fois, il doit gérer également les secondes, et afficher l'heure qu'il sera une seconde plus tard.
// Par exemple, si l'utilisateur tape 21, puis 32, puis 8, l'algorithme doit répondre : "Dans une seconde, il sera 21 heure(s), 32 minute(s) et 9 seconde(s)".

// let heure;
// let minute;
// let seconde;

// heure = prompt("Entrer l'heure :");
// minute = prompt("Entrer les minutes :");
// seconde = prompt("Entrer les secondes :")

// function plusSeconde() {
//     if (heure <= 23 && minute <= 59 && seconde <= 59) {
//         seconde ++;
//     }
// }

// plusSeconde()
// console.log("Dans une seconde, il sera " + heure + "heure(s) " + minute + "minute(s) et " + seconde + "seconde(s)");