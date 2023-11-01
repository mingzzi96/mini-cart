import getProductData from './api/getProductData.js';
import ProductList from './component/ProductList.js';

const $productListGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');

const productList = new ProductList($productListGrid, []);

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
};

fetchProductData();

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productListGrid.addEventListener('click', toggleCart);
