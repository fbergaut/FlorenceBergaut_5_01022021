
// Variable "oneOrder" : stockera le code html à afficher
let oneOrderHtml = "";

// Variable "list" : stock le html dy namique de la page cart.html
let list = document.querySelector(".productCartWrapper");

// Variable "price" : stockera le prix
let totalHtml = "";

// Variable "list" : stock le html dy namique de la page cart.html
let total = document.querySelector(".totalWrapper");
// let totalTva = document.querySelector(".totalTva");

// Création d'une Class CartUI : gérer les taches de la vue panier.html

class CartUI {
  //---------------------Méthode : Affiche message d'erreur si couleur non sélectionnée

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#infoWrapper");
    const form = document.querySelector("#order-form");
    container.insertBefore(div, form);

    // Disparait au bout de 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  //---------------------Méthode : Affiche chaque commande du localStorage

  static displayOrders() {
    const orders = Store.getOrders();

    orders.forEach((order) => CartUI.addOrderToList(order));
  }

  //---------------------Méthode : Affiche les commandes

  static addOrderToList(order) {
    let nbProducts = JSON.parse(localStorage.getItem("orders")).length;

    oneOrderHtml += `<div class="productWrapper">
                      <div class="imgCartWrapper">
                          <a href="../products/product.html?id=${order.id}">
                            <img class="imgCart" src="${order.image}" alt="${order.productName}">
                          </a>
                      </div>
                      <div class="infoCartWrapper">
                          <div class="firstLineCart">
                              <div class="productName">
                                  <a class="productName_link" href="../products/product.html?id=${order.id}">
                                      <h3 class="productName_heading">${order.productName}</h3>
                                  </a>
                                  <p class="productName_color">Couleur: ${order.color}</p>
                              </div>
                              <div class="quantityWrapper">
                                  <label class="hidden" for="quantity">Quantité</label>
                                  <input class="quantityCart" type="number" value="${order.quantity}" id="quantityCart" min="1" max="10" onclick="changeCartPrice(event)" numProd="${order.numProd}">
                              </div>
                          </div>
                          <div class="secondtLineCart">
                              <div>
                                  <button type="button" class="deleteCartBtn" numProd=${order.numProd} onclick="removeAnOrder(event)">Supprimer</button>
                                  <span>|</span>
                                  <button type="button" class="moveCartBtn">Déplacer vers mes favoris</button>
                              </div>
                              <div class="cartPrice">
                                  <p><span class="priceInCart">${order.price}</span></p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <hr class="strokeBlack">
                  `;

    list.innerHTML = oneOrderHtml;
  }

  //---------------------Méthode : Réinitialise les champs lorsque la commande est envoyée

  static clearFields() {
    document.querySelector(".productColor").value = "Choisir la couleur";
    document.querySelector(".quantity").value = "1";
  }

  //---------------------Méthode : Mise à jour prix d'une commande selon quantity

  static upDatePriceOrder(e) {
    const priceInCart = document.querySelectorAll(".priceInCart");
    let index = e.target.getAttribute("numProd") - 1;
    const quantityInCart = e.target.value;
    const orders = JSON.parse(localStorage.getItem("orders"));
    let unitPrice = orders[index].unitPrice;

    let newPrice = quantityInCart * unitPrice;
    console.log(index, unitPrice, newPrice, quantityInCart);
    priceInCart[index].textContent = newPrice + " €";
    orders[index].price = newPrice + " €";
    orders[index].quantity = quantityInCart;
    localStorage.setItem("orders", JSON.stringify(orders));
    console.log(orders);
  }

  //---------------------Méthode : Calcul la somme totale

  static totalPrice() {
    const listOrder = JSON.parse(localStorage.getItem("orders"));
    let totalPrice = 0;
    listOrder.forEach((order) => {
      let price = parseInt(order.price);
      totalPrice += price;
    });
    return totalPrice;
  }

  //---------------------Méthode : Affichage de la somme totale

  static displayTotalPrice() {
    let priceToPay = 0;
    priceToPay = CartUI.totalPrice();
    totalHtml += `<div>
                    <h2 class="headingCart">Total</h2>
                  </div>
                  <div class="sous-total">
                      <p>Sous-total</p>
                      <p>${priceToPay} €</p>
                  </div>
                  <div class="delivery">
                      <p>Livraison</p>
                      <p>Gratuite</p>
                  </div>
                  <hr class="strokeBlack">
                  <div class="totalTva">
                      <p><strong>Total (TVA incluse)</strong></p>
                      <p id="totalPrice"><strong>${priceToPay} €</strong></p>
                  </div>`;

    total.innerHTML = totalHtml;
  }

  //---------------------Méthode : Sécurisation des champs de saisies côté UI

