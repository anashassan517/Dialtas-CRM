// // ** React Imports
// import { useState } from 'react'

// // ** Next Imports
// import Link from 'next/link'

// // ** MUI Components
// import Alert from '@mui/material/Alert'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
// import Checkbox from '@mui/material/Checkbox'
// import Typography from '@mui/material/Typography'
// import IconButton from '@mui/material/IconButton'
// import Box from '@mui/material/Box'
// import useMediaQuery from '@mui/material/useMediaQuery'
// import { styled, useTheme } from '@mui/material/styles'
// import InputAdornment from '@mui/material/InputAdornment'
// import MuiFormControlLabel from '@mui/material/FormControlLabel'

// // ** Custom Component Import
// import CustomTextField from 'src/@core/components/mui/text-field'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Third Party Imports
// import * as yup from 'yup'
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'

// // ** Hooks
// import { useAuth } from 'src/hooks/useAuth'
// import useBgColor from 'src/@core/hooks/useBgColor'
// import { useSettings } from 'src/@core/hooks/useSettings'

// // ** Configs
// import themeConfig from 'src/configs/themeConfig'

// // ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// // ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
// import Image from 'next/image'

// // ** Styled Components
// const LoginIllustration = styled('img')(({ theme }) => ({
//   zIndex: 2,
//   maxHeight: 680,
//   marginTop: theme.spacing(12),
//   marginLeft: 'auto', // This will shift the image to the right

//   marginBottom: theme.spacing(12),
//   [theme.breakpoints.down(1540)]: {
//     maxHeight: 550
//   },
//   [theme.breakpoints.down('lg')]: {
//     maxHeight: 500
//   }
// }))

// const RightWrapper = styled(Box)(({ theme }) => ({
//   width: '100%',

//   // paddingLeft: 150,
//   marginLeft: 200,
//   [theme.breakpoints.up('md')]: {
//     maxWidth: 450
//   },
//   [theme.breakpoints.up('lg')]: {
//     maxWidth: 600
//   },
//   [theme.breakpoints.up('xl')]: {
//     maxWidth: 750
//   }
// }))

// const LinkStyled = styled(Link)(({ theme }) => ({
//   textDecoration: 'none',
//   color: `${theme.palette.primary.main} !important`
// }))

// const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
//   '& .MuiFormControlLabel-label': {
//     color: theme.palette.text.secondary
//   }
// }))

// const schema = yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().min(5).required()
// })

// const defaultValues = {
//   password: 'admin',
//   email: 'admin@dialtas.com'
// }

// const LoginPage = () => {
//   const [rememberMe, setRememberMe] = useState(true)
//   const [showPassword, setShowPassword] = useState(false)

//   // ** Hooks
//   const auth = useAuth()
//   const theme = useTheme()
//   const bgColors = useBgColor()
//   const { settings } = useSettings()
//   const hidden = useMediaQuery(theme.breakpoints.down('md'))

//   // ** Vars
//   const { skin } = settings

//   const {
//     control,
//     setError,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues,
//     mode: 'onBlur',
//     resolver: yupResolver(schema)
//   })

//   const onSubmit = data => {
//     const { email, password } = data
//     auth.login({ email, password, rememberMe }, () => {
//       setError('email', {
//         type: 'manual',
//         message: 'Email or Password is invalid'
//       })
//     })
//   }
//   const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

//   return (
//     <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
//       <RightWrapper>
//         <Box
//           sx={{
//             p: [16, 31],

//             height: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}
//         >
//           <Box sx={{ width: '100%', maxWidth: 400 }}>
//             <Image src={'/images/logos/DIALTAS-logo.png'} width={350} height={40} alt='Dialtas Logo' />

