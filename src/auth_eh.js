export default (request) => { 
    const xhr = require('xhr');
    const basicAuth = require('codec/auth');

    const username = request.message.username; // valid: "user";
    const password = request.message.password; // valid: "passwd";
    
    const options = {
        headers: {
            Authorization: `${basicAuth.basic(username, password)}`
        }
    };
    
    return xhr.fetch("https://httpbin.org/basic-auth/user/passwd", options).then((response) => {
        request.message.response = JSON.parse(response.body);
        return request.ok();
    }).catch((err) => {
        request.message.error = err;
        return request.ok();
    });
};
