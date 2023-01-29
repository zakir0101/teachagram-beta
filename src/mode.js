const OFFLINE = 0 ;
const ONLINE = 1 ;
let mode = OFFLINE

let address = ""
if(mode === ONLINE){
    address = 'https://teachgram-beta.000webhostapp.com/teachegram_beta/main.php'
}else if(mode === OFFLINE)
{
    address = 'http://localhost/teachegram_beta/main.php'
}







export {address}