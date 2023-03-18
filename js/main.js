var links= Array.from(document.querySelectorAll(".links li"))
let row= document.querySelector(".myrow")
var Nflag=0;
var Eflag=0;
var Aflag=0;
var Pflag=0;
var passflag=0;
var namebool=false;
var emailbool=false;
var agebool=false;
var phonebool=false;
var passbool=false;
var repassbool=false;
$(document).ready(()=>{
    $(".loading").fadeOut(500);
    $("body").css("overflow","visible")}
    
    )
    openpage("")
function openNav(){
  
let width =$(".inner").innerWidth();
$(".closeicon").addClass("fa-x").removeClass("fa-bars")


 $(".side-bar").animate({left:`0px`},500)
let count=25
let seconds=200;
for (let i=0;i<links.length;i++){
    if(i==0){
        seconds= seconds+100
        $(links[i]).animate({top:`${count}`},seconds)
    }
    else{
        count=count+40
        seconds= seconds+100
        $(links[i]).animate({top:`${count}`},seconds)
    }
    
}

}
function closeNav(){
  
     let width =$(".inner").innerWidth();
   $(".closeicon").addClass("fa-bars").removeClass("fa-x")
 $(".side-bar").animate({left:`-${width}px`},1000)
    let count=350
let seconds=200;
for(let i=4;i>=0;i--){
    count= count-30
    seconds= seconds+100
$(links[i]).animate({top:`${count}`},seconds)

}
}
$(".closeicon").click(()=>{

if ($(".side-bar").css("left")=='0px'){
    closeNav()
}
    else{
    
        openNav()
    }
})


async function openpage(id){
    let data=''
    if(id==""){
     data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)}
    else{

    }
    let res =await data.json()
  displayall(res,res.meals.length)
    
}
function displayall(res , len){
    $(".loading").fadeIn(200).fadeOut();
    $("#firstpage").addClass("d-block").removeClass("d-none")
    $("#firstpage").siblings().addClass("d-none").removeClass("d-block")
    let temp="";
    if (len==0){
       if (res.meals.length<20){
        len=    len =res.meals.length
       }
       else{
        len=20
       }
    }
    else{
        len =res.meals.length
    }
    for (let i=0;i<len;i++){
     
  temp+= `
    <div class="col-3" >
    <div onclick="displaydetails(${res.meals[i].idMeal})" class="img-search rounded-2" >
<img class="w-100" src="${res.meals[i].strMealThumb}" alt="">
<div class="layer d-flex align-items-center ps-2">
    <h2>
   ${res.meals[i].strMeal}
    </h2>
</div>
    </div>
    
</div>
    `}
$("#myrow1").html(temp)

}
$(".search-a").click(()=>{
let txt=""
  
    $("#search").addClass("d-block").removeClass("d-none")
    $("#search").siblings().addClass("d-none").removeClass("d-block")
 txt+=`<div class="col-6">
<input id="getname" onkeyup="searchbyname()" class="form-control bg-transparent text-white me-4 " type="text" placeholder="Search By Name"></div>
<div class="col-6"> <input id="getchar" onkeyup="searchbychar()" class="form-control bg-transparent text-white  " type="text" placeholder="Search By First Letter"></div>
<div class="row gy-4" id="innerrow"></div>
`
    $("#myrow2").html(txt)   

})
async function searchbyname(){
    $(".loading").fadeIn(300).fadeOut();
let txt=""
let val=document.getElementById("getname").value
let res= await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
res= await res.json()
for (let i=0;i<res.meals.length;i++){
    
   
    txt+= `
    <div class="col-3" >
    <div class="img-search rounded-2"  onclick="displaydetails(${res.meals[i].idMeal})">
<img class="w-100" src="${res.meals[i].strMealThumb}" alt="">
<div class="layer d-flex align-items-center ps-2">
    <h2>
   ${res.meals[i].strMeal}
    </h2>
</div>
    </div>
    
</div>
    `
}
$("#innerrow").html(txt)}

