import {test,expect} from "@playwright/test";
import { LoginPage } from "../api/Pages/AuthenticationApi";
test.describe('verify login api',()=>{
    let loginpage:LoginPage
    test.beforeEach(async({request})=>{
         loginpage=new LoginPage(request)
        
    })

    test('verify login with valid credentials',async()=>{
        const response=await loginpage.login()
        // const body=await response.json()
    
        // console.log(body)
        // const token=await body.token

         expect( response.status()).toBe(200)

         

    })
    
})