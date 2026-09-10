import {  APIRequestContext } from "@playwright/test"
import { ApiClient } from "../apiClient"
import { AuthManager } from "../../utils/AuthManager"

export class UserApi{
    private apiClient:ApiClient
    private user_id:string
    constructor(request:APIRequestContext){
        this.apiClient= new ApiClient(request)
        this.user_id=`${process.env.user_id}`
    }

    async GetAllUser(){
        return await this.apiClient.get('/users')
    }

    async GetUserById(){
        return await this.apiClient.get(`/users/${this.user_id}`) 
    }

    async GetCurrentUser(){
      const response=await this.apiClient.get('/auth/me')
    //   console.log(AuthManager.getToken())
      return response
    }
}