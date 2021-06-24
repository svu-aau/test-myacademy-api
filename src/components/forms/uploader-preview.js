import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import MovieIcon from '@material-ui/icons/Movie';
import TextField from '@material-ui/core/TextField';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { observable } from 'mobx';
import { useObserver } from 'mobx-react-lite';
import Select from '@material-ui/core/Select/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    maxWidth: 800,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  fieldset: {
    border: 'none',
    padding: 0,
    width: '100%',
  },
  cover: {
    width: '50%',
    height: '250px',
    textAlign: 'center',
    backgroundColor: 'black',
  },
  cardMedia: {
    height: '100%',
    objectFit: 'unset',
    width: 'auto',
    display: 'inline-block',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  list: {
    '& > * + *': {
      marginLeft: theme.spacing(0.5),
    },
  },
  textField: {
    marginRight: theme.spacing(1),
    width: '8ch',
  },
  preview: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieIcon: {
    fontSize: '140px',
    color: 'rgba(0, 0, 0, 0.13)',
  },
  pdfIcon: {
    fontSize: '140px',
    color: 'rgba(0, 0, 0, 0.13)',
  },
  select: {
    marginTop: '2em',
  },
}));

function getTypeComponent(meta) {
  const mediaType = meta.type;
  // console.log('meta.previewUrl', meta.previewUrl);
  const classes = useStyles();
  if (mediaType.match(/image/g)) {
    return (
      <div className={classes.cover}>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          image={meta.previewUrl}
          title={`Uploaded ${mediaType}`}
        />
      </div>
    );
  } else if (mediaType.match(/pdf/g)) {
    return <CardMedia className={classes.cover} component={PdfPreview} title={`Uploaded ${mediaType}`} />;
  } else {
    return <CardMedia className={classes.cover} component={VideoPreview} title={`Uploaded ${mediaType}`} />;
  }
}

// we keep track of these form values outside of rendering
const simpleState = observable({});

const WiredTextInput = ({ className, metaId, name, size, label, fullWidth = false, multiline = false }) => {
  return (
    <TextField
      fullWidth={fullWidth}
      name={`filemeta-${metaId}-${name}`}
      value={simpleState[metaId] && simpleState[metaId][name]}
      onChange={(e) => (simpleState[metaId][name] = e.target.value)}
      label={label}
      size={size}
      variant="standard"
      multiline={multiline}
    />
  );
};

const chooseCategory = (e, metaId) => {
  let { value } = e.target;
  simpleState[metaId]['category'] = e.target.value;
};

const checkSchool = (schoolObj, name) => {
  return schoolObj && schoolObj.title && schoolObj.title.toLowerCase().includes(name);
};

export default ({ status, meta, fileWithMeta, name, school, categories }) => {
  const classes = useStyles();
  const mediaType = meta.type;
  const isVideo = mediaType.match(/video/g);
  const isResume = name === 'resume';
  const isHero = name === 'heroImage';
  const isPortfolioFields = name !== 'heroImage' && !isResume;

  const isFineArt = checkSchool(school, 'fine art');
  const isIllustration = checkSchool(school, 'illustration');
  const isJewelry = checkSchool(school, 'jewelry');
  const isArchitecture = school && school.title && school.title.trim().toLowerCase() === 'architecture';
  const isActing = school && school.title && school.title.trim().toLowerCase() === 'acting';

  if (!simpleState[meta.id]) {
    simpleState[meta.id] = {};
  }

  const isPhysicalMedia = isPortfolioFields && (isFineArt || isJewelry);
  const showDescriptionField = isPortfolioFields && isArchitecture;
  return useObserver(() => (
    <Card className={classes.root} style={{ opacity: status === 'complete' ? 0.3 : 1 }}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <fieldset className={classes.fieldset}>
            {!isResume && (
              <>
                <WiredTextInput
                  required
                  fullWidth
                  metaId={meta.id}
                  name="title"
                  label={(isActing && isHero ? 'Your Name' : 'Title') + ' (image alt text)'}
                  size="small"
                />
                <WiredTextInput required fullWidth metaId={meta.id} name="caption" label="Caption" size="small" />
              </>
            )}
            {!isVideo && isPhysicalMedia && (
              <>
                {(isFineArt || isIllustration || isJewelry) && (
                  <WiredTextInput fullWidth metaId={meta.id} name="credit" label="Photo by" size="small" />
                )}
                <WiredTextInput fullWidth metaId={meta.id} name="medium" label="Medium" size="small" />
                <WiredTextInput
                  className={classes.textField}
                  metaId={meta.id}
                  name="height"
                  label="Height"
                  size="small"
                />
                <WiredTextInput
                  className={classes.textField}
                  metaId={meta.id}
                  name="width"
                  label="Width"
                  size="small"
                />
                <WiredTextInput
                  className={classes.textField}
                  metaId={meta.id}
                  name="depth"
                  label="Depth"
                  size="small"
                />
              </>
            )}
            {categories && categories.length > 0 && (
              <Select
                native
                value={simpleState[meta.id] && simpleState[meta.id]['category']}
                className={classes.select}
                onChange={(e) => chooseCategory(e, meta.id)}
                name={`filemeta-${meta.id}-_category`}
              >
                <option value="">Choose category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </Select>
            )}
            {showDescriptionField && (
              <WiredTextInput
                fullWidth
                metaId={meta.id}
                name="description"
                multiline
                label="Description of work"
                size="small"
              />
            )}
            <input type="hidden" name={`filemeta-${meta.id}-_name`} value={name} />
          </fieldset>
        </CardContent>
        <div className={classes.controls}>
          <div className={classes.list}>
            <Chip size="small" variant="outlined" label={status} />
            <Chip size="small" variant="outlined" label={`${parseFloat(meta.size / 1000000).toFixed(2)} mb`} />
          </div>
          <Button aria-label="remove" onClick={fileWithMeta.remove}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
      {getTypeComponent(meta)}
    </Card>
  ));
};

function VideoPreview() {
  const classes = useStyles();
  return (
    <div className={classes.preview}>
      <MovieIcon className={classes.movieIcon} />
    </div>
  );
}

function PdfPreview() {
  const classes = useStyles();
  return (
    <div className={classes.preview}>
      <PictureAsPdfIcon className={classes.pdfIcon} />
    </div>
  );
}
