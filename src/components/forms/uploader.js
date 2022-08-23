import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import UploaderPreview from './uploader-preview';
import { VIDEO_FILE_TYPES } from '../../lib/constants';
// material
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: '6rem',
    '& > * + *': {
      marginTop: '2rem',
    },
  },
  errorText: {
    color: '#dd271a',
    letterSpacing: '0.02rem',
    margin: '1em 0 0 !important',
    fontWeight: '500',
    fontSize: '14px',
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  label: {
    marginLeft: theme.spacing(1.5),
  },
  labelEmpty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    top: '-1em',
    flex: '1',
    height: '100%',
    padding: '0 120px',
    lineHeight: '1.5em',
    fontFamily: "'Helvetica', sans-serif",
    fontSize: '20px',
    fontWeight: '600',
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    cursor: 'pointer',
  },
  dropzone: {
    width: '100%',
    background: 'rgba(0, 0, 0, 0.13)',
    minHeight: '250px',
    borderBottom: '1px solid black',
    paddingTop: '4rem',
    paddingBottom: '2rem',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    boxSizing: 'border-box',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  subText: {
    fontSize: '0.9rem',
  },
}));

let fileChanged = null;

// eslint-disable-next-line react/display-name
export default React.memo(
  ({
    acceptedFileTypes,
    callback,
    categories,
    error,
    errorText,
    fileUploadStatus,
    formSubmitState,
    label,
    limit,
    name,
    required,
    school,
  }) => {
    fileChanged = null;
    const classes = useStyles();
    const [fileStatuses, setFileStatuses] = React.useState({});
    const [disabled, setDisabled] = React.useState(false);
    const uploaderRef = React.useRef();

    React.useEffect(() => {
      switch (formSubmitState) {
        case 0: {
          setDisabled(true);
          break;
        }
        case 2: {
          uploaderRef.current && uploaderRef.current.handleSubmit();
          setDisabled(false);
          break;
        }
        case null: {
          setDisabled(false);
          break;
        }
      }
    }, [formSubmitState]);

    React.useEffect(() => {
      fileUploadStatus && setFileStatuses({ ...fileStatuses, ...fileUploadStatus });
    }, [fileUploadStatus]);

    const handleChangeStatus = ({ meta, file }, status, files) => {
      if (status === 'removed') {
        callback(file.name, 'removed');
        return;
      }

      fileChanged = file;
      const readyFiles = files.filter((f) => f.meta.status === 'done');
      callback(readyFiles, 'added');

      setFileStatuses(
        readyFiles.reduce((acc, f) => {
          acc[f.meta.id] = 'ready';
          return acc;
        }, {})
      );
    };

    const handleSubmit = (_, allFiles) => {
      allFiles.forEach((f) => f.remove());
    };

    const accept = (acceptedFileTypes) => {
      if (!acceptedFileTypes || acceptedFileTypes.length === 0) {
        return 'image/*,audio/*,video/*,.pdf';
      }
      return acceptedFileTypes
        .map((ext) => {
          if (ext === 'jpg' || ext === 'png' || ext === 'gif') {
            return 'image/*';
          } else if (ext === 'pdf') {
            return '.pdf';
          } else if (VIDEO_FILE_TYPES.includes(ext)) {
            return 'video/*';
          }
        })
        .join(',');
    };

    const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
      const classes = useStyles();
      let fileTypes = acceptedFileTypes.includes('mp4') ? 'png, jpg, mp4, mov' : 'jpg, png';
      fileTypes =
        acceptedFileTypes.includes('pdf') && acceptedFileTypes.includes('jpg') ? 'pdf, ' + fileTypes : fileTypes;
      if (acceptedFileTypes[0] === 'pdf') {
        fileTypes = 'pdf';
      }
      const text =
        files.length > 0 ? `${label} (${fileTypes})` : `Click or drag your ${label} ${required === true ? '*' : ''}`;
      const subText = `Allowed file type(s): ${fileTypes}`;
      if (files.length > 0) {
        return (
          <FormControl fullWidth {...dropzoneProps}>
            <InputLabel shrink={false} className={classes.label}>
              {text}
            </InputLabel>
            <div className={classes.dropzone}>
              {previews}
              {files.length < maxFiles && (
                <Button variant="contained" color="primary" component="label" className={classes.addMoreLabel}>
                  Add more files
                  {files.length < maxFiles && input}
                </Button>
              )}
            </div>
          </FormControl>
        );
      } else {
        return (
          <FormControl fullWidth {...dropzoneProps}>
            <InputLabel shrink={false} className={classes.labelEmpty}>
              {text}
              <p className={classes.subText}>{subText}</p>
              {files.length < maxFiles && input}
            </InputLabel>

            <div className={classes.dropzone}>{previews}</div>
          </FormControl>
        );
      }
    };

    const Input = ({ accept, onFiles, files, getFilesFromEvent, name }) => {
      const classes = useStyles();
      return (
        <input
          name={name}
          style={{ opacity: 0 }}
          type="file"
          accept={accept}
          multiple
          onChange={async (e) => {
            const target = e.target;
            const chosenFiles = await getFilesFromEvent(e);
            onFiles(chosenFiles);
            target.value = null;
          }}
        />
      );
    };

    return (
      <>
        <Dropzone
          ref={uploaderRef}
          disabled={disabled}
          maxFiles={limit}
          onChangeStatus={handleChangeStatus}
          accept={accept(acceptedFileTypes)}
          InputComponent={Input}
          LayoutComponent={Layout}
          PreviewComponent={(props) => (
            <UploaderPreview
              {...props}
              categories={categories}
              school={school}
              name={name}
              status={fileStatuses[props.meta.id]}
            />
          )}
          SubmitButtonComponent={null}
        />
        {error && <p className={classes.errorText}>{errorText}</p>}
      </>
    );
  },
  areEqual
);

// re-render when school or files were added or s/m/d related categories changed
function areEqual(prevProps, nextProps) {
  return fileChanged && prevProps.school !== nextProps.school && prevProps.categories._id !== nextProps.categories._id;
}
