let request = require('request');
let fs = require('fs');
// let read = fs.readFileSync('./phonetic-parser/veg.json');
// for(i of JSON.parse(read)){
//     var options = {
//         method: 'PUT',
//         url: 'https://api.dialogflow.com/v1/entities/ec99ec47-9495-4a7c-938e-445e43f8c24a/entries?v=20150910',
//         headers:
//             {
//                 'Cache-Control': 'no-cache',
//                 'Content-Type': 'application/json',
//                 'Authorization':'Bearer 21c705cae57946e6826fc2b41cf2d789'
//             },
//         body:[
//             i
//         ],
//         json: true
//     };
//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);
//         console.log(response.body)
//     });
// }

let read1 = JSON.parse(fs.readFileSync('./phonetic-parser/nveg.json'));
var j = 0;
for(i in read1){
        console.log(i)
        var options = {
            method: 'PUT',
            url: 'https://api.dialogflow.com/v1/entities/8bdb998a-8cce-4777-884a-a49842c29e63/entries?v=20150910',
            headers:
                {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer 21c705cae57946e6826fc2b41cf2d789'
                },
            body:[
                read1[i]
            ],
            json: true
        };
        request(options, function (error, response, body) {

            if (error) throw new Error(error);
            console.log(response.body+"j"+j);
            j++;
        });
}



