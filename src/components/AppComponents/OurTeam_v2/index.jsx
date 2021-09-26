import { Container } from "@material-ui/core"
import { Timeline } from "@material-ui/lab"
import React from "react"
import styled from "styled-components"
import landingBg from "../../../images/svg-hero-front.svg"
import TimelineCustomItem from "../../UtilityComponents/TimelineCustomItem"

const OurTeamV2Root = styled.div`
  background-image: ${props => `url(${landingBg})`};
  z-index: 1;
  background-repeat: no-repeat;
  width: 100%;
  background-position: center center;
  height: auto;
  background-size: cover;
  font-family: "Barlow";

  /* .MuiTimelineItem-missingOppositeContent:before {
    flex: 0;
  }

  .MuiTimeline-root {
    max-width: 100%;

    @media (min-width: 1024px) {
      max-width: 50%;
    }
  } */

  .timelineItem {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    .timelineItem {
      font-size: 22px;
    }
  }
`

const OurTeamV2Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 3%;
  padding-bottom: 3%;
`

const OurTeamV2SectionTitle = styled.div`
  color: #17396b;
  font-size: 23px;
  font-weight: 600;
  padding-bottom: 3%;

  @media (min-width: 1024px) {
    font-size: 35px;
  }
`

let connectorArray = [
  <div>
    O Instituto é um <strong>agente social transformador</strong> que fomenta a
    inclusão social e a acessibilidade através da cultura, esporte, educação e
    lazer.
  </div>,
  <div>
    Com atuação em parceria com o poder público e a sociedade civil, foram
    dezenas de <strong>projetos e ações desenvolvidos e executados</strong> nos
    últimos 17 anos.
  </div>,
  <div>
    O Instituto{" "}
    <strong>
      gerou nos últimos três anos mais de 500 postos de trabalhos diretos
    </strong>{" "}
    em eventos culturais realizados, movimentou um recurso financeiro de mais de
    oitocentos mil reais diretamente, além de trabalhar com moeda social.
  </div>,

  <div>
    Nos últimos dois anos, o Instituto Gaúcho Pró-Cidadania{" "}
    <strong>auxiliou três paratletas na captação </strong> de recursos do Fundo
    Estadual de Incentivo Esporte - FEIE para treinamento e competições.
  </div>,
]

const OurTeamV2 = () => {
  return (
    <Container maxWidth='lg'>
       <OurTeamV2Root>
      <OurTeamV2Container>
        <OurTeamV2SectionTitle>Atendimento e inclusão</OurTeamV2SectionTitle>

        <Timeline align="alternate">
          {connectorArray.map((item, index) => {
            return <TimelineCustomItem key={index} timelineText={item} />
          })}
        </Timeline>
      </OurTeamV2Container>
    </OurTeamV2Root>
    </Container>
  )
}

export default OurTeamV2
