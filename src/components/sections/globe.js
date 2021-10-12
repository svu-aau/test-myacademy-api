import React, { useState, useEffect, useRef } from 'react';
// import Globe from 'react-globe.gl';
import { makeStyles } from '@material-ui/core/styles';

import { useWindowSize } from '../../utils/window';
import { cn } from '../../lib/helpers';

import './globe.css';

// Lazy load the component.
// It is essential that the package is not imported
// on the server but only on the client.
const Globe = React.lazy(() => import('react-globe.gl'));

const useStyles = makeStyles((theme) => ({
  globeContainer: {
    backgroundColor: '#0A1420',
    display: 'flex',
    flexDirection: 'row',
    // margin: '1em',
    [theme.breakpoints.down(675)]: {
      flexDirection: 'column',
    },
  },
  globe: {
    alignItems: 'center',
    display: 'flex',
    flex: 2,
    [theme.breakpoints.down(675)]: {
      flex: 1,
    },
  },
  global: {
    display: 'block',
    flex: 'unset',
  },
  globeInner: (props) => ({
    width: props.width,
    height: props.height,
    margin: '0 auto',
    // '& canvas': {
    //   margin: '0 auto',
    // },
  }),
  header: {
    color: 'white',
  },
  sideContent: {
    alignContent: 'center',
    color: 'white',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  stats: {
    // display: 'flex',
    // alignItems: 'center',
    textAlign: 'center',
  },
  seperator: {
    backgroundColor: '#ED3124',
    height: 2,
    margin: '0 auto',
    width: 50,
  },
}));

const GlobeSection = ({ global, studentData, viewPortfolio = () => {} }) => {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [width, height] = useWindowSize();
  const [hoverD, setHoverD] = useState();

  let globeWidth = width > 675 ? ((width - 32) * 2) / 3 : width - 32;
  let initialGlobeHeight = width > 675 ? height - 140 : height / 2;
  let globeHeight = globeWidth <= initialGlobeHeight ? globeWidth : initialGlobeHeight;

  if (global) {
    globeWidth = ((width - 32) * 2) / 3;
    globeHeight = globeWidth;
  }

  const classes = useStyles({
    width: globeWidth,
    height: globeHeight,
  });

  const isSSR = typeof window === 'undefined';

  useEffect(() => {
    // load data
    // https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson
    // ../data/datasets/ne_110m_admin_0_countries.geojson
    fetch(
      'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'
    )
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  const changeHoverD = (d) => {
    if (hoverD !== d && d) {
      if (d.properties) {
        setHoverD(d.properties.ISO_A3);
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

  const globeReady = () => {
    globeEl.current.controls().enableZoom = false;
  };

  const isCountryPopulated = (properties) => studentCount(properties) > 0;

  return (
    <div className={classes.globeContainer}>
      <div className={cn(classes.globe, global && classes.global)}>
        {global && (
          <div className={classes.header}>
            <h2>Global Works</h2>
            <p>
              Academy of Art University welcomes studets from all around the world - in San Francisco and online! In
              fact, 36% of our current students hail from 115 cuntries worldwide and attend the Academy to take
              advantage of our unique offerings. Find fellow students in your location!
            </p>
          </div>
        )}

        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <div className={classes.globeInner}>
              <Globe
                ref={globeEl}
                onGlobeReady={globeReady}
                backgroundColor="#0A1420"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                onPolygonHover={changeHoverD}
                polygonCapColor={(d) =>
                  !isCountryPopulated(d.properties) ? '#132a40' : d.properties.ISO_A3 === hoverD ? `#54a3e5` : '#2b5781'
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
        )}
      </div>
      {!global && (
        <div className={classes.sideContent}>
          <h2>Students Worldwide</h2>
          <p>
            Academy of Art University welcomes studets from all around the world - in San Francisco and online! In fact,
            36% of our current students hail from 115 cuntries worldwide and attend the Academy to take advantage of our
            unique offerings. Find fellow students in your location!
          </p>

          <div className={classes.stats}>
            <div>
              <h1>115</h1>
              <div className={classes.seperator} />
              <p>Countries that our diverse student and alumni community represent</p>
            </div>

            <div>
              <h1>100%</h1>
              <div className={classes.seperator} />
              <p>All of our 120+ undergraduate and graduate degrees are offered online</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeSection;
