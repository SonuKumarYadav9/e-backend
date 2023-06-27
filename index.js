import api from 'api';

const sdk = api('@apis/v1.0#g4z18olj2chmiy');

sdk.getOperatorCategoryList()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });