import React from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  SvgIcon,
} from "@material-ui/core"
import {
  AccountCircle,
  Email,
  Facebook,
  Instagram,
  Phone,
  WhatsApp,
} from "@material-ui/icons"
import FormikField from "../../UtilityComponents/FormikField"
import MaskInput from "../../UtilityComponents/MaskInput"
import ConfirmationDialog from "../../UtilityComponents/ConfirmationDialog"
import { graphql, useStaticQuery } from "gatsby"
import axios from "axios"

const validationSchema = Yup.object({
  name: Yup.string()
    .max(35, "Por favor, digite um nome com menos de 35 caracteres")
    .required("Digite seu nome"),

  phone: Yup.string().required("Digite um número de telefone para contato"),

  email: Yup.string()
    .email("Digite um endereço de e-mail válido")
    .required("É preciso inserir um e-mail para contato"),

  message: Yup.string().required("Digite uma mensagem"),
})

const useStyles = makeStyles(theme => ({
  primordialRoot: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",

    // flexDirection:

    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
    },
  },

  ancientRoot: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2em",
    marginBottom: "2em",
    width: "100%",

    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },

    [theme.breakpoints.up("md")]: {
      width: "30%",
    },
  },

  formItem: {
    marginBottom: "0.75em",
  },

  formText: {
    fontSize: "10px",
    "&::placeholder": {
      fontSize: "5px",
    },
  },

  formMain: {
    width: "90%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },

  sendButton: {
    "& > .MuiButton-label": {
      color: "#fff",
    },
  },

  formHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    backgroundColor: theme.palette.primary.main,
    padding: "1em",
    fontSize: "22px",
  },

  socialIcons: {
    transition: "all 0.5s ease",
    "& .MuiSvgIcon-root": {
      transition: "all 0.5s ease",
    },

    "& :hover": {
      fill: theme.palette.primary.main,
    },
  },
}))

