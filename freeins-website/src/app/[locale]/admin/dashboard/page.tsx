'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, TextField, Select, MenuItem, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, CircularProgress, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ConfirmDialog from '@/components/ConfirmDialog';

interface Page {
  id: string;
  title: string;
  content: string;
  slug: string;
  locale: string;
  createdAt: string;
}

type PageForm = {
  title: string;
  content: string;
  slug: string;
  locale: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [deleteId, setDeleteId] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PageForm>();

  // 检查认证状态
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  // 获取所有页面
  const fetchPages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPages(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch pages');
      console.error('Fetch pages error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // 添加页面
  const onAddSubmit = async (data: PageForm) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pages`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowAddModal(false);
      reset();
      fetchPages();
    } catch (err) {
      setError('Failed to add page');
      console.error('Add page error:', err);
    }
  };

  // 编辑页面
  const onEditSubmit = async (data: PageForm) => {
    if (!currentPage) return;

    try {
      const token = localStorage.getItem('admin_token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/pages/${currentPage.id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowEditModal(false);
      fetchPages();
    } catch (err) {
      setError('Failed to update page');
      console.error('Update page error:', err);
    }
  };

  // 删除页面
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/pages/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowDeleteDialog(false);
      fetchPages();
    } catch (err) {
      setError('Failed to delete page');
      console.error('Delete page error:', err);
    }
  };

  // 打开编辑模态框
  const openEditModal = (page: Page) => {
    setCurrentPage(page);
    reset(page);
    setShowEditModal(true);
  };

  // 打开删除确认框
  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Page Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setShowAddModal(true)}
        >
          Add New Page
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Locale</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No pages found
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow key={page.id} hover>
                    <TableCell>{page.title}</TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell>
                      <Chip label={page.locale} size="small" />
                    </TableCell>
                    <TableCell>
                      {new Date(page.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => openEditModal(page)} size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => openDeleteDialog(page.id)} size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add Page Modal */}
      <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Add New Page</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onAddSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              label="Title"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <Typography color="error" sx={{ fontSize: 12 }}>{errors.title.message}</Typography>
            )}

            <TextField
              margin="dense"
              required
              fullWidth
              label="Slug"
              {...register('slug', { required: 'Slug is required' })}
              helperText="URL-friendly name (e.g. 'about', 'contact')"
            />
            {errors.slug && (
              <Typography color="error" sx={{ fontSize: 12 }}>{errors.slug.message}</Typography>
            )}

            <Select
              margin="dense"
              required
              fullWidth
              label="Locale"
              {...register('locale', { required: 'Locale is required' })}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="zh">Chinese</MenuItem>
              <MenuItem value="id">Indonesian</MenuItem>
              <MenuItem value="ms">Malay</MenuItem>
            </Select>
            {errors.locale && (
              <Typography color="error" sx={{ fontSize: 12 }}>{errors.locale.message}</Typography>
            )}

            <TextField
              margin="dense"
              required
              fullWidth
              multiline
              rows={6}
              label="Content"
              {...register('content', { required: 'Content is required' })}
            />
            {errors.content && (
              <Typography color="error" sx={{ fontSize: 12 }}>{errors.content.message}</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button type="submit" variant="contained" onClick={handleSubmit(onAddSubmit)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Page Modal */}
      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Edit Page</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onEditSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              label="Title"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <Typography color="error" sx={{ fontSize: 12 }}>{errors.title.message}</Typography>
            )}

            <TextField
              margin="dense"
              required
              fullWidth
              label="Slug"
              {...register('slug', { required: 'Slug is required' })}
              helperText="URL-friendly name (e.g. 'about', 'contact')"
            />
            {errors.slug && (
              <Typography color="error" sx={{ fontSize: 12 }}>{errors.slug.message}</Typography>
            )}

            <Select
              margin="dense"
              required
              fullWidth
              label="Locale"
              {...register('locale', { required: 'Locale is required' })}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="zh">Chinese</MenuItem>
              <MenuItem value="id">Indonesian</MenuItem>
              <MenuItem value="ms">Malay</MenuItem>
            </Select>
            {errors.locale && (
              <Typography color="error" sx={{ fontSize: 12 }}>{errors.locale.message}</Typography>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={6}
              label="Content"
              {...register('content', { required: 'Content is required' })}
            />
            {errors.content && (
              <Typography color="error" sx={{ fontSize: 12 }}>{errors.content.message}</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button type="submit" variant="contained" onClick={handleSubmit(onEditSubmit)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Page"
        content="Are you sure you want to delete this page? This action cannot be undone."
      />
    </Box>
  );
}