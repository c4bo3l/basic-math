interface DataType {
  num1: number;
  num2: number;
  value: number;
}
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const MultiplicationTable = () => {
  const maxNumber = 10;
  const arr = Array.from(Array(maxNumber).keys()).map((x) => x + 1);

  const getRows = (num: number) => {
    return arr.map(
      (x): DataType => ({
        num1: num,
        num2: x,
        value: num * x,
      })
    );
  };

  return (
    <Grid container spacing={2}>
      {arr.map((num, index) => (
        <Grid key={`${num}-${index}`} item xs={12} md={3}>
          <Paper>
            <Table
              sx={{
                width: "100%",
              }}
            >
              <TableBody>
                {getRows(num).map((data, dIndex) => (
                  <TableRow key={`data-${dIndex}`}>
                    <TableCell>{data.num1}</TableCell>
                    <TableCell>x</TableCell>
                    <TableCell>{data.num2}</TableCell>
                    <TableCell>=</TableCell>
                    <TableCell>{data.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MultiplicationTable;
