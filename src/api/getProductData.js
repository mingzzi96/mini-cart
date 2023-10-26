// url을 하드코딩으로 하는게 아니라 파라미터로 받아오게 할 것임.
const request = async (url) => {
  try {
    const response = await fetch(url);
    // response가 정상적으로 응답했을때만 데이터를 받아오도록.
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    // 만약 정상적으로 응답하지 못했다면 아래를 실행
    const errData = await response.json();
    // 당연히 error일 거고 throw해주면 아래 catch에서 잡는다.
    throw errData;
  } catch (error) {
    //error 핸들링
    console.error(error);
  }
};

const getProductData = async () => {
  // 위에서 정의된 request 함수를 호출하여 링크를 파라미터로 보내준다.
  const result = await request('./api/productData.json');
  // request로 받아온게 곧 우리가 필요로하는 data니까 result return
  return result;
};

export default getProductData;
