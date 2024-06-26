import React, { useEffect, useState, useRef } from 'react';
import { View, useColorScheme, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import * as types  from '../redux/types';
import axios from 'axios';

export const baseUrl = 'http://54.153.75.225/backend/api/v1/'
// shop/eat
//API END POINT LISTS  

export const register = 'auth/register'
export const login = 'auth/login'
export const verify_otp = 'auth/verify-otp'
export const shop_eat = 'shop/eat'
export const shop_eat_business = 'shop/eat/business'
export const shop_eat_business_id = 'shop/eat/business/id/'
export const shop_eat_menu_userid = 'shop/eat/menu/userid/'
export const shop_eat_cart = 'shop/eat/cart'
export const shop_eat_cart_id = 'shop/eat/cart/id/'
export const shop_eat_coupons_userid = 'shop/eat/coupons/userid/'
export const shop_eat_cart_apply_coupon = `shop/eat/cart/apply-coupon`;
export const user_payment_method = `user/payment-method`;
export const user_address = `user/address`;
export const shop_eat_cart_place_order = `shop/eat/cart/place-order`;
export const shop_eat_cart_book_dining = `shop/eat/cart/book-dining`;
export const shop_eat_cart_book_table = `shop/eat/cart/book-table`;
export const shop_eat_orders = `shop/eat/orders`;
export const delete_Update_Address = `user/address/id/`;
export const cancelOrders = `orders`;
export const vendor_reviews = `vendor/reviews`;
export const connect_people_create_post = `connect/people/create-post`;
export const connect_people_like_post = `connect/people/Like-post`;
export const connect_people_dislike_post = `connect/people/dislike-post`;
export const connect_people_add_comment = `connect/people/add-comment`;
export const connect_people_save_post = `connect/people/save-post/`;
export const connect_people_block_user = `connect/people/block-unblock-user`;
export const connect_people_home_page = `connect/people/home-page`;
export const connect_people_follow_user = `connect/people/follow-user/`;
export const connect_people_unfollow_user = `connect/people/unfollow-user/`;
export const connect_people_all_comments = `connect/people/all-comments/`;
export const connect_people_Delete_comment = `connect/people/delete-comment/`;
export const connect_people_Delete_post = `connect/people/delete-post/`;
export const connect_people_user_profile = `connect/people/user-profile/`;
export const connect_people_user_followersList = `/connect/people/followers/`;
export const connect_people_user_followingList = `/connect/people/followings/`;
export const connect_edit_testing_img = `/connect/people/create-post-test`;
export const connect_search_post = `/connect/people/posted-users`;
export const connect_edit_profile = `/connect/people/update-profile/`;
export const connet_likeDislike = `/connect/people/react-post`;
export const connect_liked_userslist = `/connect/people/liked-users/`
export const connect_edit_post = `/connect/people/update-post/`
export const connect_search_users = `/connect/people/profile-list`
export const connect_people_newPost = `/connect/people/create-new-post`
export const connect_people_newHomePage = `/connect/people/home-page-data?page_no=1&limit=10`




export const creation_categories = `/creation/common/categories`
export const creation_home = `/creation/common/home-page/51`
export const creation_startup = `/creation/common/home-page/57`
export const creation_Fashion = `/creation/common/home-page/52`
export const creation_Invention = `/creation/common/home-page/59`
export const creation_Commonhome = `/creation/common/home-page/`
export const creation_react = `/creation/common/react-article/`
export const creation_get_report = `/creation/common/report-reasons`
export const creation_post_report = `/creation/common/report-article/`
export const creation_article = `creation/common/get-article/`
export const creation_addPhoto = `/creation/common/add-profile-image`
export const creation_profile = `/creation/common/user-profile/`
export const creation_delete = `/creation/common/delete-article/`
export const creation_addViews = `/creation/common/add-views/`
export const creation_getNotifications = `/creation/common/get-notificationlist/`
export const creation_addComments = `/creation/common/add-comment/`
export const creation_reactComment = `/creation/common/react-comment/`
export const creation_getComment = `/creation/common/all-comments/`
export const creation_editComment = `/creation/common/edit-comment/`
export const creation_deleteComment = `/creation/common/delete-comment/`
export const creation_editArticle = `/creation/common/edit-article/`
export const creation_addView = `/creation/common/add-views/`
export const creation_getView = `/creation/common/suggested-articles-bycategory/`
export const creation_searchHome = `/creation/common/home-page/51?page_no=1&limit=10`
export const creation_deletenoti = `/creation/common/clear-notifications/`
export const notification_status = `/creation/common/update-notification-status/`



export const Invention_article = `creation/invention/get-article/`
export const Invention_contribute = `creation/invention/place-order/`
export const invention_home = `/creation/invention/home-page/59`
export const invention_search = `/creation/common/home-page/59?page_no=1&limit=10`
export const invention_profile = `/creation/invention/user-profile/`
export const inevtion_transaction = `/creation/invention/project-contribution-list/`
export const invention_suggested = `/creation/invention/suggested-articles-bycategory/59`
export const invention_edit = `/creation/invention/edit-article/`

export const startup_home = `/creation/startup/home-page/57`
export const Startup_article = `creation/startup/get-article/`
export const startup_profile = `/creation/startup/user-profile/`
export const startup_edit = `/creation/common/edit-article/`
export const startup_suggested = `/creation/invention/suggested-articles-bycategory/57`


//Remindaly
export const get_gropus = `/goaccounting/my-group`
export const get_details = `goaccounting/group-detail/`
export const get_memberList = `/goaccounting/all-member-list`
export const add_members = `goaccounting/add-group-members`
export const invite_user = `goaccounting/invite-user`
export const get_task = `/goaccounting/my-task`
export const add_task = `goaccounting/add-task`
export const creation = `invention/create-article`
export const recent_members = `goaccounting/recently-added-members`
export const deleteGroup_member = `goaccounting/delete-group-member`
export const group_detail = `goaccounting/my-task/`
export const task_comments = `goaccounting/task-comment-list`
export const postTask_comments = `goaccounting/task-comment`
export const getSub_comments = `/goaccounting/all-subcomments-on-comment`
export const edit_comments = `/goaccounting/edit-comment/`
export const delete_groupComments = `/goaccounting/delete-comment/`
export const edit_myTask = `/goaccounting/my-task/`
export const delete_myTask = `/goaccounting/my-task/`
export const edit_mygrp = `/goaccounting/my-group/`
export const request_list = `goaccounting/group-request-list`
export const home_details = `goaccounting/home-details`
export const home_detailTask = `goaccounting/get-home-details-task`
export const taskHideUnhide = `/goaccounting/hide-task/`
export const markasComplete = `/goaccounting/mark-as-complete`
export const manageGroup = `goaccounting/manage-group/`
export const deleteGroup = `goaccounting/delete-group/`
export const markasincomplete = `/goaccounting/mark-as-incomplete`
export const getUserNotification = `goaccounting/user-notificetion`
export const readNotification = `/goaccounting/read-notification/`
export const getRoutines = `/goaccounting/my-routines`
export const prefrence_list = `goaccounting/list-preference`
export const createRoutine = `/goaccounting/add-task`
export const detailRoutine = `goaccounting/routine-details/`
export const shareRoutine = `goaccounting/share-routine`
export const editComments = `goaccounting/edit-comment/`
export const clear_notification = `/goaccounting/clearallnotification`
export const shared_routinelisting = `goaccounting/shared-routine-listing`
export const accept_groupRequest = `/goaccounting/group-request-action/`
export const shared_groups = `goaccounting/shared-group`
export const get_listing = `/goaccounting/notes-listing`
export const notes_detail = `goaccounting/note-details/`
export const unpin_note = `/goaccounting/unpinned-note/`
export const pin_note = `/goaccounting/pinned-note/`
export const group_list = `goaccounting/group-list`
export const edit_notes = `goaccounting/edit-note/`
export const delete_notes = `goaccounting/delete-notes/`
export const share_routine = `goaccounting/notes-sharing`
export const remove_noteSharing = `/goaccounting/removenotessharing`


//entertainment 
export const shop_entertainment_home = 'shop/entertainment/home'
export const shop_entertainment_vendor_id = 'shop/entertainment/vendor/id/'
export const shop_entertainment_add_reviews = 'shop/entertainment/add-reviews/'
export const shop_entertainment_book_entertainment = 'shop/entertainment/book-entertainment'
export const vendor_places = `shop/entertainment/list`
export const vendor_detail = `shop/entertainment/id/`
export const add_cart = `shop/entertainment/cart`
export const update_card = `shop/entertainment/cart/id/`
export const add_review = `shop/entertainment/add-reviews`
export const get_coupons = `shop/entertainment/coupons/userid/`

//go expense
export const get_detailsGoExpense = `goaccounting/list-expense-category`
export const add_category = `goaccounting/add-category`
export const get_category = `goaccounting/list-expense-category`
export const delete_category = `/goaccounting/delete-category/`
export const add_subcategory = `goaccounting/add-subcategory`
export const get_subcategory = `goaccounting/list-expense-subcategory`
export const user_budgetary = `goaccounting/add-user-budgetary-restrication`
export const get_userBugetary = `goaccounting/list-budgetary-restrication`
export const delete_userBugetry = `goaccounting/delete-user-budgetary-restrication/`
export const edit_budgetary = `goaccounting/edit-user-budgetary-restrication/`
export const add_expenses = `goaccounting/add-user-expense`
export const get_expenses = `/goaccounting/alluserexpenses`
export const get_savedCards = `goaccounting/savedcards`
export const edit_expanse = `goaccounting/edit-expense/`
export const delte_expense = `goaccounting/delete-expense/`
export const recentExpanse_home = `goaccounting/expensehomescreen`
export const get_splitGroup = `goaccounting/split-group-list`
export const split_group = `goaccounting/add-split-group`
export const splitgroup_detil = `goaccounting/split-group-detail/`
export const add_splitBill = `goaccounting/add-split`
export const get_splitBill = `goaccounting/split-bill`
export const split_comments = `goaccounting/add-group-comments`
export const get_settleBill = `goaccounting/settle-bill`
export const settle_bill = `goaccounting/settle-bill`
export const rencent_expanses = `goaccounting/expensehomescreen`
export const saved_cards = `goaccounting/savedcards`

export const art_getCollection = `/creation/art/categories`
export const art_PostCollection = `/creation/art/create-article`
export const art_HomePage = `/creation/art/home-page?page_no=1&limit=10`
export const art_likeDislike = `/creation/art/react-article`
export const article_id = `/creation/art/get-article/`
export const all_coments = `/creation/art/all-comments/`
export const add_comments = `/creation/art/add-comment`
export const react_comments = `/creation/art/react-comment/`
export const delete_comments = `/creation/art/delete-comment/`
export const addProfile_image = `/creation/art/add-profile-image`
export const edit_comment = `/creation/art/edit-comment/`
export const get_profile = `/creation/art/user-profile/`
export const edit_article = `/creation/art/edit-article/`
export const delet_article = `/creation/art/delete-article/`
export const post_suggestion = `/creation/art/add-views/`
export const get_suggestion = `/creation/art/suggested-articles/`
export const get_reportSuggestion = `/creation/art/report-reasons`
export const post_reportSuggestion = `creation/art/report-article/`
export const art_notifications = `/creation/art/get-notificationlist/`
export const update_profileImg = `creation/art/update-profile-image`
export const clear_notifications = `creation/art/clear-notifications/53`

export const driver_dashboard = `connect/people/user-profile/29`;
export const driver_corporate_dashboard = `driver/corporate_dashboard`;
export const booking_complete_ride = `booking/complete_ride`;
export const driver_rides = `driver/rides`;
export const driver_ride_details = `driver/ride_details?ride_id=`;
export const user_notifications = 'user/notifications'
export const user_notification_change = 'user/notification_change'
export const driver_logout = 'driver/logout'
export const driver_change_status = 'driver/change_status'
export const booking_bid_price = 'booking/bid_price?ride_id='
export const driver_fuel_cost = 'driver/fuel_cost'
export const driver_referral_earning = 'driver/referral_earning'
export const driver_change_account_status = 'driver/change_account_status'

export const requestPostApi = async (endPoint, body, method, token) => {
  console.log('the token is :-', token, endPoint, body, method,)
  var header = {}
  if (token != '' && token != undefined) {
    header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, Accept: '*/*', }
  } else {
    header = { "Content-Type": "application/json", 'Accept': 'application/json', Accept: '*/*', }
  }

  var url = baseUrl + endPoint
  console.log('post Request Url:-' + url + '\n')
  console.log('the body data', body)
  // console.log(header + '\n')
  try {

    let response = await fetch(url, {
      method: method,
      body: body == '' ? '' : JSON.stringify(body),
      headers: header,
    }
    )
    let code = await response.status
    console.log('the api responce is', code)
    //  let responseJ = await response.json();
    //  console.log('the api responce is',responseJ.headers)
    if (code == 200) {
      let responseJson = await response.json();
      console.log(responseJson)
      return { responseJson: responseJson, err: null }
    } else if (code == 400 || code == 402) {
      let responseJson = await response.json();
      //Completion block 
      console.log(responseJson.message)
      return { responseJson: responseJson, err: responseJson.message }
    } else {
      let responseJson = await response.json();
      console.log(responseJson.message)
      return { responseJson: responseJson, err: responseJson.message }
    }
  } catch (error) {
    console.log('the error is', error)

    return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }
    // return {responseJson:null,err:error}
  }
}

