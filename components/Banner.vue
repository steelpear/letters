<template>
  <div>
    <v-row align="center" justify="center">
      <img src="message.png" transition width="250">
      <svg
        id="svg8"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        width="181.85759mm"
        height="83.560959mm"
        viewBox="0 0 181.85759 83.560959"
        version="1.1"
        inkscape:version="1.0.2 (e86c870879, 2021-01-15, custom)"
        sodipodi:docname="letters.svg"
      >
        <defs
          id="defs2"
        >
          <rect
            id="rect12"
            x="4.2763124"
            y="54.522984"
            width="288.65109"
            height="81.249939"
          />
        </defs>
        <sodipodi:namedview
          id="base"
          pagecolor="#ffffff"
          bordercolor="#666666"
          borderopacity="1.0"
          inkscape:pageopacity="0.0"
          inkscape:pageshadow="2"
          inkscape:zoom="0.43965899"
          inkscape:cx="311.50556"
          inkscape:cy="134.81122"
          inkscape:document-units="mm"
          inkscape:current-layer="layer1"
          inkscape:document-rotation="0"
          showgrid="false"
          inkscape:window-width="1366"
          inkscape:window-height="716"
          inkscape:window-x="-8"
          inkscape:window-y="-8"
          inkscape:window-maximized="1"
          fit-margin-top="0"
          fit-margin-left="0"
          fit-margin-right="0"
          fit-margin-bottom="0"
        />
        <metadata
          id="metadata5"
        >
          <rdf:RDF>
            <cc:Work
              rdf:about=""
            >
              <dc:format>image/svg+xml</dc:format>
              <dc:type
                rdf:resource="http://purl.org/dc/dcmitype/StillImage"
              />
              <dc:title />
            </cc:Work>
          </rdf:RDF>
        </metadata>
        <g
          id="layer1"
          inkscape:label="Слой 1"
          inkscape:groupmode="layer"
          transform="translate(-66.08082,-69.331196)"
        >
          <text
            id="text10"
            xml:space="preserve"
            style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;white-space:pre;shape-inside:url(#rect12);fill-opacity:1;"
            x="80.928795"
            y="0"
            transform="translate(3.0471768,27.468862)"
          ><tspan
            x="72.655666"
            y="89.339361"
          ><tspan
            style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:50.8px;font-family:Scriptorama;-inkscape-font-specification:'Scriptorama, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:inherit"
          >Письма</tspan></tspan></text>
        </g>
      </svg>
      <img src="message.png" transition width="250" style="transform: scale(-1, 1);">
    </v-row>
  </div>
</template>

<style scope>
  svg {cursor: pointer;}
  svg text {
    stroke: white;
    fill: none;
    stroke-dasharray: 0 100;
    animation: dasharray 1.5s forwards;
  }
  @keyframes dasharray {100% {stroke-dasharray: 100 0;fill: white;stroke: none;}}
</style>
