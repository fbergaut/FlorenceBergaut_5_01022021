// Variable "teddies" : afficher les éléments html
let teddies = "";

// Variable "products" : insérer les éléments html au bon endroit de la page index
let products = document.querySelector(".products");



///______________________________///
/// Connection API Teddies : GET ///
///______________________________///

// Variable "bears" :  récupérer les datas 'teddies' de l'API et on les boucle avec map() afin d'afficher chaque teddy
let bears = App.getAllProducts("http://localhost:3000/api/teddies/")

.then(
  (allProducts) => {
    allProducts.map((bear) => {
      // On stock dans la variable "teddies" les éléments html qui vont permettre d'afficher les datas sur index.html
      teddies += `<div class="col-12 col-lg-3">
                      <a href="../products/product.html?id=${bear._id}&price=${
        bear.price / 100
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

    // Insertion code html dynamique "teddies" à l'endroit indiqué par "products".
    products.innerHTML = teddies;
  });

     

    
