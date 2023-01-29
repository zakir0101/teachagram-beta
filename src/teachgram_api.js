import {address} from "./mode";
import React from "react";


async function post_message(msg) {
    let params = {
        "method": "POST",
        "mode": "cors",
        "headers": {
            // "Content-Type": "application/json; charset=utf-8"
            "Content-type": "text/plain"
        },
        "body": JSON.stringify(msg)
    }

    let response

    try {
        response = await fetch(address, params);
    } catch (error) {
        return {type: "error", msg: error};
    }

// Uses the 'optional chaining' operator
    if (!response?.ok)
        return {type: "error", msg: response?.status};

    try {
        let json = await response.json();
        return json;
    } catch (error) {
        try {
            response = await fetch(address, params);
            let text = await response.text();
            return {type: "error", msg: error + "<br/><br/><br/>" + text};
        } catch (error) {

            return {type: "error", msg: error}
        }

    }


}








async function post_message_action(msg, on_ERROR, on_SUCCESS, on_error) {
    let params = {
        "method": "POST",
        "mode": "cors",
        "headers": {
            // "Content-Type": "application/json; charset=utf-8"
            "Content-type": "text/plain"
        },
        "body": JSON.stringify(msg)
    }

    let response
    let  error
    try {
        response = await fetch(address, params);
    } catch (error) {
         error = {type: "error", msg: error};
        on_error(error.msg);
        return;
    }

// Uses the 'optional chaining' operator
    if (!response?.ok) {
         error = {type: "error", msg: response?.status}
        on_error(error.msg);
        return;
    }
    try {
        let json = await response.json();
        if (json.type && json.type === 'ERROR')
            on_ERROR(json.msg)
        else
            on_SUCCESS(json)
        return;
    } catch (error) {
        try {
            response = await fetch(address, params);
            let text = await response.text();
             error = {type: "error", msg: error + "<br/><br/><br/>" + text};
            on_error(error.msg);
            return;
        } catch (error) {
             error = {type: "error", msg: error};
            on_error(error.msg);
            return;
        }

    }

}
    export {post_message, post_message_action}