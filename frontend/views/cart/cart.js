
// Variable "oneOrder" : stockera le code html à afficher
let oneOrderHtml = "";

// Variable "list" : stock le html dy namique de la page cart.html
let list = document.querySelector(".productCartWrapper");

// Variable "price" : stockera le prix
let totalHtml = "";

// Variable "list" : stock le html dynamique de la page cart.html
let total = document.querySelector(".totalWrapper");

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
    let nomRegExp = new RegExp("^[a-zA-Zçéèêëàâä -]{2,60}$", "g");
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
    let villeRegExp = new RegExp("^[a-zA-Z.-_ çéèêëàâä]{2,60}$", "g");
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

// Création d'une Class Contact : Représentera les infos du user qui passe commande

class Contact {
  constructor(firstName, lastName, address, zipCode, city, country, userEmail) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.country = country;
    this.userEmail = userEmail;
  }
}

// Store Class : gérer le stockage de la commande et des infos client

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

  //---------------------Méthode : Récupère et stock le user contact dans localStorage en le transformant en un objet dans un tableau

  static getContact() {
    let contact;
    if (localStorage.getItem("contact") === null) {
      contact = [];
    } else {
      contact = JSON.parse(localStorage.getItem("contact"));
    }

    return contact;
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

  //---------------------Méthode : Ajout du contact dans le localStorage

  static addContact(userContact) {
    const contact = Store.getContact();
    contact.push(userContact);
    localStorage.setItem("contact", JSON.stringify(contact));
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

// Event : Sécurisation champs de saisies form

const form = document.querySelector("#orderForm");
const prenom = document.querySelector(".prenom");
const nom = document.querySelector(".nom");
const email = document.querySelector(".email");
const adresse = document.querySelector(".adresse");
const ville = document.querySelector(".ville");
const codePostal  = document.querySelector(".codePostal");
const pays = document.querySelector(".pays");

  // Récupèrer tous les inputs et les mettre dans un array

const inputs = document.querySelectorAll('.form-control');
let inputsArray = Array.prototype.slice.call(inputs);
console.log(inputsArray);

  // Looper sur le inputsArray pour écouter ce qu'il se passe dans les inputs

inputsArray.forEach((input) => {
  input.addEventListener('change', () => {
    CartUI.validPrenom(prenom);
    CartUI.validNom(nom);
    CartUI.validEmail(email);
    CartUI.validAdresse(adresse);
    CartUI.validVille(ville);
    CartUI.validCodePostal(codePostal);
  });
});

  // On écoute ce qu'il se passe sur le select

pays.addEventListener("change", () => {
  CartUI.validPays(pays);
});

// Event : Envoi une commande et infos client

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Récupérer les valeurs du contact form

  const firstName = document.querySelector(".prenom").value;
  const lastName = document.querySelector(".nom").value;
  const userEmail = document.querySelector(".email").value;
  const address = document.querySelector(".adresse").value;
  const city = document.querySelector(".ville").value;
  const zipCode = document.querySelector(".codePostal").value;
  const country = document.querySelector(".pays").value;

  // Créer une instance de Contact

  const contact = new Contact(
    firstName,
    lastName,
    address,
    zipCode,
    city,
    country,
    userEmail
  );

  // Bloquer envoi form si champs non-valides sinon va vers page confirmation de commande

  if (
    CartUI.validPrenom(prenom) &&
    CartUI.validNom(nom) &&
    CartUI.validEmail(email) &&
    CartUI.validAdresse(adresse) &&
    CartUI.validVille(ville) &&
    CartUI.validCodePostal(codePostal) &&
    CartUI.validPays(pays)
  ) {
    console.log(contact);
    // window.location.assign(
    //   window.location.origin +
    //     "/frontend/views/orderConfirmation/orderConfirmation.html"
    // );
    // form.submit();
  } else {
    CartUI.validPrenom(prenom);
    CartUI.validNom(nom);
    CartUI.validEmail(email);
    CartUI.validAdresse(adresse);
    CartUI.validVille(ville);
    CartUI.validCodePostal(codePostal);
    CartUI.validPays(pays);
  }

  // Ajouter un contact au Store

  Store.addContact(contact);
});


