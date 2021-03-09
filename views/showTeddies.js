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

//liste tous les teddies de la base
async function getTeddies(){
    let rep = await fetch("http://localhost:3000/api/teddies", {
      method: "GET",
    });
    let reponse = await rep.json();
    return reponse;
}

const divRowProduct = document.createElement("div");
divRowProduct.setAttribute("class", "row products");

let bears = getTeddies()
    .then(data =>{
        let bears = document.getElementById("products");
        data.map((bear) => {
        const divProduct = document.createElement("div");
        const aTeddyLinkProduct = document.createElement("a");
        const divImgProduct = document.createElement("div");
        const imgProduct = document.createElement("img");
        const divCardProduct = document.createElement("div");
        const h5TeddyName = document.createElement("h5");
        const pTeddyPrice = document.createElement("p");
        
        
        divProduct.setAttribute("class", "col-12 col-lg-2");
        aTeddyLinkProduct.setAttribute("class", "productsLink");
        divImgProduct.setAttribute("class", "card border-0 bearProduct");
        imgProduct.setAttribute("class", "card-img-top");
        divCardProduct.setAttribute("class", "card-body bg-white");
        h5TeddyName.setAttribute("class", "card-title text-center");
        pTeddyPrice.setAttribute("class", "card-text text-center");

        imgProduct.src = bear.imageUrl;
        imgProduct.alt = bear.name;

        h5TeddyName.innerHTML = bear.name;
        pTeddyPrice.innerHTML = bear.price.toPrecision(4) + " €";
        
        bears.appendChild(divRowProduct);
        divRowProduct.appendChild(divProduct);
        divProduct.appendChild(aTeddyLinkProduct);

        aTeddyLinkProduct.appendChild(divImgProduct);
        aTeddyLinkProduct.appendChild(divCardProduct);
        

        divImgProduct.appendChild(imgProduct);

        divCardProduct.appendChild(h5TeddyName);
        divCardProduct.appendChild(pTeddyPrice);

        
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
