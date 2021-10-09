import "./Type.scss";
import { useTranslation, Trans } from "react-i18next";
//#region material-ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
//#endregion
//#region component helper
import Title from "@components/Title";
import DataTable from "@components/common/DataTable";
import Dialog from "@components/common/Dialog";
import { Helpers } from "@utils/helpers";
//#endregion
//#region Redux
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_SNACKBAR_ALERT } from "@components/common/Snackbar/snackbar.reducer";
import {
  TYPE_GET_BY_PAGENO,
  TYPE_DELETE,
  typeState,
} from "@redux/providers/type.reducer";
import { langState } from "@redux/providers/lang.reducer";
//#endregion

const Type = () => {
  //#region init data
  const { t } = useTranslation();
  const lang = useSelector(langState);
  const dataState = useSelector(typeState);
  const [pageNo, setPageNo] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [totalItems, setTotalItems] = React.useState(0);
  const [pageItems, setPageItems] = React.useState(0);
  const [actionType, setActionType] = React.useState();
  const dispatch = useDispatch();
  const dialogFormRef = React.useRef();
  //#endregion

  //#region useEffect
  React.useEffect(() => {
    // close dialog form when submitted
    switch (actionType) {
      case "TYPE_DELETE":
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

  //#region Dialogs
  const dialogActions = {
    className: "form multi_language",
    transition: "grow",
    title: t("type.addnew"),
    footerActions: false,
    maxWidth: "sm",
  };
  const [dialogConfig, setDialogConfig] = React.useState(dialogActions);
  const [componentConfigs, setComponentConfigs] = React.useState();

  const openFormActionType = (ty) => {
    setDialogConfig(dialogActions);
    setComponentConfigs({
      component: "actionType",
      data: ty !== undefined ? ty : undefined,
    });

    dialogFormRef.current.openDialog();
  };

  const confirmDeleteType = (ty) => {
    setDialogConfig({
      className: "confirm-text",
      transition: "grow",
      footerActions: true,
      title: t("common.confirm"),
      maxWidth: "xs",
      callback: () => {
        setActionType("TYPE_DELETE");
        // delete type
        dispatch(TYPE_DELETE(ty));
      },
    });

    setComponentConfigs({
      component: "alertText",
      data: { type: "TYPE_DELETE", content: t("common.areyousurethisdata") },
    });

    dialogFormRef.current.openDialog();
  };
  //#endregion

  //#region Tables
  const rows = [];
  React.useEffect(() => {
    dispatch(
      TYPE_GET_BY_PAGENO({
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
          name: _.name[lang.code],
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
                  onClick={() => openFormActionType(_)}
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
    dispatch(
      TYPE_GET_BY_PAGENO({
        pageno: newPage,
        pagesize: pageSize,
        sort: "desc",
      })
    );
  };

  //#endregion
  return (
    <>
      <div className="pane-header">
        <Title>{t("site.recent-types")}</Title>
        <Button
          edge="end"
          variant="outlined"
          color="primary"
          onClick={openFormActionType}
        >
          {t("button.newtype")}
        </Button>
        <Dialog
          ref={dialogFormRef}
          configs={dialogConfig}
          componentConfigs={componentConfigs}
        />
      </div>
      <div className="pane-content">
        {dataState.isFetching ? (
          <Helpers.Spinner />
        ) : (
          <>
            <DataTable columns={columns} rows={rows} totalItems={totalItems} />
            <Pagination
              className="pagination"
              count={pageItems}
              page={pageNo}
              // defaultPage={pageNo}
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
    </>
  );
};

export default Type;
