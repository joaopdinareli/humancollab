import React, { useState } from 'react';
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

// Componente principal da Página de Login
export default function LoginPage() {
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

   // Estado para exibir uma mensagem de sucesso após o envio
   const [successMessage, setSuccessMessage] = useState('');

   // Função para lidar com a mudança nos campos do formulário
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
      // Limpa o erro do campo quando o usuário começa a digitar
      if (errors[name]) {
         setErrors((prevErrors: any) => ({ ...prevErrors, [name]: null }));
      }
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
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSuccessMessage('');

      if (validateForm()) {
         console.log('Formulário válido, enviando dados:', formData);
         const message = isLoginView ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!';
         setSuccessMessage(message);
         // Limpa o formulário após o envio bem-sucedido
         setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
         console.log('Formulário inválido, verifique os erros.');
      }
   };

   // Função para alternar entre os formulários de Login e Criação de Conta
   const toggleView = () => {
      setIsLoginView(!isLoginView);
      setErrors({});
      setSuccessMessage('');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
   };

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
                        error={!!errors.name}
                        helperText={errors.name}
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
                     error={!!errors.email}
                     helperText={errors.email}
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
                     error={!!errors.password}
                     helperText={errors.password}
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
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
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
