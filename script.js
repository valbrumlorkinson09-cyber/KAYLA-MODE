 // KAYLA MODE - SCRIPT PRINCIPAL
// PANIER + FAVORI SYSTEM


// ===============================
// DATABASE
// ===============================


function jwennProduits(){

    return JSON.parse(
        localStorage.getItem("produits")
    ) || [];

}





// ===============================
// OUVRI DETAY PWODWI
// ===============================


function ouvriDetay(index){


    let produits = jwennProduits();


    let produit = produits[index];



    if(!produit){

        return;

    }



    localStorage.setItem(

        "produitChoisi",

        JSON.stringify(produit)

    );



    window.location.href="product.html";


}





// ===============================
// PANIER
// ===============================


function jwennPanier(){

    return JSON.parse(
        localStorage.getItem("panier")
    ) || [];

}




function sovePanier(panier){


    localStorage.setItem(

        "panier",

        JSON.stringify(panier)

    );


}





function ajoutePanier(index){


    let produits = jwennProduits();


    let produit = produits[index];
if(produit.stock <= 0){

    alert("Pwodwi sa pa disponib ankò ❌");

    return;

}


    if(!produit){

        return;

    }



    let panier = jwennPanier();





    let jwenn = panier.find(function(item){


        return item.nom === produit.nom;


    });






    if(jwenn){


        jwenn.kantite++;


    }else{


        panier.push({


            nom: produit.nom,


            prix: produit.prix,


            image: produit.image,


            kantite:1


        });


    }




    sovePanier(panier);


    afficherBadgePanier();


    alert("Pwodwi ajoute nan panier 🛒");


}







function totalPanier(){


    let panier = jwennPanier();


    let total = 0;



    panier.forEach(function(item){



        let pri = Number(

            String(item.prix)

            .replace(/\D/g,'')

        );



        total += pri * item.kantite;



    });



    return total;


}







// ===============================
// FAVORI
// ===============================


function jwennFavori(){


    return JSON.parse(

        localStorage.getItem("favori")

    ) || [];

}




function ajouteFavori(index){


    let produits = jwennProduits();


    let produit = produits[index];



    if(!produit){

        return;

    }





    let favori = jwennFavori();





    let deja = favori.find(function(item){


        return item.nom === produit.nom;


    });






    if(deja){


        alert("Pwodwi sa deja nan favori ❤️");

        return;


    }





    favori.push(produit);



    localStorage.setItem(

        "favori",

        JSON.stringify(favori)

    );



    alert("Ajoute nan favori ❤️");


}







// ===============================
// AFFICHAGE PWODWI
// ===============================


function afficherProduits(){


    let box = document.getElementById(

        "productList"

    );



    if(!box){

        return;

    }





    let produits = jwennProduits();



    box.innerHTML="";





    if(produits.length===0){


        box.innerHTML=

        "<p>🛍️ Pa gen pwodwi pou kounya.</p>";

        return;


    }





    produits.forEach(function(produit,index){



        box.innerHTML += `


        <div class="product">


        <span class="tag">

        ${produit.tag || "Nouvo"}

        </span>



        <img src="${produit.image || ''}">



        <h3>

        ${produit.nom || "Pwodwi"}

        </h3>

<p>
📦 Disponib: ${produit.stock || 0}
</p>

        <div class="stars">

        ★★★★★

        </div>



        <p>

        📂 ${produit.categorie || "Kategori"}

        </p>



        <p class="new-price">

        ${produit.prix || "0 Gdes"}

        </p>



        <button onclick="ajoutePanier(${index})">

        🛒 Panier

        </button>



        <button onclick="ajouteFavori(${index})">

        ❤️ Favori

        </button>



        <button onclick="ouvriDetay(${index})">

        👁️ Detay

        </button>



        </div>


        `;


    });



}







// ===============================
// RECHÈCH
// ===============================


function searchProduct(){



    let input=document.getElementById(

        "searchBox"

    );



    let box=document.getElementById(

        "productList"

    );



    if(!input || !box){

        return;

    }





    let rech=input.value.toLowerCase();



    let produits=jwennProduits();





    let rezilta=produits.filter(function(item){



        return item.nom

        .toLowerCase()

        .includes(rech);



    });





    box.innerHTML="";





    rezilta.forEach(function(produit){



        let index=produits.indexOf(produit);



        box.innerHTML += `


        <div class="product">


        <img src="${produit.image}">


        <h3>${produit.nom}</h3>


        <p>${produit.prix}</p>


        <button onclick="ajoutePanier(${index})">

        🛒 Panier

        </button>


        <button onclick="ouvriDetay(${index})">

        👁️ Detay

        </button>


        </div>


        `;



    });



}







// ===============================
// BADGE PANIER
// ===============================


function afficherBadgePanier(){


    let badge=document.getElementById(

        "cartCount"

    );



    if(!badge){

        return;

    }





    let total=0;



    jwennPanier().forEach(function(item){


        total += item.kantite;


    });




    badge.innerHTML=total;


}








// ===============================
// WHATSAPP
// ===============================


function voyePanierWhatsApp(){


    let panier=jwennPanier();



    if(panier.length===0){


        alert("Panier la vid ❌");

        return;

    }





    let mesaj=

    "🛒 KAYLA MODE\n\n";





    panier.forEach(function(item){


        mesaj +=

        "👗 "+item.nom+

        "\n📦 "+item.kantite+

        "\n💰 "+item.prix+

        "\n\n";


    });





    mesaj +=

    "💵 Total: "+totalPanier()+" Gdes";





    window.open(

    "https://wa.me/50955545291?text="+

    encodeURIComponent(mesaj),

    "_blank"

    );


}








// ===============================
// START
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


    afficherProduits();


    afficherBadgePanier();


});
