const midtransClient = require("midtrans-client"); 
class PaymentController{

        async checkout(req,res){
  
          const {item,user}= req.body;


    let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey : 'SB-Mid-server-hTsf25IqA2nc3ThP4IM9vkE6',
    clientKey : 'SB-Mid-client-RB0T4N1GQAyrQakX'
});
// console.log(item)
// console.log(item[0].price * item[0].quantity)

let parameter = {
    "transaction_details": {
        "order_id": "test-transaction-123"+Date.now(),
        "gross_amount": item[0].price * item[0].quantity,
    },
    "item_details":item,
    "customer_details":user,
   
};

snap.createTransaction(parameter)
    .then((transaction)=>{
        // transaction token
        let transactionToken = transaction.token;
        console.log('transactionToken:',transactionToken);

        // transaction redirect url
        let transactionRedirectUrl = transaction.redirect_url;
        console.log('transactionRedirectUrl:',transactionRedirectUrl);
        
        res.status(200).json({ message:{ redirectUrl: transactionRedirectUrl,token:transactionToken} });
    })
    .catch((e)=>{
        console.log('Error occured:',e.message);
        res.status(500).json({message:"error"})
    });


        } 


}

module.exports = new PaymentController()