import { APIRequestContext } from "@playwright/test";
import { ApiClient } from "../apiClient";

export class ProductApi {
    private apiClient: ApiClient
    private product_id: any
    private product_category: any
    private search_product: any
    private limit: string
    private skip: string
    constructor(request: APIRequestContext) {
        this.apiClient = new ApiClient(request)
        this.product_id = `${process.env.product_id}`
        this.product_category = `${process.env.product_category}`
        this.search_product = `${process.env.search_product}`
        this.limit = `${process.env.limit}`
        this.skip = `${process.env.skip}`
    }

    async GetAllProducts() {
        return await this.apiClient.get('/products')
    }

    async GetSingleProduct() {
        return await this.apiClient.get(`/products/${this.product_id}`)
    }

    async SearchProduct() {
        const response = await this.apiClient.get('/products/search', { params: { q: `${this.search_product}` } })
        // console.log('POM URL:', response.url());
        // console.log('POM STATUS:', response.status());
        return response
    }

    async GetProductByCategory() {
        return await this.apiClient.get(`/products/category/${this.product_category}`)
    }

    async Pagination() {
        const response = await this.apiClient.get('/products', { params: { limit: this.limit, skip: this.skip } })
        console.log('POM URL:', response.url());
        console.log('POM STATUS:', response.status())
        return response
    }

    async AddProduct() {
        return await this.apiClient.post('/products/add', {
            "title": "Test Laptop",
            "price": 999.99,
            "stock": 20,
            "category": "laptops"
        })
    }

    async updateProduct() {
        return await this.apiClient.put(`/product/${this.product_id}`, {
            "title": "Updated Laptop",
            "price": 1099.99
        })
    }

    async DeleteProduct(){
        return await this.apiClient.delete(`/products/${this.product_id}`)
    }

}