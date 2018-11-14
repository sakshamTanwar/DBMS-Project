class MatchMaker {

    constructor(students, programs) {
        this.students = students;
        this.programs = programs;
        this.matched = [];
    }


    getProgram(name, id) {
        for(var program of this.programs) {
            if(program.Name === name && program.InstituteId === id) {
                return program;
            }
        }
    }

    async matchMaker() {
        for(var j=0;j<this.students.length;j++) {
            var student = this.students[j];
            var Matched = false;
            // setTimeout(async _ => {
                for(var i = 0; i<student.programs.length; i++) {
                    var program = student.programs[i];
                    let progData = await this.getProgram(program.ProgramName, program.InstituteId);
                    if(progData['SeatsLeft'] > 0 && !Matched) {
                        progData['SeatsLeft']--;
                        let studentProgram = {
                            rollNo: student.StudentRollNumber,
                            progName: program.ProgramName,
                            instituteId: program.InstituteId
                        };
                        console.log(studentProgram, Matched, i);
                        Matched = true;
                        await this.matched.push(studentProgram);
                        break;
                    }
                }
            // }, 1000);
         }

        return this.matched;
    }

    get match(){
        return this.matchMaker();
    }

}

module.exports = MatchMaker
