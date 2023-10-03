import httpClient from "../http-comanforcustomer";

const create = (data) => {
    // console.log("in create");
    // alert('in create')
    return httpClient.post('/add', data);
    // return ""
  };

  export default {create}