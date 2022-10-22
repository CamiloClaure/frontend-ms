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
  checkIn?: any
  shipment_id?: any
  handleClose?: any
  onSuccessfulEdit?: any
  onErrorEdit?: any
  editMode: boolean
}

export interface Customer {
  customer_name: string
}

export const CheckInForm: React.FC<LoadFormProps> = ({
                                                         checkIn,
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

  // let shipmentIdDefault = editMode ? checkIn.shipment_id : shipment_id
  // const defaultValues: FieldValues = {
  //   load_status: checkIn ? checkIn.load_status : "a_potential",
  //   customer: checkIn ? checkIn.customer : null,
  //   shipment_id: shipmentIdDefault
  // }

  const loadSchema = yup.object().shape({
    route: yup.string().nullable(),
    checkInDate: yup.string().required(),
    docPassenger: yup.string().nullable(),
    ticketCode: yup.string().required(),
    baggage: yup.string().nullable()
  })

  const {control, handleSubmit, setValue} = useForm({
    resolver: yupResolver(loadSchema),
    // defaultValues: defaultValues
  })
  //
  // const {data: loadStatusList = []} = useSWR<any>([ROUTES.GET_LOAD_STATUS, session.accessToken], fetcherGet)
  // let {data: shipmentIdList = []} = useSWR([ROUTES.GET_SHIPMENTS_IDS_FROM_SHIPMENT, session.accessToken], fetcherGet)

  useEffect(() => {
    // fetchInitData()
  }, [])


  const createCheckIn = data => {
    console.log(data)
    setLoading(true)
    setOpenBackDrop(true)
    fetcherPost(ROUTES.CHECKIN_API, data, session.accessToken as string)
      .then(response => {
        console.log(response)

        setOpenBackDrop(false)
        setLoading(false)
        // onSuccessfulEdit("The checkIn was created successfully")
        // handleClose()
      })
      .catch(error => {
        setLoading(false)
        setOpenBackDrop(false)
        // onErrorEdit(error.response.data)
      })
  }

  const updateLoad = data => {
    // data["prev_shipment_id"] = checkIn.shipment_id
    // data["prev_memo"] = checkIn.memo
    // data["prev_customer"] = checkIn.customer
    // setLoading(true)
    // setOpenBackDrop(true)
    // fetcherPut(`${ROUTES.LOAD_API}${checkIn ? checkIn.id : null}/`, data, session.accessToken as string)
    //   .then(response => {
    //     setOpenBackDrop(false)
    //     setLoading(false)
    //     onSuccessfulEdit("The checkIn was edited successfully")
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
      createCheckIn(formData)
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
            <TextInput control={control} name="route" label="route" defaultValue={checkIn?.route} />
          </Grid>
          <Grid item md={4}>
            <TextInput control={control} name="checkInDate" label="checkInDate" defaultValue={checkIn?.checkInDate} />
          </Grid>
          <Grid item md={2}>
            <TextInput control={control} name="docPassenger" label="docPassenger" defaultValue={checkIn?.docPassenger} />
          </Grid>
          <Grid item md={2}>
            <TextInput control={control} name="ticketCode" label="ticketCode" defaultValue={checkIn?.ticketCode} />
          </Grid>
          <Grid item md={2}>
            <TextInput control={control} name="baggage" label="baggage" defaultValue={checkIn?.baggage} />
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
