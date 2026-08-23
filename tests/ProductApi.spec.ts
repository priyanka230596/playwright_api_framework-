import { expect, test } from "@playwright/test"
import { ProductApi } from "../api/Pages/ProductApi"

test.describe('product api', () => {
    let productapi: ProductApi
    test.beforeEach(async ({ request }) => {
        productapi = new ProductApi(request)

    })

    test('get all products', async () => {
        const response = await productapi.GetAllProducts()
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body.products.length).toBeGreaterThan(0)
        expect(body.products.length).toEqual(30)
        console.log(body.products.length)



    })

    test('get single product', async () => {
        const response = await productapi.GetSingleProduct()
        expect(response.status()).toBe(200)
    })

    test('search product api', async () => {
        const response = await productapi.SearchProduct()
        const body: any =await  response.json()
        expect(response.status()).toBe(200)
        // responsetime validation
        const responseTime = response.timing().responseEnd
        expect(responseTime).toBeLessThan(3000)
        // console.log("STATUS:", response.status());
        // console.log("BODY:", JSON.stringify(body, null, 2));
        // console.log("PRODUCTS:", body.products);

        //response nody json assertion
        expect(body).toBeDefined()

        expect(body.products).toEqual(expect.any(Array))
        // for(let product of body.products){
        //     console.log(product.tags[0])
        //     expect(product.tags[0]).toContain('electronics')
        // } //showing error as 3 tags have electronics and one have smartphone that s why we want to use alternate way

        expect(body.products).toContainEqual(expect.objectContaining({tags:expect.arrayContaining(['electronics'])}))
        //verify products category atlist one product containing catagory =mobile accessories
        expect(body.products).toContainEqual(expect.objectContaining({category:'mobile-accessories'}))


        // console.log(body.products.length)
        expect(body.products.length).toBeGreaterThan(0)



    
    })

    test('get products by category', async () => {
        const response = await productapi.GetProductByCategory()
        const body: any = await response.json()
        expect(response.status()).toBe(200)
        expect(response.ok).toBeTruthy()
        // console.log("STATUS:", response.status());
        // console.log("BODY:", JSON.stringify(body, null, 2));
        // console.log("PRODUCTS:", body.products);
        expect(body.products).toEqual(expect.any(Array))
        //verify category , products containg at least one product  should have category=smartphone
        expect(body.products).toContainEqual(expect.objectContaining({category:'smartphones'})) 
    })

    test('get product by achieving pagination',async()=>{
        const response=await productapi.Pagination()
        const body= await response.json()
        expect(response.status()).toBe(200)
        expect(body.products.length).toEqual(10)
    })

    test('verify add product api',async()=>{
        const response=await productapi.AddProduct()
        const body=await response.json()
        expect(response.status()).toBe(201)
        expect(body.title).toEqual("Test Laptop")
    })

    test('verify update product api',async()=>{
        const response=await productapi.updateProduct()
        const body=await response.json()
        expect(response.status()).toBe(200)
        expect(body.title).toEqual("Updated Laptop")
        expect(body.price).toEqual( 1099.99)
    })

    test('verify delete product api',async()=>{
        const response=await productapi.DeleteProduct()
        const body= await response.json()
        expect(response.status()).toBe(200)
        //verify response is json
        expect(response.headers()['content-type']).toContain('application/json')

        //response time
        const responseTime=response.timing().responseEnd
        expect(responseTime).toBeLessThan(2000)
    
    })

    

})