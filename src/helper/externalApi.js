const axios = require("axios");


const planApi = "http://planapi.in/api/Mobile/DTHINFOCheck"

const offerCheckUrl = `http://planapi.in/api/Mobile/RofferCheck?apimember_id=4894&api_password=Sk957079@&`;
//*!plan Api 
// module.exports = function getMobilePlanUrl(mobile, operator) {
//     const apiUrl = `http://planapi.in/api/Mobile/RofferCheck`;
//     const operatorCodes = {
//       Airtel: 2,
//       Vodafone: 23,
//       Idea: 6,
//       Jio: 11,
//       BSNL: 5,
//     };
  
//     const operatorCode = operatorCodes[operator];
  
//     if (!operatorCode) {
//       throw new Error("Invalid operator");
//     }
  
//     const queryParams = {
//       apimember_id: 4894,
//       api_password: "Sk957079@",
//       operator_code: operatorCode,
//       mobile_no: mobile,
//     };
  
//     const urlWithQueryParams = `${apiUrl}?${new URLSearchParams(queryParams)}`;
  
//     return urlWithQueryParams;
//   };



const operatorFetchApi = `http://planapi.in/api/Mobile/OperatorFetchNew?ApiUserID=4894&ApiPassword=Sk957079@&Mobileno`;

  




module.exports = { planApi, operatorFetchApi,offerCheckUrl}




// const apiUrl = require('./path/to/apiUrl');

// const operatorFetch = async (req, res) => {
//   try {
//     const mobile = req.query.mobile; // taking mobile no from query

//     const response = await fetch(`${apiUrl}${mobile}`);
//     const responseData = await response.json();

//     // Rest of the code...
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ status: false, msg: error.message });
//   }
// };

// module.exports = { operatorFetch };


// const getMobilePlanUrl = require('./path-to-file/fileName.js');
// try {
//   const mobilePlanUrl = getMobilePlanUrl(mobileNumber, operator);

//   // Use the `mobilePlanUrl` in your API request
//   axios.get(mobilePlanUrl)
//     .then(response => {
//       // Handle the response data
//       console.log(response.data);
//     })
//     .catch(error => {
//       // Handle any errors
//       console.error(error);
//     });
// } catch (error) {
//   console.error(error.message);
// }