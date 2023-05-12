// dummy data
//import { data } from '/dummy.js';

// 실제 data
// const admin_data = localStorage.getItem('admin');

// 검색버튼
const searchButton = document.querySelector(`#search_button`);
const orderContainer = document.querySelector('.order-container');


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
// 완료 버튼 누르면 진행중인 주문 -> 완료 주문
searchButton.addEventListener('click', () => {
    const keyword = document.querySelector(`#keyword`).value;
    console.log(keyword)
    // 주문 상태 변경하기 API 호출
    const body = {
        keyword: keyword
    };

    fetch('/order/search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') // csrftoken을 넣어줌
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (response.ok) {
                console.log('상태 업데이트 요청이 성공적으로 전송되었습니다.');
                return response.json();
            } else {
                throw new Error('상태 업데이트 요청 전송 중 오류가 발생했습니다.');
            }
        })
        .then(data => {
            orderContainer.innerHTML = ""
            data = JSON.parse(data);
            data.forEach(order => {
            const orderBox = document.createElement('div');
            orderBox.classList.add('order-box');
            orderBox.setAttribute('id', `order-box-${order.id}`);
            orderContainer.appendChild(orderBox);
            const table_status = order.status === 'in_progress' ? '진행 중' : '완료';
            // 생성된 HTML 요소에 데이터를 적용
            orderBox.innerHTML = `
                    <div class="order-info">
                        <div class="order-user-info">
                            <span class="order-time">${order.created_at}</span>
                            <span class="phone-number">${order.phone_number}</span>
                        </div>
                        <div class="order-table-info">
                            <span class="table-number">table ${order.table_num}</span>
                            <span class="">${order.id}</span>
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
                const foodStatus = document.createElement('span');
                foodStatus.classList.add('food-state');
                foodStatus.textContent = table_status
                foodInfoContainer.appendChild(foodStatus);
            });

            orderBox.appendChild(foodInfoContainer);

//            const completeButtonWrap = document.createElement('div');
//            completeButtonWrap.classList.add('complete-button-wrap');
//            orderBox.appendChild(completeButtonWrap);

//            const completeButton = document.createElement('button');
//            completeButton.textContent = '완료';
//            completeButton.classList.add('complete-button');

            orderContainer.appendChild(orderBox);

        })})
        .catch(error => {
            console.error('상태 업데이트 요청이 실패했습니다:', error);
        });

});
