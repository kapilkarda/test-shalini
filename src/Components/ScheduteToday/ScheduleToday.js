import * as React from "react";
import TeacherTable from "../Tables/TeacherTable";
import StudentTable from "../Tables/StudentTable";
import Teacher from "../../data/Teachers";
import Student from "../../data/Students";
import "./ScheduleToday.css";
import StuTeacher from "../../data/StuTeacher";

const ScheduleToday = (props) => {

  return (
    <div className="container">
      <div className="head">
        <h2 className="heading">Schedule Today</h2>
      </div>
      <div className="left">
        <TeacherTable Teacher={Teacher} />
      </div>
      <div className="right">
        <StudentTable Student={Student} StuTeacher={StuTeacher} />
      </div>
    </div>
  );
}

export default ScheduleToday;
