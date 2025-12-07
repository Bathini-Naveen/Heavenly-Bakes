function filterItems(category){
    console.log(category);
    let cards = document.querySelectorAll(".card")
    let buttons = document.querySelectorAll("#filter_btns>button")
    console.log(buttons);

    cards.forEach((card)=>{
        if(category == 'all'){
            card.style.display = "flex"
        }else{
            if(card.classList.contains(category)){
                card.style.display = "flex"
            }else{
                card.style.display ="none"
            }
            }
    })
    buttons.forEach((btn)=>{
        btn.classList.remove("active")  //it is used to remove the initial bgc of all 
    })
    event.target.classList.add("active")
}

// !Add to cart Quantity

let cart=[];

let  cards = document.querySelectorAll(".card")
cards.forEach((card)=>{
    let name = card.querySelector(".card_one>.card_info>h2").innerText;
        let price =Number( card.querySelector(".card_one>.card_info>p").innerText.replace("₹","").replace("/-",""))
        let quantity = card.querySelector(".card_two>.card_quantity>.quantity")
        // console.log(name);
        // console.log(price);
        // console.log(quantity);

       let plusBtn = card.querySelector(".plus")
       plusBtn.addEventListener("click",()=>{
       quantity.innerText =  Number(quantity.innerText)+1
       })

       let minusBtn = card.querySelector(".minus")
       minusBtn.addEventListener("click",()=>{
        let current = Number(quantity.innerText)
        if(current > 0){
            quantity.innerText = current-1
        }
        })
        // !
       let addbtn =  card.querySelector(".addtocart>button")
       addbtn.addEventListener("click",()=>{
        let qty = Number(quantity.innerText)
        if(qty > 0){
            let existingItem = cart.find(item=>item.name==name)
            if(existingItem){
                existingItem.qty += qty;
            }else{
                cart.push({name,qty,price})
                addbtn.style.background="pink"
            }
            updateCart()
        }else{
            alert("Please Add atleast 1 item")
        }
       })
          

       function updateCart(){
    let totalQty = 0;
    let totalprice = 0;

    cart.forEach((item)=>{
        totalQty  +=  item.qty;
        totalprice += item.price * item.qty;  //qty=quantity
    })
        let cart_qty = document.getElementById("cart_quantity")
        let cart_price = document.getElementById("cart_price")

        cart_qty.innerText = totalQty;
        cart_price.innerText =`₹${totalprice.toFixed(2)}`

        let item_img = document.querySelector('#item_img')
        console.log(item_img);
        let sidebar_items = document.querySelector('#sidebar_items')
        sidebar_items.innerHTML = ""
        cart.forEach((item)=>{
            sidebar_items.innerHTML +=`
            <div class='items_info'>
            <h3 style="color:red">Product:${item.name}</h3>
            <p style="font-weight:500">Quantity:${item.qty}</p>
            <h4>Price:₹${item.price}</h4>
            </div>
            <hr>
            `
        })
        
        let remove_item = document.querySelector('#remove_item')
        console.log(remove_item);   
}

})

// !Sidebar Functionality
let cart_icon =document.getElementById("cart_icon")
let sidebar = document.getElementById("sidebar")
cart_icon.addEventListener("click",()=>{
    sidebar.style.right="0px"
})

let close_sidebar = document.getElementById("close_sidebar")
close_sidebar.addEventListener("click",()=>{
    sidebar.style.right="-350px"
})

