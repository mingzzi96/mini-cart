import getProductData from './api/getProductData.js';

// async 함수 생성.
const fetchProductData = async () => {
  // await으로 기다려서 받아온 값을 Result에 저장.
  const result = await getProductData();
  console.log(result);
};

fetchProductData();
