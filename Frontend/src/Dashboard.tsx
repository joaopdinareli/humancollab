import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar, Divider, ListItemIcon, Button, IconButton } from '@mui/material';
import { getToken } from './api';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Listagem from './Tarefas';

const API_URL = 'http://localhost:3000';

interface Usuario {
  id: number;
  nome: string;
}

interface Equipe {
  id: number;
  nome: string;
  membros?: Usuario[];
}

interface Tarefa {
  id: number;
  titulo: string;
}

interface DashboardProps {
  token: string;
  tipo: 'usuario' | 'equipe';
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  onLogout: () => void;
}

export default function Dashboard({ token, tipo, mode, setMode, onLogout }: DashboardProps) {
  const [view, setView] = useState<'equipes' | 'tarefas' | 'mural'>('mural');
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [dados, setDados] = useState<Usuario[] | Equipe[]>([]);
  const [erro, setErro] = useState('');
  const [usuarioNome, setUsuarioNome] = useState<string>(() => localStorage.getItem('usuarioNome') || '');

  useEffect(() => {
    const endpoint = tipo === 'usuario' ? '/usuarios' : '/equipes';
    fetch(`${API_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${token || getToken()}` }
    })
      .then(r => r.ok ? r.json() : Promise.reject('Erro ao buscar dados'))
      .then(setDados)
      .catch(() => setErro('Erro ao buscar dados.'));
    // Atualiza nome do usuário logado a partir do localStorage
    setUsuarioNome(localStorage.getItem('usuarioNome') || '');
  }, [token, tipo]);

  useEffect(() => {
    setErro('');
    if (view === 'equipes') {
      setTarefas([]);
      fetch(`${API_URL}/equipes`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.ok ? r.json() : Promise.reject('Erro ao buscar equipes'))
        .then(setEquipes)
        .catch(() => setErro('Erro ao buscar equipes.'));
    } else if (view === 'tarefas') {
      setEquipes([]);
      fetch(`${API_URL}/tarefas`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.ok ? r.json() : Promise.reject('Erro ao buscar tarefas'))
        .then(setTarefas)
        .catch(() => setErro('Erro ao buscar tarefas.'));
    }
  }, [token, view]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioNome');
    localStorage.removeItem('usuarioId');
    onLogout();
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', background: '#F5FAFD' }}>
      {/* Sidebar */}
      <Box sx={{
        width: 220,
        height: '100vh',
        background: theme => theme.palette.background.default,
        borderRight: theme => `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000
      }}>
        <Box>
          <List>
            <ListItem
              component="button"
              sx={theme => ({
                mb: 1,
                background: view === 'equipes'
                  ? (theme.palette.mode === 'dark' ? 'rgba(23,28,31,0.16)' : 'rgba(23,28,31,0.08)')
                  : theme.palette.background.default,
                border: 'none',
                boxShadow: 'none',
                color: theme.palette.text.primary,
              })}
              onClick={() => setView('equipes')}
            >
              <ListItemIcon>
                <GroupIcon sx={{ color: '#06677F', opacity: 0.7 }} />
              </ListItemIcon>
              <ListItemText primary="Equipes" />
            </ListItem>
            <ListItem
              component="button"
              sx={theme => ({
                mb: 1,
                background: view === 'tarefas'
                  ? (theme.palette.mode === 'dark' ? 'rgba(23,28,31,0.16)' : 'rgba(23,28,31,0.08)')
                  : theme.palette.background.default,
                boxShadow: 'none',
                border: 'none',
                color: theme.palette.text.primary
              })}
              onClick={() => setView('tarefas')}
            >
              <ListItemIcon>
                <AssignmentIcon sx={{ color: '#06677F', opacity: 0.7 }} />
              </ListItemIcon>
              <ListItemText primary="Tarefas" />
            </ListItem>
            <ListItem
              component="button"
              sx={theme => ({
                mb: 1,
                background: theme.palette.background.default,
                boxShadow: 'none',
                border: 'none',
                color: theme.palette.text.primary
              })}
            >
              <ListItemIcon>
                <SettingsIcon sx={{ color: '#06677F', opacity: 0.7 }} />
              </ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mb: 2, px: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Avatar sx={{ bgcolor: '#06677F', width: 40, height: 40 }}>
                {usuarioNome ? usuarioNome.charAt(0) : ''}
              </Avatar>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                {usuarioNome}
              </Typography>
            </Box>
            <Button
              variant="text"
              size="small"
              sx={theme => ({
                p: 0,
                minWidth: 0,
                fontWeight: 700,
                width: '100%',
                justifyContent: 'center',
                color: theme.palette.text.primary,
                fontfeaturesettings: "'liga' off, 'clig' off",
                textdecorationline: 'underline'
              })}
              onClick={handleLogout}
            >
              SAIR
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logomarca.png" alt="Logo" style={{ width: 32, height: 32 }} />
            <Typography
              variant="h6"
              sx={theme => ({
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: 18,
                ml: 1
              })}
            >
              HumanCollab
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <IconButton onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Box>
      </Box>
      {/* Conteúdo principal */}
      <Box sx={theme => ({
        flex: 1,
        ml: '220px',
        p: 4,
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
        transition: 'background 0.2s, color 0.2s'
      })}>
        {view === 'equipes' && (
          <>
            <Typography variant="h4" sx={{ mb: 2 }}>Equipes</Typography>
            {erro && <Typography color="error">{erro}</Typography>}
            <List>
              {equipes.map(equipe => (
                <ListItem key={equipe.id} alignItems="flex-start" sx={{ mb: 2, borderRadius: 2, boxShadow: 1, bgcolor: 'background.paper', position: 'relative' }}>
                  <ListItemText
                    primary={equipe.nome}
                    secondary={
                      equipe.membros && equipe.membros.length > 0 ? (
                        <span>
                          Membros: {equipe.membros.map(m => m.nome).join(', ')}
                        </span>
                      ) : (
                        <span style={{ color: '#888' }}>Sem membros</span>
                      )
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
        {view === 'tarefas' && (
          <>
            <Typography variant="h4" sx={{ mb: 2 }}>Tarefas</Typography>
            {erro && <Typography color="error">{erro}</Typography>}
            <Listagem tarefas={tarefas} onChange={() => {
              fetch(`${API_URL}/tarefas`, {
                headers: { Authorization: `Bearer ${token}` }
              })
                .then(r => r.ok ? r.json() : Promise.reject('Erro ao buscar tarefas'))
                .then(setTarefas)
                .catch(() => setErro('Erro ao buscar tarefas.'));
            }} />
          </>
        )}
      </Box>
    </Box>
  );
}
