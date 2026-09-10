// export class AuthManager{
//  private static accessToken:string
//     static setToken(accessToken:string){
//         this.accessToken=accessToken
//      }

//      static getToken():string{
//         // if(!this.token){
//         //     throw new Error('token is not available please login first')
//         // }
//         // console.log(this.token)
//         return this.accessToken
        

//      }

//      static clearToken(): void {
//         this.accessToken = "";
//     }
// }



export class AuthManager {

    private static accessToken: string = "";

    static setToken(accessToken: string) {
        // console.log("Setting token:", accessToken);
        this.accessToken = accessToken;
    }

    static getToken(): string {
        // console.log("Getting token:", this.accessToken);
        return this.accessToken;
    }

    static clearToken(): void {
        this.accessToken = "";
    }
}