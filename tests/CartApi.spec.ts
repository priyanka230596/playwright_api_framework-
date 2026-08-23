import {test,expect} from '@playwright/test'
import { CartApi } from '../api/Pages/CartApi'

test.describe('Cart api',()=>{
    let cartApi:CartApi
    test.beforeEach(async({request})=>{
        cartApi= new CartApi(request)
    })

    test('verify getallcarts api',async()=>{
        const response=await cartApi.GetallCarts()
        const body=await response.json()
        expect(response.status()).toBe(200)
        expect(response.headers()['content-type']).toContain('application/json')
        //verify that carts containing product array and it containing product having title "blue frock"
        expect(body.carts).toContainEqual(expect.objectContaining({products:expect.arrayContaining([expect.objectContaining({title:'Blue Frock'})])}))

        //verify response time
        const responseTime=response.timing().responseEnd
        expect(responseTime).toBeLessThan(2000)
    })

    test('verify getcart by id',async()=>{
        const response=await cartApi.GetCartByid()
        const body=await response.json()
        expect(response.status()).toBe(200)
        expect(body.id).toEqual(Number(process.env.cart_id))
        const responseTime=response.timing().responseEnd
        expect(responseTime).toBeLessThan(2000)

    })

    test('get cart by userid',async()=>{
        const response=await cartApi.GetCartByUser()
        const body=await response.json()
        expect(response.status()).toBe(200)
        expect(body.carts).toContainEqual(expect.objectContaining({userId:1}))
        const cart_product=body.carts[0].products.length
        console.log(cart_product)
        expect(cart_product).toBeGreaterThan(0)
    })

    test('add product to cart',async()=>{
        const response= await cartApi.AddProductToCart()
        const body=await response.json()
        expect(response.status()).toBe(201)
        expect(response.statusText()).toEqual('Created')
    })

    test('update cart',async()=>{
        const response=await cartApi.Updatecart()
        const body=await response.json()
        expect(response.status()).toBe(200)
        expect(body.products[0]).toEqual(expect.objectContaining({quantity:2}))

    })
})