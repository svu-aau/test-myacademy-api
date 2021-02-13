import React, { useState, useRef } from 'react';
import SEO from '../components/layout/seo';
import Container from '../components/layout/container';
import LogRocket from 'logrocket';
import { graphql } from 'gatsby';
import PQueue from 'p-queue';
import slugify from 'slugify';
import sanityClient from '../utils/sanity_client';
import { Vimeo } from 'vimeo';
import Layout from '../containers/layout';
import Uploader from '../components/forms/uploader';
// material
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from '@material-ui/core/Modal';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import Zoom from '@material-ui/core/Zoom';
import { capitalize } from '../lib/helpers';
import { isAuthenticated, login } from '../utils/auth';
import { addHttp } from '../utils/tools';
import { PORTFOLIO_FILE_TYPES, HERO_FILE_TYPES } from '../lib/constants';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#252525',
    },
    secondary: {
      main: '#dd271a',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: '6rem',
    '& > * + *': {
      marginTop: '2rem',
    },
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    backgroundColor: 'white',
  },
  formControl: {
    minWidth: 120,
  },
  label: {
    marginLeft: theme.spacing(1.5),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

// todo: for some reason these aren't pulled in zeit in env vars or secrets?
const vimeoClient = new Vimeo(
  process.env.VIMEO_CLIENT_ID || '82fd36261c108676139b081196264081b93180f3',
  process.env.VIMEO_CLIENT_SECRET ||
    'xhW7cqoU+Fvrrd9pXaCuU9UR26R0Wh/SPMOjjGOII8pbwmQ+ZA2hcNPAE0fSKADGFRo0u4o5oNlQPQTQv88p6cCugF3STemYSeX0gj/MqDlqMx9AsQmeta6KFyvo5bpL',
  process.env.VIMEO_APP_API_KEY || '4f926148e2744b0f07f092e89a1b4083'
);

const fileQueue = new PQueue({
  concurrency: 4,
  interval: 1000 / 25,
});

const StudentProfileForm = (props) => {
  /*  don't require login in development mode */
  if (process.env.NODE_ENV === 'development') {
    console.log('Skipping login requirement in development mode');
  } else {
    if (!isAuthenticated()) {
      login();
      return <p>Redirecting to login...</p>;
    }
  }

  const classes = useStyles();
  // // console.log('StudentProfileForm props: ', props);
  const { schools, headerBackgroundImage, assetCategories } = props.data;
  const [submitting, setSubmitting] = useState(false);
  const [hasBeenSubmit, setHasBeenSubmit] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('Uploading files');
  const [submitStep, setSubmitStep] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [formErrors, setFormErrors] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [heroImageToUpload, setHeroImageToUpload] = useState([]);
  const [resumeToUpload, setResumeToUpload] = useState([]);
  const [fileUploadStatus, setFileUploadStatus] = useState(null);
  const [school, setSchool] = useState(null);
  const [majors, setMajors] = useState([]);
  const [major, setMajor] = useState(null);
  const [degrees, setDegrees] = useState([]);
  const [degree, setDegree] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modalStyle] = useState(getModalStyle);
  const [modalOpen, setModalOpen] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [idError, setIdError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [heroError, setHeroError] = useState(null);

  const nameRef = useRef(null);
  const idRef = useRef(null);
  const emailRef = useRef(null);
  const heroRef = useRef(null);

  const steps = [uploadMessage, 'Submitting profile', 'Complete'];

  function chooseSchool(e) {
    let { value } = e.target;
    if (!value) return;
    const school = schools.nodes.find((school) => school._id === value);
    setSchool(school);
    setDegree(null);
    setMajors(school.majors);
    setDegrees(school.degrees || []); //degrees directly on school is a short circut special case for architecture
  }

  function chooseMajor(e) {
    let { value } = e.target;
    const major = majors.find((major) => major._id === value);
    setMajor(major);
    setDegree(null);
    setDegrees(major.degrees);
  }

  function chooseDegree(e) {
    let { value } = e.target;
    const degree = degrees.find((degree) => degree._id === value);
    setDegree(degree);

    // find all categories related to chosen major to show for uploaded assets
    if (major) {
      const matchingCategory = assetCategories.nodes
        .filter((assetCategory) => {
          return assetCategory.major.find((m) => m._id === major._id);
        })
        .sort((a, b) => a.title.localeCompare(b.title));

      setCategories(matchingCategory);
    }
  }

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      height: '300px',
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const updateFileUploadsCallback = (media, type = 'added') => {
    if (type === 'removed') {
      const newFiles = filesToUpload.filter(({ meta }) => meta.name !== media);

      setFilesToUpload(newFiles);
      return;
    }

    if (media && media.length) {
      setFilesToUpload(media);
    }
  };

  const updateHeroFileUploadsCallback = React.useCallback(
    (media, type = 'added') => {
      setHeroError(false);

      if (type === 'removed') {
        setHeroImageToUpload([]);

        return;
      }

      if (media && media.length) {
        setHeroImageToUpload(media);
      }
    },
    [setHeroImageToUpload]
  );

  const updateResumeFileUploadsCallback = React.useCallback(
    (media, type = 'added') => {
      if (type === 'removed') {
        setResumeToUpload([]);

        return;
      }

      if (media && media.length) {
        setResumeToUpload(media);
      }
    },
    [setResumeToUpload]
  );

  function updateTextField(event, type, typing = false) {
    const value = event.target.value;

    switch (type) {
      case 'name':
        if (value.length < 4) {
          if (typing) return;
          setNameError('Name must be 4 characters or longer!');
        } else {
          setNameError(null);
        }
        break;
      case 'id':
        // eslint-disable-next-line no-case-declarations
        const idTest = /^([0][0-9]{7})$/.test(value);
        if (!idTest) {
          if (typing) return;
          setIdError('Enter a valid 8 character student ID starting with 0');
        } else {
          setIdError(null);
        }
        break;
      case 'email':
        // eslint-disable-next-line no-case-declarations
        const emailTest = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/.test(value);
        if (!emailTest) {
          if (typing) return;
          setEmailError('Enter a valid email address!');
        } else {
          setEmailError(null);
        }
        break;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let localFormErrors = [];

    if (idError || emailError || nameError || heroImageToUpload.length === 0) {
      if (idError) {
        idRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (emailError) {
        emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (nameError) {
        nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        heroRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setHeroError(true);
      }
      return;
    }

    setSubmitting(true);
    setHasBeenSubmit(true);
    setModalOpen(true);

    let profileForm = document.getElementById('profileForm');
    const FD = new FormData(profileForm);

    // console.log('------------ filesToUpload: ', filesToUpload);
    // console.log('------------ heroImageToUpload: ', heroImageToUpload);
    // console.log('Form Data: ');
    // console.log(// console.log(...FD));

    let uploadedFiles = [];
    let heroUploadedFiles = [];
    let resumeUploadedFiles = [];
    let error = false;

    const filesUpload = [...filesToUpload, ...heroImageToUpload, ...resumeToUpload];

    if (filesUpload.length > 0) {
      setSubmitStep(0);
      setUploadMessage(`Submitting files (0/${filesUpload.length})`);
      // console.log('submiting files filesUpload: ', filesUpload);
      let progress = 0;

      filesUpload.forEach((f, idx) => {
        setCompleted(0);
        // console.log('filesUpload forEach: ', f, idx);
        setCustomMeta(FD, f);
        // console.log('adding file to queue ', f);
        // // console.log('queue size', fileQueue.size());
        fileQueue.add(async () => {
          setFileUploadStatus({ [f.meta.id]: 'uploading' });
          progress += 1;
          setUploadMessage(`Submitting files (${progress}/${filesUpload.length})`);

          // console.log('-----f.meta: ', f.meta);
          // console.log('-----f.meta.type: ', f.meta.type);
          // return;

          const metaType = f.meta.type.includes('video') ? 'video' : f.meta.type;

          switch (metaType) {
            case 'video':
              await uploadToVimeo(f)
                .then(({ uri, url }) => {
                  // console.log(uri, url);
                  setFileUploadStatus({ [f.meta.id]: 'complete' });

                  const _name = f.meta.customMeta._name; // internal use only for the uploader field name
                  // console.log('meta in upload to sanity', f.meta);
                  // console.log('meta.name in upload to sanity', name);

                  // if (heroUploadedFile)
                  if (_name === 'heroImage') {
                    heroUploadedFiles.push(prepareHeroSanityObject(FD.get('id'), url, 'video', f, idx === 0));
                  } else {
                    uploadedFiles.push(prepareSanityObject(FD.get('id'), url, 'video', f, idx === 0));
                  }
                })
                .catch((e) => {
                  LogRocket.track('Form Error');
                  LogRocket.captureException(e);
                  console.error(e);
                  localFormErrors.push(
                    `There was an error uploading your video ${f.meta.name} please try a smaller file or a faster internet connection`
                  );
                  error = true;
                  setFileUploadStatus({ [f.meta.id]: 'failed' });
                  setSubmitting(false);
                });
              break;
            case 'application/pdf':
              await uploadToSanity(f, 'file')
                .then(({ id, type }) => {
                  setFileUploadStatus({ [f.meta.id]: 'complete' });
                  const _name = f.meta.customMeta._name; // internal use only for the uploader field name

                  if (_name === 'resume') {
                    resumeUploadedFiles.push(prepareResumeSanityObject(FD.get('id'), id, type, f, idx === 0));
                  } else {
                    uploadedFiles.push(prepareSanityObject(FD.get('id'), id, type, f, idx === 0));
                  }
                })
                .catch((e) => {
                  LogRocket.track('Form Error');
                  LogRocket.captureException(e);
                  console.error(e);
                  localFormErrors.push(
                    `There was an error uploading your file ${f.meta.name} please try a smaller file or a faster internet connection`
                  );
                  error = true;
                  setFileUploadStatus({ [f.meta.id]: 'failed' });
                  setSubmitting(false);
                });
              break;
            default:
              await uploadToSanity(f, 'image')
                .then(({ id, type }) => {
                  setFileUploadStatus({ [f.meta.id]: 'complete' });
                  // get name meta data
                  const _name = f.meta.customMeta._name; // internal use only for the uploader field name
                  // console.log('meta in upload to sanity', f.meta);
                  // console.log('meta.name in upload to sanity', name);

                  // if (heroUploadedFile)
                  if (_name === 'heroImage') {
                    heroUploadedFiles.push(prepareHeroSanityObject(FD.get('id'), id, type, f, idx === 0));
                  } else {
                    uploadedFiles.push(prepareSanityObject(FD.get('id'), id, type, f, idx === 0));
                  }
                })
                .catch((e) => {
                  LogRocket.track('Form Error');
                  LogRocket.captureException(e);
                  console.error(e);
                  localFormErrors.push(
                    `There was an error uploading your image ${f.meta.name} please try a smaller file or a faster internet connection`
                  );
                  error = true;
                  setFileUploadStatus({ [f.meta.id]: 'failed' });
                  setSubmitting(false);
                });
          }
        });
      });
    }

    await fileQueue.onIdle();
    if (error) {
      setFormErrors(localFormErrors);
      setModalOpen(false);
      return;
    }
    setSubmitStep(1);

    const instructorsData = FD.get('instructors');
    let instructors = [];
    if (instructorsData) {
      instructors = instructorsData.split(/\r?\n/).map((item) => {
        if (item === '') return;
        return item.trim();
      });
    }
    const externalSiteUrlsData = FD.get('externalSiteUrls');
    let externalSiteUrls = [];
    if (externalSiteUrlsData) {
      externalSiteUrls = externalSiteUrlsData.split(/\r?\n/).map((item) => {
        if (item === '') return;
        return addHttp(item.trim());
      });
    }
    const additionalPortfolioUrlsData = FD.get('additionalPortfolioUrls');
    let additionalPortfolioUrls = [];
    if (additionalPortfolioUrlsData) {
      additionalPortfolioUrls = additionalPortfolioUrlsData.split(/\r?\n/).map((item) => {
        if (item === '') return;
        return addHttp(item.trim());
      });
    }

    // // console.log('profileDocument uploadedFiles: ', uploadedFiles);
    // // console.log('profileDocument heroUploadedFile: ', heroUploadedFiles);
    const profileID = FD.get('id').replace(/[^\d\w]/gi, '');
    const profileDocument = {
      _id: `drafts.${profileID}`,
      _type: 'student',
      name: FD.get('name'),
      email: FD.get('email'),
      id: profileID,
      school: FD.get('schoolId') ? { _type: 'reference', _weak: true, _ref: FD.get('schoolId') } : undefined,
      major: FD.get('majorId') ? { _type: 'reference', _weak: true, _ref: FD.get('majorId') } : undefined,
      degree: FD.get('degreeId') ? { _type: 'reference', _weak: true, _ref: FD.get('degreeId') } : undefined,
      slug: {
        _type: 'slug',
        current: slugify(FD.get('name').toLowerCase()),
        options: {
          source: 'name',
          maxLength: 200,
        },
      },
      description: [
        {
          _type: 'block',
          _key: 'student-' + profileID + '-descriptionblock',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'student-' + profileID + '-description',
              marks: [],
              text: FD.get('description') || '',
            },
          ],
          markDefs: [],
        },
      ],
      bio: [
        {
          _type: 'block',
          _key: 'student-' + profileID + '-bioblock',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'student-' + profileID + '-bio',
              marks: [],
              text: FD.get('bio') || '',
            },
          ],
          markDefs: [],
        },
      ],
      portfolio: uploadedFiles && uploadedFiles.length ? uploadedFiles : undefined,
      heroImage: heroUploadedFiles && heroUploadedFiles.length ? [heroUploadedFiles[0]] : undefined,
      resume: resumeUploadedFiles && resumeUploadedFiles.length ? resumeUploadedFiles[0] : undefined,
      instructors,
      externalSiteUrls,
      additionalPortfolioUrls,
      studentUploaded: true, // flag so we can find all student uploaded forms later
    };

    await sanityClient
      .createOrReplace(profileDocument)
      .then((res) => {
        // console.log(res);
        setSubmitStep(3);
        profileForm.reset();
        window.scrollTo({
          top: 0,
          left: 100,
          behavior: 'smooth',
        });
      })
      .catch((e) => {
        LogRocket.track('Form Error');
        LogRocket.captureException(e);
        console.error(e);
        setFormErrors([
          ...localFormErrors,
          'Something went wrong with uploading your profile.  Please try again later.',
        ]);
        setSubmitStep(null);
        setModalOpen(false);
        setSubmitting(false);
      })
      .finally(() => {
        setSubmitting(false);
        setModalOpen(false);
      });
  }

  async function uploadToVimeo(f) {
    return new Promise((resolve, reject) => {
      vimeoClient.upload(
        f.file,
        {
          name: f.meta.customMeta.title,
          description: f.meta.customMeta.caption,
        },
        function (uri) {
          // console.log("Your video URI is: " + uri);
          // puts the video in the Spring Show folder
          vimeoClient.request(
            {
              method: 'PUT',
              path: `/users/109329917/projects/1515209/videos/${uri.split('/')[2]}`,
            },
            function (error) {
              if (error) {
                LogRocket.track('Form Error');
                console.error(error);
                LogRocket.captureException(error);
              }
            }
          );
          // returns the link
          vimeoClient.request({ path: uri + '?fields=link' }, function (error, body, statusCode, headers) {
            if (error) {
              LogRocket.track('Form Error');
              console.error(error);
              LogRocket.captureException(error);
              return;
            }
            // console.log("Your video link is: " + body.link);
            return resolve({ uri: uri, url: body.link });
          });
        },
        function (bytes_uploaded, bytes_total) {
          var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
          // console.log(`vimdeo percentage: ${bytes_uploaded}, ${bytes_total}, ${percentage}%`);
          const diff = Math.random() * 10;
          const diff2 = Math.random() * 10;
          const completed = parseInt(percentage, 10) + diff;
          const buffer = parseInt(completed, 10) + diff + diff2;
          setCompleted(completed);
          setBuffer(buffer);
        },
        function (error) {
          // console.log("Failed because: " + error);
          reject(error);
        }
      );
    });
  }

  async function uploadToSanity(f, type) {
    // todo: can we get the actual progress somehow?
    startFakeUploadProgress();
    const r = await sanityClient.assets.upload(type, f.file);
    endFakeUploadProgress();
    return { id: r.document._id, type: r.document.mimeType };
  }

  function startFakeUploadProgress() {
    if (completed > 100) {
      setCompleted(0);
      setBuffer(10);
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      setCompleted(completed + diff);
      setBuffer(completed + diff + diff2);
    }
  }

  function endFakeUploadProgress() {
    setCompleted(100);
  }

  function setCustomMeta(FD, f) {
    const entries = FD.entries();
    const fileId = f.meta.id.split('-')[0];

    let entry = entries.next();
    f.meta.customMeta = {};
    while (!entry.done) {
      const [type, fileMetaId, _, name] = entry.value[0].split('-');
      if (type === 'filemeta' && fileMetaId === fileId && entry.value[1]) {
        // build special object for assetCategory ref value
        if (name === '_category') {
          f.meta.customMeta.assetCategory = {
            _ref: entry.value[1],
            _type: 'reference',
            _weak: true,
          };
        } else if (name === 'description') {
          f.meta.customMeta.description = [
            {
              _type: 'block',
              _key: 'student-' + fileId + '-metadescriptionblock-' + fileId,
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'student-' + fileId + '-metadescription-' + fileId,
                  marks: [],
                  text: entry.value[1] || '',
                },
              ],
              markDefs: [],
            },
          ];
        } else {
          f.meta.customMeta[name] = entry.value[1];
        }
      }
      entry = entries.next();
    }
  }

  function prepareSanityObject(studentId, ref, type, f) {
    switch (type) {
      case 'video':
        return {
          _key: 'student-' + studentId.replace(/[^\d\w]/gi, '') + '-profile-video-' + f.meta.id,
          _type: 'video',
          caption: f.meta.caption,
          title: f.meta.customMeta.title || 'profile video',
          url: ref,
          ...f.meta.customMeta,
        };
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return {
          _key: 'student-' + studentId.replace(/[^\d\w]/gi, '') + '-profile-image-' + f.meta.id,
          _type: 'figure',
          image: { _type: 'image', asset: { _type: 'reference', _ref: ref } },
          alt: f.meta.customMeta.caption || f.meta.customMeta.title || 'profile image',
          ...f.meta.customMeta,
        };
      default:
        return {
          _key: 'student-' + studentId.replace(/[^\d\w]/gi, '') + '-profile-file-' + f.meta.id,
          _type: 'fileUpload',
          file: { _type: 'file', asset: { _type: 'reference', _ref: ref } },
          alt: f.meta.customMeta.caption || f.meta.customMeta.title || 'profile image',
          ...f.meta.customMeta,
        };
    }
  }

  function prepareHeroSanityObject(studentId, ref, type, f) {
    // we disabled video upload file formats for hero but this logic remains in case we ever turn it on again
    if (type === 'video') {
      return {
        _key: 'student-' + studentId.replace(/[^\d\w]/gi, '') + '-hero-video-' + f.meta.id,
        _type: 'video',
        title: f.meta.customMeta.title || 'hero video',
        url: ref,
        ...f.meta.customMeta,
      };
    } else {
      return {
        _key: 'student-' + studentId.replace(/[^\d\w]/gi, '') + '-hero-image-' + f.meta.id,
        _type: 'figure',
        image: { _type: 'image', asset: { _type: 'reference', _ref: ref } },
        alt: f.meta.customMeta.title || 'hero image',
        ...f.meta.customMeta,
      };
    }
  }

  function prepareResumeSanityObject(studentId, ref, type, f) {
    return {
      _key: 'student-' + studentId.replace(/[^\d\w]/gi, '') + '-resume-' + f.meta.id,
      _type: 'file',
      asset: { _type: 'reference', _ref: ref },
      ...f.meta.customMeta,
    };
  }

  function isSchoolWithoutMajor(school) {
    return school && school.title.trim().toLowerCase() === 'architecture';
  }

  function removeError(error) {
    const newErrors = formErrors.filter((element) => element !== error);

    setFormErrors(newErrors);
  }

  function schoolMajorChosen(school, major, degree) {
    if (isSchoolWithoutMajor(school)) {
      return school && degree;
    } else {
      return school && major && degree;
    }
  }

  return (
    <Layout headerBackgroundImage={headerBackgroundImage} smallHeader>
      <SEO title="2020 Spring Show Student Profile Form" />
      <Container narrower>
        <ThemeProvider theme={theme}>
          <h1>2020 Spring Show Student Upload Page</h1>
          {submitStep === 3 ? (
            <div style={{ textAlign: 'center', marginTop: '3em' }}>
              <h3>Your profile was submitted successfully.</h3>
              <div>
                <Zoom in={true}>
                  <CloudDoneIcon style={{ fontSize: 130, color: 'var(--color-neon-green)' }} />
                </Zoom>
              </div>
            </div>
          ) : (
            <div>
              <iframe
                src="https://player.vimeo.com/video/414066015"
                width="100%"
                height="360"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <p>Welcome to Spring Show 2020! We are excited to showcase your work.</p>
              <p>
                Please fill out the following information to send your student profile upload with related assets.
                Please make sure all information is correctly entered. You can use this form again to replace a previous
                submission if you make a mistake.{' '}
                <a href="/spring-show-student-uploader-instructions.pdf" target="_blank" rel="noopener">
                  Get text instructions here
                </a>
                .
              </p>
              <p>
                Note: If you have portfolio videos hosted on YouTube or Vimeo, you don&apos;t need to upload them here.
                Once you select your school, you will be able to add links to each of your videos which will embed them
                in your profile.
              </p>
              <form id="profileForm" onSubmit={handleSubmit} className={classes.form}>
                <TextField
                  required
                  ref={nameRef}
                  id="name"
                  name="name"
                  label="Name"
                  variant="filled"
                  fullWidth
                  error={!!nameError}
                  helperText={nameError}
                  onBlur={(val) => updateTextField(val, 'name')}
                  onChange={(val) => updateTextField(val, 'name', true)}
                />
                <TextField
                  required
                  ref={idRef}
                  id="id"
                  name="id"
                  label="Student ID"
                  variant="filled"
                  fullWidth
                  error={!!idError}
                  helperText={idError}
                  onBlur={(val) => updateTextField(val, 'id')}
                  onChange={(val) => updateTextField(val, 'id', true)}
                />
                <TextField
                  type="email"
                  ref={emailRef}
                  required
                  id="email"
                  name="email"
                  label="Email"
                  variant="filled"
                  fullWidth
                  placeholder="Enter your best email address"
                  error={!!emailError}
                  helperText={emailError}
                  onBlur={(val) => updateTextField(val, 'email')}
                  onChange={(val) => updateTextField(val, 'email', true)}
                />
                <TextField
                  multiline
                  rows={6}
                  id="bio"
                  name="bio"
                  label="Bio"
                  variant="filled"
                  fullWidth
                  placeholder="Enter a description of your work. Please use content that has been edited and grammar-checked."
                />

                <Uploader
                  name="resume"
                  label="R&eacute;sum&eacute;"
                  acceptedFileTypes={['pdf']}
                  formState={submitStep}
                  limit={1}
                  callback={updateResumeFileUploadsCallback}
                  fileUploadStatus={fileUploadStatus}
                  multiple={false}
                />

                <p>
                  Add your External Portfolio and Video CHANNELS below. If you have a channel on YouTube or Vimeo, put
                  it here so we can link to it. Don&apos;t put individual videos here.
                </p>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="externalSiteUrls"
                  multiline
                  rows={4}
                  label="External Portfolio and Video CHANNELS here"
                  size="small"
                />

                <p ref={heroRef}>
                  To Submit your <strong>PROFILE IMAGE</strong>, click or drag the image to the box below. For Acting,
                  use a headshot. For all other schools, use your best original work. Your image needs to be at least
                  1600px wide, but we recommend wider and high-resolution.
                </p>
                <Uploader
                  acceptedFileTypes={HERO_FILE_TYPES}
                  callback={updateHeroFileUploadsCallback}
                  error={heroError}
                  errorText="Submit a Hero Image"
                  fileUploadStatus={fileUploadStatus}
                  formState={submitStep}
                  label="Profile hero image"
                  limit={1}
                  multiple={false}
                  name="heroImage"
                  required
                />

                <FormControl required fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="school" className={classes.label}>
                    School
                  </InputLabel>
                  <Select
                    native
                    onChange={chooseSchool}
                    inputProps={{
                      name: 'schoolId',
                      id: 'school',
                    }}
                    variant="filled"
                    fullWidth
                  >
                    <option aria-label="None" value="" />
                    {schools.nodes
                      .sort((a, b) => a.title.localeCompare(b.title))
                      .map((school) => (
                        <option key={school._id} value={school._id}>
                          {capitalize(school.title)}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                {/* Don't show major option if architecture */}
                {!isSchoolWithoutMajor(school) && majors.length > 0 && (
                  <FormControl required fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="major" className={classes.label}>
                      Program
                    </InputLabel>
                    <Select
                      native
                      onChange={chooseMajor}
                      inputProps={{
                        name: 'majorId',
                        id: 'major',
                      }}
                      variant="filled"
                      fullWidth
                    >
                      <option aria-label="None" value="" />
                      {majors
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map((major) => (
                          <option key={major._id} value={major._id}>
                            {capitalize(major.title)}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                )}

                {degrees.length > 0 && (
                  <FormControl required fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="degree" className={classes.label}>
                      Degree
                    </InputLabel>
                    <Select
                      native
                      onChange={chooseDegree}
                      inputProps={{
                        name: 'degreeId',
                        id: 'degree',
                      }}
                      variant="filled"
                      fullWidth
                    >
                      <option aria-label="None" value="" />
                      {degrees.map((degree) => (
                        <option key={degree._id} value={degree._id}>
                          {degree.code}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {schoolMajorChosen(school, major, degree) && isSchoolWithoutMajor(school) && (
                  <>
                    <TextField
                      required
                      multiline
                      rows={6}
                      id="description"
                      name="description"
                      label="Description"
                      variant="filled"
                      fullWidth
                      placeholder="Enter a description of your work. Please use content that has been edited and grammar-checked."
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="instructors"
                      multiline
                      rows={4}
                      label="Enter architecture instructors one per line"
                      size="small"
                    />
                  </>
                )}

                {schoolMajorChosen(school, major, degree) && (
                  <>
                    <p>
                      To <strong>SUBMIT YOUR WORK</strong>, click or drag all images, PDFs, and MP4 files here.
                    </p>
                    <ul>
                      <li>Files accepted: .JPG, .PNG, .GIF, .PDF, .MP4, .MOV</li>
                      <li>Images need to be at least 1600px wide, and high resolution.</li>
                      <li>Upload images in the order you want them displayed—first image will be on top.</li>
                      <li>You may add as many items as you’d like.</li>
                    </ul>
                    <Uploader
                      categories={categories}
                      name="portfolioImages"
                      formState={submitStep}
                      callback={updateFileUploadsCallback}
                      fileUploadStatus={fileUploadStatus}
                      label="Portfolio files. Upload in the order you want displayed."
                      multiple={true}
                      acceptedFileTypes={PORTFOLIO_FILE_TYPES}
                      school={school}
                      major={major}
                      degree={degree}
                    />
                  </>
                )}

                {schoolMajorChosen(school, major, degree) && (
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="additionalPortfolioUrls"
                    multiline
                    rows={4}
                    label="(Optional) Add URLs for your INDIVIDUAL videos on YouTube, Vimeo, etc. These videos will display with your media."
                    size="small"
                  />
                )}

                <p>Need help? Contact us 24/7 at online@academyart.edu, or by phone at 1-415-618-3545.</p>
                <Button fullWidth type="submit" disabled={submitting} size="large" variant="contained" color="primary">
                  {submitting ? (
                    <>
                      <CircularProgress size={20} color={'primary'} style={{ marginRight: '10px' }} />
                      Submitting
                    </>
                  ) : (
                    'Submit profile'
                  )}
                </Button>
              </form>
            </div>
          )}
          {formErrors.length > 0 ? (
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={hasBeenSubmit} onClose={null}>
              <>
                {formErrors.map((formError, idx) => (
                  <Alert key={idx} onClose={() => removeError(formError)} severity="error">
                    {formError}
                  </Alert>
                ))}
              </>
            </Snackbar>
          ) : (
            <Modal open={modalOpen} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
              <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Uploading files...</h2>
                <p id="simple-modal-description">Please be patient if you are uploading large files.</p>
                <Stepper activeStep={submitStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <LinearProgress variant="buffer" color={'secondary'} value={completed} valueBuffer={buffer} />
              </div>
            </Modal>
          )}
        </ThemeProvider>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query DegreesMajorSchoolsQuery {
    schools: allSanitySchool {
      nodes {
        _id
        title
        degrees {
          _id
          title
          code
        }
        majors {
          _id
          title
          degrees {
            _id
            title
            code
          }
        }
      }
    }
    assetCategories: allSanityAssetCategory {
      nodes {
        _id
        title
        major {
          _id
          title
        }
      }
    }
    headerBackgroundImage: file(relativePath: { eq: "1555130824.9183_Proxima_Image_03.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 415, maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

export default StudentProfileForm;
