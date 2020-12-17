// Define the libraries and constants
const axios = require('axios');
const url_from = `https://jsonplaceholder.typicode.com`;
const url_to = `https://dev.app.homecarepulse.com`;

// Gets the users from typicode
let getUsers = () => {
    return axios.get(`${url_from}/users`);
};

// Posts the treated data into hcp
let postUsers = (data) => {
    return axios.post(
        `${url_to}/Primary/?FlowId=7423bd80-cddb-11ea-9160-326dddd3e106&Action=api`,
        data
    );
};

// Map the user data from typicode to hcp format
let userMapper = (data) => {
    let result = {};
    result.userid = `henriquetedeschi3_7st@indeedemail.com`;
    result.password = `Qina8027!`;
    result.outputtype = `Json`;
    result.users = [];

    data.forEach((user) => {
        result.users.push({
            first_name: user.name.split(' ').slice(0, -1).join(' '),
            last_name: user.name.split(' ').slice(-1).join(' '),
            company_name: user.company.name,
            company_full_address: `${user.address.street} ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
            website: user.website,
            phone: user.phone
                .split(' ')
                .slice(0)[0]
                .replace(/\(|\)|-|\./g, '')
                .slice(-10),
        });
    });

    return result;
};

let completeTask = async () => {
    try {
        let get = await getUsers();
        let users = userMapper(get.data);

        let post = await postUsers(users);
        console.log(post);
    } catch (e) {
        console.error(e);
    }
};

completeTask();
