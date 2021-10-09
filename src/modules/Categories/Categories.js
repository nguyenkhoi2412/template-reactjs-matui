import "./Categories.scss";
import { useTranslation, Trans } from "react-i18next";
//#region material-ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
//#endregion
//#region component helper
import Title from "@components/Title";
import DrawerCategories from "@components/common/Drawer";
import Dialog from "@components/common/Dialog";
import DataTable from "@components/common/DataTable";
// import Dialog from "@components/common/Dialog";
import { Helpers } from "@utils/helpers";
//#endregion
//#region Redux
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_SNACKBAR_ALERT } from "@components/common/Snackbar/snackbar.reducer";
import {
  CATEGORY_GET_BY_PAGENO,
  CATEGORY_DELETE,
  categoryState,
} from "@redux/providers/category.reducer";
import { langState } from "@redux/providers/lang.reducer";
//#endregion

const Categories = () => {
  //#region init data
  const { t } = useTranslation();
  const lang = useSelector(langState);
  const dataState = useSelector(categoryState);
  const [pageNo, setPageNo] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [totalItems, setTotalItems] = React.useState(0);
  const [pageItems, setPageItems] = React.useState(0);
  const [actionType, setActionType] = React.useState();
  const [rowSelected, setRowSelected] = React.useState([]);
  const dispatch = useDispatch();
  const dialogFormRef = React.useRef();
  //#endregion

  //#region useEffect
  React.useEffect(() => {
    // close dialog form when submitted
    switch (actionType) {
      case "CATEGORY_DELETE":
        if (!dataState.isFetching) {
          if (dataState.ok) {
            //Show message when delete success
            dispatch(
              TOGGLE_SNACKBAR_ALERT({
                open: true,
                message: dataState.message,
              })
            );

            //close dialog when success
            dialogFormRef.current.closeDialog();
          } else {
            //Show message when delete fail
            dispatch(
              TOGGLE_SNACKBAR_ALERT({
                open: true,
                message: dataState.message,
                severity: "error",
              })
            );
          }
        }
        break;
    }
  }, [dataState]);
  //#endregion

  //#region drawer config
  const refDrawerCategories = React.useRef();
  const [componentConfigsDrawer, setComponentConfigsDrawer] = React.useState({
    component: "actionCategory",
    data: {},
  });

  const handleActionCategories = (event, _category) => {
    setComponentConfigsDrawer({
      component: "actionCategory",
      data: _category === undefined ? {} : _category,
    });
    refDrawerCategories.current.openDrawer(event, "right");
  };
  //#endregion

  //#region Dialogs
  const dialogActions = {};
  const [dialogConfig, setDialogConfig] = React.useState(dialogActions);
  const [componentConfigsDialog, setComponentConfigsDialog] = React.useState();

  const confirmDeleteType = (_data) => {
    setDialogConfig({
      className: "confirm-text",
      transition: "grow",
      footerActions: true,
      title: t("common.confirm"),
      maxWidth: "xs",
      callback: () => {
        setActionType("CATEGORY_DELETE");
        // delete type
        dispatch(CATEGORY_DELETE(_data));
      },
    });

    setComponentConfigsDialog({
      component: "alertText",
      data: {
        type: "CATEGORY_DELETE",
        content: t("common.areyousurethisdata"),
      },
    });

    dialogFormRef.current.openDialog();
  };
  //#endregion

  //#region Tables
  const rows = [];
  React.useEffect(() => {
    dispatch(
      CATEGORY_GET_BY_PAGENO({
        pageno: pageNo,
        pagesize: pageSize,
        sort: "desc",
      })
    );
  }, []);

  React.useEffect(() => {
    setTotalItems(dataState.total);
    setPageItems(Math.ceil(dataState.total / pageSize));
  }, [dataState]);

  // render header table
  const columns = [
    {
      field: "name",
      headerName: "Name",
      align: "left",
    },
    {
      field: "actions",
      headerName: "",
      align: "right",
    },
  ];

  //render rows data table
  dataState.d.map((_) => {
    rows.push({
      _id: _._id,
      tablecell: [
        {
          name: _.title[lang.code],
          align: "left",
          component: "th",
        },
        {
          align: "right",
          name: (
            <Typography component="div" className="actions">
              <Tooltip title={<Trans>common.delete</Trans>}>
                <DeleteForeverIcon
                  color="action"
                  fontSize="medium"
                  onClick={() => confirmDeleteType(_)}
                />
              </Tooltip>
              <Tooltip title={<Trans>common.edit</Trans>}>
                <EditIcon
                  color="action"
                  fontSize="medium"
                  onClick={(e) => handleActionCategories(e, _)}
                />
              </Tooltip>
            </Typography>
          ),
        },
      ],
    });
  });

  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
    setRowSelected([]);
    dispatch(
      CATEGORY_GET_BY_PAGENO({
        pageno: newPage,
        pagesize: pageSize,
        sort: "desc",
      })
    );
  };

  const handleCheckboxSelection = (rowSelected) => {
    setRowSelected(rowSelected);
  };
  //#endregion

  return (
    <>
      <div className="pane-header">
        <Title>{t("site.categories")}</Title>
        <Typography component="div" className="btnActions">
          {rowSelected.length ? (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleActionCategories}
            >
              {t("common.delete")}
            </Button>
          ) : (
            <></>
          )}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={handleActionCategories}
          >
            {t("button.newcategory")}
          </Button>
        </Typography>
        <Dialog
          ref={dialogFormRef}
          configs={dialogConfig}
          componentConfigs={componentConfigsDialog}
        />
      </div>
      <div className="pane-content">
        {dataState.isFetching ? (
          <Helpers.Spinner />
        ) : (
          <>
            <DataTable
              columns={columns}
              rows={rows}
              checkboxSelection
              rowSelected={handleCheckboxSelection}
              totalItems={totalItems}
            />
            <Pagination
              className="pagination"
              count={pageItems}
              page={pageNo}
              siblingCount={1}
              boundaryCount={1}
              onChange={handleChangePage}
              showFirstButton
              showLastButton
              variant="outlined"
              // shape="rounded"
              // color="secondary"
            />
          </>
        )}
      </div>
      <DrawerCategories
        ref={refDrawerCategories}
        configs={{ showCloseIcon: false }}
        componentConfigs={componentConfigsDrawer}
      />
    </>
  );
};

export default Categories;