//             <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
//               <Box sx={{ paddingTop: 20, mb: 4 }}>
//                 <Controller
//                   name='email'
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange, onBlur } }) => (
//                     <CustomTextField
//                       fullWidth
//                       autoFocus
//                       label='Email'
//                       value={value}
//                       onBlur={onBlur}
//                       onChange={onChange}
//                       placeholder='admin@dialtas.com'
//                       error={Boolean(errors.email)}
//                       {...(errors.email && { helperText: errors.email.message })}
//                     />
//                   )}
//                 />
//               </Box>
//               <Box sx={{ mb: 1.5 }}>
//                 <Controller
//                   name='password'
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange, onBlur } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       onBlur={onBlur}
//                       label='Password'
//                       onChange={onChange}
//                       id='auth-login-v2-password'
//                       error={Boolean(errors.password)}
//                       {...(errors.password && { helperText: errors.password.message })}
//                       type={showPassword ? 'text' : 'password'}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position='end'>
//                             <IconButton
//                               edge='end'
//                               onMouseDown={e => e.preventDefault()}
//                               onClick={() => setShowPassword(!showPassword)}
//                             >
//                               <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
//                             </IconButton>
//                           </InputAdornment>
//                         )
//                       }}
//                     />
//                   )}
//                 />
//               </Box>
//               <Box
//                 sx={{
//                   mb: 1.75,
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   alignItems: 'center',
//                   justifyContent: 'space-between'
//                 }}
//               >
//                 <FormControlLabel
//                   label='Remember Me'
//                   control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
//                 />
//                 <Typography component={LinkStyled} href='/forgot-password'>
//                   Forgot Password?
//                 </Typography>
//               </Box>
//               <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
//                 Sign In
//               </Button>
//               <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
//                 {/* <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography> */}
//                 <Typography href='/register' component={LinkStyled}>
//                   Register new Agent
//                 </Typography>
//               </Box>
//               <Divider
//                 sx={{
//                   color: 'text.disabled',
//                   '& .MuiDivider-wrapper': { px: 6 },
//                   fontSize: theme.typography.body2.fontSize,
//                   my: theme => `${theme.spacing(6)} !important`
//                 }}
//               >
//                 or
//               </Divider>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
//                   <Icon icon='mdi:facebook' />
//                 </IconButton>
//                 <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
//                   <Icon icon='mdi:twitter' />
//                 </IconButton>
//                 <IconButton
//                   href='/'
//                   component={Link}
//                   onClick={e => e.preventDefault()}
//                   sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
//                 >
//                   <Icon icon='mdi:github' />
//                 </IconButton>
//                 <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
//                   <Icon icon='mdi:google' />
//                 </IconButton>
//               </Box>
//             </form>
//           </Box>
//         </Box>
//       </RightWrapper>
//       {!hidden ? (
//         <Box
//           sx={{
//             flex: 1,
//             display: 'flex',
//             position: 'relative',
//             alignItems: 'center',
//             borderRadius: '20px',
//             justifyContent: 'center'

//             // backgroundColor: 'customColors.bodyBg'
//             // margin: theme => theme.spacing(8, 0, 8, 8)
//           }}
//         >
//           <LoginIllustration
//             alt='login-illustration'
//             src={`/images/pages/LoginArt.png
//          `}
//           />
//           <FooterIllustrationsV2 />
//         </Box>
//       ) : null}
//     </Box>
//   )
// }
// LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
// LoginPage.guestGuard = true

// export default LoginPage


// src/pages/login/index.js
import { useState } from 'react';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomTextField from 'src/@core/components/mui/text-field';
import Icon from 'src/@core/components/icon';
import { useAuth } from 'src/hooks/useAuth';
import { useAuthBackend } from 'src/hooks/useAuthBackend';
import useBgColor from 'src/@core/hooks/useBgColor';
import { useSettings } from 'src/@core/hooks/useSettings';
import themeConfig from 'src/configs/themeConfig';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginLeft: 'auto',
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550,
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500,
  },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  marginLeft: 200,
  [theme.breakpoints.up('md')]: {
    maxWidth: 450,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600,
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750,
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary,
  },
}));

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

const defaultValues = {
  password: 'admin',
  email: 'admin@dialtas.com',
};

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
const router=useRouter();
  const auth = useAuth();
  const backe = useAuthBackend();
  const theme = useTheme();
  const bgColors = useBgColor();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    login: handleLogin,
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("on submit called called");
  
    const { email, password } = data;
  
    try {
      console.log("OnSubmit function Login: ");
  
      const response = await backe.handleLogin({ email, password, rememberMe });
      if (response === true) {
        router.replace('/dashboards/sales');
      }
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid',
      });
    }
  };

  const imageSource = settings.skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration';

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      <RightWrapper>
        <Box
          sx={{
            p: [16, 31],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Image src={'/images/logos/DIALTAS-logo.png'} width={350} height={40} alt='Dialtas Logo' />

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ paddingTop: 20, mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='admin@dialtas.com'
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                />
                <Typography component={LinkStyled} href='/forgot-password'>
                  Forgot Password?
                </Typography>
              </Box>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Sign In
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography href='/register' component={LinkStyled}>
                  Register new Agent
                </Typography>
              </Box>
              <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`,
                }}
              >
                or
              </Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={(e) => e.preventDefault()}>
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={(e) => e.preventDefault()}>
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={(e) => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={(e) => e.preventDefault()}>
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
          }}
        >
          <LoginIllustration
            alt='login-illustration'
            src={`/images/pages/LoginArt.png
         `}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
    </Box>
  );
};

LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
LoginPage.guestGuard = true;

export default LoginPage;
