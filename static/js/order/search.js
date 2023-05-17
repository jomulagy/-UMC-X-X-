// dummy data
//import { data } from './dummy.js';

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const orderContainer = document.querySelector('.order-container');
// const timeObj = {};
// 10초마다 업데이트
setInterval(updateState, 10000);

data.forEach(order => {
    const orderBox = document.createElement('div');
    orderBox.classList.add('order-box');
    orderBox.setAttribute('id', `order-box-${order.id}`);
    orderContainer.appendChild(orderBox);
    // timeObj[order.id] = order.created_at;

    // 생성된 HTML 요소에 데이터를 적용
    orderBox.innerHTML = `
        <div class="order-info">
            <div class="order-user-info">
                <span class="order-time">${order.created_at}</span>
                <span class="phone-number">${order.phone_number}</span>
            </div>
            <div class="order-table-info">
                <span class="table-number">table ${order.table_num}</span>
                <span class="order-number">${order.id}</span>
            </div>
        </div>
    `;

    const foodInfoContainer = document.createElement('div');
    foodInfoContainer.classList.add('food-info-container');

    // 주문에 포함된 메뉴 정보를 추가
    order.menues.forEach(menu => {
        const foodInfo = document.createElement('div');
        foodInfo.classList.add('food-info');
        foodInfo.innerHTML = `
            <div class="menu-wrap">
                <span class="food-name">${menu.name}</span>
                <span class="food-quantity">${menu.quantity}</span>
            </div>
        `;
        foodInfoContainer.appendChild(foodInfo);
    });

    orderBox.appendChild(foodInfoContainer);

    const inProgressWrap = document.createElement('div');
    inProgressWrap.classList.add('in-progress-wrap');
    orderBox.appendChild(inProgressWrap);

    const inProgress = document.createElement('div');
    inProgress.classList.add('in-progress');
    
    const orderId = orderBox.getAttribute('id').split('-')[2];
    const orderBoxIdDiv = document.querySelector(`#order-box-${orderId}`);
    
    inProgressWrap.appendChild(inProgress);
    orderContainer.appendChild(orderBox);

    if (order.status === 'checking'){
        inProgress.textContent = "checking.."
    }
    else if (order.status === 'in_progress'){
        inProgress.textContent = 'ing...'
    }
    else{
        inProgress.textContent = 'finish'
    }

    // 80분 경과 시 표시
    const isTimeOut = (datetime) => {
        // datetime: MM-DD HH:MM:SS 
        const now = new Date();
        const [, month, day, hour, minute] = datetime.match(/(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
        const year = now.getFullYear();
        const targetTime = new Date(`${year}-${month}-${day} ${hour}:${minute}`);
        const timeDiff = now - targetTime;
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        
        // 80분 이상 경과했는지 여부 확인
        if (minutesDiff >= 80) {
            return true;
        } else {
            return false;
        }
    }
    
    const datetime = order.created_at;
    const isOut = isTimeOut(datetime);
    
    if (isOut === true && orderId == order.id) {
        orderBoxIdDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    }

    orderContainer.style.display = 'none';
});

// 검색 버튼 누르면 입력한 전화번호에 해당되는 주문 리스트 보여주기
searchButton.addEventListener('click', () => {
    updateState()

    if (!searchButton.classList.contains('active')) {
        searchButton.classList.toggle('active');

        const inputValue = searchInput.value;

        data.forEach(order => {
            const phoneNumber = order.phone_number;
            const orderId = order.id;
            const orderBox = document.querySelector(`#order-box-${orderId}`);
                       
            if(inputValue == phoneNumber) {
                orderContainer.style.display = 'flex';
                orderBox.style.display = 'block';
            } else {
                orderBox.style.display = 'none';
            }
        })

    } else {
        searchButton.classList.remove('active');
    }

    // 검색 후 검색 버튼 초기 상태로 돌리기
    setTimeout(() => {
        searchButton.classList.remove('active');
    }, 150); 
});
     
// orderContainer의 모든 orderBox 요소를 가져옴
const orderBoxes = Array.from(orderContainer.getElementsByClassName('order-box'));

// orderBox id 정렬 => 가장 최근 주문이 첫 번째로 보이게
orderBoxes.sort((a, b) => {
    const idA = parseInt(a.getAttribute('id').split('-')[2]);
    const idB = parseInt(b.getAttribute('id').split('-')[2]);
    return idB - idA;
});

// 정렬된 orderBox를 orderContainer에 추가
orderBoxes.forEach((orderBox) => {
    orderContainer.appendChild(orderBox);
});

// 주문 home으로 돌아가기
const homeButton =  document.querySelector('#home-button');

homeButton.addEventListener('click', () => {
    window.location.href = '/'; // order home HTML 경로

});
$(document).ready(function() {
  var phoneNumberInput = $('#search-input');

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
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
function updateState() {
  $.ajax({
  url: '/order/search',
  method: 'GET',
  dataType: 'json',
  headers : {
        'X-CSRFToken': getCookie('csrftoken')
   },
  success: function(response) {
    response.data.forEach(data => {
        var order = $('.order-box').filter(function() {
          return $(this).attr("id").split("-").slice(-1)[0] === data.id.toString();
        });
        var state = order.children('.in-progress-wrap').children('.in-progress')

        if (data.status === 'checking'){

            state.text("checking..")
        }
        else if (data.status === 'in_progress'){
            state.text('ing...')
        }
        else{
            state.text('finish')
        }
    });
  },
  error: function(xhr, status, error) {
    // 데이터를 받아오는 과정에서 에러가 발생했을 때 수행할 동작을 여기에 작성합니다.
    console.error(error);
  }
});

}

