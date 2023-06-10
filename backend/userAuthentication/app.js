

module.exports.userLoginHandler = (event, context) => {
    // get the request body
    const requestBody = JSON.parse(event.body);

    // get username and email from body
    const username = requestBody.username;
    const email = requestBody.email;



}