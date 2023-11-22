class CartList {
  // 자기가 주입될 부모 돔의 위치를 $target으로 받고 초기 상태값을 initialData로 받는다.
  constructor($target, initialData) {
    this.$target = $target;
    // 아이템 li들을 감싸줄 ul을 여기서 만들어준다.
    this.$container = document.createElement('ul');
    // 만들어준 ul의 클래스를 부여해준다.
    this.$container.className = 'divide-y divide-gray-200';
    // 가격의 합
    this.$totalCount = document.getElementById('total-count');
    this.state = initialData;
    // innerHTML은 string이 들어가야해서 사용 불가
    // this.$target.innerHTML;
    this.$target.append(this.$container);
    this.render();
  }
  // 새로운 state를 받아서 새롭게 업데이트 해준다.
  setState(newState) {
    this.state = newState;
    this.render();
  }

  // 추가할 productData를 파라미터로 받아온다.
  addCartItem(productData) {
    let newState;
    // 현재 장바구니에 내가 추가하고자 하는 아이템이 이미 있는지 없는지를 파악해야한다.
    // 현재 클릭된 아이템의 id 값 저장
    const clickedProductId = productData.id;
    // 지금 배열에 있는 Item 들 중에 현재 클릭된 Id가 있나 없나 확인.
    // findIndex로 찾는데, 없다면 -1을 반환하고 있다면 배열 속 해당 Item의 가장 첫번째 Item의 index를 반환한다.
    const checkedIndex = this.state.findIndex(
      (item) => item.id === clickedProductId
    );
    if (checkedIndex === -1) {
      // 처음 추가되는 상품이라면?
      // 현재 있는 데이터 뒤에다 추가 되어야하는 데이터와 count를 추가해 준다.
      newState = [...this.state, { ...productData, count: 1 }];
    } else {
      // 중복된다면? 상품을 다시 새로 추가하지 말고, 선택된 상품의 index(checkedIndex)의 Count를 1 증가시켜 준다.
      newState = [...this.state];
      newState[checkedIndex].count += 1;
    }
    this.setState(newState);
  }

  removeCartItem(id) {
    const newState = this.state.filter((item) => item.id !== id);
    // 선택한 아이템이 지워진 새로운 배열을 기존 배열에 새로 넣어준다.
    this.setState(newState);
  }

  // state라는 큰 배열안에 들어있는 객체 하나가 Item이 된다
  render() {
    this.$totalCount.innerHTML =
      this.state
        .reduce((acc, cur) => acc + cur.price * cur.count, 0)
        .toLocaleString() + '원';
    this.$container.innerHTML = this.state
      .map((item) => {
        return `
          <li class="flex py-6" id=${item.id}>
            <div
              class="h-24 w-24 overflow-hidden rounded-md border border-gray-200"
            >
              <img
                src=${item.imgSrc}
                class="h-full w-full object-cover object-center"
              />
            </div>
            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div
                  class="flex justify-between text-base font-medium text-gray-900"
                >
                  <h3>${item.name}</h3>
                  <p class="ml-4">${item.price.toLocaleString()}원</p>
                </div>
              </div>
              <div class="flex flex-1 items-end justify-between">
                <div class="flex text-gray-500">
                  <button class="decrease-btn">-</button>
                  <div class="mx-2 font-bold">${item.count}</div>
                  <button class="increase-btn">+</button>
                </div>
                <button
                  type="button"
                  class="font-medium text-sky-400 hover:text-sky-500"
                >
                  <p class="remove-btn">삭제하기</p>
                </button>
              </div>
            </div>
          </li>
        `;
      })
      .join('');
  }
}
export default CartList;
