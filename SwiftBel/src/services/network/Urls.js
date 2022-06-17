export const LOCAL_HOST="https://api.swiftbel.com";

export const ServiceEnum={
    register:"user/register",
    userDetails:"user/userDetails",
    resendVerification:"user/resendVerification",
    setPassword:'user/setPassword',
    loginUser:'user/login',
    sendCode:'twilio/sendCode',
    verifyCode:'twilio/verify',
    serviceProvider:'serviceProvider/createAccount',
    gooleSignup:'user/saveNewGoogleUser',
    appleSignup:'user/saveNewAppleUser',
    getPost:'serviceProvider/getPost',
    profileDetails:'swiftbe',
    addNewPost:'serviceProvider/uploadPost',
    getBannerDetaiils:'serviceProvider/getImageBanner',
    uploadBannerImage:'serviceProvider/uploadImageBanner',
    twilioToken:'twilio/createToken',
    getServices:'serviceProvider/homePage'

}

export const urlFor =(services)=>{
    if(services){
        return `${LOCAL_HOST}/${services}`
    }
    return undefined;
}