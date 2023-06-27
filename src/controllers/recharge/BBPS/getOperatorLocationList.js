import { BBPSoperatorLocationListApi } from "../../../helper/externalApi.js";


export const getOperatorLocation = async (req,res)=>{
    try {
        let response = await axios.get(`${BBPSoperatorLocationListApi}`,{
            headers: {
                'Content-Type': 'application/json',
                developer_key:'becbbce45f79c6f5109f848acd540567',
                'secret-key': 'MC6dKW278tBef+AuqL/5rW2K3WgOegF0ZHLW/FriZQw=',
                'secret-key-timestamp':'1516705204593'
              }
        })

        const operatorLocation = response.data.data;
        console.log(operatorLocation);
        return res.status(200).send({status:true,msg:"success",data:operatorLocation})
      } catch (error) {
        console.error(error);
        return res.status(500).send({status:true,msg:"sever error ",msg:error.message})
      }
};



