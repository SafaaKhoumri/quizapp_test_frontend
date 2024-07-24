import React, { useState } from 'react';
import { Box, Typography, TextField, Button, AppBar, Toolbar } from '@mui/material';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';

function Condidatverification() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    condidat_email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const authorizedEmails = [];
    
    if (authorizedEmails.includes(form.condidat_email)) {
      console.log('Email valide');
      setError('');

    } else {
      setError('Email incorrect. Veuillez saisir une adresse email valide pour passer le test.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #f0f0f0 65%, #232A56 35%)',
        color: '#000',
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src={logo} alt="Logo" style={{ width: 100 }} />
        </Toolbar>
      </AppBar>

      <Typography variant="h1" sx={{ marginTop: '10%', fontSize: '3.5em', fontStyle: 'italic' }}>
        Verification
      </Typography>

      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 3,
          borderRadius: 1,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          width: '50%',
          margin: 3,
          height: 'auto',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h2" sx={{ marginTop: 2, fontSize: '1em', paddingLeft: '1%' }}>
            Veuillez entrer votre adresse e-mail
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
            <TextField
              type="email"
              name="condidat_email"
              placeholder="Entrer votre email"
              value={form.condidat_email}
              onChange={handleChange}
              sx={{ width: '100%', marginBottom: 2 }}
            />
            {error && <Typography sx={{ color: 'red', marginBottom: 2, fontSize: '14px' }}>{error}</Typography>}
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#232A56', width: '45%', marginLeft: '53%', borderRadius: 30 }}>
              OK
            </Button>
          </Box>
        </form>
      </Box>

      
    </Box>
  );
}

export default Condidatverification;
