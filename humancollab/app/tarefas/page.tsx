import React, { useState } from 'react';
import { Box, Typography, List, ListItem, Chip, Avatar, Stack, Tooltip, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Colaborador {
  id: number;
  nome: string;
}

export interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  status?: string;
  urgencia?: string;
  visibilidade?: string;
  dataCriacao?: string;
  dataPrazo?: string;
  projetoId?: number;
  colaboradores?: Colaborador[];
}

interface ListagemProps {
  tarefas: Tarefa[];
  onChange?: () => void;
}

export default function Listagem({ tarefas, onChange }: ListagemProps) {
  const [open, setOpen] = useState(false);
  const [editTarefa, setEditTarefa] = useState<Tarefa | null>(null);
  const [form, setForm] = useState<Partial<Tarefa>>({
    visibilidade: 'PUBLICO',
    status: 'ANDAMENTO',
    urgencia: 'MODERADO',
    dataCriacao: new Date().toISOString(),
    projetoId: 1,
  });
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:3000/tarefas';
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  function handleOpenCreate() {
    setEditTarefa(null);
    setForm({
      visibilidade: 'PUBLICO',
      status: 'ANDAMENTO',
      urgencia: 'MODERADO',
      dataCriacao: new Date().toISOString(),
      projetoId: 1,
    });
    setOpen(true);
  }
  function handleOpenEdit(tarefa: Tarefa) {
    setEditTarefa(tarefa);
    setForm({ ...tarefa });
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
    setEditTarefa(null);
    setForm({
      visibilidade: 'PUBLICO',
      status: 'ANDAMENTO',
      urgencia: 'MODERADO',
      dataCriacao: new Date().toISOString(),
      projetoId: 1,
    });
  }
  async function handleSave() {
    setLoading(true);
    try {
      let base = editTarefa ? { ...editTarefa, ...form } : { ...form };
      if (!base.status) base.status = 'ANDAMENTO';
      if (!base.urgencia) base.urgencia = 'MODERADO';
      if (!base.visibilidade) base.visibilidade = 'PUBLICO';
      if (!base.dataCriacao) base.dataCriacao = editTarefa?.dataCriacao || new Date().toISOString();
      if (!base.projetoId) base.projetoId = 1;
      // Corrige formato da dataPrazo para ISO completo
      let dataPrazoISO = base.dataPrazo;
      if (dataPrazoISO && dataPrazoISO.length === 10) {
        // Se vier só a data (YYYY-MM-DD), adiciona hora zero e converte para ISO
        dataPrazoISO = new Date(dataPrazoISO + 'T00:00:00').toISOString();
      } else if (!dataPrazoISO) {
        dataPrazoISO = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      }
      // Monta payload apenas com campos aceitos pelo Prisma
      const payload: any = {
        titulo: base.titulo,
        descricao: base.descricao,
        status: base.status,
        urgencia: base.urgencia,
        visibilidade: base.visibilidade,
        dataCriacao: base.dataCriacao,
        dataPrazo: dataPrazoISO,
        projetoId: base.projetoId,
      };
      // Adiciona colaboradorId ao criar tarefa (para o backend associar o usuário atual como colaborador)
      if (!editTarefa) {
        // O id do usuário deve estar salvo no localStorage após o login
        const userId = localStorage.getItem('usuarioId');
        if (userId && !isNaN(Number(userId))) {
          payload.colaboradorId = Number(userId);
        } else {
          alert('Usuário não identificado. Faça login novamente.');
          setLoading(false);
          return;
        }
      }
      if (editTarefa) {
        const res = await fetch(`${API_URL}/${editTarefa.id}`, { method: 'PUT', headers, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('Erro ao editar tarefa');
      } else {
        const res = await fetch(API_URL, { method: 'POST', headers, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('Erro ao criar tarefa');
      }
      handleClose();
      if (onChange) onChange();
    } catch (e) {
      alert('Erro ao salvar tarefa');
    } finally {
      setLoading(false);
    }
  }
  async function handleDelete(id: number) {
    if (!window.confirm('Deseja realmente deletar esta tarefa?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers });
      if (!res.ok) throw new Error('Erro ao deletar tarefa');
      if (onChange) onChange();
    } catch (e) {
      alert('Erro ao deletar tarefa');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  return (
    <Box>
      {(!tarefas || tarefas.length === 0) && (
        <Typography color="text.secondary">Nenhuma tarefa encontrada.</Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-begin', alignItems: 'center', mt: 1 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>Nova Tarefa</Button>
      </Box>
      <List>
        {tarefas.map(tarefa => (
          <ListItem key={tarefa.id} alignItems="flex-start" sx={{ mb: 2, borderRadius: 2, boxShadow: 1, bgcolor: 'background.paper', position: 'relative' }}>
            <Box sx={{ width: '100%' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">{tarefa.titulo}</Typography>
                <Stack direction="row" spacing={1}>
                  {/* Status */}
                  {tarefa.status && (
                    <Chip
                      label={tarefa.status}
                      color={
                        tarefa.status === 'CONCLUIDO_PRAZO' ? 'success' :
                          tarefa.status === 'CONCLUIDO_ATRASO' ? 'info' :
                            tarefa.status === 'ANDAMENTO' ? 'warning' :
                              tarefa.status === 'ATRASADO' ? 'error' :
                                'default'
                      }
                      size="small"
                    />
                  )}
                  {/* Urgência */}
                  {tarefa.urgencia && (
                    <Chip
                      label={tarefa.urgencia}
                      color={
                        tarefa.urgencia === 'CRITICO' ? 'error' :
                          tarefa.urgencia === 'ALTO' ? 'warning' :
                            tarefa.urgencia === 'MODERADO' ? 'info' :
                              tarefa.urgencia === 'BAIXO' ? 'success' :
                                'default'
                      }
                      size="small"
                    />
                  )}
                  {/* Visibilidade */}
                  {tarefa.visibilidade && (
                    <Chip
                      label={tarefa.visibilidade}
                      color={
                        tarefa.visibilidade === 'PUBLICO' ? 'success' :
                          tarefa.visibilidade === 'APENAS_EQUIPE' ? 'info' :
                            tarefa.visibilidade === 'APENAS_GERENTE' ? 'warning' :
                              tarefa.visibilidade === 'PRIVADO' ? 'error' :
                                'default'
                      }
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {/* Prazo */}
                  {tarefa.dataPrazo && <Chip label={new Date(tarefa.dataPrazo).toLocaleDateString()} variant="outlined" size="small" />}
                  <IconButton size="small" onClick={() => handleOpenEdit(tarefa)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(tarefa.id)}><DeleteIcon fontSize="small" /></IconButton>
                </Stack>
              </Stack>
              {tarefa.descricao && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1 }}>
                  {tarefa.descricao}
                </Typography>
              )}
              {tarefa.colaboradores && tarefa.colaboradores.length > 0 && (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">Colaboradores:</Typography>
                  {tarefa.colaboradores.map(colab => (
                    <Tooltip title={colab.nome} key={colab.id}>
                      <Avatar sx={{ width: 28, height: 28, fontSize: 14, bgcolor: '#06677F' }}>{colab.nome.charAt(0)}</Avatar>
                    </Tooltip>
                  ))}
                </Stack>
              )}
            </Box>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editTarefa ? 'Editar Tarefa' : 'Nova Tarefa'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Título" name="titulo" value={form.titulo || ''} onChange={handleChange} fullWidth required />
            <TextField label="Descrição" name="descricao" value={form.descricao || ''} onChange={handleChange} fullWidth multiline minRows={2} required />
            <TextField label="Status" name="status" value={form.status || ''} onChange={handleChange} select fullWidth>
              <MenuItem value="ANDAMENTO">Andamento</MenuItem>
              <MenuItem value="ATRASADO">Atrasado</MenuItem>
              <MenuItem value="CONCLUIDO_PRAZO">Concluído no Prazo</MenuItem>
              <MenuItem value="CONCLUIDO_ATRASO">Concluído com Atraso</MenuItem>
            </TextField>
            <TextField label="Urgência" name="urgencia" value={form.urgencia || ''} onChange={handleChange} select fullWidth>
              <MenuItem value="CRITICO">Crítico</MenuItem>
              <MenuItem value="ALTO">Alto</MenuItem>
              <MenuItem value="MODERADO">Moderado</MenuItem>
              <MenuItem value="BAIXO">Baixo</MenuItem>
            </TextField>
            <TextField label="Visibilidade" name="visibilidade" value={form.visibilidade || ''} onChange={handleChange} select fullWidth>
              <MenuItem value="PUBLICO">Público</MenuItem>
              <MenuItem value="APENAS_EQUIPE">Apenas Equipe</MenuItem>
              <MenuItem value="APENAS_GERENTE">Apenas Gerente</MenuItem>
              <MenuItem value="PRIVADO">Privado</MenuItem>
            </TextField>
            <TextField label="Prazo" name="dataPrazo" type="date" value={form.dataPrazo ? form.dataPrazo.slice(0, 10) : ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" disabled={loading}>{editTarefa ? 'Salvar' : 'Criar'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