  static validPrenom(inputPrenom) {
    let prenomRegExp = new RegExp("^[a-zA-Zçéèêëàâä -]{2,30}$", "g");
    let userMessagePrenom = inputPrenom.nextElementSibling;

    if (prenomRegExp.test(inputPrenom.value)) {
      userMessagePrenom.innerHTML = "Votre prénom est enregistré";
      userMessagePrenom.classList.remove("text-danger");
      userMessagePrenom.classList.add("text-success");
      return true;
    } else {
      userMessagePrenom.innerHTML = "Prénom invalide";
      userMessagePrenom.classList.remove("text-success");
      userMessagePrenom.classList.add("text-danger");
      return false;
    }
  }

  static validNom(inputNom) {
    let nomRegExp = new RegExp("^[a-zA-Zçéèêëàâä -]{2,30}$", "g");
    let userMessageNom = inputNom.nextElementSibling;

    if (nomRegExp.test(inputNom.value)) {
      userMessageNom.innerHTML = "Votre nom est enregistré";
      userMessageNom.classList.remove("text-danger");
      userMessageNom.classList.add("text-success");
      return true;
    } else {
      userMessageNom.innerHTML = "Nom invalide";
      userMessageNom.classList.remove("text-success");
      userMessageNom.classList.add("text-danger");
      return false;
    }
  }

  static validEmail(inputEmail) {
    let emailRegExp = new RegExp(
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      "g"
    );
    let userMessageEmail = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      userMessageEmail.innerHTML = "Votre email est enregistré";
      userMessageEmail.classList.remove("text-danger");
      userMessageEmail.classList.add("text-success");
      return true;
    } else {
      userMessageEmail.innerHTML = "Email invalide";
      userMessageEmail.classList.remove("text-success");
      userMessageEmail.classList.add("text-danger");
      return false;
    }
  }

  static validAdresse(inputAdresse) {
    let AdresseRegExp = new RegExp("^[a-zA-Z0-9.-_ çéèêëàâä]{5,100}$", "g");
    let userMessageAdresse = inputAdresse.nextElementSibling;

    if (AdresseRegExp.test(inputAdresse.value)) {
      userMessageAdresse.innerHTML = "Votre adresse est enregistrée";
      userMessageAdresse.classList.remove("text-danger");
      userMessageAdresse.classList.add("text-success");
      return true;
    } else {
      userMessageAdresse.innerHTML = "Adresse invalide";
      userMessageAdresse.classList.remove("text-success");
      userMessageAdresse.classList.add("text-danger");
      return false;
    }
  }

  static validVille(inputVille) {
    let villeRegExp = new RegExp("^[a-zA-Z0-9.-_çéèêëàâä ]{5,60}$", "g");
    let userMessageVille = inputVille.nextElementSibling;

    if (villeRegExp.test(inputVille.value)) {
      userMessageVille.innerHTML = "Votre ville est enregistrée";
      userMessageVille.classList.remove("text-danger");
      userMessageVille.classList.add("text-success");
      return true;
    } else {
      userMessageVille.innerHTML = "Ville invalide";
      userMessageVille.classList.remove("text-success");
      userMessageVille.classList.add("text-danger");
      return false;
    }
  }

  static validCodePostal(inputCodePostal) {
    let codePostalRegExp = new RegExp("^[0-9]{5}$", "g");
    let userMessageCodePostal = inputCodePostal.nextElementSibling;

    if (codePostalRegExp.test(inputCodePostal.value)) {
      userMessageCodePostal.innerHTML = "Votre code postal est enregistré";
      userMessageCodePostal.classList.remove("text-danger");
      userMessageCodePostal.classList.add("text-success");
      return true;
    } else {
      userMessageCodePostal.innerHTML = "Code postal invalide";
      userMessageCodePostal.classList.remove("text-success");
      userMessageCodePostal.classList.add("text-danger");
      return false;
    }
  }

  static validPays(inputPays) {
    const pays = document.querySelector(".pays").value;
    console.log(pays);
    let userMessageCodePostal = inputPays.nextElementSibling;

    if (pays === "Choisissez votre pays") {
      userMessageCodePostal.innerHTML = "Pays invalide";
      userMessageCodePostal.classList.remove("text-success");
      userMessageCodePostal.classList.add("text-danger");
      return false;
    } else {
      userMessageCodePostal.innerHTML = "Votre pays est enregistré";
      userMessageCodePostal.classList.remove("text-danger");
      userMessageCodePostal.classList.add("text-success");
      return true;
    }
  }
}

//---------------------Méthode : Sécurisation des champs de saisies




// Création d'une Class Order : Représentera une commande

