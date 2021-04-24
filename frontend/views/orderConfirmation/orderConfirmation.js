// Variable "userNameHtml" : stockera le nom du user
let userNameHtml = "";

// Variable "userName" : stock le html dy namique de la page cart.html
let userName = document.querySelector(".userName");

// Variable "userNameHtml" : stockera le nom du user
let priceOrderConfHtml = "";

// Variable "list" : stock le html dy namique de la page cart.html
let priceOrderConf = document.querySelector(".commandRecap");



//---------------------Envoi datas---------------------//

  // Récupérer la commande stocker dans localStorage
  const contact = JSON.parse(localStorage.getItem("contact"));
  const userOrders = JSON.parse(localStorage.getItem("orders"));

  // On profite pour calculer et sauvegarder le prix total de la commande dans une variable globale
  let totalOrderPrice = 0;

  // Sauvegarde des identifiants des produits
  let products = [];

  for (let i = 0; i < userOrders.length; i++){
      products.push(userOrders[i].id);
      let prodPrice = parseInt(userOrders[i].price);
      totalOrderPrice += prodPrice;
  }

  // Créer un objet comprenant les infos du client et sa commande
  const datasOrder = {
    contact,
    products,
  };

  // Transformer l'objet en chaîne de caractères
  const datas = JSON.stringify(datasOrder);
 console.log(datas);
  // Variable "orderConfirmationHtml" : stockera le code html à afficher
  let orderConfirmationHtml = "";

  // Variable "orderConfirmation" : stock le html dynamique de la page product.html
  let orderConfirmation = document.querySelector('.cart');
 
///______________________________________///
/// Connection API Teddies : POST /order ///
///______________________________________///

  App.postDatas("http://localhost:3000/api/teddies/order", datas).then(
    (response) => {
    // reponse reçue de la part du serveur
    console.log(response);

    orderConfirmationHtml += `<div class="row">
                                <div class="col-lg-12">
                                    <div class="userName">
                                      <h2 class="thankYou">Merci pour votre commande ${response.contact.firstName} ${response.contact.lastName}!</h2>
                                    </div>
                                    <hr>
                                </div>
                            </div>
                            <div class="row totalCommandRecap">
                                <div> 
                                    <div>
                                        <h3 class="commandNumber">Numéro de commande ${response.orderId}</h3>
                                    </div>
                                    <div class="gifBear">
                                        <iframe src="https://giphy.com/embed/12mPLWvJNrEIlG" width="480" height="435" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><a href="https://giphy.com/gifs/ours-12mPLWvJNrEIlG"></a>
                                    </div>
                                    <div class="commandRecap">
                                        <p class="commandRecap_paragraph"><strong>Total (TVA incluse)</strong></p>
                                        <p class="commandRecap_paragraph"><strong>${totalOrderPrice} €</strong></p>
                                    </div>
                                </div>
                            </div>
                          `;

      orderConfirmation.innerHTML = orderConfirmationHtml;
    }
  );

//////////////////////////////////////////////////////////////////////////////////////////////////////
//// Création d'une Class orderConfirmationUI : gérer les tâches de la vue orderconfirmation.html ////
//////////////////////////////////////////////////////////////////////////////////////////////////////

class orderConfirmationUI {
  //---------------------Méthode : Affiche prénom + nom client

  static displayInfoUser() {
    const nbContact = JSON.parse(localStorage.getItem("contact"));

    userNameHtml += `<h2 class="thankYou">Merci pour votre commande ${nbContact[0].firstName} ${nbContact[0].lastName}!</h2>`;
    userName.innerHTML = userNameHtml;
  }

  //---------------------Méthode : Affiche prix total payé

  static displayTotalPriceConfirmation() {
    priceOrderConfHtml += `
                    <p class="commandRecap_paragraph"><strong>Total (TVA incluse)</strong></p>
                    <p class="commandRecap_paragraph"><strong>${totalOrderPrice} €</strong></p>`;
    priceOrderConf.innerHTML = priceOrderConfHtml;
  }
}


//////.....................//////
////// Appel des fonctions //////
//////.....................//////

orderConfirmationUI.displayInfoUser();
orderConfirmationUI.displayTotalPriceConfirmation();