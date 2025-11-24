'use client';
import { useState, useEffect } from 'react';

export default function TroopsManager() {
  const [troops, setTroops] = useState([]);
  const [formData, setFormData] = useState({
    nama: '',
    kekuatan: '',
    desc: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Read - Ambil semua data
  const fetchTroops = async () => {
    try {
      const response = await fetch('/api/troops');
      const data = await response.json();
      setTroops(data);
    } catch (error) {
      console.error('Error fetching troops:', error);
    }
  };

  useEffect(() => {
    fetchTroops();
  }, []);

  // Create & Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId 
        ? `/api/troops/${editingId}`
        : '/api/troops';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ nama: '', kekuatan: '', desc: '' });
        setEditingId(null);
        fetchTroops(); // Refresh data
      }
    } catch (error) {
      console.error('Error saving troop:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this troop?')) {
      try {
        await fetch(`/api/troops/${id}`, { method: 'DELETE' });
        fetchTroops(); // Refresh data
      } catch (error) {
        console.error('Error deleting troop:', error);
      }
    }
  };

  // Edit - Isi form dengan data yang akan diedit
  const handleEdit = (troop) => {
    setFormData({
      nama: troop.nama,
      kekuatan: troop.kekuatan.toString(),
      desc: troop.desc
    });
    setEditingId(troop.id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Troops Management</h1>
      
      {/* Form Create/Update */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Troop' : 'Add New Troop'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nama"
            value={formData.nama}
            onChange={(e) => setFormData({...formData, nama: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Kekuatan"
            value={formData.kekuatan}
            onChange={(e) => setFormData({...formData, kekuatan: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Deskripsi"
            value={formData.desc}
            onChange={(e) => setFormData({...formData, desc: e.target.value})}
            className="p-2 border rounded"
            required
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
          >
            {loading ? 'Saving...' : (editingId ? 'Update' : 'Create')}
          </button>
          
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({ nama: '', kekuatan: '', desc: '' });
                setEditingId(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table Read */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Nama</th>
              <th className="py-2 px-4 border">Kekuatan</th>
              <th className="py-2 px-4 border">Deskripsi</th>
              <th className="py-2 px-4 border">Created At</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {troops.map((troop) => (
              <tr key={troop.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{troop.nama}</td>
                <td className="py-2 px-4 border">{troop.kekuatan}</td>
                <td className="py-2 px-4 border">{troop.desc}</td>
                <td className="py-2 px-4 border">
                  {new Date(troop.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(troop)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(troop.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {troops.length === 0 && (
          <p className="text-center py-4 text-gray-500">No troops found</p>
        )}
      </div>
    </div>
  );
}