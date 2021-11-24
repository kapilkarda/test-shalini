import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 1,
  },
}));

const StudentTable = (props) => {
  const [stuTeacher, setStuTeacher] = useState([]);
  const [uiRender, setUiRender] = useState(false);

  const teacherResponse = useSelector((state) => state.TeacherRes);
  console.log("teacherResponse", teacherResponse)

  React.useEffect(() => {
    setStuTeacher(props.StuTeacher);
  }, []);

  React.useEffect(() => {
    setUiRender(!uiRender);
  }, []);

  React.useEffect(() => {
    if (teacherResponse) {
      let tmpStuTeacher = props.StuTeacher;
      console.log(tmpStuTeacher);
      let noTeachers = tmpStuTeacher.filter(
        (teacher) => (teacher.teacher) ? teacher.teacher.trim() === "" : true
      );
      for (let ntch of noTeachers) {
        let getIndexOfStuTeacher = tmpStuTeacher.findIndex(
          (sTeacher) => sTeacher.id === ntch.id
        );
        let getTeacherList = teacherResponse.filter(
          (tech) =>
            tech.tSubject.toLowerCase() === ntch.subject.toLowerCase() &&
            (tech.Priority === 3 || tech.Priority === 2) &&
            tech.isPresent === true
        );
        if (getTeacherList.length === 0) {
          let headMistress = teacherResponse.filter(
            (tech) => tech.Priority === 1 && tech.isPresent === true
          );
          if (headMistress.length === 0) {
            if (getIndexOfStuTeacher > -1) {
              tmpStuTeacher[getIndexOfStuTeacher].teacher =
                teacherResponse &&
                teacherResponse[0] &&
                teacherResponse[0].tName;
            }
          } else {
            if (getIndexOfStuTeacher > -1) {
              tmpStuTeacher[getIndexOfStuTeacher].teacher =
                headMistress[0].tName;
            }
          }
        } else {
          if (getIndexOfStuTeacher > -1) {
            tmpStuTeacher[getIndexOfStuTeacher].teacher =
              getTeacherList[0].tName;
          }
        }
      }
      setStuTeacher(tmpStuTeacher);
      setUiRender(!uiRender);
    }
  }, [teacherResponse]);

  return (
    <TableContainer>
      <Table aria-label="customized table" className="right">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell>Allocated Teacher</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stuTeacher.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell>{row.stuName}</StyledTableCell>
              <StyledTableCell>{row.subject}</StyledTableCell>
              <StyledTableCell>{row.teacher}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default StudentTable;
