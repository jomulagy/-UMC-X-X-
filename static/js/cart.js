var orders = localStorage.getItem('order');
var order = JSON.parse(orders);
var order_count = order.length;

function menu_load(){
    var target = document.getElementsByClassName("menu_wrap")[0]
    for (i=0; i<order.length; i++){
        let j = i+1
        var data = '<div id="menu_'+j+'" class="menu"> <div class="picture"> <img src="/img/example.png" alt=""></div><div class="option"> <div class="name box">'+order[i].name+'</div> <div class="price box">'+order[i].price+'</div> <div class="pack"> <div class="amount box"> <button id="'+j+'" class="down" onclick="down(this)"></button>  <p id="'+j+'_amount">'+order[i].amount+'</p> <button id="'+j+'" class="up" style="float: right;" onclick="up(this)"></button> </div> <div id="'+j+'_price_sum" class="price box">'+(order[i].price * order[i].amount)+'</div> </div> </div> </div>';
        target.innerHTML += data
    }
}

menu_load();
calculate();


function order_request(){
    document.getElementById('order_alert').style.display = "block";
    copy();
}

function back(){
    window.open("/index.html");
}

function order_yes(){
    var newWindow = window.open("http://kko.to/hD0-Cb93jJ", "_blank");
       setTimeout(function(){
        newWindow.close();
   }, 5000);
    window.open("/order_complete.html")
}


function modal_close(e){
    var id = e.getAttribute('target');
    var target = document.getElementById(id)
    target.style.display = "none";
}

function order_no(){
    document.getElementById('order_alert').style.display = "none";
}


function calculate(){
    console.log(order_count)
    var total =0;
    for (i = 1; i <= order_count; i++){
        console.log(i)
        var price = parseInt(document.getElementById("menu_"+i).getElementsByClassName('option')[0].getElementsByClassName('price')[0].innerText);
        console.log(i+"price : "+price)
        var amount = parseInt(document.getElementById(i+"_amount").innerText);
        console.log(i+"amount : "+amount)
        var sum = price * amount;
        console.log(sum)
        document.getElementById(i+"_price_sum").innerHTML = sum;
        total += sum;
    }
    document.getElementById("total_price").innerText = total;
}


function up(e){
    //수량 +1
    var id = e.getAttribute('id');
    var target = id + "_amount";
    var origin = parseInt(document.getElementById(target).innerText);
    document.getElementById(target).innerText = origin + 1;
    calculate();
}


function down(e){
    //수량 -1
    var id = e.getAttribute('id');
    var target = id + "_amount";
    var origin = parseInt(document.getElementById(target).innerText);
    if (origin-1 == -1){
        return
    }
    document.getElementById(target).innerText = origin - 1;
    calculate();
}







//copy
function copy() {
    var obj = document.getElementById("total_price");
    var range = document.createRange();
    range.selectNode(obj.childNodes[0]);  //텍스트 정보를 Range 객체에 저장
    var sel = window.getSelection();
    sel.removeAllRanges();  //기존 선택정보 삭제
    sel.addRange(range);  //텍스트 정보 선택
    document.execCommand("copy");  //복사
    sel.removeRange(range);  //선택 정보 삭제
  }