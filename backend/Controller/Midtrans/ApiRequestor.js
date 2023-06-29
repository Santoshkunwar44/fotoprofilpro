const Config= require("../.././utils/config")
const axios = require("axios")

class ApiRequestor{
    static get(url,server_key,data_hash){
        return this.remoteCall(url,server_key,data_hash,false)
    }
    static post(url,serverKey,data_hash){
        return this.remoteCall(url,serverKey,data_hash,true)
    }

    static async remoteCall(url,server_key,data_hash,post=true){
        const headers={
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization:"Basic "+ Buffer.from(server_key+":").toString("base64")
        };

        let body = JSON.stringify(data_hash);
        let result;
        if(post){
             let {data} = await axios.post(url,body,{
                headers
            })

            result == data
        }else{
            const {data} = await axios.get(url,{
                headers 
            })
            result = data;
        }


        return result;
    }
}