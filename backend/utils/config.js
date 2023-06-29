const SANDBOX_BASE_URL= "https://api.sandbox.midtrans.com/v2"
const PRODUCTION_BASE_URL = "https://api.midtrans.com/v2";
class Config{
    static serverKey = "SB-Mid-server-hTsf25IqA2nc3ThP4IM9vkE6S";
    static isProduction=false;
    static is3ds = false;
    static isSanitize=false;

    static getBaseUrl(){
        return Config.isProduction ? PRODUCTION_BASE_URL :SANDBOX_BASE_URL;
    }
}

module.exports = Config;