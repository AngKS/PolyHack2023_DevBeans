module.exports.app = (event, context) => {

    const a = 3;
    const b = 4;
    console.log("a + b = " + (a + b));
    
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*"
            
        },
        body: JSON.stringify({
            message: "Hello World! Backend is Up and running",
            input: event,
        })
    }
}