export const requestGetApi = async (endPoint, body, method, token) => {
  console.log('the token is :-', token)
  var header = {}
  var url = baseUrl + endPoint

  if (token != '' && token != undefined) {
    header = { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token, 'Cache-Control': 'no-cache' }
  } else {
    header = {}
  }

  //url = url + objToQueryString(body)
  console.log('Request Url:-' + url + '\n')
  try {
    let response = await fetch(url, {
      method: method,
      headers: header,
    }
    )
    let code = await response.status
    console.log(code)
    if (code == 200) {
      let responseJson = await response.json();
      console.log('Code 200==>>', responseJson)
      return { responseJson: responseJson, err: null, code: code }
    } else if (code == 400) {
      return { responseJson: null, err: responseJson.message, code: code }

    } else if (code == 500) {
      console.log(response)

      return { responseJson: null, err: 'Something Went Wrong', code: code }

    } else {
      console.log(response)

      return { responseJson: null, err: 'Something went wrong!', code: code }
    }
  } catch (error) {
    console.error(error);
    return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.', code: 500 }

  }
}

export const postApiWithToken2 = async (token, endPoint, data) => {
  console.log('function called with 2');
  await axios
    .post(`${baseUrl}${endPoint}`, data, {
      headers:
        Object.keys(data).length > 0
          ? {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          }
          : {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log('error', error)
      if (error?.response?.status === 422) {
        // Alert.alert('', `${error.response.data.message}`);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
        console.log(error.response.headers);
      } else if (error?.response?.status === 404) {
        // Alert.alert('', `${error.response.data.message}`);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else if (error?.response?.status === 401) {
        // Alert.alert('', `${error.response.data.message}`);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else if (error?.response?.status === 500) {
        // Alert.alert('', `${error.response.data.message}`);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else {
        // Alert.alert('', `${error}`);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      }
    })
};


export const getNewsAPI = async (endPoint, paramsData) => {
  const url = baseUrl + endPoint + objToQueryString(paramsData);
  console.log('GET URL', url);
  return await axios
    .get(url)
    .then(res => {
      return {
        response: res?.data,
        status: true,
      };
    })
    .catch(err => {
      return {
        response: err,
        status: false,
      };
    });
};


export const requestPostApiMedia = async (endPoint, formData, method, token) => {
  var header = {}

  if (token != '' && token != undefined) {
    header = {
      'Content-type': 'multipart/form-data', 'apitoken': token, 'Cache-Control': 'no-cache'
    }
  } else {
    if (endPoint != signUpApi) {
      header = {
        'Content-type': 'multipart/form-data', 'Cache-Control': 'no-cache'
      }
    }
  }

  var url = baseUrl + endPoint
  console.log('Request Url:-' + url + '\n')
  console.log(formData + '\n')
  console.log('header', header, method, formData);
  try {
    let response = await fetch(url, {
      method: method,
      body: formData,

      headers: header,

    }
    )

    let code = await response.status
    console.log(code)

    if (code == 200) {
      let responseJson = await response.json();
      console.log(responseJson)
      return { responseJson: responseJson, err: null }
    } else if (code == 400) {
      let responseJson = await response.json();
      return { responseJson: null, err: responseJson.message }

    } else {

      return { responseJson: null, err: 'Something went wrong!' }
    }
  } catch (error) {
    console.error('the error of the uploade image is ==>>', error);
    return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }

  }
}
export const requestPostApiImages = async (endPoint, formData, method, token) => {
  var header = {}

  if (token != '' && token != undefined) {
    header = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    }
  } else {
    if (endPoint != signUpApi) {
      header = {
        'Content-type': 'multipart/form-data', 'Cache-Control': 'no-cache'
      }
    }
  }

  var url = baseUrl + endPoint
  console.log('Request Url:-' + url + '\n')
  console.log(formData + '\n')
  console.log('header', header, method, formData);
  try {
    let response = await fetch(url, {
      method: method,
      body: formData,

      headers: header,

    }
    )

    let code = await response.status
    console.log(code)

    if (code == 200) {
      let responseJson = await response.json();
      console.log(responseJson)
      return { responseJson: responseJson, err: null }
    } else if (code == 400) {
      let responseJson = await response.json();
      return { responseJson: null, err: responseJson.message }

    } else {

      return { responseJson: null, err: 'Something went wrong!' }
    }
  } catch (error) {
    console.error('the error of the uploade image is ==>>', error);
    return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }

  }
}

