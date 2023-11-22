import getProductData from './api/getProductData.js';
import ProductList from './component/ProductList.js';
import CartList from './component/CartList.js';

const $productListGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');

// 장바구니 기능을 위한 상품 목록 데이터 저장
let productData = [];
// 인스턴스 생성
const productList = new ProductList($productListGrid, []);
const cartList = new CartList($cartList, []);

const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backdrop.hidden = !$backdrop.hidden;
};

// async 함수 생성.
const fetchProductData = async () => {
  // await으로 기다려서 받아온 값을 Result에 저장.
  const result = await getProductData();
  // productList는 초기에 빈 배열로 들어간다
  // 데이터가 다 받아와지고 난 뒤 setState를 해주자.
  // 그럼 원래 빈 배열인 상태에서 setState로 새 상태를 업데이트해주니까 그 업뎃된 값이 바로 들어가게되는 것.
  productList.setState(result);
  // 상품 목록 데이터 다 받아와지고 나면 productData 속에 넣어준다.
  productData = result;
};

fetchProductData();

const addCartItem = (e) => {
  // productData 안에서 클릭된 아이템과 같은 Id를 가진 객체를 찾아낸다.
  const clickedProduct = productData.find(
    (product) => product.id == e.target.dataset.productid
  );
  cartList.addCartItem(clickedProduct);
  toggleCart();
};

const removeCartItem = (e) => {
  // 현재 클릭된 상품을 장바구니에서 삭제한다.
  if (e.target.className === 'remove-btn') {
    // cartList 안에 어떤 요소를 킬릭해도 다 반응하니까 방어기제를 넣어준다.
    // 눌려진 요소의 Li에 id 값을 넘겨준다.
    // type of id를 콘솔에 찍어보면 string으로 넘겨주고 있으니, 정수로 변경시켜준 다음 보내자.
    const productId = parseInt(e.target.closest('li').id);
    cartList.removeCartItem(productId);
  }
};

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productListGrid.addEventListener('click', addCartItem);
$cartList.addEventListener('click', removeCartItem);
