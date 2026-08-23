// import { APIRequestContext,APIResponse } from "@playwright/test"
// import { AuthManager } from "../utils/AuthManager"
// export class ApiClient{
// constructor(private request:APIRequestContext){}

// async get(endpoint:string,options?:any):Promise<APIResponse>{
//     return await this.request.get(endpoint,{...options,headers:{...options.headers,Authorization:`Bearer${AuthManager.getToken()}`}})
// }

// async post(endpoint:string,data?:any,options:any={}):Promise<APIResponse>{
//     return await this.request.post(endpoint,{data,...options,headers:{...options.headers,Authorization:`Bearer${AuthManager.getToken()}`}})
// }

// async put(endpoint:string,data?:any,options?:any):Promise<APIResponse>{ 
//     return await this.request.put(endpoint,{data,...options,headers:{...options.headers,Authorization:`Bearer${AuthManager.getToken()}`}})
// }
// async patch(endpoint:string,data?:any,options?:any):Promise<APIResponse>{
//     return await this.request.patch(endpoint,{data,...options,headers:{...options.headers,Authorization:`Bearer${AuthManager.getToken()}`}})
// }





// }

import { APIRequestContext, APIResponse } from "@playwright/test";
import { AuthManager } from "../utils/AuthManager";

export class ApiClient {

    constructor(private request: APIRequestContext) {}

    async get(
        endpoint: string,
        options: any = {}
    ): Promise<APIResponse> {

        return await this.request.get(endpoint, {
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: `Bearer ${AuthManager.getToken()}`
            }
        });
    }

    async post(
        endpoint: string,
        data?: any,
        options: any = {}
    ): Promise<APIResponse> {

        return await this.request.post(endpoint, {
            ...options,
            data,
            headers: {
                ...(options.headers || {}),
                Authorization:`Bearer ${AuthManager.getToken()}`
            }
        });
    }

    async put(
        endpoint: string,
        data?: any,
        options: any = {}
    ): Promise<APIResponse> {

        return await this.request.put(endpoint, {
            ...options,
            data,
            headers: {
                ...(options.headers || {}),
                Authorization: `Bearer ${AuthManager.getToken()}`
            }
        });
    }

    async patch(
        endpoint: string,
        data?: any,
        options: any = {}
    ): Promise<APIResponse> {

        return await this.request.patch(endpoint, {
            ...options,
            data,
            headers: {
                ...(options.headers || {}),
                Authorization: `Bearer ${AuthManager.getToken()}`
            }
        });
    }

    async delete(endpoint:string,options:any={}):Promise<APIResponse>{
        return await this.request.delete(endpoint,{...options,headers:{...(options.headers||{}),Authorization:`Bearer ${AuthManager.getToken()}`}})

    }
}