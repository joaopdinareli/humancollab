import React, { useState, useEffect } from 'react';
import HumanCollabLogo from './assets/logomarca.png';
import Background from './assets/background.png';
import {
   Container,
   Box,
   Typography,
   TextField,
   Button,
   Link,
   Alert
} from '@mui/material';
import { login, getToken } from './api';

const API_URL = 'http://localhost:3000';

// Adicionar tipos para as props de tema
interface LoginPageProps {
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  onLogin: (token: string) => void;
}

// Componente principal da Página de Login
export default function LoginPage({ mode, setMode, onLogin }: LoginPageProps) {
   // Estado para controlar se o formulário é de Login ou de Criação de Conta
   const [isLoginView, setIsLoginView] = useState(true);

   // Estado para armazenar os dados do formulário
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   });

   // Estado para armazenar as mensagens de erro de validação
   const [errors, setErrors] = useState<any>({});
   const [touched, setTouched] = useState<{[key:string]: boolean}>({});

   // Estado para exibir uma mensagem de sucesso após o envio
   const [successMessage, setSuccessMessage] = useState('');

   // Estado para armazenar o token de autenticação
   const [token, setToken] = useState<string | null>(null);

   // Estado para exibir mensagens de erro da API
   const [apiError, setApiError] = useState('');

   // Função para lidar com a mudança nos campos do formulário
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
      if (errors[name]) {
         setErrors((prevErrors: any) => ({ ...prevErrors, [name]: undefined }));
      }
      setTouched(prev => ({ ...prev, [name]: true }));
   };

   // Função de validação dos campos do formulário
   const validateForm = () => {
      const newErrors: any = {};
      const { name, email, password, confirmPassword } = formData;

      if (!isLoginView) {
         if (!name.trim()) newErrors.name = 'O campo nome é obrigatório.';
      }
      if (!email.trim()) {
         newErrors.email = 'O campo de e-mail é obrigatório.';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
         newErrors.email = 'O formato do e-mail é inválido.';
      }
      if (!password) {
         newErrors.password = 'O campo de senha é obrigatório.';
      } else if (password.length < 6) { // Verifica se a senha tem pelo menos 6 caracteres
         newErrors.password = 'A senha deve ter no mínimo 6 caracteres.';
      }
      if (!isLoginView) {
         if (!confirmPassword) {
            newErrors.confirmPassword = 'A confirmação de senha é obrigatória.';
         } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem.';
         }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   // Função para lidar com o envio do formulário
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSuccessMessage('');
      setApiError('');

      if (validateForm()) {
         if (isLoginView) {
            try {
               const resp = await login(formData.email, formData.password);
               setToken(resp.token);
               // Busca nome do usuário após login
               if (resp.token) {
                 const meResp = await fetch(`${API_URL}/auth/me`, {
                   headers: { Authorization: `Bearer ${resp.token}` }
                 });
                 if (meResp.ok) {
                   const meData = await meResp.json();
                   if (meData && meData.nome) {
                     localStorage.setItem('usuarioNome', meData.nome);
                   }
                 }
               }
               onLogin(resp.token); // Notifica o App
               setSuccessMessage(resp.message);
            } catch (err: any) {
               setApiError('Login inválido.');
            }
         } else {
            // Criação de conta
            try {
              const resp = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  nome: formData.name,
                  email: formData.email,
                  senha: formData.password,
                  tipo: 'usuario',
                  empresa: '',
                  cargo: ''
                })
              });
              if (!resp.ok) {
                const errData = await resp.json();
                setApiError(errData.message || 'Erro ao criar conta.');
                return;
              }
              setSuccessMessage('Conta criada com sucesso!');
              setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            } catch (err) {
              setApiError('Erro ao criar conta.');
            }
         }
      } else {
         console.log('Formulário inválido, verifique os erros.');
      }
   };

   // Função para alternar entre os formulários de Login e Criação de Conta
   const toggleView = () => {
      setIsLoginView(!isLoginView);
      setErrors({});
      setTouched({});
      setSuccessMessage('');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
   };

   useEffect(() => {
      const savedToken = getToken();
      if (savedToken) {
         setToken(savedToken);
      }
   }, []);

   if (token) {
      return null;
   }

   return (
      <Box component="main" sx={{ 
         display: 'flex', 
         position: 'fixed', 
         top: 0, 
         left: 0, 
         right: 0, 
         bottom: 0 
      }}>
         {/* Lado Esquerdo - Formulário */}
         <Box
            sx={{
               flex: 1,
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               maxWidth: { sm: '50%', md: '45%' },
               marginLeft: 0
            }}
         >
            <Container maxWidth="xs">
               <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <img
                     src={HumanCollabLogo}
                     alt="Logomarca HumanCollab"
                     style={{ width: '182px', height: 'auto', marginBottom: '16px' }}
                  />
                  <Typography variant="h4" component="h1" sx={{ mt: 2, color: 'text.primary' }}>
                     HumanCollab
                  </Typography>
               </Box>

               <Box component="form" onSubmit={handleSubmit} noValidate>
                  {successMessage && (
                     <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
                        {successMessage}
                     </Alert>
                  )}
                  {apiError && (
                     <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
                        {apiError}
                     </Alert>
                  )}

                  {!isLoginView && (
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nome Completo"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={Boolean(errors.name) && touched.name}
                        helperText={touched.name ? errors.name : ''}
                     />
                  )}

                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email"
                     name="email"
                     autoComplete="email"
                     value={formData.email}
                     onChange={handleChange}
                     error={Boolean(errors.email) && touched.email}
                     helperText={touched.email ? errors.email : ''}
                  />

                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Senha"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     value={formData.password}
                     onChange={handleChange}
                     error={Boolean(errors.password) && touched.password}
                     helperText={touched.password ? errors.password : ''}
                  />

                  {!isLoginView && (
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar Senha"
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={Boolean(errors.confirmPassword) && touched.confirmPassword}
                        helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                     />
                  )}

                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     {isLoginView ? 'ENTRAR' : 'CRIAR CONTA'}
                  </Button>

                  <Box textAlign="center">
                     <Link component="button" variant="body2" onClick={toggleView} sx={{ color: 'text.secondary', textTransform: 'none' }}>
                        {isLoginView ? 'Ainda não possuo uma conta' : 'Já tenho uma conta'}
                     </Link>
                  </Box>
               </Box>
            </Container>
         </Box>

         {/* Lado Direito - Imagem */}
         <Box
            sx={{
               flex: 1,
               display: { xs: 'none', sm: 'block' },
               backgroundImage: `url(${Background})`,
               backgroundRepeat: 'no-repeat',
               backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
               backgroundSize: 'cover',
               backgroundPosition: 'center',
            }}
         />
      </Box>
   );
}
