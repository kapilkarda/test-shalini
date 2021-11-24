import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { doTeacherDataRes} from "../../action/TeacherDataAction"

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

const TeacherTable = (props) => {
  const dispatch = useDispatch();
  const [teacher, setTeacher] = useState([]);
  const [uiRender, setUiRender] = useState(false);

  React.useEffect(() => {
    if (props.Teacher) {
      setTeacher(props.Teacher);
      dispatch(doTeacherDataRes(props.Teacher)) 
    }
  }, []);

  const TeacherArray = [
    { name: "Present", value: "Present" },
    { name: "Absent", value: "Absent" },
  ];

  const setAttendance = (evt, index) => {
    let tmpTeacher = teacher;
    tmpTeacher[index].isPresent = !tmpTeacher[index].isPresent;
    setTeacher(tmpTeacher);
    setUiRender(!uiRender);
    dispatch(doTeacherDataRes(tmpTeacher)) 
  };

  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Teacher Name</StyledTableCell>
            <StyledTableCell>Attendance</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teacher.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell className="cell">{row.tName}</StyledTableCell>
              <StyledTableCell>
                <select
                  onChange={(e) => setAttendance(e, i)}
                  value={
                    row.isPresent
                      ? TeacherArray[0].value
                      : TeacherArray[1].value
                  }
                >
                  <option disabled value="">
                    Choose here
                  </option>
                  {TeacherArray.map((item, j) => (
                    <option key={j} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeacherTable;
