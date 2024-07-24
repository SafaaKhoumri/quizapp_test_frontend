import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  TextField,
  Modal,
  Link,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

function TestList() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isParamsModalOpen, setIsParamsModalOpen] = useState(false);
  const [isCandidatesModalOpen, setIsCandidatesModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    // Charger les tests depuis la base de données
    // Remplacer l'exemple de tests par une requête API réelle
    setTests([
      { id: 1, name: 'Test 1' },
      { id: 2, name: 'Test 2' },
    ]);
  }, []);

  const handleTestClick = (test) => {
    setSelectedTest(test);
  };

  const handleParamsModalOpen = () => {
    setIsParamsModalOpen(true);
  };

  const handleParamsModalClose = () => {
    setIsParamsModalOpen(false);
  };

  const handleCandidatesModalOpen = () => {
    setIsCandidatesModalOpen(true);
  };

  const handleCandidatesModalClose = () => {
    setIsCandidatesModalOpen(false);
  };

  const handleInviteModalOpen = () => {
    setIsInviteModalOpen(true);
  };

  const handleInviteModalClose = () => {
    setIsInviteModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
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
      <div style={{ display: 'flex', width: '100%', marginTop: '64px', backgroundColor:'#D9D9D9'}}>
        <Box sx={{ width: '20%', padding: '3%', backgroundColor:'#232A56', color:'#fff'}}>
          <Typography variant="h6">Tests</Typography>
          <List >
            {tests.map((test) => (
              <ListItem 
                button 
                key={test.id} 
                onClick={() => handleTestClick(test)}
                sx={{
                  backgroundColor: selectedTest && selectedTest.id === test.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  '&:before': {
                    content: selectedTest && selectedTest.id === test.id ? '"▸"' : '""',
                    marginRight: '8px',
                  },
                }}
              >
                <ListItemText primary={test.name} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ width: '80%', padding: '20px', alignItems: 'center', justifyContent: 'center' }}>
          {selectedTest ? (
            <>
              <Typography variant="h5" style={{ textAlign: 'center', padding: '20px 0' }}>{selectedTest.name}</Typography>
              <div style={{ textAlign: 'right', margin: '2%'}}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: 30, width: '5%', backgroundColor: 'rgba(35, 42, 86, 0.66)', color: '#000', cursor: 'pointer',margin: '1%' }}
                  onClick={handleParamsModalOpen}
                >
                  <SettingsIcon />
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: 30, width: '5%', backgroundColor: 'rgba(35, 42, 86, 0.66)', color: '#000', cursor: 'pointer', margin: '1%' }}
                  onClick={handleCandidatesModalOpen}
                >
                  <PersonIcon />
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  style={{ borderRadius:30, width: '5%', backgroundColor: 'rgba(35, 42, 86, 0.66)', color: '#000', cursor: 'pointer',margin: '1%' }}
                  onClick={handleInviteModalOpen}
                >
                  <AddIcon />
                </Button>
              </div>
              {/* Afficher les questions du test ici */}
              <div>
                <Typography variant="h6">Questions</Typography>
                {/* Remplacer par les questions réelles du test */}
                <ul>
                  <li>Question 1</li>
                  <li>Question 2</li>
                </ul>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '64px', color: '#888888' }}>
              <Typography variant="h4">{selectedTest ? selectedTest.name : 'Aucun test sélectionné'}</Typography>
            </div>
          )}
        </Box>
      </div>

      <Modal open={isParamsModalOpen} onClose={handleParamsModalClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h6" style={{ fontSize: '1.5em', color: 'rgba(35, 42, 86, 0.66)', textAlign: 'center', paddingBottom: '5%' }}>Paramètres du test</Typography>
          {/* Afficher les paramètres du test ici */}
        </Box>
      </Modal>

      <Modal open={isCandidatesModalOpen} onClose={handleCandidatesModalClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h6" style={{ fontSize: '1.5em', color: 'rgba(35, 42, 86, 0.66)', textAlign: 'center', paddingBottom: '5%' }}>Candidats</Typography>
          {/* Afficher les candidats ici */}
        </Box>
      </Modal>

      <Modal open={isInviteModalOpen} onClose={handleInviteModalClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h6" style={{ fontSize: '1.5em', color: 'rgba(35, 42, 86, 0.66)', textAlign: 'center', paddingBottom: '5%' }}>Inviter un candidat</Typography>
          <TextField
            type="text"
            name="name"
            placeholder="Nom du candidat"
            variant="outlined"
            style={{ width: '100%', marginBottom: '20px' }}
          />
          <TextField
            type="email"
            name="email"
            placeholder="Email du candidat"
            variant="outlined"
            style={{ width: '100%', marginBottom: '20px' }}
          />
          <Button variant="contained" color="primary" sx={{ width: '25%', backgroundColor: '#232A56', color: '#fff', cursor: 'pointer', borderRadius: 30, margin: '0 auto' }}>Inviter</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default TestList;
