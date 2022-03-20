/**
 * 如果需要修改为正常上线模式，请注释下面mock的import代码
 * **/
//import "@/mock/index"
import CookieOperation from "@/utils/tools.js"
// 请在下方实现自己的后端通信函数
//import Vue from 'vue';
import axios from 'axios'
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials=true;

function request_json(back_func) {
    var data_list = []
    this.axios.get('/api/message').then((response) => {
        console.log(response)
        if (response.data["code"] != 201 && response.data["code"] != 200) {
            console.log("err")
            // return
        }
        data_list = response.data["data"]
        back_func(data_list)
        // return;
    }, (err) => {
        console.log(err)
        // return;
    })
}

async function send_json(title, messages) {
    var data = {title: title, content: messages}
    var str = "?"
    CookieOperation.getCookie("name", "Unknown")
    await this.axios.post('/api/message', JSON.stringify(data))
    .then((response) => {
        console.log(response)
        console.log("here!!!!!!!!!!!!!!!!!!!!")
        if (response.data["code"] != 201 && response.data["code"] != 200) {
            str =  '发送失败'
        }
        str =  '发送成功'
        console.log(response)
    }, (err) => {
        console.log(err)
        str =  '发送失败'
    })
    return str
}

export default {axios, request_json, send_json};