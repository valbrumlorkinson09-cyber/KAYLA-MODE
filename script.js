// =================================
// KAYLA MODE
// APPWRITE PRODUITS SYSTEM
// PATI 1
// =================================


// ================================
// APPWRITE CONFIG
// ================================

const client = new Appwrite.Client();

client
.setEndpoint(
"https://fra.cloud.appwrite.io/v1"
)
.setProject(
"6a7128570039e2aca907"
);


const tablesDB = new Appwrite.TablesDB(client);


// ================================
// DATABASE
// ================================

const DATABASE_ID =
"6a7128c7002e61a9b790";


const TABLE_ID =
"6a738074001c390f0373";



// ================================
// JWENN PWODWI APPWRITE
// ================================

async function jwennProduits(){


try{


let result =
await tablesDB.listRows({

databaseId: DATABASE_ID,

tableId: TABLE_ID

});



return result.rows;



}catch(error){


console.log(error);


return [];


}



}

// ================================
// AFFICHAGE PWODWI APPWRITE
// ================================


async function afficherProduits(){


let box = document.getElementById(
"productList"
);


if(!box){

return;

}



box.innerHTML =
"⏳ Chajman pwodwi...";



let produits = await jwennProduits();



box.innerHTML = "";



if(produits.length === 0){


box.innerHTML =
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

${produit.nom}

</h3>



<p>

📦 Stock: ${produit.stock || 0}

</p>



<p>

📂 ${produit.categorie || "Kategori"}

</p>



<p class="new-price">

${produit.prix} Gdes

</p>




<button onclick="ajoutePanier(${index})">

🛒 Panier

</button>



<button onclick="ajouteFavori(${index})">

❤️ Favori

</button>



</div>


`;



});


}

// ================================
// DEMARAJ KAYLA MODE
// ================================


document.addEventListener(
"DOMContentLoaded",
function(){


    afficherProduits();


});
