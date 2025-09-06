const categoryContainer = document.getElementById("categoryContainer");
const newsContainer = document.getElementById("newsContainer");
const bookMarkContainer = document.getElementById("bookMarkContainer");
const bookmarkCount = document.getElementById("bookmarkCount")
let bm=[]
newsContainer.addEventListener("click", (e) => {
 /*  console.log(e.target.parentNode.parentNode.childNodes[3].innerHTML); */
  if (e.target.innerText === "bookmark") {
   /*  console.log("bookmark clicked"); */
    const title = e.target.parentNode.parentNode.childNodes[3].innerHTML;
    const id = e.target.parentNode.parentNode.childNodes[3].id;
  
    const exists = bm.find((item) => item.id === id);
   if (!exists) {
     bm.push({
       title: title,
       id: id,
     });
     historyBookMark(bm);
   }else{
    alert("already bookmarked")
   }
  }
});


//4 history bookmark

let a=0;
function historyBookMark(e) {
  
    
bookMarkContainer.innerHTML=""

     e.forEach((e) => {
       bookMarkContainer.innerHTML += `
    <div>
    <p>${e.title}</p>
    <button onclick="handleDeletebookmark('${e.id}')" class="historyDelete">delete</button>
    </div>
    `;
     });

bookmarkCount.innerText = bm.length;

} 

const handleDeletebookmark =(id)=>{
/*     console.log(id)  */
const filteredarray =bm.filter((e) => e.id !== id);

bm = filteredarray;
 historyBookMark(filteredarray); 


}
//1
const loadCategories = async()=>{
    try {
        const res =await fetch("https://news-api-fs.vercel.app/api/categories");
        const data = await res.json();
       showCategories(data.categories);

    } catch (error) {
        console.log(error);
    }
}
loadCategories()
//3 load news details 
const loadNewsDetail =async (id) => {
  try {
    const res =await fetch(`https://news-api-fs.vercel.app/api/news/${id}`);
    const data =await res.json();
    showNewsDetails(data.article);
  } catch (error) {
    console.log(error);
  }
};

// 3 show news details on modal
const showNewsDetails =(data)=>{
const detailsContainer = document.getElementById("detailsContainer");
detailsContainer.innerHTML = `
 <div>
      <h2 class="text-xs font-bold mb-4">${data.title}</h2>
      <img class="mb-2"  src=${data.images[3].url} />
      <p class="mb-2">${data.content} </p>
    </div>
`;
document.getElementById("my_modal_5").showModal();
}





//2
const loadCardNews =(id)=>{
   

    fetch(`https://news-api-fs.vercel.app/api/categories/${id}`)
      .then((res) => res.json())
      .then((data) => showCardNews(data.articles));

  /* const actives = document.getElementsByClassName("actives");ei line ta sob active class dhore anbe 
   console.log("aaaaaaaaa", actives);
  for (let i of actives) {
   
    i.classList.remove("border-b-4", "border-red-400");
  } 

    const actvBtnStart =  document.getElementById(`act-${id}`);
    
    actvBtnStart.classList.add("border-b-4", "border-red-400"); */
}

//2 show card news
const showCardNews =(news)=>{
   
  const newsContainer =  document.getElementById("newsContainer");
  newsContainer.innerHTML=""
 news.map((e)=>{
   newsContainer.innerHTML += `
    <div class="card bg-info h-96">
<img src="${e.image.srcset[8].url}" alt="">
<p id="${e.id}" >${e.title}</p>
<h6>${e.time}</h6>
<div class="flex justify-between">
   <button class="btn btn-info ">bookmark</button>
   <button onclick="loadNewsDetail('${e.id}')"  class="btn btn-danger">view details</button>
</div>

   </div>
   `;
 })


}


//1
const showCategories = (title) => {
 title.forEach(data => {
  
    categoryContainer.innerHTML += `
     <li id="act-${data.id}" onclick="loadCardNews('${data.id}')"   class="hover:border-b-4 hover:border-red-400 cursor-pointer actives">${data.title}</li>
    `;

 });

//here the code of event deligations

 //active ancor tag func
/*  categoryContainer.addEventListener("click",((e)=>{  */

/*  const actives = document.querySelectorAll("li");
 actives.forEach((e) => {
    console.log("aaaaaaaaa",e)
   e.classList.remove("border-b-4", "border-red-400");
 });  */ //eivabeo kora jay

  
/*   const actives = document.getElementsByClassName("actives"); */

/* console.log(Array.from(actives)); */ /* array te convert kroechi */

/* if (e.target.localName === "li") {
 
     e.target.classList.add("border-b-4", "border-red-400");
}
}))  */

};


