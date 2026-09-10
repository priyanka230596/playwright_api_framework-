export const singleUserSchema={
    type:"object",
    properties:{
        id:{type:'number'},
        username:{type:'string'},
        firstName:{type:'string'},
        lastName:{type:'string'}, 
        gender:{type:'string'}  ,

        },
        required:['id','username','firstName','lastName','gender'],

        
    }

