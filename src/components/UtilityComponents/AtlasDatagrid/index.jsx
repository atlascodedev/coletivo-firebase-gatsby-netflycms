import React, { forwardRef } from "react"
import MaterialTable from "material-table"
import AddBox from "@material-ui/icons/AddBox"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"
import { Add, Delete, Save } from "@material-ui/icons"
import ConfirmationDialog from "../ConfirmationDialog"
import AlertFlex from "../AlertFlex"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
}

const AtlasDatagrid = ({
  data,
  updateDialog: UpdateDialog,
  addDialog: AddDialog,
  dataTitle,
  columns,
  deleteCallback,
  updateCallback,
  createCallback,
  additionalData,
  createCourse,
  deleteCourse,
}) => {
  const tableRef = React.useRef(null)
  const [errorAlert, setErrorAlert] = React.useState(false)
  const [selectionValues, setSelectionValues] = React.useState([])
  const [selectedRowValue, setSelectedRowValue] = React.useState("")
  const [deleteDialog, setDeleteDialog] = React.useState(false)
  const [updateDialog, setUpdateDialog] = React.useState(false)
  const [addDialogState, setAddDialogState] = React.useState(false)

  const activeColumns = columns ? columns : []

  const deleCourseCallback = () => {
    let courseUidArray = []

    selectionValues.forEach(valueSelected => {
      courseUidArray.push(valueSelected.uid)
    })

    console.log(courseUidArray)

    deleteCourse(courseUidArray)
  }

  return (
    <div>
      <ConfirmationDialog
        open={deleteDialog}
        type="warning"
        dialogClose={() => setDeleteDialog(false)}
        callback={deleCourseCallback}
        message={`Atenção, esta ação é irreversível. Você está prestes a deletar ${dataTitle}s.`}
      />

      {UpdateDialog ? (
        <UpdateDialog
          open={updateDialog}
          handleClose={() => setUpdateDialog(false)}
          callback={updateCallback}
          values={selectedRowValue}
          additionalData={additionalData}
        ></UpdateDialog>
      ) : null}

      <AddDialog
        createCourse={createCourse}
        open={addDialogState}
        handleClose={() => setAddDialogState(false)}
        callback={createCallback}
        additionalData={additionalData}
      ></AddDialog>

      <AlertFlex
        autoHideDuration={3000}
        severity="error"
        open={errorAlert}
        message={"Por favor, edite apenas 1 entrada por vez"}
        handleClose={() => setErrorAlert(false)}
      ></AlertFlex>
      <MaterialTable
        onSelectionChange={data => {
          setSelectionValues(data)
          console.log(selectionValues)
        }}
        tableRef={tableRef}
        localization={{
          body: {
            emptyDataSourceMessage: `Nenhum(a) ${dataTitle} encontrado(a)`,
          },
          toolbar: {
            searchTooltip: "Procurar por um campo específico",
            searchPlaceholder: "Pesquisar",
            nRowsSelected: `{0} ${dataTitle} selecionados`,
          },
          pagination: {
            labelRowsSelect: "linhas sendo exibidas",
            labelDisplayedRows: "{count} de {from}-{to}",
            firstTooltip: "Primeira página",
            lastTooltip: "Última página",
            nextTooltip: "Próxima página",
            previousTooltip: "Página anterior",
          },
          header: {
            actions: "Ações",
          },
        }}
        icons={tableIcons}
        title={dataTitle + "s"}
        columns={activeColumns}
        data={data}
        actions={[
          {
            icon: Edit,
            tooltip: `Editar ${dataTitle}`,
            onClick: (event, rowData) => {
              if (tableRef.current.dataManager.selectedCount > 1) {
                setErrorAlert(true)
              } else {
                // handleUpdateDialogOpen()
                setSelectedRowValue(rowData[0])
              }
            },
          },
          {
            icon: Add,
            tooltip: `Adicionar ${dataTitle}`,
            isFreeAction: true,
            onClick: event => setAddDialogState(true),
          },
          rowData => ({
            icon: Delete,
            tooltip: `Excluir ${dataTitle}`,
            onClick: (event, rowData) => {
              setDeleteDialog(true)
            },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          selection: true,
        }}
      />
    </div>
  )
}

export default AtlasDatagrid
