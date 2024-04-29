
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


  export const verify = async (credentials) =>{
    return await axios.post(BASE_ENDPOINT + '/auth/verify', {
     ...credentials
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


  export const sendEmailForotp = async (credentials) => {
    console.log(credentials);
    return await axios.post(BASE_ENDPOINT + '/user/otpRequestForPasswordChange', {
      email:credentials
    }, {}).then(function (response) {
      if (response.status === 200) {
        return {...response.data}
      }
    }).catch(function (error) {
      return { error };
    });
  }

  export const forgotPassword = async (credentials) => {
    return await axios.post(BASE_ENDPOINT + '/user/changePassword', {
     otp:btoa(credentials?.otp),
     id:btoa(credentials?.id ),
     password:btoa(credentials?.password)
    }, {}).then(function (response) {
      if (response.status === 200) {
        return {...response.data}
      }
    }).catch(function (error) {
      return { error };
    });
  }