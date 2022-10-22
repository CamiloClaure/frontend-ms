import React, {useState} from "react"
import useSWR from "swr"

import {GridCellParams, GridColDef} from "@mui/x-data-grid-pro"

import ROUTES from "../../../constants/routes"
import {fetcherGet} from "../../../hooks/urls"
import DashboardComponent from "../../../components/dashboardComponent"
import {DataGridComponent} from "../../../components/data_grid_component"
import {Box, IconButton} from "@mui/material"
import clsx from "clsx"
import {laggy} from "../../../hooks/swrHelper"
import {AereonaveForm} from "../../../components/AereonaveForm/AereonaveForm";
import Modal from "../../../components/Modal";

export default function AereonaveView() {
  const headCells: GridColDef[] = [
    {
      field: "estadoAeronave",
      headerName: "Customer",
      flex: 1,
      cellClassName: (params: GridCellParams<number>) =>
        clsx("super-app", {
          negative: params.row.credit_limit > 0 && params.row.credit_limit < params.row.order_amount,
          positive: params.row.credit_limit > params.row.order_amount
        })
    },
    {field: "marca", headerName: "Order Amount", flex: 1},
    {field: "modelo", headerName: "Credit Limit", flex: 1},
    {field: "capacidad", headerName: "Agreement Status", flex: 1},
    {field: "nroAsientos", headerName: "Term", flex: 1},
    {field: "capacidadTanque", headerName: "Term", flex: 1},
    {field: "aeropuerto", headerName: "Term", flex: 1}
  ]

  const session = { accessToken: "test"}
  const [openCreate, setOpenCreate] = useState(false)
  let {data: values = []} = useSWR([process.env.NEXT_PUBLIC_BASE_URL + ROUTES.AEREONAVE_API], fetcherGet)
  console.log(openCreate)
  const hideCreate = () => {
    setOpenCreate(false)
  }
  const createAereonave = () => {
    setOpenCreate(true)
  }

  return (
    <DashboardComponent title={"Crear Aereonave"}>
      <Box
        sx={{
          width: 1,
          "& .super-app.positive": {
            backgroundColor: "rgba(157, 255, 118, 0.49)",
            color: "#1a3e72",
            fontWeight: "600"
          },
          "& .super-app.negative": {
            backgroundColor: "#d47483",
            color: "#1a3e72",
            fontWeight: "600"
          }
        }}>
        <DataGridComponent data={values} headCells={headCells} />
        <IconButton
          onClick={createAereonave}
          aria-label="delete"
          size="small"
          style={{float: "right", marginTop: "-5px"}}>
          CREAR
        </IconButton>
        <Modal title="Crear Aereonave" open={openCreate} handleClose={hideCreate} size="xl">
          <AereonaveForm editMode={false}></AereonaveForm>
        </Modal>
      </Box>
    </DashboardComponent>
  )
}

