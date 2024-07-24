import React, { useState, useEffect } from 'react';
import { TextField, Typography, Select, MenuItem, FormControl, InputLabel, Container, AppBar, Toolbar, Button, Box, Link } from '@mui/material';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Test1() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    testName: '',
    domain: '',
    role: '',
    level: '',
  });

  const [domains, setDomains] = useState([]);
  const [roles, setRoles] = useState([]);
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8088/api/themes')
      .then(response => {
        if (Array.isArray(response.data)) {
          setDomains(response.data);
        } else {
          console.error("La réponse de l'API n'est pas un tableau", response.data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (form.domain) {
      axios.get(`http://localhost:8088/api/roles/${form.domain}`)
        .then(response => {
          setRoles(response.data);
        })
        .catch(error => console.error("Error fetching roles:", error));

      axios.get(`http://localhost:8088/api/levels/${form.domain}`)
        .then(response => {
          setLevels(response.data);
        })
        .catch(error => console.error("Error fetching levels:", error));
    } else {
      setRoles([]);
      setLevels([]);
    }
  }, [form.domain]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.testName && form.domain && form.role && form.level) {
      setError('');
      navigate('/Test2', { state: form });
    } else {
      setError("All fields are required");
    }
  };

  const isFormComplete = form.testName && form.domain && form.role && form.level;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f0f0f0 65%, #232A56 35%)',
        color: '#000',
        overflowX: 'hidden',
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src={logo} alt="Logo" style={{ width: 170, height: 70, marginLeft: '2%' }} />
          <Box sx={{ display: 'flex', marginLeft: '15%' }}>
            <Link href="#home" onClick={() => navigate('/Login')} sx={{ margin: '15%', color: '#000', textDecoration: 'none', '&:hover': { fontSize: '1.1em' } }}>Home</Link>
            <Link href="#tests" onClick={() => navigate('/TestList')} sx={{ margin: '15%', color: '#000', textDecoration: 'none', '&:hover': { fontSize: '1.1em' } }}>Tests</Link>
            <Link href="#results" sx={{ margin: '15%', color: '#000', textDecoration: 'none', '&:hover': { fontSize: '1.1em' } }}>Résultats</Link>
            <Link href="#more" sx={{ margin: '15%', color: '#000', textDecoration: 'none', '&:hover': { fontSize: '1.1em' } }}>Plus</Link>
          </Box>
          <Button
            onClick={() => navigate('/Test1')}
            sx={{
              marginLeft: '30%',
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: 30,
              cursor: 'pointer',
              width: '10%',
              border: '2px solid #232A56',
              '&:hover': {
                backgroundColor: '#232A56',
                color: '#fff',
                transform: 'scale(1.1)',
              },
            }}
          >
            Créer un test
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h2" sx={{ marginTop: '15vh', fontSize: '3.5em', fontStyle: 'italic' }}>
        Créer un test
      </Typography>

      <Container sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', margin: 3 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          {error && <Typography color="error">{error}</Typography>}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <TextField
              name="testName"
              placeholder="Entrer le nom du test"
              value={form.testName}
              onChange={handleChange}
              variant="outlined"
              sx={{ padding: 1, fontSize: '1em', margin: 1, width: 'calc(50% - 20px)' }}
            />
            <FormControl variant="outlined" sx={{ padding: 1, fontSize: '1em', margin: 1, width: 'calc(50% - 20px)' }}>
              <InputLabel>Choisir le domaine</InputLabel>
              <Select
                name="domain"
                value={form.domain}
                onChange={handleChange}
                label="Choisir le domaine"
              >
                <MenuItem value="">
                  <em>Choisir le domaine</em>
                </MenuItem>
                {domains.map(domain => (
                  <MenuItem key={domain.id} value={domain.id}>{domain.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <FormControl variant="outlined" sx={{ padding: 1, fontSize: '1em', margin: 1, width: 'calc(50% - 20px)' }}>
              <InputLabel>Choisir le rôle</InputLabel>
              <Select
                name="role"
                value={form.role}
                onChange={handleChange}
                label="Choisir le rôle"
                disabled={!form.domain}
              >
                <MenuItem value="">
                  <em>Choisir le rôle</em>
                </MenuItem>
                {roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ padding: 1, fontSize: '1em', margin: 1, width: 'calc(50% - 20px)' }}>
              <InputLabel>Choisir le niveau</InputLabel>
              <Select
                name="level"
                value={form.level}
                onChange={handleChange}
                label="Choisir le niveau"
                disabled={!form.domain}
              >
                <MenuItem value="">
                  <em>Choisir le niveau</em>
                </MenuItem>
                {levels.map(level => (
                  <MenuItem key={level.id} value={level.id}>{level.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormComplete}
            sx={{
              width: '40%',
              backgroundColor: isFormComplete ? '#232A56' : '#aaa',
              color: '#fff',
              cursor: 'pointer',
              borderRadius: 30,
              margin: '0 auto',
              '&:hover': {
                backgroundColor: isFormComplete ? '#1a1a4b' : '#aaa',
              },
            }}
          >
            Suivant
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default Test1;
