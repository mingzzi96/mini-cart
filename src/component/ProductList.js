class ProductList {
  // 자기가 주입될 부모 돔의 위치를 $target으로 받고 초기 상태값을 initialData로 받는다.
  constructor($target, initialData) {
    this.$target = $target;
    this.state = initialData;
    this.render();
  }
  // 새로운 state를 받아서 새롭게 업데이트 해준다.
  setState(newState) {
    this.state = newState;
    this.render();
  }
  // state라는 큰 배열안에 들어있는 객체 하나가 Item이 된다
  render() {
    // 반드시 Join을 해줘야하는데.
    // 이렇게 해주게 되면 map 결과물들이 빈 문자열 기준으로 다 합쳐지면서 제대로된 string값을 얻을 수 있게된다.
    // 그 string을 받아온 $target에 innerHtml로 할당 가능!
    if (this.state.length === 0) {
      this.$target.innerHTML = '<h1>상품이 없습니다.</h1>';
    } else {
      this.$target.innerHTML = this.state
        .map((item) => {
          return `
        <article id="product-card">
          <div class="rounded-lg overflow-hidden border-2 relative">
            <img src=${item.imgSrc} class="object-center object-cover" />
            <div class="hover:bg-sky-500 w-full h-full absolute top-0 left-0 opacity-90 transition-colors ease-linear duration-75">
              <div
                data-productid=${item.id}
                class="hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center text-xl text-white font-bold cursor-pointer"
              >
                장바구니에 담기
              </div>
            </div>
          </div>
          <h3 class="mt-4 text-gray-700">${item.name}</h3>
          <p class="mt-1 text-lg font-semibold text-gray-900">${item.price}</p>
        </article>
        `;
        })
        .join('');
    }
  }
}
export default ProductList;
