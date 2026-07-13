require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const app = require('./app');
const PORT = process.env.APP_PORT ;

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})
