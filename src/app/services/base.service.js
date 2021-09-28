 let baseUrl = "https://nodeserver.mydevfactory.com:3301";
//  let baseUrl = "https://nodeserver.mydevfactory.com:4250";
// let baseUrl = "http://localhost:4250";
let userUrl = baseUrl + "/user/";
let appUrl = baseUrl + "/admin/";


const apiEnd = {
  registation: "registation",
  login: "login",
  ownDetails: "ownDetails",
  editDetails: "editDetails",
  changePassword: "changePassword",
  getCardDetails: "getCardDetails",
  addCardDetails: "addCardDetails",
  propertylist: "propertylist",
  addProperty: "addProperty",
  forgotPassword: "forgotPassword",
  sociaLogin: "sociaLogin",
  propertyCategoryList: "propertyCategoryList",
  propertyTypeList: "propertyTypeList",
  searchProperty: "searchProperty",
  propertyDetails: "propertyDetails",
  agentTypeList: "agentTypeList",
  subAgentTypeList: "sub_Agent_type_list",
  appoinmentList: "appoinmentList",
  bookingProperty: "bookingProperty",
  addInWishProperty: "add_in_wish_property",
  wishPropertyList: "wishPropertyList",
  removewishproperty: "remove_wish_property",
  customerappoinmentlist: "customer_appoinment_list",
  newsList: "newsList",
  searchPropertyAnyUser: "searchPropertyAnyUser",
  contactToAgent: "contactToAgent",
  removeProperty: "remove_property",
  activeAndDeactiveProperty: "activeAndDeactive_property",
  addUser_subscription: "addUser_subscription",
  UserSubscriptionList: "UserSubscriptionList",
  GetSubscriptionList: "GetSubscriptionList",
  contactUs: "contactUs",
  aboutUs: "aboutUs",
  getAgentList: "getAgentList",
  getAgentAndPropertyList: "getAgentAndPropertyList",
  getHomePagePropertylist: "get-HomePageProperty-list",
  getPropertylist: "getPropertylist",
  getPropertyAnyUser: "getPropertyAnyUser",
}

exports.BaseUrl = {
  apiUrl: (apiName) => {
    return userUrl + apiEnd[apiName];
  },
  userUrl: userUrl,
  appUrl: appUrl,
  baseUrl: baseUrl
}
