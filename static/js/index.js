var order = new Array();

//메뉴 로드하기 (장바구니에서 돌아온 상태일 때)
function load_menu() {

    if (localStorage.getItem("order") != null) {
        orders = localStorage.getItem("order");
        order = JSON.parse(orders)
        var total = 0;
        for (i = 0; i < order.length; i++) {
            total += order[i].amount;
        }
        document.getElementById('order_count').innerText = total;
    }
}
load_menu();


//수량 더하기
function up(e) {
    //수량 +1
    var id = e.getAttribute('id');
    var target = id + "_amount";
    var origin = parseInt(document.getElementById(target).innerText);
    document.getElementById(target).innerText = origin + 1;
}

//수량 빼기
function down(e) {
    //수량 -1
    var id = e.getAttribute('id');
    var target = id + "_amount";
    var origin = parseInt(document.getElementById(target).innerText);
    if (origin - 1 == 0) {
        document.getElementById('order_alert').style.display = "block";
        return
    }
    document.getElementById(target).innerText = origin - 1;
}

function add(e) {
    //장바구니 담기
    var id = e.getAttribute('id');
    var id_ = "menu_" + id;
    var parent = document.getElementById(id).getElementsByClassName('option')[0];
    var name = parent.getElementsByClassName('name')[0].innerText;
    var price = parent.getElementsByClassName('price')[0].innerText;
    var image = $(".picture > img").attr("src")
    console.log(image)
    var target = id + "_amount";
    var amount = parseInt(document.getElementById(target).innerText);

    //장바구니 담기 알림 창
    document.getElementById("add_alert").getElementsByClassName("modal_contents")[0].getElementsByClassName("modal_text")[0].innerHTML
        = name + " " + amount + "개를 장바구니에 담았습니다.";
    document.getElementById("add_alert").style.display = "block";

    //수량 초기화
    document.getElementById(target).innerText = 1;

    //총 담은 수량 반영
    var total = parseInt(document.getElementById('order_count').innerText);
    total_ = total + amount;
    document.getElementById('order_count').innerText = total_;

    //order 배열에 넣기
    add_order(name, amount, price, image);

}

//order 배열에 주문 추가
function add_order(name, amount, price, image) {
    for (i = 0; i < order.length; i++) {
        if (order[i].name == name) {
            order[i].amount += amount;
            return
        }
    }

    var data = new Object();
    data.name = name;
    data.amount = amount;
    data.price = price;
    data.image = image

    order.push(data);
}

//주문하기
function make_order() {

    //장바구니 Validation
    if (order[0] == null) {
        document.getElementById("cart_alert").style.display = "block";
        return
    }

    //order배열 JSON
    var data = JSON.stringify(order);

    //local storage 저장
    localStorage.setItem("order", data);
    //장바구니 페이지 이동
    location.replace("/cart");
}

//모달 닫기
function modal_close(e) {
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

window.onload = function() {
  localStorage.clear();
};
