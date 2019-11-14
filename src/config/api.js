/*
 *封装fetch
 * params:
 * method 请求方式 String 必填   GET   POST   PUT  DELETE
 * url 地址 String 必填
 * data:数据  对象
 *
 *
 */
//  判断对象有没有属性 是不是空
//  1.object.keys 转换成键值数组
//  2.用stringify进行转换
import {FAIL, SUCCESS} from "./base";

// api('GET','/api/goods');

function api(method,url,data) {
    method = method.toUpperCase().trim();
    let token = sessionStorage.getItem('token');
    let headers = {
        token
    };
    let option = {
        method,
        headers
    };
    if (method === 'GET' && data && Object.keys(data).length) {
        let str = '?';
        for (let i in data) {
            str += `${i}=${data[i]}&`
        }
        str = str.slice(0, -1);
        url += str;
    }
    if (method === 'POST' || method === 'PUT') {
        let body = JSON.stringify(data);
        headers['Content-type'] = 'application/json'
        option.body = body;
    }

    let promise = new Promise((resolve,reject)=>{
        fetch(url,option).then(res=>res.json())
            .then(data=>{
                let {code} = data;
                if(code == SUCCESS){
                    resolve(data);
                }else if(code == FAIL){
                    reject(data);
                }
            })
    })
    return promise
}

export {api};
