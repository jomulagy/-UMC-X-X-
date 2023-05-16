var orders = localStorage.getItem('order');
var order = JSON.parse(orders);
var order_count = order.length;

//메뉴 로드하기
function menu_load(){
    var target = document.getElementsByClassName("menu_wrap")[0]
    for (i=0; i<order.length; i++){
        let j = i+1
        var data = '<div id="menu_'+j+'" class="menu"> <div class="picture"> <img src="'+order[i].image+'" alt=""></div><div class="option"> <div class="name box">'+order[i].name+'</div> <div class="price box">'+order[i].price+'</div> <div class="pack"> <div class="amount box"> <button id="'+j+'" class="down" onclick="down(this)"></button>  <p id="'+j+'_amount">'+order[i].amount+'</p> <button id="'+j+'" class="up" style="float: right;" onclick="up(this)"></button> </div> <div id="'+j+'_price_sum" class="price box">'+(order[i].price * order[i].amount)+'</div> </div> </div> </div>';
        target.innerHTML += data
    }
}

menu_load();
calculate();

//주문하기
function order_request(){
    if(document.getElementById('table_number').value == ""){
        alert("테이블 번호를 입력해주세요.")
        return
    }
    if(document.getElementById('phone_number').value == ""){
        alert('휴대폰 번호를 입력해주세요.')
    }
    if(!document.getElementById('check_box').checked){
        alert('개인정보 수집에 동의해주세요.')
    }
    document.getElementById('order_alert').style.display = "block";
    copy();
}

//돌아가기
function back(){
    //수량이 0인 항목 삭제
    for (i = 0; i<order.length; i++){
        if(order[i].amount == 0){
            order.splice(i,1);
        }
    }
    //LocalStroage에 order배열 넣기
    localStorage.setItem('order',JSON.stringify(order));
    location.replace("/")
}

//주문하기 예
function order_yes(){
    //송금창 이동

   //주문 완료 페이지 이동
   localStorage.setItem('order',JSON.stringify(order))
    localStorage.setItem('table_number',document.getElementById('table_number').value);
    localStorage.setItem('phone_number',document.getElementById('phone_number').value);
    var newWindow = window.open("http://kko.to/hD0-Cb93jJ", "_blank");
    setTimeout(function(){
        newWindow.close();
    }, 1000);
    location.replace("/order_complete")
}

//모달 닫기
function modal_close(e){
    var id = e.getAttribute('target');
    var target = document.getElementById(id)
    target.style.display = "none";
}

//주문하기 아니오
function order_no(){
    document.getElementById('order_alert').style.display = "none";
}

//총 값 계산하기
function calculate(){
    var total =0;
    for (i = 1; i <= order_count; i++){
        var price = parseInt(document.getElementById("menu_"+i).getElementsByClassName('option')[0].getElementsByClassName('price')[0].innerText);
        var amount = parseInt(document.getElementById(i+"_amount").innerText);
        var sum = price * amount;
        document.getElementById(i+"_price_sum").innerHTML = sum;
        total += sum;
    }
    document.getElementById("total_price").innerText = total;
    localStorage.setItem('total_price',total);
}

//수량 더하기
function up(e){
    //수량 +1
    var id = e.getAttribute('id');
    var target = id + "_amount";
    var origin = parseInt(document.getElementById(target).innerText);
    document.getElementById(target).innerText = origin + 1;
    //다시 계산
    calculate();

    //이름 가져오기
    var name = document.getElementById("menu_"+id).getElementsByClassName('option')[0].getElementsByClassName('name')[0].innerText;

    //order 배열에 수량 +1
    for (i = 0; i<order.length; i++){
        if(order[i].name === name){
            order[i].amount += 1;
        }
    }
}

//수량 빼기
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

    //이름 가져오기
    var name = document.getElementById("menu_"+id).getElementsByClassName('option')[0].getElementsByClassName('name')[0].innerText;

    //order 배열에 수량 -1
    for (i = 0; i<order.length; i++){
        if(order[i].name === name){
            order[i].amount -= 1;
        }
    }
}

//copy
function copy() {
    //총 금액 클립보드에 복사
    var obj = document.getElementById("total_price");
    var range = document.createRange();
    range.selectNode(obj.childNodes[0]);  //텍스트 정보를 Range 객체에 저장
    var sel = window.getSelection();
    sel.removeAllRanges();  //기존 선택정보 삭제
    sel.addRange(range);  //텍스트 정보 선택
    document.execCommand("copy");  //복사
    sel.removeRange(range);  //선택 정보 삭제
  }

$(document).ready(function() {
  var phoneNumberInput = $('#phone_number');

  phoneNumberInput.on('input', function() {
    var phoneNumber = phoneNumberInput.val().replace(/-/g, '');

    var formattedPhoneNumber = '';
    if (phoneNumber.length > 0) {
      formattedPhoneNumber += phoneNumber.substring(0, 3);
    }
    if (phoneNumber.length > 3) {
      formattedPhoneNumber += '-' + phoneNumber.substring(3, 7);
    }
    if (phoneNumber.length > 7) {
      formattedPhoneNumber += '-' + phoneNumber.substring(7, 11);
    }

    phoneNumberInput.val(formattedPhoneNumber);
  });
});
