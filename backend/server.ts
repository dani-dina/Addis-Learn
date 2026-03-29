import app from './app';

const PORT = process.env.PORT || 5000;

const startServer = () =>{
    try{
        app.listen(PORT, ()=>{
            console.log(`[*] I'm running on port ${PORT} [*]`);
        })
    }catch(error) {
        console.error('Somethinng went wrong while running the server', error);
        process.exit(1);
    }
}

startServer();