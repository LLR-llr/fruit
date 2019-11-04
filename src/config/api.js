// 封装fetch
/**
 *
 * @param method
 * @param url
 * @param data
 */
import base from './base';
function api(method,url,data) {
    method=method.toUpperCase().trim();
    let token=sessionStorage.getItem('token');
    let headers={
        token,
    };
    let option={
        method,
        headers,
    };
    if(method==='POST'|| method==='PUT'){
        headers['Content-type']='application/json';
        option.body=JSON.stringify(data);
    }
    if(method ==='GET'&& data && Object.keys(data).length){
        let str='?';
        for(let i in data){
            str +=`${i}=${data[i]}&`;
        }
        url +=str;
        url=url.slice(0,-1);
    }
    url=base.HOSTNAME+url;
    let promise=new Promise((resolve,reject)=> {
        fetch(url, option).then(res => res.json()).then(data => {
            let {code} = data;
            if (code === base.SUCCESS) {
                resolve(data);
            } else  if (code === base.FAIL)  {
                reject(data)
            }
        })
    });
    return promise;

}
// api('POST','/api/goods','123');

export {api};
