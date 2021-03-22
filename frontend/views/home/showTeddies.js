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
    .then(data =>{
      data.map((bear) => {
        // On stock dans la variable "teddies" les éléments html qui vont permettre d'afficher les datas sur index.html
        teddies += `<div class="col-12 col-lg-3">
                      <a class="productsLink">
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

      // On récupère tous les liens produits, on les transforme en tableau et à l'évènement onClick, on va vers la page produit du teddy concerné.

      const liens = document.querySelectorAll(".productsLink");
      const liensArray = Array.from(liens);

      // liensArray.forEach((liensArray) => {
      //   console.log(liensArray);
      //   liensArray.addEventListener("click", function () {
      //     location.href.liensArray[0] = "product-norbert.html";
      //     location.href = "product-arnold.html";
      //     location.href = "product-lenny-et-carl.html";
      //     location.href = "product-gustav.html";
      //     location.href = "product-garfunkel.html";
      //   });
      // });

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

    });

    // .then(data =>{
    //     oneTeddy += `<div class="row">
    //                     <div class="col-lg-6">
    //                       <div class="mainImg">
    //                         <img class="card-img-top" src="${
    //                           bear.imageUrl
    //                         }" alt="${bear.name}">
    //                       </div>
    //                     </div>
    //                     <div class="col-12 col-lg-6">
    //                       <div class="wrapperHeading">
    //                         <h1 class="heading">${bear.name}</h1>
    //                           <a class="heartBtn">
    //                             <i class="fas fa-heart" aria-hidden="true"></i>
    //                           </a>
    //                         </div>
    //                       <div class="text">${bear.description}</div>
    //                       <div class="reviewWrapper">
    //                         <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
    //                         <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
    //                         <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
    //                         <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
    //                         <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
    //                       </div>
    //                       <p class="price">2900 €</p>
    //                       <div class="colorWrapper">
    //                         <select class="productColor">
    //                           <option class="productColorOption" selected="true">Choisir la couleur</option>
    //                           <option class="productColorOption">Tan</option>
    //                           <option class="productColorOption">Chocolate</option>
    //                           <option class="productColorOption">Black</option>
    //                           <option class="productColorOption">White</option>
    //                         </select>
    //                       </div>
    //                       <div class="wrapper">
    //                         <div class="wrapperQuantity">
    //                           <label class="hidden" for="quantity">Quantité</label>
    //                             <input class="quantity" type="text" value="1" id="quantity" pattern="[0-9]*">
    //                           <div class="wrapperBtn">
    //                             <button class="quantityBtn" type="button">
    //                               <i class="fas fa-sort-up" aria-hidden="true"></i>
    //                             </button>
    //                             <button class="quantityBtn" type="button">
    //                               <i class="fas fa-sort-down" aria-hidden="true"></i>
    //                             </button>
    //                           </div>
    //                         </div>
    //                         <div>
    //                           <button class="btn btn-outline-pink btn-lg rounded-0 addCartBtn" type="submit">Ajouter au panier</button>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>`
        
    //   });

      // console.log(getTeddies());
      // oneBearProduct.innerHTML = oneTeddy;




