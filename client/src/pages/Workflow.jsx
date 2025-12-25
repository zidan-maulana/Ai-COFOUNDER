import React, { useState, useEffect } from 'react';
import { Plus, Play, Pause, Edit2, Trash2, Zap, Clock, CheckCircle } from 'lucide-react';

function Workflow() {
  const [workflows, setWorkflows] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dummy data untuk demo
  useEffect(() => {
    // Simulasi fetch data dari API
    setTimeout(() => {
      setWorkflows([
        {
          id: 1,
          name: 'Email Notification on New Lead',
          description: 'Otomatis kirim email saat ada lead baru',
          status: 'active',
          trigger: 'New Lead',
          action: 'Send Email',
          lastRun: '2 jam yang lalu',
          executions: 245
        },
        {
          id: 2,
          name: 'Slack Alert on High Priority Task',
          description: 'Kirim notifikasi Slack untuk task prioritas tinggi',
          status: 'active',
          trigger: 'Task Created',
          action: 'Slack Message',
          lastRun: '5 menit yang lalu',
          executions: 128
        },
        {
          id: 3,
          name: 'Daily Sales Report',
          description: 'Generate dan kirim laporan penjualan harian',
          status: 'inactive',
          trigger: 'Schedule (Daily)',
          action: 'Generate Report',
          lastRun: '1 hari yang lalu',
          executions: 67
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleWorkflowStatus = (id) => {
    setWorkflows(workflows.map(wf => 
      wf.id === id 
        ? { ...wf, status: wf.status === 'active' ? 'inactive' : 'active' }
        : wf
    ));
  };

  const deleteWorkflow = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus workflow ini?')) {
      setWorkflows(workflows.filter(wf => wf.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <div className="bg-dark-lighter border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Workflow Manager</h1>
              <p className="text-gray-400 mt-1">Otomasi proses bisnis Anda dengan n8n</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium transition"
            >
              <Plus size={20} />
              Buat Workflow Baru
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Workflows</p>
                <p className="text-3xl font-bold text-white mt-1">{workflows.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Zap className="text-primary" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Workflows</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {workflows.filter(w => w.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Executions</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {workflows.reduce((sum, w) => sum + w.executions, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Clock className="text-blue-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Workflows List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-gray-400 mt-4">Loading workflows...</p>
          </div>
        ) : workflows.length === 0 ? (
          <div className="bg-dark-lighter border border-dark-border rounded-lg p-12 text-center">
            <Zap size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Belum Ada Workflow</h3>
            <p className="text-gray-400 mb-6">Mulai otomasi bisnis Anda dengan membuat workflow pertama</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium transition"
            >
              <Plus size={20} />
              Buat Workflow Baru
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="bg-dark-lighter border border-dark-border rounded-lg p-6 hover:border-primary/50 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Workflow Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="text-primary" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-white">{workflow.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            workflow.status === 'active' 
                              ? 'bg-green-500/20 text-green-500' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {workflow.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{workflow.description}</p>
                        
                        {/* Workflow Details */}
                        <div className="flex flex-wrap gap-4 mt-3 text-sm">
                          <div className="flex items-center gap-1 text-gray-400">
                            <Play size={14} />
                            <span>Trigger: {workflow.trigger}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Zap size={14} />
                            <span>Action: {workflow.action}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock size={14} />
                            <span>Last run: {workflow.lastRun}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <CheckCircle size={14} />
                            <span>{workflow.executions} executions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleWorkflowStatus(workflow.id)}
                      className={`p-2 rounded-lg transition ${
                        workflow.status === 'active'
                          ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30'
                          : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                      }`}
                      title={workflow.status === 'active' ? 'Pause' : 'Activate'}
                    >
                      {workflow.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button
                      className="p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteWorkflow(workflow.id)}
                      className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal (Simplified) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-lighter border border-dark-border rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-white mb-4">Buat Workflow Baru</h2>
            <p className="text-gray-400 mb-6">
              Fitur ini akan terintegrasi dengan n8n untuk membuat workflow automation.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert('Integrasi dengan n8n akan diimplementasikan di step selanjutnya');
                  setShowCreateModal(false);
                }}
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workflow;