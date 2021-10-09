import "./DataTable.scss";
import React from "react";
//#region material-ui
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
//#endregion
import { Helpers } from "@utils/helpers";

const DataTable = (props) => {
  const { columns, rows, totalItems, checkboxSelection, rowSelected } = props;
  const emptyRows = totalItems === 0;
  const [selectAllChecked, setSelectAllChecked] = React.useState(false);
  const [rowSelectedState, setRowSelectedState] = React.useState([]);

  const handleToggleSelectAll = (e) => {
    const checked = e.target.checked;
    console.log(props);
    // set all rows when checked is true
    let tempRowSelected = [...rowSelectedState];
    if (checked) {
      const comparerDiff = Helpers.diffArrayObjects(rows, tempRowSelected);

      comparerDiff.map((sel) => {
        tempRowSelected.push({
          _id: sel._id,
          checked: true,
        });
      });
    } else {
      tempRowSelected = [];
    }

    setRowSelectedState(tempRowSelected);
    setSelectAllChecked(checked);

    // return data to parent component
    rowSelected(tempRowSelected);
  };

  const handleCheckboxSelectRow = (e, row) => {
    const checked = e.target.checked;
    let tempRowSelected = [...rowSelectedState];

    if (checked) {
      tempRowSelected.push({
        _id: row._id,
        checked: true,
      });
    } else {
      tempRowSelected = tempRowSelected.filter((r) => {
        return r._id !== row._id;
      });
    }

    // Set checked/unchecked for selectall
    setSelectAllChecked(rows.length === tempRowSelected.length);

    // save data checked row
    setRowSelectedState(tempRowSelected);

    // return data to parent component
    rowSelected(tempRowSelected);
  };
  // #region render html
  const tcHeaderCheckboxSel = checkboxSelection ? (
    <TableCell padding="checkbox">
      <Checkbox
        // indeterminate={numSelected > 0 && numSelected < rowCount}
        // checked={rowCount > 0 && numSelected === rowCount}
        checked={selectAllChecked}
        onChange={handleToggleSelectAll}
        inputProps={{ "aria-label": "select all desserts" }}
      />
    </TableCell>
  ) : (
    <></>
  );
  //#endregion

  return (
    <TableContainer component={Paper} className="tblContainer">
      <Table
        // stickyHeader={
        //   tables.stickyHeader !== undefined ? tables.stickyHeader : false
        // }
        aria-label="table sticky type"
      >
        <TableHead>
          <TableRow>
            {tcHeaderCheckboxSel}
            {columns.map((header) => (
              <TableCell
                key={header.field}
                align={header.align !== undefined ? header.align : "left"}
              >
                {header.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row._id}>
                {checkboxSelection ? (
                  <TableCell padding="checkbox">
                    <Checkbox
                      // indeterminate={numSelected > 0 && numSelected < rowCount}
                      // checked={rowCount > 0 && numSelected === rowCount}
                      // onChange={handleToggleSelectAll}
                      checked={rowSelectedState.some(
                        (el) => el._id === row._id
                      )}
                      onChange={(e) => handleCheckboxSelectRow(e, row)}
                      inputProps={{ "aria-label": "select desserts" }}
                    />
                  </TableCell>
                ) : (
                  <></>
                )}
                {row.tablecell.map((cell, index) => (
                  <TableCell
                    key={row._id + index}
                    component={
                      cell.component !== undefined ? cell.component : "td"
                    }
                    align={cell.align !== undefined ? cell.align : "left"}
                    role="cell"
                    scope="row"
                  >
                    {cell.name}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          {/* Empty rows */}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell
                colSpan={columns.length}
                className="empty-rows"
                align="center"
              >
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
