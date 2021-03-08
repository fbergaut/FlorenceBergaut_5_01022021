// var bearsRequest = new XMLHttpRequest();
// bearsRequest.onreadystatechange = function () {
//   if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//     var response = JSON.parse(this.responseText);
//     console.log(response);
//   }
// };

// bearsRequest.open("GET", "http://localhost:3000/api/teddies");
// bearsRequest.send();

// fetch("http://localhost:3000/api/teddies")
//   .then((response) => response.json())
//   .then((data) => console.log(data[1].name))
//   .then((response) => alert(JSON.stringify(response)))
//   .catch((error) => alert("Erreur : " + error));

//liste tous les auteurs de la base
async function getTeddies(){
    let rep = await fetch("http://localhost:3000/api/teddies", {
      method: "GET",
    });
    let reponse = await rep.json();
    return reponse;
}


let bears = getTeddies()
    .then(data =>{
        let bears = document.getElementById("products");
        data.map((bear) => {
        const div = document.createElement("div");
        div.innerHTML = bear.name;
        bears.appendChild(div);
         } )
})


// function afficherLesProduits(responseProduct, div) {
//   let bears = document.getElementById("products");
//   responseProduct.map((bear) => {
//     const div = document.createElement("div");
//     div.innerHTML = bear.name;
//     bears.appendChild(div);
//   });
// };

// afficherLesProduits(responseProduct, "bears");

// let responseBears = [];

// function afficherLesProduits(responseBears) {
//   for (var i = 0; i < responseBears.length; i++) {
//     var produit = responseBears[i];
//     console.log(produit.name + produit.price);
//   }
// }