export const requestPostApiSignUp = async (endPoint, formData, method) => {
  var url = baseUrl + endPoint
  console.log('Request Url:-' + url + '\n')
  console.log(formData + '\n')

  try {
    let response = await fetch(url, {
      method: method,
      body: formData,
    }
    )

    let code = await response.status
    console.log(code)

    if (code == 200) {
      let responseJson = await response.json();
      console.log(responseJson)
      return { responseJson: responseJson, err: null }
    } else if (code == 400 || 402) {
      let responseJson = await response.json();
      console.log(responseJson)

      return { responseJson: null, err: responseJson.msg }

    } else {

      return { responseJson: null, err: 'Something went wrong!' }
    }
  } catch (error) {

    return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }
    console.error(error);
  }
}

const objToQueryString = (obj) => {

  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
}

export const getAPI = async (endPoint, paramsData = {}, token = '') => {
  const url = baseUrl + endPoint + objToQueryString(paramsData);
  console.log('GET URL:-', url);
  return await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      return {
        response: res?.data?.body,
        message: res?.data?.headers?.message,
        status: true,
      };
    })
    .catch(err => {
      return {
        response: err,
        message: err?.data?.headers?.message,
        status: false,
      };
    });
};

//function : get api
export const getApi = endPoint =>
  axios
    .get(`${baseUrl}${endPoint}`)
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
//function : post api
export const postApi = (endPoint, data) =>
  axios
    .post(`${baseUrl}${endPoint}`, data)
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
//function : get api with token
export const getApiWithToken = (token, endPoint) =>
  axios
    .get(`${baseUrl}${endPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
//function : post api with token
export const postApiWithToken = (token, endPoint, data) =>
  axios
    .post(`${baseUrl}${endPoint}`, data, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
//function : put api with token
// export const putApiWithToken = (token, endPoint, data) =>
//   axios
//     .put(`${baseUrl}${endPoint}`, data, {
//       headers: {
//         Authorization: `Bearer${token}`,
//         'Content-Type': 'application/json',
//         Accept: '*/*',
//       },
//     })
//     .then(res => {
//       console.log(res, 'res');
//       return res;
//     })
//     .catch(error => {
//       console.log('error', error);
//       if (error == `Error: Network Error`) {

//         Alert.alert(
//           '',
//           `Internet connection appears to be offline. Please check your internet connection and try again.`,
//         );
//       }
//       console.log('data', error.response.data);
//       console.log('status', error.response.status);
//       console.log('headers', error.response.headers);
//       return error;
//     });
export const putApiWithToken = (token, endPoint, data) =>
  axios
    .put(`${baseUrl}${endPoint}`, data, {
      headers:
        Object.keys(data).length > 0
          ? {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          }
          : {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error?.response?.status === 422) {
        // Alert.alert('', `${error.response.data.message}`);
        // Toast.show(error.response.data.message, Toast.SHORT);
        console.log('data', error.response.data);
        console.log('status', error.response.status);
        console.log(error.response.headers);
      } else if (error?.response?.status === 404) {
        // Alert.alert('', `${error.response.data.message}`);
        // Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else if (error?.response?.status === 401) {
        // Alert.alert('', `${error.response.data.message}`);
        // Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else if (error?.response?.status === 500) {
        // Alert.alert('', `${error.response.data.message}`);
        // Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      } else {
        // Alert.alert('', `${error}`);
        // Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error status', error?.response?.status);
        console.log('error message', error.response.data.message);
      }
    });