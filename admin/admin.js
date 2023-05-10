// dummy data
import { data } from './dummy.js';

// 실제 data
// const admin_data = localStorage.getItem('admin');
// const data = JSON.parse(admin_data);

// 진행중인 주문 / 완료 주문 활성화 버튼
const inProgressButton = document.querySelector('#in-progress-order-button');
const orderContainer = document.querySelector('.order-container');
const completedButton = document.querySelector('#complete-order-button');
const completedOrderContainer = document.querySelector('.completed-order-container');

inProgressButton.addEventListener('click', () => {
    orderContainer.classList.toggle('active');
    completedOrderContainer.classList.remove('active'); 
    inProgressButton.classList.toggle('active');
    completedButton.classList.remove('active');
});

completedButton.addEventListener('click', () => {
    completedOrderContainer.classList.toggle('active');
    orderContainer.classList.remove('active');
    completedButton.classList.toggle('active');
    inProgressButton.classList.remove('active');
});

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
                <span class="food-state">${table_status}</span>
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

    const completeButtonWrap = document.createElement('div');
    completeButtonWrap.classList.add('complete-button-wrap');
    orderBox.appendChild(completeButtonWrap);

    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.classList.add('complete-button');
    
    // 진행 중인 주문이 맞으면 orderBox를 orderContainer에 추가
    if(table_status === '진행 중') {
        completeButtonWrap.appendChild(completeButton);
        orderContainer.appendChild(orderBox);
    } else {
        completedOrderContainer.appendChild(orderBox);
    }

    // 완료 버튼 누르면 진행중인 주문 -> 완료 주문 
    completeButton.addEventListener('click', () => {
        const foodState = orderBox.querySelector('.food-state');
        const orderId = orderBox.getAttribute('id').split('-')[2];
        const orderBoxIdDiv = document.querySelector(`#order-box-${orderId}`);
        console.log(orderId, order.id);

        // 주문 상태 변경하기 API 호출 
        const body = {
            state : "done"
        };

        fetch('/order/state/update/', {
            method: 'POST',
            body: JSON.stringify(body)
            })
            .then(response => {
                if (response.ok) {
                    console.log('상태 업데이트 요청이 성공적으로 전송되었습니다.');
                } else {
                    console.error('상태 업데이트 요청 전송 중 오류가 발생했습니다.');
                }
            })
            .catch(error => {
                console.error('상태 업데이트 요청이 실패했습니다:', error);
            });

        foodState.textContent = '완료'; // API 호출 시 삭제할 코드 (임시로 수동으로 바꿈)

        // 주문 상태 변경하기 API 호출 성공해서 status text가 완료로 바뀌면 div 이동
        if (foodState.textContent === '완료' && orderId == order.id) {
            orderContainer.removeChild(orderBoxIdDiv);
            completeButtonWrap.removeChild(completeButton);
            completedOrderContainer.appendChild(orderBoxIdDiv);
        }
    });
});
