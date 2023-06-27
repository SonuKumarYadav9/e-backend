// import api from 'api';

// const sdk = api('@apis/v1.0#g4z18olj2chmiy');

// export const getOperatorCatList = async (req, res) => {
//   try {
//     const { data } = await sdk.getOperatorCategoryList();
//     console.log(data);
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: false, msg: error.message });
//   }
// };



import axios from "axios";

export const getOperatorCatList = async (req,res) => {
  try {
    const response = await axios.get('https://staging.eko.in:25004/ekoapi/v2/billpayments/operators_category', {
      headers: {
        'Content-Type': 'application/json',
        developer_key: 'becbbce45f79c6f5109f848acd540567',
        'secret-key': 'MC6dKW278tBef+AuqL/5rW2K3WgOegF0ZHLW/FriZQw=',
        'secret-key-timestamp':'1516705204593'
      }
    });

    const operatorCategories = response.data.data;
    console.log(operatorCategories);
    return res.status(200).send({status:true,msg:"success",data:operatorCategories})
  } catch (error) {
    console.error(error);
    return res.status(500).send({status:true,msg:"sever error ",msg:error.message})
  }
};


// Response is coming Cirtificate Expired 