let $form = document.querySelector(".form")
let $InpName = document.querySelector(".inp1")
let $InpEmail = document.querySelector(".inp2")
let $InpPass = document.querySelector(".inp3")
let $btn = document.getElementById("btn") 
$btn.addEventListener("click",()=>{

    const name  =  $InpName.value;
    const email = $InpEmail.value
    const pass = $InpPass.value
    if(name === "m" && email === "m02@gmail.com" && pass === "2002"){
    
    setTimeout(()=>{
    
    window.location.href = "music.html"
    alert("ro'yxatdan o'tdingiz")
    },1000)
    }else{
        alert("Qayerdadur xatolik bor")
    }
    })
9+8      