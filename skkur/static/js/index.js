var order = new Array();

function up(e){
    //수량 +1
    var id = e.getAttribute('id');
    var target = id + "_amount";
    var origin = parseInt(document.getElementById(target).innerText);
    document.getElementById(target).innerText = origin + 1;
}

function down(e){
    //수량 -1
    var id = e.getAttribute('id');
    var target = id + "_amount";
    var origin = parseInt(document.getElementById(target).innerText);
    if (origin-1 == 0){
        document.getElementById('order_alert').style.display = "block";
        return
    }
    document.getElementById(target).innerText = origin - 1;
}

function add(e){
    //장바구니 담기
    var id = e.getAttribute('id');
    var id_ = "menu_" + id;
    var parent = document.getElementById(id_).getElementsByClassName('option')[0];
    var name = parent.getElementsByClassName('name')[0].innerText;
    var price = parent.getElementsByClassName('price')[0].innerText;
    var target = id + "_amount";
    var amount = parseInt(document.getElementById(target).innerText);
    
    document.getElementById("add_alert").getElementsByClassName("modal_contents")[0].getElementsByClassName("modal_text")[0].innerHTML
    = name + " "+amount+"개를 장바구니에 담았습니다.";
    document.getElementById("add_alert").style.display = "block";

    document.getElementById(target).innerText = 1;

    var total = parseInt(document.getElementById('order_count').innerText);
    total_ = total + amount;
    document.getElementById('order_count').innerText = total_;

    add_order(name,amount,price);

    console.log(order);

}

function add_order(name, amount, price){
    for (i = 0; i<order.length-1; i++){
        if(order[i].name == name){
            order[i].amount += amount;
            return
        }
    }

    var data = new Object();
    data.name = name;
    data.amount = amount;
    data.price = price;
    
    order.push(data);
}

function make_order(){
    console.log(order)

    if (order[0] == null){
        document.getElementById("cart_alert").style.display = "block";
        return
    }

    var data = JSON.stringify(order);


    localStorage.setItem("order",data);
    window.open("/cart.html");
}

function modal_close(e){
    var id = e.getAttribute('target');
    var target = document.getElementById(id)
    target.style.display = "none";
}

// function open(e){
//     var id = e.getAttribute('target');
//     var target = document.getElementById(id)
//     target.style.display = "block";
// }


//double tap ignore
document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
         event.preventDefault(); 
       } 
   }, false);

var lastTouchEnd = 0; 

document.documentElement.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
         event.preventDefault(); 
       } lastTouchEnd = now; 
   }, false);
   