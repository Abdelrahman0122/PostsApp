import { globalError } from "./middleware/globalErrorHandler.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { commentRouter } from "./modules/comment/comment.routes.js";
import { postRouter } from "./modules/posts/posts.routes.js";
import { userRouter } from "./modules/user/user.routes.js";


export function init(app){

    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/posts',postRouter)
    app.use('/api/v1/React',commentRouter)



    app.get('/', (req,res)=>{res.json("hello World")})

    app.all('*',(req,res,next)=>{
       res.status(404).json({message:"page not found"})
    })
    app.use(globalError)

}