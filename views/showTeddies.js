// var bearsRequest = new XMLHttpRequest();
// bearsRequest.onreadystatechange = function () {
//   if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//     var response = JSON.parse(this.responseText);
//     console.log(response);
//   }
// };

// const e = require("express");

// bearsRequest.open("GET", "http://localhost:3000/api/teddies");
// bearsRequest.send();

// fetch("http://localhost:3000/api/teddies")
//   .then((response) => response.json())
//   .then((data) => console.log(data[1].name))
//   .then((response) => alert(JSON.stringify(response)))
//   .catch((error) => alert("Erreur : " + error));

// Connecte à l'API et récupère tous les teddies de la base

async function getTeddies(){
    let rep = await fetch("http://localhost:3000/api/teddies", {
      method: "GET",
    });
    let reponse = await rep.json();
    return reponse;
}

// On crée un élément <div> et lui attribut un nom de class afin d'acceuillir les autres éléments qui vont être créés un peu plus bas

const divRowProduct = document.createElement("div");
divRowProduct.setAttribute("class", "row products");

// On stock dans la variable bears les datas récupérées de l'API et on les boucle avec map() afin d'afficher chaque teddy

let bears = getTeddies()
    .then(data =>{
      let bears = document.getElementById("products");
      data.map((bear) => {
        // On crée les éléments html qui vont permettre d'afficher les datas

        const divProduct = document.createElement("div");
        const aTeddyLinkProduct = document.createElement("a");
        const divImgProduct = document.createElement("div");
        const imgProduct = document.createElement("img");
        const divCardProduct = document.createElement("div");
        const h5TeddyName = document.createElement("h5");
        const pTeddyPrice = document.createElement("p");

        // On attribut des noms de class à tous les éléments créés afin de les stylisés

        divProduct.setAttribute("class", "col-12 col-lg-3");
        aTeddyLinkProduct.setAttribute("class", "productsLink");
        divImgProduct.setAttribute("class", "card border-0 bearProduct");
        imgProduct.setAttribute("class", "card-img-top");
        divCardProduct.setAttribute("class", "card-body bg-white");
        h5TeddyName.setAttribute("class", "card-title text-center");
        pTeddyPrice.setAttribute("class", "card-text text-center");

        // On définit la source de l'élément <img> à imageUrl et l'attribut alt est renseigné avec le nom du produit

        imgProduct.src = bear.imageUrl;
        imgProduct.alt = bear.name;

        // imgProduct.style.width = '220px';
        // imgProduct.style.height = "270px";

        // On affiche le nom des Teddies ainsi que leurs prix

        h5TeddyName.innerHTML = bear.name;
        pTeddyPrice.innerHTML = bear.price + " €";

        // On ajoute les élments au DOM pour créer la partie présentation de produit sur index.html

        bears.appendChild(divRowProduct);

        divRowProduct.appendChild(divProduct);

        divProduct.appendChild(aTeddyLinkProduct);

        aTeddyLinkProduct.appendChild(divImgProduct);
        aTeddyLinkProduct.appendChild(divCardProduct);

        divImgProduct.appendChild(imgProduct);

        divCardProduct.appendChild(h5TeddyName);
        divCardProduct.appendChild(pTeddyPrice);

      });

      // On récupère tous les liens produits, on les transforme en tableau et à l'évènement onClick, on va vers la page produit du teddy concerné.

      const liens = document.querySelectorAll(".productsLink");
      const liensArray = Array.from(liens);

      liensArray[0].addEventListener("click", function () {
        location.href = "product-norbert.html";
      });
      liensArray[1].addEventListener("click", function () {
        location.href = "product-arnold.html";
      });
      liensArray[2].addEventListener("click", function () {
        location.href = "product-lenny-et-carl.html";
      });
      liensArray[3].addEventListener("click", function () {
        location.href = "product-gustav.html";
      });
      liensArray[4].addEventListener("click", function () {
        location.href = "product-garfunkel.html";
      });


    })




