import React from "react"
import DashboardComponent from "../../components/dashboardComponent"
import Grid from "@mui/material/Grid"
import ChangePasswordForm from "../../components/ChangePasswordForm"
import Paper from "@mui/material/Paper"

export default function ChangePassword() {
  return (
    <DashboardComponent title={"Change Password"}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper style={{marginLeft: "20px", padding: "15px 35px 30px"}}>
            <ChangePasswordForm />
          </Paper>
        </Grid>
      </Grid>
    </DashboardComponent>
  )
}

