const http = require('http'); // 서버를 만드는 모듈 불러옴
http.createServer((request, response) => { // 서버 만드는 메소드

  request.on("data", (data) => {
    console.log(data.toString());
  })
  // 외부에서 값을 보낼 때 받은 데이터를 data로 출력 할 수 있다.
  // toString()을 해주어야 문자열로 확인이 가능

  response.end();
  // 서버 요청이 끝나면 닫기
}).listen(8088);
// localhost:8088로 서버가 열러있음


console.log('server start!');

// ↓↓↓↓ postman에서 요청할 때 사용했던 코드 ↓↓↓↓

// var CryptoJS = require("crypto-js");
// // 인증관련 암호화 하기 위한 모듈 해시암호화 등에 사용 

// var SHA256 = CryptoJS.SHA256;
// var MD5 = CryptoJS.MD5;

// var shopCd = "poetdeaths";
// var cusNm = "정용재";
// var cusHp = "010-639-6384";
// var posNo = "1";
// var saleGb = "1";
// var itemsCnt = 2;
// var timestamp = "20201103141250";
// var items = [
//   {
//     itemCd: "7H26141",
//     itemNm: "VISCO PILE FLEECE_W",
//     sort: 1,
//     qty: 1,
//     sizeCode: "100",
//     colorCode: "800",
//     colorName: "BLUE",
//   },
//   {
//     itemCd: "7H70962",
//     itemNm: "아노락 패딩 자켓",
//     sort: 2,
//     qty: 3,
//     sizeCode: "105",
//     colorCode: "800",
//     colorName: "BLUE",
//   },
// ];


// var crypto1 = SHA256(
//   shopCd + cusNm + cusHp + posNo + saleGb + itemsCnt + timestamp
// ).toString();

// var hashKey = MD5(crypto1).toString();

// var output = {
//   shopCd,
//   cusNm,
//   cusHp,
//   posNo,
//   saleGb,
//   itemsCnt,
//   timestamp,
//   hashKey,
//   items,
// };

// pm.environment.set("request_body", JSON.stringify(output, null, 2));

// JSON.stringfy(데이터, replace, space)
// replace부분을 null로 넣고 space를 2로 넣어주면 가독성이 높아짐 (들여쓰기가 적용됨)

