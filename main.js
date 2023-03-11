let moodOfColor = document.querySelector('.edit');

let title = document.querySelector('#title');

let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let totleHtm = document.querySelector('.totle');

let count = document.querySelector('#count');
let catagory = document.querySelector('#catagory');

let create = document.querySelector('#create');

let search = document.querySelector('#search');
let byTitle = document.querySelector('#byTitle');
let byCatego = document.querySelector('#byCatego');
let mood = 'create' ;
let temp ; 



//Dark Mood 
moodOfColor.addEventListener("click" ,  ()=> {
        moodOfColor.classList.toggle("bi-moon"); 

        if (moodOfColor.classList.toggle('bi-brightness-high-fill')) {
            document.body.style.background = 'rgb(255, 255, 255)';
            document.body.style.color = 'rgb(0, 0, 0)';
            document.body.style.transition = '0.5s' ;
        }else{
            document.body.style.background = '#121212';
            document.body.style.color = 'rgb(255, 255, 255)';
            document.body.style.transition = '0.5s' ;
        }
});


let totla ; 

function totlaOfNumber() {
    totla = +price.value + +ads.value + +taxes.value - +discount.value ;
    totleHtm.innerHTML = totla ;

    if (totla != "" ) {
        totleHtm.style.background = "#16FF00"
    }else{
        totleHtm.style.background = "#ff0000"
    }

}

let proData ;

if (localStorage.prodect != null) {
    proData = JSON.parse(localStorage.getItem("prodect"))
}else{
    proData = [] ;
}


create.onclick =  function () {

    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value ,
        ads : ads.value,
        discount : discount.value ,
        total :totleHtm.innerHTML,
        count : count.value,
        category :catagory.value, 
    } 


    if (mood === 'create') {
        if (newPro.count > 1 ) {
            for (let i = 0; i < newPro.count; i++) {
                proData.push(newPro);
            }
        }else{
            proData.push(newPro);
        }
    }else{
        proData[temp] = newPro ;
        create.innerHTML = 'create' ;
        create.style.background = '#1e90ff';
        count.style.display = 'block';
    }

   

    localStorage.setItem("prodect" , JSON.stringify(proData));

    clearInput();
    showData();
    totleHtm.style.background = "#ff0000";
    totleHtm.innerHTML = "" ;
    
}


function clearInput () {
    title.value =  '' ;
    price.value  = '' ; 
    taxes.value  = '' ; 
    ads.value  = '' ; 
    discount.value = '' ; 
    totla.value = '' ; 
    count.value = '' ; 
    catagory.value = '';  
}



function showData () {

    let table ='' ;

    for (let i = 0; i < proData.length; i++) {
        table += `
     <tr>
        <td>${i+1}</td>
        <td>${proData[i].title}</td>
        <td>${proData[i].price}</td>
        <td>${proData[i].taxes}</td>
        <td>${proData[i].ads}</td>
        <td>${proData[i].discount}</td>
        <td>${proData[i].total}</td>
        <td>${proData[i].category}</td>
        <td><button onclick = "updata (${i}) ">update</button></td>
        <td><button onclick = "deleteItem(${i})">delete</button></td>
    </tr> `

    }

    let show = document.querySelector('#tTable');
    show.innerHTML = table ;

}


showData();

function deleteItem (i) {
    proData.splice(i,1);
    localStorage.prodect = JSON.stringify(proData);
    showData();
}


function deleteAll() {
    localStorage.clear();
    proData.splice(0);
    showData();
}

function updata (i) {
    title.value = proData[i].title;
    price.value = proData[i].price;
    taxes.value = proData[i].taxes;
    ads.value = proData[i].ads;
    discount.value = proData[i].discount;
    catagory.value = proData[i].category;
    count.style.display = "none";
    totlaOfNumber();
    scroll({
        top:0,
        behavior: 'smooth',
    });
    create.innerHTML = 'UpData';
    create.style.background = '#6096B4';
    mood = 'updata';
    temp = i ;
}


//search 

let moodOfSearch = 'title';

function getSearchMood(id) {
    if (id == 'byTitle') {
        search.placeholder = 'search used title';
        moodOfSearch = 'title';

    }else{
        search.placeholder = 'search used category';
        moodOfSearch = 'category';
    }
    console.log(moodOfSearch);
    search.focus();
}


function searchData (value) {

    let table = '' ;

   if (moodOfSearch = 'title') {
    
    for (let i = 0; i < proData.length; i++) {
        if (proData[i].title.includes(value)) {
            table += `
            <tr>
               <td>${i+1}</td>
               <td>${proData[i].title}</td>
               <td>${proData[i].price}</td>
               <td>${proData[i].taxes}</td>
               <td>${proData[i].ads}</td>
               <td>${proData[i].discount}</td>
               <td>${proData[i].total}</td>
               <td>${proData[i].category}</td>
               <td><button onclick = "updata (${i}) ">update</button></td>
               <td><button onclick = "deleteItem(${i})">delete</button></td>
           </tr> `;
       
        }
    }

   }
   else{



    for (let i = 0; i < proData.length; i++) {
        if (proData[i].category.includes(value)) {
            table += `
            <tr>
               <td>${i+1}</td>
               <td>${proData[i].title}</td>
               <td>${proData[i].price}</td>
               <td>${proData[i].taxes}</td>
               <td>${proData[i].ads}</td>
               <td>${proData[i].discount}</td>
               <td>${proData[i].total}</td>
               <td>${proData[i].category}</td>
               <td><button onclick = "updata (${i}) ">update</button></td>
               <td><button onclick = "deleteItem(${i})">delete</button></td>
           </tr> `;
       
        }
        
    }

   }

   let show = document.querySelector('#tTable');
   show.innerHTML = table ;

}
