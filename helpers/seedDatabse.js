var faker = require('faker');

const programs = ['CSE', 'EE', 'ME'];

for(var i=0;i<10;i++){
    let body = {
        RollNumber: i+1,
        Name: faker.name.firstName(),
        Rank: i+1,
        Marks: faker.random.number(),
        Email: faker.internet.email(),
        Password: faker.lorem.words(),
    };
    console.log(body);
    await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body,
    });
}

for(var i=0;i<5;i++){
    let d = new Date(faker.date.past());
    let body = {
        InstituteId: i+1,
        Name: faker.company.companyName(),
        EstablishedYear: d.getFullYear(),
    };
    console.log(body);
    await fetch('http://localhost:3000/institute', {
       method: 'POST',
       body, 
    }).then( _ => {
        for(let program of programs){
            let b = {
                Name: program,
                TotalSeats: 10,
                SeatsLeft: 10,
                InstituteId: body.InstituteId,
            }
            console.log(b);
            await fetch(`http://localhost/institute/${ b.InstituteId }/program`, {
                method: 'POST',
                body: b,
            })
        }
    })
}
