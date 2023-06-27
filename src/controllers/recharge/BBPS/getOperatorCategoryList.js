import axios from "axios";
import bcrypt from 'bcrypt';
import { BBPSoperatorCategoryListApi } from "../../../helper/externalApi.js";

export const getOperatorCatList = async (req, res) => {
  try {
    const key = "d2fe1d99-6298-4af2-8cc5-d97dcf46df30";

    //*! Encode it using base64
    const encodedKey = Buffer.from(key).toString('base64');

    //*! Get current timestamp in milliseconds since UNIX epoch as a string
    const secret_key_timestamp = String(Date.now());
    console.log(secret_key_timestamp)

    //*! Hash the timestamp using bcrypt
    const hash = await bcrypt.hash(secret_key_timestamp, 10);

    //*! Encode the bcrypt hash using base64
    const encodedHash = Buffer.from(hash).toString('base64');

    //*! Compute the signature by concatenating the encoded key and encoded hash
    const secret_key = encodedKey + encodedHash;
    console.log(secret_key);

    const response = await axios.get(BBPSoperatorCategoryListApi, {
      headers: {
        'Content-Type': 'application/json',
        developer_key: 'becbbce45f79c6f5109f848acd540567',
        'secret-key': secret_key,
        'secret-key-timestamp': secret_key_timestamp
      }
    });

    const operatorCategories = response.data.data;
    console.log(operatorCategories);
    return res.status(200).send({ status: true, msg: "success", data: operatorCategories });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, msg: "server error", error: error.message });
  }
};


//* Response is coming Cirtificate Expired 




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



