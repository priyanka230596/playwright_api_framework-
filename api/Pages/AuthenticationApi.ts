import { APIRequest, APIRequestContext, APIResponse } from "@playwright/test";
import { ApiClient } from "../apiClient";
import { AuthManager } from "../../utils/AuthManager";
export class LoginPage{
    private apiClient:ApiClient
    private name:string
    private password:string
    constructor(request:APIRequestContext){
        this.apiClient= new ApiClient(request)
        this.name=`${process.env.name}`
        this.password=`${process.env.password}`

    }
//     async login():Promise<APIResponse>{
//         const response= await this.apiClient.post('/auth/login',{username:this.name,password:this.password})
//         const body=await response.json()
//         console.log(this.name,this.password)
//         const token=await body.accessToken
//         console.log(body)
//         //store token centrally 
//         AuthManager.setToken(body.accessToken)
//         return response
//     }
// 

async login(): Promise<APIResponse> {

    const response = await this.apiClient.post(
        '/auth/login',
        {
            username: this.name,
            password: this.password
        }
    );

    // console.log("Login status:", response.status());

    const body = await response.json();

    console.log("LOGIN BODY:", body);

    AuthManager.setToken(body.accessToken);

    // console.log("TOKEN AFTER SET:", AuthManager.getToken());

    return response;
}
}