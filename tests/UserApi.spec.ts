import { test, expect } from '@playwright/test'
import { UserApi } from '../api/Pages/UsersApi'
import { LoginPage } from '../api/Pages/AuthenticationApi'
import { AuthManager } from '../utils/AuthManager'
import { singleUserSchema } from '../utils/schemas/singleUserSchema'
import Ajv from 'ajv'

test.describe('User Api ', async () => {
    let userapi: UserApi
    test.beforeEach(async ({ request }) => {
        const loginapi = new LoginPage(request)
        const loginResponse = await loginapi.login()

        expect(loginResponse.status()).toBe(200);

        // console.log(
        //     'Token in beforeEach:',
        //     AuthManager.getToken()
        // );
        userapi = new UserApi(request)
    })

    test('verify get all users api', async () => {
        const response = await userapi.GetAllUser()
        const body = await response.json()
        expect(response.status()).toBe(200)
        //check response is json or not
        expect(response.headers()['content-type']).toContain('application/json')

        //check response has users array
        expect(body.users).toEqual(expect.any(Array))

        //check one of the property of users array first objects property
        expect(body.users).toContainEqual(expect.objectContaining({ firstName: 'Emily' }))
    })

    test.only('verify get user by id api', async () => {
        const response = await userapi.GetUserById()
        const body = await response.json()
        console.log(body)

        expect(response.status()).toBe(200)
        expect(body.id).toEqual(Number(process.env.user_id))
        const ajv = new Ajv()
        const validate = ajv.compile(singleUserSchema)
        const valid = validate(body)

        if (!valid) {
            console.log("Schema validation errors:");
            console.log(validate.errors)
        }
        expect(valid).toBe(true)


    })

    test('verify current user api', async () => {

        const response = await userapi.GetCurrentUser()
        const body = await response.json()
        // console.log('Status:', response.status());
        // console.log('Response body:', body);
        expect(response.status()).toBe(200)
        expect(body.firstName).toEqual('Emily')
    })
})