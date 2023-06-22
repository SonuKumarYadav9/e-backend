
import { operatorFetchApi } from "../../../../helper/externalApi.js";

const operatorFetch = (req, res) => {
    const { mobile } = req.body; // taking mobile no from query
  
    axios
      .get(`${operatorFetchApi}=${mobile}`)
      .then((response) => {
        const responseData = response.data;
  
        if (responseData.ERROR === "0" && responseData.STATUS === "1") {
          const operatorData = {
            mobile: responseData.Mobile,
            operator: responseData.Operator,
            opCode: responseData.OpCode,
            circle: responseData.Circle,
            circleCode: responseData.CircleCode,
          };
          return res.status(200).send({ status: true, data: operatorData });
        } else {
          return res.status(404).send({
            status: false,
            msg: "Operator not fetched or Something Error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ status: false, msg: error.message });
      });
  };


  export default { operatorFetch }