import {
    createNotificationApi,
    getAllNotificationApi,
    deleteNotificationApi,
    viewNotificationApi,
    updateNotificationApi
} from "../constants/ApiConfigs";
import { callApi } from "../utils/apiUtils";

export function createNotification(options= {}) {
    options = Object.assign({}, options);
   const config = {
       method: "post",
       body: JSON.stringify(options)
   }
   return callApi(
       createNotificationApi,
       config,
       null,
       null,
       false
   )
}; 

export function getAllNotification(options={}) {
    options = Object.assign({}, options);
    const config ={
        method: "post",
        body: JSON.stringify(options)
    }
    return callApi(
        getAllNotificationApi,
        config,
        null,
        null,
        false
    )
}

export function updateNotification(options={}) {
    options = Object.assign({}, options);
    const config = {
        method: "post",
        body: JSON.stringify(options)
    }
    return callApi(
        updateNotificationApi,
        config,
        null,
        null, 
        false
    )
}