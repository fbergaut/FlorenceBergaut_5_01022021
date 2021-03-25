// On se connecte à l'API et récupère tous les teddies de la base

async function getTeddies(){
    let rep = await fetch("http://localhost:3000/api/teddies", {
      method: "GET",
    });
    let reponse = await rep.json();
    return reponse;
}

// On crée la variable "teddies" qui nous permettra d'afficher les éléments html

let teddies = "";


// On crée la variable "products" qui nous permettra d'insérer les éléments html au bon endroit de la page index

let products = document.querySelector(".products");

// On stock dans la variable bears les datas récupérées de l'API et on les boucle avec map() afin d'afficher chaque teddy

let bears = getTeddies()
.then((data) => {
  data.map((bear) => {
    // On stock dans la variable "teddies" les éléments html qui vont permettre d'afficher les datas sur index.html
    teddies += `<div class="col-12 col-lg-3">
                      <a href="../products/product.html?id=${
                        bear._id
                      }" class="productsLink">
                          <div class="card border-0 bearProduct">
                            <img class="card-img-top" src="${
                              bear.imageUrl
                            }" alt="${bear.name}">
                          </div>
                          <div class="card-body bg-white">
                            <h5 class="card-title text-center">${bear.name}</h5>
                            <p class="card-text text-center">${
                              bear.price / 100
                            } €</p>
                          </div>
                      </a>
                    </div>`;
  });

  products.innerHTML = teddies;

});

      // On récupère tous les liens produits, on les transforme en tableau et à l'évènement onClick, on va vers la page produit du teddy concerné.

    //   const liens = document.querySelectorAll(".productsLink");
    //   const liensArray = Array.from(liens);

    //   // liensArray.forEach((liensArray) => {
    //   //   console.log(liensArray);
    //   //   liensArray.addEventListener("click", function () {
    //   //     location.href.liensArray[0] = "product-norbert.html";
    //   //     location.href = "product-arnold.html";
    //   //     location.href = "product-lenny-et-carl.html";
    //   //     location.href = "product-gustav.html";
    //   //     location.href = "product-garfunkel.html";
    //   //   });
    //   // });

    //   liensArray[0].addEventListener("click", function () {
    //     location.href = "../products/product.html";
    //   });
    //   liensArray[1].addEventListener("click", function () {
    //     location.href = "../products/product-arnold.html";
    //   });
    //   liensArray[2].addEventListener("click", function () {
    //     location.href = "../products/product-lenny-et-carl.html";
    //   });
    //   liensArray[3].addEventListener("click", function () {
    //     location.href = "../products/product-gustav.html";
    //   });
    //   liensArray[4].addEventListener("click", function () {
    //     location.href = "../products/product-garfunkel.html";
    //   });

    // });



    
