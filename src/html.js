import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .loader {
              color: #ffffff;
              font-size: 100px;
              text-indent: -9999em;
              overflow: hidden;
              width: 1em;
              height: 1em;
              border-radius: 50%;
              margin: 72px auto;
              position: absolute;
              top: 15%;
              -webkit-transform: translateZ(0);
              -ms-transform: translateZ(0);
              transform: translateZ(0);
              -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
              animation: load6 1.7s infinite ease, round 1.7s infinite ease;
            }
            @-webkit-keyframes load6 {
              0% {
                box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
              }
              5%,
              95% {
                box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
              }
              10%,
              59% {
                box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
              }
              20% {
                box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
              }
              38% {
                box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
              }
              100% {
                box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
              }
            }
            @keyframes load6 {
              0% {
                box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
              }
              5%,
              95% {
                box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
              }
              10%,
              59% {
                box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
              }
              20% {
                box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
              }
              38% {
                box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
              }
              100% {
                box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
              }
            }
            @-webkit-keyframes round {
              0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
              }
              100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
              }
            }
            @keyframes round {
              0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
              }
              100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
              }
            }
            
            @media (min-width: 1024px) {
              .loader {
                font-size: 200px;
              }
            }
        `,
          }}
        ></style>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body style={{ overflow: "hidden" }} {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <div
          id="atlas-loader"
          style={{
            width: "100%",
            height: "200vh",
            backgroundColor: "rgb(23, 57, 107)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "0",
            left: "0",
            zIndex: "9998",
            transitionProperty: "opacity",
            transitionDuration: "0.5s",
            transitionTimingFunction: "ease",
            position: "absolute",
          }}
        >
          <div className="loader"></div>
        </div>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
