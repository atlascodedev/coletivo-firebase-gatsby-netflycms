import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import fancyBgMobile from "../../../images/rectagle-bg.svg"
import fancyBG from "../../../images/green-rect.svg"
import image from "../../../images/pro-arte-2.png"
import LazyLoad from "react-lazyload"
import { useStaticQuery } from "gatsby"
import { graphql } from "gatsby"

const AboutUsDialog = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog scroll={"paper"} open={open} onClose={handleClose}>
        <DialogTitle>Associação sem fins lucrativos</DialogTitle>
        <DialogContent>
          I - DA DENOMINAÇÃO, FINS, SEDE, FORO E DURAÇÃO Art. 1º - O COLETIVO
          PRÓ-CIDADANIA, criado e constituído no município de Taquara(RS), com
          sede à Rua Erechim, 2595, CEP 95600-554, Bairro Jardim do Prado, é uma
          sociedade civil, com personalidade jurídica distinta de seus sócios,
          sem fins lucrativos e se rege pelo presente ESTATUTO. Art. 2º - O
          COLETIVO PRÓ-CIDADANIA tem por finalidade: a) Elaborar, captar
          recursos financeiros e executar projetos, diretamente ou em parceria
          com empresas, coletivos, entidades e órgãos públicos, de acordo com os
          interesses dos associados visando desenvolver suas atividades
          profissionais, com ética, eficiência e em regime colaborativo de
          trabalho;
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function AboutUs(props) {
  const [aboutUsDialog, setAboutUsDialog] = React.useState(false)

  return (
    <div>
      <FancyBackground image={fancyBG}>
        <Container>
          <AboutUsGrid>
            <LazyLoad>
              <Box
                sx={{
                  width: { xs: "300px", lg: "650px" },
                  height: { xs: "300px", lg: "auto" },
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={image}
                />
              </Box>
            </LazyLoad>

            <AboutUsTextContainer>
              <Box
                sx={{
                  fontSize: { xs: "22px", md: "32px", lg: "32px !important" },
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                Sobre nós
              </Box>
              <Box sx={{ fontSize: { xs: "14px", lg: "20px" }, color: "#fff" }}>
                O Instituto Gaúcho Pró-Cidadania é uma associação sem fins
                lucrativos que nasceu em 2003 como Escola de Samba Mocidade
                Independente Jardim do Prado. Em 2019, passou por uma reforma
                estatutária e assim ampliou sua atuação, transformando-se em
                Instituto. Atualmente, elabora e executa projetos e ações no
                COREDE Paranhana - Encosta da Serra.
              </Box>
            </AboutUsTextContainer>
          </AboutUsGrid>
        </Container>
      </FancyBackground>
      <AboutUsDialog
        open={aboutUsDialog}
        handleClose={() => setAboutUsDialog(false)}
      />
    </div>
  )
}

export default AboutUs
const FancyBackground = styled.div<{ image: string }>`
  position: relative;
  z-index: 1;
  background-image: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding-top: 20px;
  padding-bottom: 40px;
`

const AboutUsGrid = styled.div`
  display: grid;
  grid-template-rows: auto;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: none;
    column-gap: 50px;
  }
`

const AboutUsPictureContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AboutUsPicture = styled.img<{ src: string }>`
  width: 280px;
  height: 270px;

  @media (min-width: 1024px) {
    width: 350px;
    height: 440px;
  }
`

const AboutUsTextContainer = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  gap: 20px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`
