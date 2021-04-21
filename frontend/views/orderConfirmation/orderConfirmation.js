// Variable "userNameHtml" : stockera le nom du user
let userNameHtml = "";

// Variable "userName" : stock le html dy namique de la page cart.html
let userName = document.querySelector(".userName");

// Variable "userNameHtml" : stockera le nom du user
let priceOrderConfHtml = "";

// Variable "list" : stock le html dy namique de la page cart.html
let priceOrderConf = document.querySelector(".commandRecap");


class orderConfirmationUI {

    static displayInfoUser(){
        const nbContact = JSON.parse(localStorage.getItem("contact"));

        userNameHtml += `<h2 class="thankYou">Merci pour votre commande ${nbContact[0].firstName} ${nbContact[0].lastName}!</h2>`;
        userName.innerHTML = userNameHtml;
    }

    static displayTotalPriceConfirmation() {
        priceOrderConfHtml += `
                    <p class="commandRecap_paragraph"><strong>Total (TVA incluse)</strong></p>
                    <p class="commandRecap_paragraph"><strong>${CartUI.totalPrice()} €</strong></p>`;
        priceOrderConf.innerHTML = priceOrderConfHtml;

    }
    
}

orderConfirmationUI.displayInfoUser();
orderConfirmationUI.displayTotalPriceConfirmation();