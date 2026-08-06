// =================================
// KAYLA MODE
// APPWRITE ONLINE SHOP
// SCRIPT.JS NOUVO VERSION
// PATI 1/3
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

const storage = new Appwrite.Storage(client);



// ================================
// ID APPWRITE
// ================================


const DATABASE_ID =
"6a7128c7002e61a9b790";


const TABLE_ID =
"6a738074001c390f0373";


const BUCKET_ID =
"6a717118002542ff6ac8";




// ================================
// PWODWI GLOBAL
// ================================

let toutPwodwi = [];




// ================================
// CHÈCHE PWODWI NAN APPWRITE
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


console.log(
"Erè pwodwi:",
error
);


return [];


}



}





// ================================
// KREYE LIEN FOTO APPWRITE
// ================================


function jwennFoto(id){


if(!id){

return "images/logo.png";

}



return storage.getFileView(

BUCKET_ID,

id

);



}

// ================================
// AFFICHE PWODWI SOU SIT LA
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



toutPwodwi = await jwennProduits();



box.innerHTML = "";




if(toutPwodwi.length === 0){


box.innerHTML =
"<p>🛍️ Pa gen pwodwi pou kounya.</p>";


return;


}




toutPwodwi.forEach(function(produit,index){



let foto = produit.image;



if(foto && !foto.startsWith("http")){


foto = jwennFoto(foto);


}



box.innerHTML += `


<div class="product">


<span class="tag">

${produit.tag || "Nouvo"}

</span>



<img 
src="${foto || 'images/logo.png'}"
alt="${produit.nom}"
>



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



<button onclick="achteProduit(${index})">

🛒 Achte Kounya

</button>



</div>


`;



});



}




// ================================
// BOUTON ACHTE
// ================================


function achteProduit(index){


let produit = toutPwodwi[index];



if(!produit){

return;

}



let mesaj =

"🛍️ KAYLA MODE\n\n"+
"👗 Pwodwi: "+produit.nom+
"\n💰 Pri: "+produit.prix+
" Gdes"+
"\n📦 Stock: "+produit.stock;



window.open(

"https://wa.me/50955545291?text="+

encodeURIComponent(mesaj),

"_blank"

);



    }

// ================================
// RECHÈCH PWODWI
// ================================


function searchProduct(){


let input =
document.getElementById(
"searchBox"
);



let box =
document.getElementById(
"productList"
);



if(!input || !box){

return;

}



let rech =
input.value.toLowerCase();



let rezilta =
toutPwodwi.filter(function(produit){


return produit.nom
.toLowerCase()
.includes(rech);


});



box.innerHTML = "";



rezilta.forEach(function(produit){



let foto = produit.image;



if(foto && !foto.startsWith("http")){


foto = jwennFoto(foto);


}



box.innerHTML += `


<div class="product">


<img src="${foto || 'images/logo.png'}">


<h3>

${produit.nom}

</h3>


<p>

${produit.prix} Gdes

</p>



<button onclick="achteProduit(${toutPwodwi.indexOf(produit)})">

🛒 Achte Kounya

</button>



</div>


`;



});



}






// ================================
// DEMARAJ SIT LA
// ================================


document.addEventListener(

"DOMContentLoaded",

function(){


afficherProduits();


}

);
