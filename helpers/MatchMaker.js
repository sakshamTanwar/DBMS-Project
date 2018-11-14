class MatchMaker {

    constructor(students, programs) {
        this.students = students;
        this.programs = programs;
    }


    getProgram(name, id) {
        for(var program of this.programs) {
            if(program.Name === name && program.InstituteId === id) {
                return program;
            }
        }
    }

    matchMaker() {
        this.matched = []
        this.students.forEach((student) => {
            for(var program of student.programs) {
                let progData = this.getProgram(program.ProgramName, program.InstituteId);
                if(progData['SeatsLeft'] > 0) {
                    progData['SeatsLeft']--;
                    let studentProgram = {
                        rollNo: student.StudentRollNumber,
                        progName: program.ProgramName,
                        instituteId: program.InstituteId
                    };

                    this.matched.push(studentProgram);
                    break;
                }
            }
        })

        return this.matched;
    }

    get match(){
        return this.matchMaker();
    }

}

module.exports = MatchMaker
