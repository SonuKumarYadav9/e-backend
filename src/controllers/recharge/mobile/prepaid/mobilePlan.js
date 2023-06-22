
import { offerCheckUrl } from "../../../../helper/externalApi.js";

const offerCheckApi = (req, res) => {
    try {
      const { mobile, operator } = req.body;
      let apiUrl = "";
  
      switch (operator) {
        case "Airtel":
          apiUrl = `${offerCheckUrl}operator_code=2&mobile_no=${mobile}`;
          break;
        case "Vodafone":
          apiUrl = `${offerCheckUrl}operator_code=23&mobile_no=${mobile}`;
          break;
        case "Idea":
          apiUrl = `${offerCheckUrl}operator_code=6&mobile_no=${mobile}`;
          break;
        case "Jio":
          apiUrl = `${offerCheckUrl}operator_code=11&mobile_no=${mobile}`;
          break;
        case "BSNL":
          apiUrl = `${offerCheckUrl}operator_code=5&mobile_no=${mobile}`;
          break;
        default:
          return res.status(400).send({ status: false, msg: "Invalid operator" });
      }
  
      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data);
          return res.status(200).send({ status: true, data: response.data });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).send({ status: false, msg: error.message });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  };

  export default offerCheckApi
  