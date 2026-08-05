// =================================
// KAYLA MODE ADMIN
// APPWRITE TABLESDB VERSION
// PATI 1/3
// =================================


// ================================
// APPWRITE CONFIG
// ================================


const {
Client,
TablesDB,
Storage,
ID,
Query
} = Appwrite;



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
// VARIABLES
// ================================


let fileImage = null;

let preview =
document.getElementById(
"previewPhoto"
);






// ================================
// LOGIN ADMIN
// ================================


function loginAdmin(){


let password =
document.getElementById(
"adminPassword"
).value;



if(password === "KAYLA2026"){


localStorage.setItem(
"adminLogin",
"true"
);



document.getElementById(
"loginBox"
).style.display="none";



document.getElementById(
"adminPanel"
).style.display="block";



afficherDashboard();



}else{


alert(
"Modpas la pa bon ❌"
);


}


}






function checkLogin(){


if(
localStorage.getItem(
"adminLogin"
)==="true"
){


document.getElementById(
"loginBox"
).style.display="none";



document.getElementById(
"adminPanel"
).style.display="block";


}


}







function logoutAdmin(){


localStorage.removeItem(
"adminLogin"
);



location.reload();


}







// ================================
// CHWA FOTO
// ================================


let photoInput =
document.getElementById(
"photoProduit"
);



if(photoInput){


photoInput.addEventListener(
"change",
function(){


fileImage =
this.files[0];



if(fileImage){


let reader =
new FileReader();



reader.onload =
function(e){


if(preview){

preview.src =
e.target.result;

}


}



reader.readAsDataURL(
fileImage
);



}



}

);


    }

// =================================
// PATI 2/3
// AJOUTE + AFFICHE PWODWI
// =================================


// ================================
// AJOUTE PWODWI
// ================================


async function ajouterProduit(){


let nom =
document.getElementById(
"nomProduit"
).value;



let pri =
document.getElementById(
"prixProduit"
).value;



let stock =
document.getElementById(
"stockProduit"
).value;



let ansyen =
document.getElementById(
"ancienPrix"
).value;



let kategori =
document.getElementById(
"categorieProduit"
).value;



let tag =
document.getElementById(
"tagProduit"
).value;




if(
nom === "" ||
pri === "" ||
!fileImage
){


alert(
"Ranpli tout enfòmasyon yo ❌"
);


return;


}



try{



// UPLOAD FOTO


let upload =
await storage.createFile(

BUCKET_ID,

ID.unique(),

fileImage

);





let imageURL =
storage.getFileView(

BUCKET_ID,

upload.$id

);






// AJOUTE NAN TABLE


await tablesDB.createRow(

DATABASE_ID,

TABLE_ID,

ID.unique(),

{


name: nom,


price: Number(pri),


stock: Number(stock) || 0,


image: imageURL.href,


ancienPrix: ansyen,


categorie: kategori,


tag: tag



}

);





alert(
"Pwodwi ajoute avèk siksè ✅"
);



netwayeForm();



afficherProduits();



}catch(error){



console.log(error);



alert(
error.message
);



}



}







// ================================
// NETWAYE FÒM
// ================================


function netwayeForm(){



document.getElementById(
"nomProduit"
).value="";



document.getElementById(
"prixProduit"
).value="";



document.getElementById(
"stockProduit"
).value="";



document.getElementById(
"ancienPrix"
).value="";



fileImage=null;



if(preview){

preview.src="";

}


}







// ================================
// AFFICHE PWODWI
// ================================


async function afficherProduits(){



let liste =
document.getElementById(
"listeProduits"
);



if(!liste){

return;

}



liste.innerHTML =
"⏳ Chajman...";




try{


let result =
await tablesDB.listRows(

DATABASE_ID,

TABLE_ID

);





liste.innerHTML="";



document.getElementById(
"totalProduits"
).innerHTML =
result.total;






if(result.rows.length === 0){


liste.innerHTML =
"🛍️ Pa gen pwodwi";


return;


}






result.rows.forEach(
function(produit){



liste.innerHTML += `


<div class="product-admin">


<img 
src="${produit.image}"
width="120"
>



<h3>

${produit.tag || "Nouvo"}
${produit.name}

</h3>



<p>
💰 ${produit.price} Gdes
</p>


<p>
📂 ${produit.categorie}
</p>


<p>
📦 Stock: ${produit.stock}
</p>




<button onclick="supprimerProduit('${produit.$id}')">

🗑️ Efase

</button>



</div>


`;



});




}catch(error){



console.log(error);



liste.innerHTML =
"❌ " + error.message;


}



}

// =================================
// PATI 3/3
// EFASE + RECHÈCH + DASHBOARD + START
// =================================


// ================================
// EFASE PWODWI
// ================================


async function supprimerProduit(id){


if(
confirm("Efase pwodwi sa?")
){


try{


await tablesDB.deleteRow(

DATABASE_ID,

TABLE_ID,

id

);



alert(
"Pwodwi efase ✅"
);



afficherProduits();



}catch(error){


console.log(error);



alert(
error.message
);



}



}



}







// ================================
// RECHÈCH PWODWI
// ================================


async function rechercherProduit(){


let rech =
document.getElementById(
"searchAdmin"
).value;



try{


let result =
await tablesDB.listRows(

DATABASE_ID,

TABLE_ID,

[

Query.search(
"name",
rech
)

]

);




let liste =
document.getElementById(
"listeProduits"
);



liste.innerHTML="";





result.rows.forEach(
function(produit){



liste.innerHTML += `


<div class="product-admin">


<img 
src="${produit.image}"
width="120"
>


<h3>
${produit.name}
</h3>


<p>
💰 ${produit.price} Gdes
</p>



</div>


`;



});





}catch(error){


console.log(error);


}



}








// ================================
// DASHBOARD
// ================================


async function afficherDashboard(){


try{


let result =
await tablesDB.listRows(

DATABASE_ID,

TABLE_ID

);




if(
document.getElementById(
"totalProduits"
)
){


document.getElementById(
"totalProduits"
).innerHTML =
result.total;


}



}catch(error){


console.log(error);


}



}







// ================================
// DEMARAJ ADMIN
// ================================


document.addEventListener(

"DOMContentLoaded",

function(){



checkLogin();



afficherProduits();



afficherDashboard();



}

);
