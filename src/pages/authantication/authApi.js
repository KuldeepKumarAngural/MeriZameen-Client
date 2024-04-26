
import axios from 'axios';
import { HEADERS } from '../../configuration/headers';
const BASE_ENDPOINT = process.env.REACT_APP_API_END_POINT;


export const signUpUser = async (credentials) =>{
  return await axios.post(BASE_ENDPOINT + '/auth/signup', {
    name:btoa(credentials.name) ,
    email:btoa(credentials.email),
    mobile:btoa(credentials.mobile),
    password:btoa(credentials.password)
  }, {
   }).then(function (response) {
    if (response.status === 200) {
      return {...response.data}
    }
  }).catch(function (error) {
    return  error ;
  });
  }

  export const loginUser = async (credentials) =>{
    return await axios.post(BASE_ENDPOINT + '/auth/login', {
      email:btoa(credentials.email || ""),
      password:btoa(credentials.password || "")
    }, {}).then(function (response) {
      if (response.status === 200) {
        return {...response.data}
      }
    }).catch(function (error) {
      return { error };
    });
  }


  export const logoutUser = async () =>{
    return await axios.post(BASE_ENDPOINT + '/auth/logout',  {}, {
      headers: HEADERS.AUTHENTIC(),
    }).then(function (response) {
      if (response.status === 200) {
        return {...response.data}
      }
    }).catch(function (error) {
      return { error };
    });
  }