function CourseContactForm(props) {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { contentType: { eq: "siteInfo" } } }
      ) {
        edges {
          node {
            frontmatter {
              contentType
              phoneOne
              phoneTwo
              mailOne
              mailTwo
              instagramUrl
              facebookUrl
              whatsAppNum
              whatsAppMessage
              address
            }
          }
        }
      }
    }
  `)

  const [phoneOne, setPhoneOne] = React.useState(null)
  const [phoneTwo, setPhoneTwo] = React.useState(null)
  const [mailOne, setMailOne] = React.useState(null)
  const [mailTwo, setMailTwo] = React.useState(null)
  const [instagramUrl, setInstagramUrl] = React.useState("#")
  const [facebookUrl, setFacebookUrl] = React.useState("#")
  const [whatsAppNum, setWhatsAppNum] = React.useState("#")
  const [whatsAppMessage, setWhatsAppMessage] = React.useState(
    "Placeholder WhatsApp automatic message"
  )
  const [address, setAddress] = React.useState(null)

  React.useEffect(() => {
    let localArray = []

    if (data.allMarkdownRemark.edges.length <= 0) {
      console.log("No site info found")
      return
    } else {
      localArray.allMarkdownRemark.edges.map((info, index) => {
        return info.node.frontmatter
      })
    }
  }, [])

  const [dialogState, setDialogState] = React.useState(false)

  const handleDialogOpen = () => {
    setDialogState(true)
  }

  const handleDialogClose = () => {
    setDialogState(false)
  }

  return (
    <div className={classes.primordialRoot}>
      <div className={classes.ancientRoot}>
        <ConfirmationDialog
          type={"success"}
          title={"Mensagem enviada com sucesso"}
          message={
            "Obrigado pelo interesse! Sua mensagem foi enviada com sucesso, logo entraremos em contato com você através do número fornecido no formulário."
          }
          dialogClose={handleDialogClose}
          open={dialogState}
        />
        <Formik
          initialValues={{ name: "", phone: "", email: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values.email, values.message, values.phone, values.name)

            axios
              .post(
                "https://elegant-heyrovsky-1f6f39.netlify.app/.netlify/functions/contactForm",
                {
                  name: values.name,
                  email: values.email,
                  message: values.message,
                  phone: values.phone,
                }
              )
              .then(result => {
                actions.setSubmitting(false)
                actions.resetForm()
                handleDialogOpen()
              })
              .catch(error => {
                console.log(error)
                actions.setSubmitting(false)
              })
          }}
        >
          {formik => (
            <Form className={classes.formMain}>
              <Box className={classes.formHeader}>
                <Box
                  color="#fff"
                  fontWeight="700"
                  fontFamily="Barlow"
                  textAlign="center"
                >
                  Fale conosco
                </Box>
              </Box>
              <Box
                style={{
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                  padding: "1.5rem",
                  borderRadius: "10px",
                }}
              >
                <Grid
                  className={classes.formItem}
                  container
                  item
                  spacing={3}
                  alignItems={formik.errors.name ? "center" : "flex-end"}
                  justify="center"
                >
                  <Grid xs={1} md={2} container justify="center" item>
                    <AccountCircle />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <FormikField
                      fullWidth
                      className={classes.formText}
                      name="name"
                      label="Nome"
                      color="secondary"
                    />
                  </Grid>
                </Grid>

                <Grid
                  className={classes.formItem}
                  container
                  item
                  spacing={3}
                  alignItems={formik.errors.phone ? "center" : "flex-end"}
                  justify="center"
                >
                  <Grid xs={1} md={2} container justify="center" item>
                    <Phone />
                  </Grid>
                  <Grid xs={8} md={10} item>
                    <MaskInput
                      mask={" (9 9)  9 - 9 9 9 9 - 9 9 9 9"}
                      name="phone"
                      label="Celular/WhatsApp"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      color="secondary"
                    ></MaskInput>
                  </Grid>
                </Grid>

                <Grid
                  className={classes.formItem}
                  container
                  item
                  spacing={3}
                  alignItems={formik.errors.email ? "center" : "flex-end"}
                  justify="center"
                >
                  <Grid xs={1} md={2} container justify="center" item>
                    <Email />
                  </Grid>
                  <Grid xs={8} md={10} item>
                    <FormikField
                      fullWidth
                      name="email"
                      label="E-mail"
                      color="secondary"
                    />
                  </Grid>
                </Grid>

                <Box display="flex" justifyContent="center">
                  <FormikField
                    className={classes.formText}
                    name="message"
                    multiline
                    label="Mensagem"
                    fullWidth
                    margin="normal"
                    rows={2}
                    placeholder="Digite sua mensagem aqui"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>

                <Box mt={2} display="flex " justifyContent="center">
                  <Button
                    className={classes.sendButton}
                    disabled={!formik.isValid}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Enviar mensagem
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </div>

      <Box
        whiteSpace="initial"
        overflow="hidden"
        mx={{ xs: "2.5em" }}
        display="flex"
        flexDirection="column"
        fontFamily="Barlow"
      >
        <Box py={2} fontSize={{ xs: "30px", md: "35px" }} fontWeight="700">
          Vale do Rio Paranhana - RS
        </Box>

        <Box
          py={2}
          display="flex"
          flexDirection="column"
          fontSize={{ xs: "20px", md: "25px" }}
          fontWeight="600"
        >
          <Box py={1}>Telefones:</Box>
          {phoneOne ? <Box py={1}>{phoneOne}</Box> : null}
          {phoneTwo ? <Box py={1}>{phoneTwo}</Box> : null}
        </Box>

        <Box
          py={2}
          flexDirection="column"
          display="flex"
          fontSize={{ xs: "20px", md: "25px" }}
          fontWeight="600"
        >
          <Box py={1}>E-mail:</Box>

          {mailOne ? <Box py={1}>{mailOne}</Box> : null}

          {mailTwo ? <Box py={1}>{mailTwo} </Box> : null}
        </Box>

        <Box py={1} display="flex">
          <Box
            className={classes.socialIcons}
            style={{ cursor: "pointer" }}
            fontSize={{ xs: "50px" }}
            pr={3}
          >
            <a style={{ color: "inherit" }} href={facebookUrl}>
              <SvgIcon fontSize="inherit" component={Facebook} />
            </a>
          </Box>

          <Box
            className={classes.socialIcons}
            style={{ cursor: "pointer" }}
            fontSize={{ xs: "50px" }}
            pr={3}
          >
            <a style={{ color: "inherit" }} href={instagramUrl}>
              <SvgIcon fontSize="inherit" component={Instagram} />
            </a>
          </Box>
          <Box
            className={classes.socialIcons}
            style={{ cursor: "pointer" }}
            fontSize={{ xs: "50px" }}
            pr={3}
          >
            <a style={{ color: "inherit" }} href={whatsAppNum}>
              <SvgIcon fontSize="inherit" component={WhatsApp} />
            </a>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default CourseContactForm
