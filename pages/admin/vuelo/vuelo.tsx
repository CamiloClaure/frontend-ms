import React, {useEffect, useState} from "react"
import useSWR from "swr"

import {GridCellParams, GridColDef} from "@mui/x-data-grid-pro"

import ROUTES from "../../../constants/routes"
import {fetcherGet, fetcherPost} from "../../../hooks/urls"
import DashboardComponent from "../../../components/dashboardComponent"
import {DataGridComponent} from "../../../components/data_grid_component"
import {Box, IconButton} from "@mui/material"
import clsx from "clsx"
import {laggy} from "../../../hooks/swrHelper"
import {AereonaveForm} from "../../../components/AereonaveForm/AereonaveForm";
import {EmpleadoForm} from "../../../components/EmpleadoForm/EmpleadoForm";
import {VueloForm} from "../../../components/VueloForm/VueloForm";
import Modal from "../../../components/Modal";

export default function VueloView() {
  const headCells: GridColDef[] = [
    {
      field: "codVuelo",
      headerName: "codVuelo",
      flex: 1
    },
    {field: "horaSalida", headerName: "Order Amount", flex: 1},
    {field: "horaLLegada", headerName: "Credit Limit", flex: 1},
    {field: "estado", headerName: "Agreement Status", flex: 1},
    {field: "precio", headerName: "Term", flex: 1},
    {field: "stockAsientos", headerName: "Term", flex: 1},
    {field: "fecha", headerName: "Term", flex: 1},
    {field: "codRuta", headerName: "Term", flex: 1},
    {field: "codAeronave", headerName: "Term", flex: 1},
    {field: "activo", headerName: "Term", flex: 1}
  ]

  const session = { accessToken: "test"}

  const [openCreate, setOpenCreate] = useState(false)
  const [data, setData] = useState<{ data: any[], success: boolean}>({ data: [], success: true})
  const hideCreate = () => {
    setOpenCreate(false)
  }
  const createVuelo = () => {
    setOpenCreate(true)
  }
  useEffect(() => {
    fetcherPost(ROUTES.VUELO_ACTIVOS_API, {}, session.accessToken as string).then(data => {
      console.log(data)
      setData(data)
    })
  }, [])
  return (
    <DashboardComponent title={"Crear Vuelo"}>
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
        {/*<DataGridComponent data={credit_ready_to_send} headCells={headCells} />*/}
        <IconButton
          onClick={createVuelo}
          aria-label="delete"
          size="small"
          style={{float: "right", marginTop: "-5px"}}>
          CREAR
        </IconButton>
        <DataGridComponent data={data?.data} headCells={headCells} getRowId={(row) => row.codVuelo} />
        <Modal title="Crear Vuelo" open={openCreate} handleClose={hideCreate} size="xl">
          <VueloForm editMode={false}></VueloForm>
        </Modal>
      </Box>
    </DashboardComponent>
  )
}

