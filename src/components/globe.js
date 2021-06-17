import React, { useState, useEffect, useRef } from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';

import { useWindowSize } from '../utils/window';
import './globe.css';

// Lazy load the component.
// It is essential that the package is not imported
// on the server but only on the client.
const Globe = React.lazy(() => import('react-globe.gl'));

const useStyles = makeStyles(() => ({
  globeInner: (props) => ({
    width: props.width,
    height: props.height,
    margin: '0 auto',
  }),
}));

const GlobeComponent = ({ studentData, viewPortfolio = () => {} }) => {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <StaticQuery
      query={graphql`
        query {
          dataset: file(relativePath: { eq: "ne_110m_admin_0_countries.geojson" }) {
            publicURL
          }
        }
      `}
      render={({ dataset }) => {
        const globeEl = useRef();
        const [countries, setCountries] = useState({ features: [] });
        const [width] = useWindowSize();
        const [hoverD, setHoverD] = useState();

        const globeWidth = width - 32 >= 1170 ? 1170 : width - 32;
        const globeHeight = globeWidth;

        let geoJsonDataset =
          dataset && dataset.publicURL
            ? dataset.publicURL
            : 'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson';

        const classes = useStyles({
          width: globeWidth,
          height: globeHeight,
        });

        const isSSR = typeof window === 'undefined';

        useEffect(() => {
          // load data
          fetch(geoJsonDataset)
            .then((res) => res.json())
            .then(setCountries);
        }, []);

        const changeHoverD = (d) => {
          if (hoverD !== d && d) {
            if (d.properties) {
              setHoverD(d.properties.ISO_A2);
            }
          }
        };

        const studentCount = ({ ISO_A2 }) => {
          if (studentData && ISO_A2) {
            const ISO = studentData.find(({ code }) => code === ISO_A2);
            if (ISO) {
              return ISO.count || 0;
            }
          }

          return 0;
        };

        const globeReady = async () => {
          globeEl.current.controls().enableZoom = false;
          globeEl.current.pointOfView({ lat: 37.0902, lng: -95.7129, altitude: 2.5 });
        };

        const isCountryPopulated = (properties) => studentCount(properties) > 0;

        if (!isSSR) {
          return (
            <React.Suspense fallback={<div />}>
              <div className={classes.globeInner}>
                <Globe
                  ref={globeEl}
                  onGlobeReady={globeReady}
                  backgroundColor="#0A1420"
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                  onPolygonHover={changeHoverD}
                  polygonCapColor={(d) =>
                    !isCountryPopulated(d.properties)
                      ? '#132a40'
                      : d.properties.ISO_A2 === hoverD
                      ? `#54a3e5`
                      : '#2b5781'
                  }
                  polygonsData={countries.features}
                  polygonSideColor={() => 'transparent'}
                  polygonStrokeColor={(d) => (isCountryPopulated(d.properties) ? '#54a3e5' : 'transparent')}
                  width={globeWidth}
                  height={globeHeight}
                  polygonLabel={({ properties: d }) =>
                    isCountryPopulated(d)
                      ? `
                    <div class="globe-caption">
                      <strong>${d.ADMIN}</strong> <br /><br />
                      ${studentCount(d)} students
                    </div>
                `
                      : `<div></div>`
                  }
                  onPolygonClick={(d) => isCountryPopulated(d.properties) && viewPortfolio(d.properties.ISO_A2)}
                />
              </div>
            </React.Suspense>
          );
        }
        return <div></div>;
      }}
    />
  );
};

export default GlobeComponent;
