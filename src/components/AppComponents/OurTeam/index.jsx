import { Container } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import stepperSvg from "../../../images/stepper-svg.svg"

const OurTeamRootContainer = styled.div`
  background-color: #f3f3f3;
  font-family: "Barlow";
`

const OurTeamGridContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  width: 100%;
  padding-top: 2em;

  @media (min-width: 1024px) {
    padding-top: 4em;
    grid-template-rows: none;
    grid-template-columns: 0.7fr 0.7fr;
  }
`

const OurTeamPhotosInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-auto-flow: dense;
  justify-items: center;
  padding-bottom: 2em;

  @media (min-width: 768px) {
    grid-template-columns: 33.3333% 33.3333% 33.3333%;
  }

  @media (min-width: 1024px) {
    padding-top: 1em;
    grid-template-columns: 33.3333% 33.3333% 33.3333%;
  }
`

const OurTeamPhotosContainer = styled.div`
  justify-self: center;

  & > h3 {
    color: #17396b;
    margin: 0;
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    margin-top: 10px;
    & > h3 {
      font-size: 35px;
    }
  }
`

const TeamMemberCardBase = styled.div`
  height: 140px;
  width: 140px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  filter: grayscale(100%);
  transition: all 0.5s ease-in-out;

  :hover {
    filter: grayscale(0%);

    & .cardMemberInfo {
      opacity: 0.85;

      & > h5 {
        opacity: 1;
      }

      & > div {
        opacity: 1;
      }
    }
  }
`

const TeamMemberCardImage = styled.img`
  width: 100%;
  height: 100%;
`

const TeamMemberCardInfo = styled.div`
  height: 38px;
  width: 100%;
  background: #ffffff;
  opacity: 0;
  text-align: center;
  position: absolute;
  bottom: 0;
  transition: all 0.5s ease-in-out;

  & > h5 {
    margin: 0;
    font-size: 13px;
    font-weight: 700;
  }

  & > div {
    font-size: 10px;
  }
`

const TeamMemberCardInnerContainer = styled.div`
  width: 100%;
  height: 100%;
`

const TeamMemberCard = ({ img, name, position }) => {
  return (
    <TeamMemberCardBase>
      <TeamMemberCardInnerContainer>
        <TeamMemberCardImage
          src={
            img
              ? img
              : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=150"
          }
        />

        <TeamMemberCardInfo className={"cardMemberInfo"}>
          <h5>{name ? name : "Placeholder Name"}</h5>
          <div>{position ? position : "Placeholder Position"}</div>
        </TeamMemberCardInfo>
      </TeamMemberCardInnerContainer>
    </TeamMemberCardBase>
  )
}

const OurTeamStepperSvg = styled.img`
  height: 460px;
  margin-top: 25px;
  align-self: flex-start;

  @media (min-width: 1024px) {
    align-self: center;
    margin-top: 45px;
  }
`

const OurTeamTextContainer = styled.div`
  display: flex;
`

const OurTeamTextInnerContainer = styled.div`
  margin-left: 20px;
  margin-top: 10px;

  & > div {
    font-size: 16px;

    & > .stepperItem {
      padding-top: 13px;
    }
  }

  & > h3 {
    color: #17396b;
    margin: 0;
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    & > div {
      font-size: 22px;

      & > .stepperItem {
        padding-top: 15px;
      }
    }

    & > h3 {
      font-size: 35px;
    }
  }
`

function OurTeam(props) {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { contentType: { eq: "teamMembers" } } }
      ) {
        edges {
          node {
            frontmatter {
              contentType
              teamMemberPicture
              teamMemberPosition
              teamMemberName
              active
            }
          }
        }
      }
    }
  `)

  let teamMembers = data.allMarkdownRemark.edges.map((member, index) => {
    return member.node.frontmatter
  })

  console.log(teamMembers)

  return (
    <OurTeamRootContainer>
      <Container>
        <OurTeamGridContainer>
          <OurTeamPhotosContainer>
            <h3>Equipe</h3>
            <OurTeamPhotosInnerContainer>
              <TeamMemberCard
                img={teamMembers[0].teamMemberPicture}
                name={teamMembers[0].teamMemberName}
                position={teamMembers[0].teamMemberPosition}
              />
              <TeamMemberCard />
              <TeamMemberCard />
              <TeamMemberCard />
              <TeamMemberCard />
              <TeamMemberCard />
              <TeamMemberCard />
              <TeamMemberCard />
            </OurTeamPhotosInnerContainer>
          </OurTeamPhotosContainer>
          <OurTeamTextContainer>
            <OurTeamStepperSvg src={stepperSvg} />
            <OurTeamTextInnerContainer>
              <h3>Atendimento e inclusão</h3>
              <div>
                <div className={"stepperItem"}>
                  Com atuação em parceria com o poder público e a sociedade
                  civil, foram milhares de atendidos diretos nos últimos 15
                  anos.
                </div>

                <div className={"stepperItem"}>
                  No município de Jaquirana/RS, os projetos realizados atenderam
                  25% de toda a população, em especial crianças e jovens.
                </div>

                <div className={"stepperItem"}>
                  A OSC gerou nos últimos três anos mais de 500 postos de
                  trabalhos em eventos culturais realizados, movimentou um
                  recurso financeiro de mais de 700 mil reais diretamente, além
                  de trabalhar com moeda social.
                </div>

                <div className={"stepperItem"}>
                  Nos últimos dois anos, o Coletivo Pró-Cidadania auxiliou três
                  paratletas gaúchos na captação de recursos para treinamento e
                  competições.
                </div>
              </div>
            </OurTeamTextInnerContainer>
          </OurTeamTextContainer>
        </OurTeamGridContainer>
      </Container>
    </OurTeamRootContainer>
  )
}

export default OurTeam
