export const LOCAL_HOST="https://prod.swiftbel.com";

export const ServiceEnum={
    verifyEmail:'user/email',
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
    paymentBooking:'booking/new',
    addNewPost:'serviceProvider/uploadPost',
    getBannerDetaiils:'serviceProvider/getImageBanner',
    uploadBannerImage:'serviceProvider/uploadImageBanner',
    twilioToken:'twilio/createToken',
    getServices:'serviceProvider/homePage',
    searchFilter:'search/filterSp',
    movingInput:'customer/Moving/v3/enterDetails',
    pressurewashing:'customer/pressureWashing/v1/enterDetails',
    electricians:'customer/electrician/v1/enterDetails',
    Plumbers:'customer/plumbing/v1/enterDetails',
    carpetcleaning:'customer/carpetCleaning/v1/enterDetails',
    PlumberInput:'customer/plumbing/enterDetails',
    ElectricianInput:'customer/electrician/enterDetails',
    HVACInput:'customer/hvacService/enterDetails',
    stripePaymentIntent:'payment/paymentIntent',

}

export const urlFor =(services)=>{
    if(services){
        return `${LOCAL_HOST}/${services}`
    }
    return undefined;
}