import React, { useState } from 'react';
import axios from 'axios';
import { phoneFormat, phoneNumValidation, emailValidation } from '../../lib/helpers';
import { makeStyles } from '@material-ui/core/styles';
import layoutStyles from '../layout/layout.module.css';
import Alert from '@material-ui/lab/Alert';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import Zoom from '@material-ui/core/Zoom';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'relative',
    width: '35ch',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-dark-black-bg)',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submitBtn: {
    backgroundColor: `var(--color-dark-black-bg)`,
    color: 'white',
    marginTop: '1.5rem',
  },
  btnClose: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  error: {
    color: '#f50057 !important',
  },
}));

export default function ContactForm({ studentId, studentName }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNotValid, setIsNotValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [email, setEmail] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [notes, setNotes] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsSuccess(false);
  };

  const handleChangeName = (name) => {
    setNameValid(name.length <= 24);
    setName(name);
  };

  const handleChangeEmail = (email) => {
    const isValid = emailValidation(email);
    setEmailValid(isValid);
    setEmail(email);
  };

  const handleChangePhone = (phoneNum) => {
    const isValid = phoneNumValidation(phoneNum);
    setPhoneValid(isValid);
    setPhone(phoneFormat(phoneNum));
  };

  const handleSubmit = () => {
    if (email && name && notes && nameValid && emailValid && phoneValid) {
      setIsNotValid(false);
      setIsLoading(true);

      const data = {
        target: studentId,
        sender: {
          name: name,
          email: email,
          phone: phone,
        },
        message: notes,
      };

      let orginPath = '';
      if (typeof window !== 'undefined') {
        orginPath = window.location.origin;
      }

      axios
        .post('https://springshow.academyart.edu/api/contactEmail', data)
        .then((res) => {
          if (res.status === 200) {
            setIsSuccess(true);
            setIsError(false);
            setTimeout(() => handleClose(), 1200);
          } else {
            setIsError(true);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          // console.log('Error in sending email = ', err);
          setIsError(true);
          setIsLoading(false);
        });
    } else {
      setIsNotValid(true);
    }
  };

  return (
    <div>
      <div className={layoutStyles.columnSection}>
        <button type="button" className={layoutStyles.calloutButton} onClick={handleOpen}>
          Contact Me
        </button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form className={classes.root} noValidate autoComplete="off">
            {!isSuccess && (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  className={classes.btnClose}
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <h2>Contact {studentName}</h2>

                {isNotValid && <Alert severity="warning">Please fill out all fields!</Alert>}
                {isError && <Alert severity="error">Something Went Wrong! Please try again!</Alert>}

                <TextField
                  error={name && !nameValid}
                  id="senderName"
                  label="Name"
                  variant="outlined"
                  onChange={(e) => handleChangeName(e.target.value)}
                  helperText={!nameValid && name ? 'Maximum length of 24' : ''}
                />
                <TextField
                  error={email && !emailValid}
                  id="senderEmail"
                  label="Email"
                  variant="outlined"
                  onChange={(e) => handleChangeEmail(e.target.value)}
                  helperText={!emailValid && email ? 'Incorrect email address' : ''}
                />
                <TextField
                  error={phone.length > 0 && !phoneValid}
                  id="senderPhone"
                  label="Phone"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => handleChangePhone(e.target.value)}
                  helperText={!phoneValid && phone ? 'Incorrect phone number.' : ''}
                />
                <TextField
                  error={!notes}
                  id="senderNotes"
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={(e) => setNotes(e.target.value)}
                  helperText={!notes ? 'Message is required.' : ''}
                />
                <Button
                  variant="contained"
                  className={classes.submitBtn}
                  onClick={() => handleSubmit()}
                  disabled={isLoading}
                >
                  {!isLoading ? 'SEND MESSAGE' : <CircularProgress style={{ color: 'white' }} />}
                </Button>
              </>
            )}

            {isSuccess && (
              <div style={{ textAlign: 'center', marginTop: '3em' }}>
                <h3>Contact submitted successfully.</h3>
                <div>
                  <Zoom in={true}>
                    <CloudDoneIcon style={{ fontSize: 130, color: 'var(--color-neon-green)' }} />
                  </Zoom>
                </div>
              </div>
            )}
          </form>
        </Fade>
      </Modal>
    </div>
  );
}
