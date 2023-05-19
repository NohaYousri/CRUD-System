let title = document.getElementById ('title')
let price = document.getElementById ('price')
let taxes = document.getElementById ('taxes')
let ads = document.getElementById ('ads')
let total = document.getElementById ('total')
let discount = document.getElementById ('discount')
let category = document.getElementById ('category')
let count = document.getElementById ('count')
let submit = document.getElementById ('submit')

let mood = 'creat';
let tmp;
// get total price
function getTotal()
{
if (price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
}
// we add + before the values above so it can handle with them as numbers not strings
else {
    total.innerHTML='';
    total.style.background= '#a00d02';
}
}


// local storage
let dataPro;
if (localStorage.product != null){
    dataPro= JSON.parse(localStorage.product)
}else {
    dataPro =[];
}
// get product
submit.onclick = function () {
    let objpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
if (mood==='creat') 
{
//Count
    
if(objpro.count > 1)
{
    for(let i=0; i < objpro.count; i++) 
    {
        dataPro.push(objpro)
    }
    
}else {
    dataPro.push(objpro)
}
 
}else 
{
dataPro [tmp]=objpro;
mood='creat';
submit.innerHTML = 'creat';
count.style.display= 'block';
}
    
    
    localStorage.setItem('product', JSON.stringify(dataPro))
    console.log(dataPro)

    clearData()
    showData()

}

// clear inputs

function clearData() {

    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    //total isn't an input so we can't type .value that why we typed innerHTML
    count.value='';
    category.value='';

}

// read

function showData() 
{
getTotal()
let table ='';
for (let i=0; i< dataPro.length; i++) 
{
    //we added a + sign so not delete a row before 
table += 
` <tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td> <button onclick="updateData(${i})" id="update">Update</button></td>
<td> <button onclick="deleteData(${i})" id="delete">Delete</button></td>

</tr>
`
}
document.getElementById('tbody').innerHTML=table;
let btnDelete= document.getElementById('deleteAll');
if (dataPro.length > 0 )
{
    btnDelete.innerHTML= 
   `
   <button onclick="deleteAll()" > Delete All (${dataPro.length}) </button>
   `
} else 
{
    btnDelete.innerHTML='';
}
}
showData()
 
// delete

function deleteData(i)
{
  dataPro.splice(i,1);
  localStorage.product =JSON.stringify(dataPro);
  showData()
}

function deleteAll ()
{
    localStorage.clear ()
    dataPro.splice (0)
showData ()
}


// update

function updateData (i) 
{
title.value = dataPro[i].title;
price.value = dataPro[i].price;
taxes.value = dataPro[i].taxes;
ads.value = dataPro[i].ads;
discount.value = dataPro[i].discount;
category.value = dataPro[i].category;
getTotal()
count.style.display='none';
submit.innerHTML = 'Update';
mood= 'Update'
tmp=i;
scroll ({
    top:0,
    behavior:"smooth"
})

}

// search

let searchMood= 'title';

function getSearchMood (id) 
{
    let Search = document.getElementById('Search');

   if (id == 'searchTitle') 
   {
    searchMood= 'title';

   }else {

    searchMood= 'category';

   }

   Search.placeholer = 'search by'+ searchMood;
   Search.focus()

   Search.value ='';

   showData()
   
   
}

function searchData (value)
{  
    let table='';
    if ( searchMood == 'title') 
    {
     
    for (let i=0; i< dataPro.length; i++){

    if (dataPro[i].title.toLowerCase().includes(value.toLowerCase()) ){
        
                
        table += 
        ` <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td> <button onclick="updateData(${i})" id="update">Update</button></td>
        <td> <button onclick="deleteData(${i})" id="delete">Delete</button></td>
        
        </tr>
        `

    }

    }


    }
    else {
        for (let i=0; i< dataPro.length; i++){

            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                
                        
                table += 
                ` <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td> <button onclick="updateData(${i})" id="update">Update</button></td>
                <td> <button onclick="deleteData(${i})" id="delete">Delete</button></td>
                
                </tr>
                `}
            }
 
}   document.getElementById('tbody').innerHTML=table;
}
// clean data 






















