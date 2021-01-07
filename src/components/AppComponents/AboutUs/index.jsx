import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import fancyBgMobile from "../../../images/rectagle-bg.svg"
import peopleGroup from "../../../images/people-group.png"

const FancyBackground = styled.div`
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
  height: 900px;
`

const AboutUsGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: none;
  }
`

const AboutUsPictureContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AboutUsPicture = styled.img`
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

  & > h3 {
    font-weight: 700;
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  & > div {
    font-size: 14px;
    margin-bottom: 20px;
  }

  & > button {
    color: "#fff";
  }

  @media (min-width: 1024px) {
    & > div {
      font-size: 22px;
    }

    & > h3 {
      font-size: 35px;
    }
  }
`
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
      <FancyBackground image={fancyBgMobile}>
        <Container>
          <AboutUsGrid>
            <AboutUsPictureContainer>
              <AboutUsPicture src={peopleGroup} />
            </AboutUsPictureContainer>

            <AboutUsTextContainer>
              <h3>Sobre nós</h3>
              <div>
                Somos uma associação sem fins lucrativos que atua na região do
                Vale do Rio Paranhana e entorno. O Coletivo tem por finalidades,
                entre outras, promover a cidadania e os direitos sociais, com
                ênfase na equidade de gênero e na igualdade racial, incentivar a
                cultura e o esporte locais, estimular o interesse pelo
                patrimônio histórico, estimular os regimes de trabalho
                associativista, cooperativista e de auto-gestão solidária junto
                às populações expostas a vulnerabilidades econômico-sociais.
              </div>
              <Button
                onClick={() => setAboutUsDialog(true)}
                style={{ color: "#fff", border: "2px solid #fff" }}
                variant="outlined"
              >
                Nosso estatuto
              </Button>
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
