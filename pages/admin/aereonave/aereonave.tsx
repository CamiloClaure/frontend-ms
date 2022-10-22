import React, {useEffect, useState} from "react"
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
      headerName: "estadoAeronave",
      flex: 1,
    },
    {field: "marca", headerName: "marca", flex: 1},
    {field: "modelo", headerName: "modelo", flex: 1},
    {field: "capacidad", headerName: "capacidad", flex: 1},
    {field: "nroAsientos", headerName: "nroAsientos", flex: 1},
    {field: "capacidadTanque", headerName: "capacidadTanque", flex: 1},
    {field: "aeropuerto", headerName: "aeropuerto", flex: 1}
  ]

  const session = { accessToken: "test"}
  const [openCreate, setOpenCreate] = useState(false)
  const [data, setData] = useState([])
  const hideCreate = () => {
    setOpenCreate(false)
  }
  const createAereonave = () => {
    setOpenCreate(true)
  }
  useEffect(() => {
    fetcherGet(ROUTES.AEREONAVE_API, session.accessToken as string).then(data => {
      console.log(data)
      setData(data)
    })
  }, [])
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
        <IconButton
          onClick={createAereonave}
          aria-label="delete"
          size="small"
          style={{float: "right", marginTop: "-5px"}}>
          CREAR
        </IconButton>
        <DataGridComponent data={data} headCells={headCells} />
        <Modal title="Crear Aereonave" open={openCreate} handleClose={hideCreate} size="xl">
          <AereonaveForm editMode={false}></AereonaveForm>
        </Modal>
      </Box>
    </DashboardComponent>
  )
}

