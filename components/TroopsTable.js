'use client';
import { useState, useEffect } from 'react';

export default function TroopsTable() {
  const [troops, setTroops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTroops = async () => {
    try {
      const response = await fetch('/api/troops');
      const data = await response.json();
      setTroops(data);
    } catch (error) {
      console.error('Error fetching troops:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTroops();
  }, []);

  const getStrengthBadge = (strength) => {
    let color = '';
    let label = '';
    
    if (strength >= 80) {
      color = 'bg-red-100 text-red-800';
      label = 'Sangat Kuat';
    } else if (strength >= 60) {
      color = 'bg-orange-100 text-orange-800';
      label = 'Kuat';
    } else if (strength >= 40) {
      color = 'bg-yellow-100 text-yellow-800';
      label = 'Medium';
    } else {
      color = 'bg-green-100 text-green-800';
      label = 'Dasar';
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const totalStrength = troops.reduce((sum, troop) => sum + troop.kekuatan, 0);
  const averageStrength = Math.round(totalStrength / troops.length);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{troops.length}</div>
            <div className="text-blue-100">Total Pasukan</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{totalStrength}</div>
            <div className="text-blue-100">Total Kekuatan</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{averageStrength}</div>
            <div className="text-blue-100">Rata-rata Kekuatan</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pasukan
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kekuatan
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deskripsi
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Dibuat
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {troops.map((troop, index) => (
              <tr key={troop.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">
                        {troop.nama === 'Infantry' && '🪖'}
                        {troop.nama === 'Cavalry' && '🐎'}
                        {troop.nama === 'Archers' && '🏹'}
                        {troop.nama === 'Siege Weapons' && '🗡️'}
                        {troop.nama === 'Elite Guard' && '⭐'}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {troop.nama}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {troop.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{troop.kekuatan}</div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(troop.kekuatan, 100)}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStrengthBadge(troop.kekuatan)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs">
                    {troop.desc}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(troop.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}