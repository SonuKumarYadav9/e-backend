const axios = require("axios");


// const planApi = "http://planapi.in/api/Mobile/DTHINFOCheck"

const offerCheckUrl = `http://planapi.in/api/Mobile/RofferCheck?apimember_id=4894&api_password=Sk957079@&`;
//*!plan Api 

const operatorFetchApi = `http://planapi.in/api/Mobile/OperatorFetchNew?ApiUserID=4894&ApiPassword=Sk957079@&Mobileno`;

const rechargeAPi = `https://b2b.nkpays.in/API/TransactionAPI`


module.exports = { operatorFetchApi,offerCheckUrl,rechargeAPi}



