const express = require('express');
const bodyParser = require('body-parser');
const reqest = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {

    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;

    const data = {
        new_members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }

        ]
    };


    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/c52a8b698e";

    const options = {
        method : "POST",
        auth: "felix1:61613727c678713418aab0d0ebf8ddcd-us13"
    }

   const request = https.request(url, options, function(response){

    if (response.statusCode === 200){
        res.sendFile(__dirname + '/success.html')
    } else {
        res.sendFile(__dirname + '/failure.html')
    }

        response.on("data", function(data){
            console.log(jsonData);
        })
    });

    request.write(jsonData);
    request.end();
    
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/failure', function(req, res){
    res.redirect('/');
});

app.listen(3000, function () {
    console.log('sever running on port 3000');
});

//api key
//61613727c678713418aab0d0ebf8ddcd-us13

//list id
// c52a8b698e

// {
//     "new_members": [
//       {
//         "id": "string",
//         "email_address": "string",
//         "unique_email_id": "string",
//         "email_type": "string",
//         "status": "subscribed",
//         "merge_fields": {
//           "property1": null,
//           "property2": null
//         },
//         "interests": {
//           "property1": true,
//           "property2": true
//         },
//         "stats": {
//           "avg_open_rate": 0,
//           "avg_click_rate": 0
//         },
//         "ip_signup": "string",
//         "timestamp_signup": "2019-08-24T14:15:22Z",
//         "ip_opt": "string",
//         "timestamp_opt": "2019-08-24T14:15:22Z",
//         "member_rating": 0,
//         "last_changed": "2019-08-24T14:15:22Z",
//         "language": "string",
//         "vip": true,
//         "email_client": "string",
//         "location": {
//           "latitude": 0,
//           "longitude": 0,
//           "gmtoff": 0,
//           "dstoff": 0,
//           "country_code": "string",
//           "timezone": "string"
//         },
//         "last_note": {
//           "note_id": 0,
//           "created_at": "2019-08-24T14:15:22Z",
//           "created_by": "string",
//           "note": "string"
//         },
//         "tags_count": 0,
//         "tags": [
//           {
//             "id": 0,
//             "name": "string"
//           }
//         ],
//         "list_id": "string",
//         "_links": [
//           {
//             "rel": "string",
//             "href": "string",
//             "method": "GET",
//             "targetSchema": "string",
//             "schema": "string"
//           }
//         ]
//       }
//     ],
//     "updated_members": [
//       {
//         "id": "string",
//         "email_address": "string",
//         "unique_email_id": "string",
//         "email_type": "string",
//         "status": "subscribed",
//         "merge_fields": {
//           "property1": null,
//           "property2": null
//         },
//         "interests": {
//           "property1": true,
//           "property2": true
//         },
//         "stats": {
//           "avg_open_rate": 0,
//           "avg_click_rate": 0
//         },
//         "ip_signup": "string",
//         "timestamp_signup": "2019-08-24T14:15:22Z",
//         "ip_opt": "string",
//         "timestamp_opt": "2019-08-24T14:15:22Z",
//         "member_rating": 0,
//         "last_changed": "2019-08-24T14:15:22Z",
//         "language": "string",
//         "vip": true,
//         "email_client": "string",
//         "location": {
//           "latitude": 0,
//           "longitude": 0,
//           "gmtoff": 0,
//           "dstoff": 0,
//           "country_code": "string",
//           "timezone": "string"
//         },
//         "last_note": {
//           "note_id": 0,
//           "created_at": "2019-08-24T14:15:22Z",
//           "created_by": "string",
//           "note": "string"
//         },
//         "tags_count": 0,
//         "tags": [
//           {
//             "id": 0,
//             "name": "string"
//           }
//         ],
//         "list_id": "string",
//         "_links": [
//           {
//             "rel": "string",
//             "href": "string",
//             "method": "GET",
//             "targetSchema": "string",
//             "schema": "string"
//           }
//         ]
//       }
//     ],
//     "errors": [
//       {
//         "email_address": "string",
//         "error": "string",
//         "error_code": "ERROR_CONTACT_EXISTS",
//         "field": "string",
//         "field_message": "string"
//       }
//     ],
//     "total_created": 42,
//     "total_updated": 42,
//     "error_count": 42,
//     "_links": [
//       {
//         "rel": "string",
//         "href": "string",
//         "method": "GET",
//         "targetSchema": "string",
//         "schema": "string"
//       }
//     ]
//   }