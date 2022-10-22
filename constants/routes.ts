const SERVER_PATH = process.env.NEXT_PUBLIC_BASE_URL

const formatPath = (path: string) => {
  return SERVER_PATH + path
}

const ROUTES = {
  // LOAD
  VUELO_CREAR_API: formatPath("/Vuelo/CrearVuelo"),
  EMPLEADO_API: formatPath("/api/Empleado"),
  AEREONAVE_API: formatPath("/Aeronaves"),
  CHECKIN_API: formatPath("/Checkin"),
  RESERVA_REGISTRO_API: formatPath("/Reserva/registro"),
  // AUTH
  RESET_PASSWORD: formatPath("/api/auth/change-password"),
}

export default ROUTES
