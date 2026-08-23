import { APIRequestContext } from "@playwright/test"
import { ApiClient } from "../apiClient"

export class CartApi{
    private apiClient:ApiClient
    private cart_id:string
    private user_id:string
    private add_product:any
    constructor(request:APIRequestContext){
        this.apiClient=new ApiClient(request)
        this.cart_id=`${process.env.cart_id}`
        this.user_id=`${process.env.user_id}`
        this.add_product={
    "userId": 1,
    "products": [
        {
            "id": 1,
            "quantity": 2
        },
        {
            "id": 2,
            "quantity": 1
        }
    ]
}
    }

    async GetallCarts(){
        return await this.apiClient.get('/carts')
    }

    async GetCartByid(){
        return await this.apiClient.get(`/carts/${this.cart_id}`)
    }

    async GetCartByUser(){
        return await this.apiClient.get(`/carts/user/${this.user_id}`)
    }

    async AddProductToCart(){
        return await this.apiClient.post('/carts/add',this.add_product)
    }

    async Updatecart(){
        return await this.apiClient.put(`/carts/${this.cart_id}`,{
    "products": [
      {
        "id": 1,
        "quantity": 2
      }
    ]
  })
    }
}