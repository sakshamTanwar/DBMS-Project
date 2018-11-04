var request = require('request');

module.exports.getStudents = () => {
    return new Promise((resolve, reject) => {
        let url = 'http://localhost:3000/student/';
        let options = {
            url: url,
            json: true,
        }
        request
            .get(options, (err, res, data) => {
                if(err) {
                    console.log(err);
                }
                else if (res.statusCode !== 200) {
                    console.log(res.statusCode);
                }
                else {
                    resolve(data);
                }
            })
    })
}

module.exports.getProgramByRollNumber = (rollNumber) => {
    return new Promise((resolve, reject) => {
        let url = 'http://localhost:3000/programChosen/rollNumber/' + rollNumber;
        let options = {
            url: url,
            json: true
        }
        request.get(options, (err, res, data) => {
            if(err) {
                console.log(err);
            }
            else if (res.statusCode !== 200) {
                console.log(res.statusCode);
            }
            else {
                resolve(data);
            }
        })
    })

}

module.exports.getPrograms = () => {
    return new Promise((resolve, reject) => {
        let url = 'http://localhost:3000/institute/program';
        let options = {
            url: url,
            json: true
        }
        request.get(options, (err, res, data) => {
            if(err) {
                console.log(err);
            }
            else if (res.statusCode !== 200) {
                console.log(res.statusCode);
            }
            else {
                resolve(data)
            }
        })
    })
}

module.exports.deleteProgByRollNo = (rollNo) => {
    return new Promise((resolve, reject) => {
        let url = 'http://localhost:3000/programChosen/' + rollNumber;
        let options = {
            method: 'DELETE',
            url: url,
            json: true
        }
        request.get(options, (err, res, data) => {
            if(err) {
                console.log(err);
            }
            else if (res.statusCode !== 200) {
                console.log(res.statusCode);
            }
            else {
                resolve(data)
            }
        })
    })
}