async function searchbychar(){
    $(".loading").fadeIn(300).fadeOut();
    let txt=""
    let val=document.getElementById("getchar").value
    if(val==""){val="a"}
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`)
    res= await res.json()
   
    for (let i=0;i<res.meals.length;i++){
        
       
        txt+= `
          <div class="col-3" >
          <div class="img-search rounded-2"  onclick="displaydetails(${res.meals[i].idMeal})">
      <img class="w-100" src="${res.meals[i].strMealThumb}" alt="">
      <div class="layer d-flex align-items-center ps-2">
          <h2>
         ${res.meals[i].strMeal}
          </h2>
      </div>
          </div>
          
      </div>
          `}
      $("#innerrow").html(txt)
}

async function displaydetails(id){
    $(".loading").fadeIn(300).fadeOut();
    $("#details").addClass("d-block").removeClass("d-none")
    $("#details").siblings().addClass("d-none").removeClass("d-block")
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    res= await res.json()
 
getdata(res)
}
function getdata(res) {
    let tag=""
    let ing=""
for(let i=1;i<=20;i++){
if (res.meals[0][`strIngredient${i}`]!="" && res.meals[0][`strIngredient${i}`]!=null){
    
    ing+=`<span class ="ing-list box px-2  py-1 rounded-2 m-2">${res.meals[0][`strIngredient${i}`]}</span>`
}}
let tags
if (res.meals[0].strTags!=null){
    tags= res.meals[0].strTags.split(",")}
else{
    tags=" "
}

if (tags.length>1){
    
for(let i=0;i<tags.length;i++){
  
        tag+=`<span class = "ing-list box1  p-1 rounded-1 m-1 mb-3">${tags[i]}</span>`
}
}

    let temp=""
    temp+=`    <div class="col-md-4">
    <img class="w-100 rounded-3" src="${res.meals[0].strMealThumb}" alt="">
        <h2> ${res.meals[0].strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instructions</h2>
    <p>${res.meals[0].strInstructions}  </p>
    <h3><span class="fw-bolder">Area : </span><span>${res.meals[0].strArea}   </span></h3>
    <h3><span class="fw-bolder">Category : </span> <span>${res.meals[0].strCategory}  </span></h3>
    <h3>Recipes :</h3>
    <div class="d-flex flex-wrap ing-list p-0">
      ${ing}
  
    </div>

   <h3>Tags :</h3>
    <div class=" d-flex  flex-wrap ing-list p-0">
    ${tag}
    </div>

    <a class="btn btn-success" href="${res.meals[0].strSource}" target ="_blank">Source</a>
    <a class= "btn btn-danger" href="${res.meals[0].strYoutube}" target ="_blank">Youtube</a>
</div>
`
$("#myrow3").html(temp)
}
$(".cata").click(()=>
{
    getCategory()
})
async function getCategory(){
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    res= await res.json()  
    let temp=''

    $("#categories").addClass("d-block").removeClass("d-none")
    $("#categories").siblings().addClass("d-none").removeClass("d-block")
    $(".loading").fadeIn(200).fadeOut();
    for (let i=0;i<res.categories.length;i++){
     let arr=   res.categories[i].strCategoryDescription.split(" ").slice(20)
     
       temp+=`<div class="col-3">
       <div onclick="getcatedata('${res.categories[i].strCategory}')" class="img-cate rounded-2 text-center" id="${res.categories[i].idCategory}">
   <img class="w-100" src="${res.categories[i].strCategoryThumb}" alt="">
   <div class="layer  p-2">
       <h2>
    ${res.categories[i].strCategory}
       </h2>
       <p class="text-center">${res.categories[i].strCategoryDescription.split(" ").splice(0,20).join(" ")}</p>
   </div>
       </div>
       
   </div>`
    }
    $('#myrow4').html(temp);
}
async function  getcatedata(type){
  
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${type}`)
    res= await res.json()  
  displayall(res,0)
 }
 $(".area").click(()=>
 {
     getarea()
 })
 async function getarea(){
    $(".loading").fadeIn(200).fadeOut();
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    res= await res.json()  
    $("#Area").addClass("d-block").removeClass("d-none")
    $("#Area").siblings().addClass("d-none").removeClass("d-block")
    let temp=''
    for (let i=0;i<res.meals.length;i++){
        temp+=`
        <div class="col-3">
            <div class="text-center area " onclick="getareadetails('${res.meals[i].strArea}')">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h2 class="pt-1"> ${res.meals[i].strArea}</h2>
            </div>
        </div>`
    }
    $('#myrow5').html(temp);
 }
 async function getareadetails(country){
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    res= await res.json()
 
  displayall(res,0)
 }
 $(".ingrediant").click(()=>
 {
   ingrediant()
 })
 async function ingrediant (){
    $(".loading").fadeIn(200).fadeOut();
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    res= await res.json()  
    $("#ingred").addClass("d-block").removeClass("d-none")
    $("#ingred").siblings().addClass("d-none").removeClass("d-block")  
     let temp=''
 
    for (let i=0;i<20;i++){
        temp+=`
        <div class="col-3">
        <div class="text-center list-ingred " onclick="getIngridDetails('${res.meals[i].strIngredient}')">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${res.meals[i].strIngredient}</h3>
          <p> ${res.meals[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
        </div>
    </div>`
    }
    $('#myrow6').html(temp);
 }
 async function getIngridDetails(ingred){
 
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`)
    res= await res.json()
    displayall(res,0)
 }
 $(".contact").click(()=>
 {  $("#Contact").addClass("d-block").removeClass("d-none")
 $("#Contact").siblings().addClass("d-none").removeClass("d-block")  
$(".contactform input").keyup(()=>{
formvalid()
})
 })

 function isname(val){
  let result= /^[a-zA-Z]{2,}/.test(val)
  return result
 }
 function isrepass(val){
if (document.getElementById("pass").value==val){
    return true
}
else{
    return false
}
 }
 function isvalidpass(val){
let result=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(val)
return result;
 }
function ismail(val){
    //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
let result= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
return result
}
function isage(num){
let result =/^(1[89]|[2-9]\d)$/.test(num)
return result
}
function isphone(num){
    let result =/^01[0125][0-9]{8}$/.test(num)
    return result
}
function formvalid(){
    nameformvalid()
    emailformvalid()
    phoneformvalid()
    ageValid()
    passvalid()
    matchpass()
    if ( namebool==true&&
         emailbool==true&&
         agebool==true&&
         phonebool==true&&
         passbool==true&&
         repassbool==true){
            $("#formBtn").removeClass("disabled")
         }
         else  {   $("#formBtn").addClass("disabled")
        }
}
function nameformvalid(){
   
    $("#name").focus(function (){      Nflag =1     
        })
    if (Nflag==0){
        $("#nameAlert").addClass("d-block").removeClass("d-none")
        namebool=false
    }
  let val= document.getElementById("name").value
       
        if (isname(val)==true ){
           $("#nameAlert").addClass("d-none").removeClass("d-block")
           namebool=true
        }
        else{
            $("#nameAlert").addClass("d-block").removeClass("d-none")
            namebool=false
        }
 
      
}
        function emailformvalid(){
    
    $("#email").focus(function (){      Eflag =1     
    })
    if (Eflag==0){
        $("#mailAlert").addClass("d-block").removeClass("d-none")
        emailbool=false
    }
        let val= document.getElementById("email").value
        
if (ismail(val)==true){
$("#mailAlert").addClass("d-none").removeClass("d-block")
emailbool=true
}
else{
    $("#mailAlert").addClass("d-block").removeClass("d-none")
    emailbool=false
}
}function phoneformvalid(){

    $("#phone").focus(function (){      Pflag =1     
    })
    if (Pflag==0){
        $("#phoneAlert").addClass("d-block").removeClass("d-none")
        phonebool=false}
        let val= document.getElementById("phone").value
   
        
        if (isphone(val)==true){
        $("#phoneAlert").addClass("d-none").removeClass("d-block")
        phonebool=true
        }
        else{
            $("#phoneAlert").addClass("d-block").removeClass("d-none")
            phonebool=false
        }
        }


function ageValid(){

$("#Age").focus(function (){      Aflag =1     
})
if (Aflag==0){
    $("#ageAlert").addClass("d-block").removeClass("d-none")
    agebool=false}
    let val=document.getElementById("Age").value
    if (isage(val)==true){
    $("#ageAlert").addClass("d-none").removeClass("d-block");
    agebool=true;
    }
    else{
        $("#ageAlert").addClass("d-block").removeClass("d-none")
        agebool=false
    }
    }
    
function passvalid(){
    $("#pass").focus(function (){      passflag =1     
    })
    if (passflag==0){
    $("#passAlert").addClass("d-block").removeClass("d-none")
    passbool=false}
    let val=document.getElementById("pass").value
  
    if (isvalidpass(val)==true){
    $("#passAlert").addClass("d-none").removeClass("d-block")
      passbool=true    
}
    else{
        $("#passAlert").addClass("d-block").removeClass("d-none")
        passbool=false
    }
}
function matchpass(){

    let val=document.getElementById("repass").value
    if (isrepass(val)==true)
    {
    
    $("#repassAlert").addClass("d-none").removeClass("d-block")
    repassbool=true;
    }
    else{
        $("#repassAlert").addClass("d-block").removeClass("d-none")
        repassbool=false
    }
}