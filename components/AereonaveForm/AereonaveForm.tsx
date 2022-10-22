import React, {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import Button from "@mui/material/Button"
import TextInput from "../Inputs/TextInput"
import ROUTES from "../../constants/routes"
import {fetcherGet, fetcherPost, fetcherPut} from "../../hooks/urls"
import {CustomBackdrop} from "../CustomBackdrop"
import {DialogActions} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import LoadingButton from "@mui/lab/LoadingButton"
import Grid from "@mui/material/Grid"
import {useStore} from "../../hooks/store"

export interface LoadFormProps {
  aereonave?: any
  shipment_id?: any
  handleClose?: any
  onSuccessfulEdit?: any
  onErrorEdit?: any
  editMode: boolean
}

export interface Customer {
  customer_name: string
}

export const AereonaveForm: React.FC<LoadFormProps> = ({
  aereonave,
  shipment_id,
  handleClose,
  onSuccessfulEdit,
  onErrorEdit,
  editMode
}) => {

  const [openBackDrop, setOpenBackDrop] = React.useState(false)
  const [customerList, setCustomerList] = React.useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const appConfig = useStore(state => state.appConfig)
  const session = { accessToken: "test"}

  // let shipmentIdDefault = editMode ? aereonave.shipment_id : shipment_id
  // const defaultValues: FieldValues = {
  //   load_status: aereonave ? aereonave.load_status : "a_potential",
  //   customer: aereonave ? aereonave.customer : null,
  //   shipment_id: shipmentIdDefault
  // }

  const loadSchema = yup.object().shape({
    estadoAeronave: yup.number().nullable(),
    marca: yup.string().required(),
    modelo: yup.string().nullable(),
    capacidad: yup.number().required(),
    nroAsientos: yup.number().nullable(),
    capacidadTanque: yup.number().nullable(),
    aeropuerto: yup.number().nullable(),
  })

  const {control, handleSubmit, setValue} = useForm({
    resolver: yupResolver(loadSchema),
    // defaultValues: defaultValues
  })

  const createAereonave = data => {
    console.log(data)
    setLoading(true)
    setOpenBackDrop(true)
    fetcherPost(ROUTES.AEREONAVE_API, data, session.accessToken as string)
      .then(response => {
        console.log(response)
        setOpenBackDrop(false)
        setLoading(false)
        // onSuccessfulEdit("The aereonave was created successfully")
        // handleClose()
      })
      .catch(error => {
        setLoading(false)
        setOpenBackDrop(false)
        // onErrorEdit(error.response.data)
      })
  }

  const updateLoad = data => {
    // data["prev_shipment_id"] = aereonave.shipment_id
    // data["prev_memo"] = aereonave.memo
    // data["prev_customer"] = aereonave.customer
    // setLoading(true)
    // setOpenBackDrop(true)
    // fetcherPut(`${ROUTES.LOAD_API}${aereonave ? aereonave.id : null}/`, data, session.accessToken as string)
    //   .then(response => {
    //     setOpenBackDrop(false)
    //     setLoading(false)
    //     onSuccessfulEdit("The aereonave was edited successfully")
    //     handleClose()
    //   })
    //   .catch(error => {
    //     setLoading(false)
    //     setOpenBackDrop(false)
    //     onErrorEdit(error.response.data)
    //   })
  }

  const onSubmit = formData => {
    if (editMode) {
      updateLoad(formData)
    } else {
      createAereonave(formData)
    }
  }

  function closeDialog() {
    handleClose()
  }

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} style={{maxWidth: "800px", marginLeft: "30px"}}>
        <Grid container spacing={1}>
          <Grid item md={8}>
            <TextInput control={control} name="estadoAeronave" label="Estado Aeronave" defaultValue={aereonave?.estadoAeronave} />
          </Grid>
          <Grid item md={4}>
            <TextInput control={control} name="marca" label="marca" defaultValue={aereonave?.marca} />
          </Grid>
          <Grid item md={2}>
            <TextInput control={control} name="modelo" label="modelo" defaultValue={aereonave?.modelo} />
          </Grid>
          <Grid item md={2}>
            <TextInput control={control} name="capacidad" label="capacidad" defaultValue={aereonave?.capacidad} />
          </Grid>
          <Grid item md={2}>
            <TextInput control={control} name="nroAsientos" label="nroAsientos" defaultValue={aereonave?.nroAsientos} />
          </Grid>
          <Grid item md={2}>
            <TextInput control={control} name="capacidadTanque" label="capacidadTanque" defaultValue={aereonave?.capacidadTanque} />
          </Grid>
          <Grid item md={2}>
            <TextInput control={control} name="aeropuerto" label="aeropuerto" defaultValue={aereonave?.aeropuerto} />
          </Grid>
        </Grid>

        <DialogActions>
          <Button onClick={closeDialog}>Cancelar</Button>
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            loadingPosition="end">
            Guardar
          </LoadingButton>
        </DialogActions>
      </form>



      <CustomBackdrop openBackdrop={openBackDrop} />
    </>
  )
}
