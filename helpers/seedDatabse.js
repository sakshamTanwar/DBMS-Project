var faker = require('faker');
var fetch = require('node-fetch');
var request = require('request');

const programs = ['CSE', 'EE', 'ME'];

// for(var i=0;i<10;i++){
//     let body = {
//         RollNumber: i+1,
//         Name: faker.name.firstName(),
//         Rank: i+1,
//         Marks: faker.random.number(),
//         Email: faker.internet.email(),
//         Password: faker.lorem.words(),
//     };
//     console.log(body);
//     let url = 'http://localhost:3000/signup';
//     let options = {
//         url: url,
//         json: true,
//         form: body
//     }
//     request.post(options, (err, res, data) => {
//         if(err) {
//             console.log(err);
//         }
//         else if (res.statusCode !== 200) {
//             console.log(res.statusCode);
//         }
//     })
// }

for(var i=0;i<5;i++){
    // let d = new Date(faker.date.past());
    // let body = {
    //     InstituteId: i+1,
    //     Name: faker.company.companyName(),
    //     EstablishedYear: d.getFullYear(),
    // };
    // console.log(body);
    // let url = 'http://localhost:3000/institute';
    // let options = {
    //     url: url,
    //     json: true,
    //     form: body
    // }
    // request.post(options, (err, res, data) => {
    //     if(err) {
    //         console.log(err);
    //     }
    //     else if (res.statusCode !== 200) {
    //         console.log(res.statusCode);
    //     }
    // })
    for(let program of programs){
        let b = {
            Name: program,
            TotalSeats: 10,
            SeatsLeft: 10,
            InstituteId: i+1,
        }
        console.log(b);
        let url = 'http://localhost:3000/institute/' + b.InstituteId + '/program';
        let options = {
            url: url,
            json: true,
            form: b
        }
        request.post(options, (err, res, data) => {
            if(err) {
                console.log(err);
            }
            else if (res.statusCode !== 200) {
                console.log(res.statusCode);
            }
        })
    }
}
