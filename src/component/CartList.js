class CartList {
  // 자기가 주입될 부모 돔의 위치를 $target으로 받고 초기 상태값을 initialData로 받는다.
  constructor($target, initialData) {
    this.$target = $target;
    // 아이템 li들을 감싸줄 ul을 여기서 만들어준다.
    this.$container = document.createElement('ul');
    // 만들어준 ul의 클래스를 부여해준다.
    this.$container.className = 'divide-y divide-gray-200';
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
  // state라는 큰 배열안에 들어있는 객체 하나가 Item이 된다
  render() {
    this.$container.innerHTML = this.state
      .map((item) => {
        return `
          <li class="flex py-6" id="4">
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
                  <p class="ml-4">${item.price.toLocaleString()}</p>
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
