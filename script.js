// KAYLA MODE - SCRIPT PRINCIPAL + PANIER


// ===============================
// OUVRI DETAY PWODWI
// ===============================

function ouvriDetay(index){

    let produits = JSON.parse(localStorage.getItem("produits")) || [];

    let produit = produits[index];


    localStorage.setItem(
        "produitChoisi",
        JSON.stringify(produit)
    );


    window.location.href = "product.html";

}







// ===============================
// PANIER SYSTEM
// ===============================


function jwennPanier(){

    return JSON.parse(localStorage.getItem("panier")) || [];

}





function sovePanier(panier){

    localStorage.setItem(
        "panier",
        JSON.stringify(panier)
    );

}





function ajoutePanier(index){


    let produits = JSON.parse(localStorage.getItem("produits")) || [];


    let produit = produits[index];


    let panier = jwennPanier();



    let dejaGenyen = panier.find(function(item){

        return item.nom === produit.nom;

    });




    if(dejaGenyen){


        dejaGenyen.kantite++;


    }else{


        panier.push({

            nom: produit.nom,

            prix: produit.prix,

            image: produit.image,

            kantite:1

        });


    }




    sovePanier(panier);



    alert("Pwodwi ajoute nan panier 🛒");


}








function totalPanier(){


    let panier = jwennPanier();


    let total = 0;



    panier.forEach(function(item){


        let pri = parseInt(
            item.prix.replace(/\D/g,'')
        );


        total += pri * item.kantite;



    });



    return total;


}






// ===============================
// AFFICHAGE PWODWI
// ===============================


function afficherProduits(){


    const productList = document.getElementById("productList");


    if(!productList){

        return;

    }



    let produits = JSON.parse(localStorage.getItem("produits")) || [];



    productList.innerHTML = "";




    if(produits.length === 0){


        productList.innerHTML = `

        <p>
        🛍️ Pa gen pwodwi pou kounya.
        </p>

        `;


        return;
        

    }
    produits.forEach(function(produit,index){



        productList.innerHTML += `


        <div class="product">


        <span class="tag">

        ${produit.tag || "Nouvo"}

        </span>




        <img src="${produit.image}" alt="${produit.nom}">





        <h3>

        ${produit.nom}

        </h3>





        <div class="stars">

        ★★★★★

        </div>





        <p>

        📂 ${produit.categorie || "Kategori"}

        </p>





        ${
        produit.ancienPrix 
        ? `<p class="old-price">${produit.ancienPrix}</p>`
        : ""
        }





        <p class="new-price">

        ${produit.prix}

        </p>





        <button onclick="ajoutePanier(${index})">

        🛒 Ajoute nan panier

        </button>





        <button onclick="ouvriDetay(${index})">

        👁️ Gade detay

        </button>





        </div>



        `;



    });



}









// ===============================
// RECHÈCH PWODWI
// ===============================


function searchProduct(){


    const searchBox = document.getElementById("searchBox");


    const rech = searchBox.value.toLowerCase();



    let produits = JSON.parse(localStorage.getItem("produits")) || [];



    const productList = document.getElementById("productList");



    if(!productList){

        return;

    }



    productList.innerHTML = "";





    produits.filter(function(produit){



        return (

            produit.nom.toLowerCase().includes(rech)

        );



    }).forEach(function(produit,index){



        productList.innerHTML += `



        <div class="product">


        <img src="${produit.image}">



        <h3>

        ${produit.nom}

        </h3>



        <p>

        ${produit.prix}

        </p>




        <button onclick="ajoutePanier(${index})">

        🛒 Ajoute nan panier

        </button>




        <button onclick="ouvriDetay(${index})">

        👁️ Gade detay

        </button>



        </div>



        `;



    });



        }
// ===============================
// AFFICHE PANIER NAN BADGE
// ===============================


function afficherBadgePanier(){


    const badge = document.getElementById("cartCount");


    if(!badge){

        return;

    }



    let panier = jwennPanier();



    let kantite = 0;



    panier.forEach(function(item){

        kantite += item.kantite;

    });



    badge.innerHTML = kantite;


}








// ===============================
// VIDER PANIER
// ===============================


function viderPanier(){


    localStorage.removeItem("panier");


    afficherBadgePanier();


}







// ===============================
// VOYE PANIER WHATSAPP
// ===============================


function voyePanierWhatsApp(){


    let panier = jwennPanier();



    if(panier.length === 0){


        alert("Panier la vid ❌");

        return;

    }




    let message = "🛒 KAYLA MODE - NOUVO KÒMANN\n\n";



    panier.forEach(function(item){


        message += 
        "👗 "+item.nom+
        "\n📦 Kantite: "+item.kantite+
        "\n💰 Pri: "+item.prix+
        "\n\n";


    });




    message += 
    "💵 Total: "+
    totalPanier()+
    " Gdes";




    let url = 
    "https://wa.me/50955545291?text="
    +
    encodeURIComponent(message);



    window.open(url,"_blank");

}







// ===============================
// CHAJMAN
// ===============================


afficherProduits();

afficherBadgePanier();