class Order {
  constructor(id, productName, image, price, color, quantity, unitPrice, numProd) {
    this.id = id;
    this.productName = productName;
    this.image = image;
    this.price = price;
    this.color = color;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.numProd = numProd;
  }
}

// Store Class : gérer le stockage de la commande

class Store {
  //---------------------Méthode : Récupère et stock les commandes dans localStorage en les transformant en un objet dans un tableau

  static getOrders() {
    let orders;
    if (localStorage.getItem("orders") === null) {
      orders = [];
    } else {
      orders = JSON.parse(localStorage.getItem("orders"));
    }

    return orders;
  }

  //---------------------Méthode : Ajout de commande dans le localStorage + Mise à jour de la commande si une commande du produit a déjà été passée

  static addOrder(userOrder) {
    const orders = Store.getOrders();
    let prodExist = false;
    // ici on controle si un type de teddy de la même couleur existe déjà--> si oui on met à jour la base
    orders.forEach((order, index) => {
      if (order.id === userOrder.id && order.color === userOrder.color) {
        orders[index].price =
          parseFloat(orders[index].price) + parseFloat(userOrder.price);
        orders[index].quantity =
          parseInt(orders[index].quantity) + parseInt(userOrder.quantity);
        localStorage.setItem("orders", JSON.stringify(orders));
        prodExist = true;
        return;
      }
    });

    if (!prodExist) {
      //alert('nouveau produit nouvelle couleur');
      orders.push(userOrder);
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }

  //---------------------Méthode : Supprimer une commande du localStorage de la clé Orders

  static removeOrder(numP) {
    const orders = Store.getOrders();

    orders.forEach((order, index) => {
      if (order.numProd == numP) {
        orders.splice(index, 1);
      }
    });

    localStorage.setItem("orders", JSON.stringify(orders));
  }

  //---------------------Méthode : Indique le nombre de commandes dans le panier

  static cartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers === null) {
      productNumbers = 0;
    }
    productNumbers = parseInt(productNumbers);
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(
      ".showNumberOfProductInCart"
    ).textContent = localStorage.getItem("cartNumbers");

    return productNumbers;
  }

  //---------------------Méthode : Supprimer une commande du localStorage de la clé cartNumbers

  static removeCartNumbers() {
    const productNumbers = Store.cartNumbers();
    console.log(productNumbers);
  }
}

// Afficher les commandes

if (list) {
  CartUI.displayOrders();

  // Supprimer les commandes de l'UI et du localStorage
  function removeAnOrder(e) {
    const numP = e.target.getAttribute("numProd");
    console.log(numP);
    Store.removeOrder(numP);
    window.location.reload();
  }
}


// Calculer le total à payer

CartUI.totalPrice();

// Mise à jour prix en fonction de la quantité

function changeCartPrice(e) {
  CartUI.upDatePriceOrder(e);
  CartUI.totalPrice();
  window.location.reload();
}

// Afficher le total à payer

CartUI.displayTotalPrice();

//Event : Sécurisation champs de saisies form

let form = document.querySelector("#orderForm");

form.prenom.addEventListener('change', function () {
  CartUI.validPrenom(this);
});
form.nom.addEventListener("change", function () {
  CartUI.validNom(this);
});
form.email.addEventListener("change", function () {
  CartUI.validEmail(this);
});
form.adresse.addEventListener("change", function () {
  CartUI.validAdresse(this);
});
form.ville.addEventListener("change", function () {
  CartUI.validVille(this);
});
form.codePostal.addEventListener("change", function () {
  CartUI.validCodePostal(this);
});
form.pays.addEventListener("change", function () {
  CartUI.validPays(this);
});

//Event : Bloque envoi form si champs non-valides

let sendBtn = document.querySelector(".addCartBtn");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    CartUI.validPrenom(form.prenom) &&
    CartUI.validNom(form.nom) &&
    CartUI.validEmail(form.email) &&
    CartUI.validAdresse(form.adresse) &&
    CartUI.validVille(form.ville) &&
    CartUI.validCodePostal(form.codePostal) &&
    CartUI.validPays(form.pays)
  ) {
    form.submit();
  };
});

  //----------------------------------------------------------------------------------------------------------------------------------------------//

  // Bootstrap code : Contrôle le remplissage des champs et impossible d'envoyer le formulaire si pas fait

//   (function () {
//     "use strict";

//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     var forms = document.querySelectorAll(".needs-validation");

//     // Loop over them and prevent submission
//     Array.prototype.slice.call(forms).forEach(function (form) {
//       form.addEventListener(
//         "submit",
//         function (event) {
//           if (!form.checkValidity()) {
//             event.preventDefault();
//             event.stopPropagation();
//           }

//           form.classList.add("was-validated");
//         },
//         false
//       );
//     });
//   }
// )();

