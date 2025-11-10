'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: '📋 Load Contacts from CSV' },
    position: { x: 250, y: 50 },
    style: { background: '#10b981', color: '#fff', border: '1px solid #059669', padding: 10, borderRadius: 8, minWidth: 200 },
  },
  {
    id: '2',
    data: { label: '🔍 Filter Verified Emails' },
    position: { x: 250, y: 150 },
    style: { background: '#3b82f6', color: '#fff', border: '1px solid #2563eb', padding: 10, borderRadius: 8, minWidth: 200 },
  },
  {
    id: '3',
    data: { label: '✏️ Personalize Email Content' },
    position: { x: 250, y: 250 },
    style: { background: '#8b5cf6', color: '#fff', border: '1px solid #7c3aed', padding: 10, borderRadius: 8, minWidth: 200 },
  },
  {
    id: '4',
    data: { label: '📧 Send Cold Email' },
    position: { x: 250, y: 350 },
    style: { background: '#f59e0b', color: '#fff', border: '1px solid #d97706', padding: 10, borderRadius: 8, minWidth: 200 },
  },
  {
    id: '5',
    data: { label: '⏰ Wait 3 Days' },
    position: { x: 250, y: 450 },
    style: { background: '#6366f1', color: '#fff', border: '1px solid #4f46e5', padding: 10, borderRadius: 8, minWidth: 200 },
  },
  {
    id: '6',
    data: { label: '❓ Email Opened?' },
    position: { x: 250, y: 550 },
    style: { background: '#ec4899', color: '#fff', border: '1px solid #db2777', padding: 10, borderRadius: 8, minWidth: 200 },
  },
  {
    id: '7',
    data: { label: '📨 Send Follow-up Email' },
    position: { x: 100, y: 650 },
    style: { background: '#f97316', color: '#fff', border: '1px solid #ea580c', padding: 10, borderRadius: 8, minWidth: 180 },
  },
  {
    id: '8',
    data: { label: '✅ Mark as Engaged' },
    position: { x: 400, y: 650 },
    style: { background: '#14b8a6', color: '#fff', border: '1px solid #0d9488', padding: 10, borderRadius: 8, minWidth: 180 },
  },
  {
    id: '9',
    type: 'output',
    data: { label: '📊 Log to CRM' },
    position: { x: 250, y: 750 },
    style: { background: '#64748b', color: '#fff', border: '1px solid #475569', padding: 10, borderRadius: 8, minWidth: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', label: 'No', animated: true },
  { id: 'e6-8', source: '6', target: '8', label: 'Yes', animated: true },
  { id: 'e7-9', source: '7', target: '9', animated: true },
  { id: 'e8-9', source: '8', target: '9', animated: true },
];

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isRunning, setIsRunning] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const runWorkflow = () => {
    setIsRunning(true);
    setExecutionLog([]);

    const steps = [
      '✅ Loaded 150 contacts from CSV',
      '✅ Filtered 142 verified email addresses',
      '✅ Personalized email content for 142 recipients',
      '✅ Sent 142 cold emails',
      '⏳ Waiting 3 days for responses...',
      '✅ 68 emails opened, 74 unopened',
      '✅ Sent 74 follow-up emails',
      '✅ Marked 68 contacts as engaged',
      '✅ Logged all interactions to CRM',
      '🎉 Workflow completed successfully!'
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setExecutionLog((prev) => [...prev, step]);
        if (index === steps.length - 1) {
          setIsRunning(false);
        }
      }, index * 800);
    });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>📧 Cold Email Workflow Builder</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>Automated cold email campaign with follow-ups</p>
        </div>
        <button
          onClick={runWorkflow}
          disabled={isRunning}
          style={{
            background: isRunning ? '#94a3b8' : '#10b981',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          onMouseOver={(e) => {
            if (!isRunning) e.currentTarget.style.background = '#059669';
          }}
          onMouseOut={(e) => {
            if (!isRunning) e.currentTarget.style.background = '#10b981';
          }}
        >
          {isRunning ? '⚙️ Running...' : '▶️ Execute Workflow'}
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>

        <div style={{
          width: '350px',
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '20px',
          overflowY: 'auto',
          borderLeft: '1px solid #334155'
        }}>
          <h2 style={{ marginTop: 0, color: '#f1f5f9', fontSize: '18px' }}>📋 Execution Log</h2>
          {executionLog.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Click "Execute Workflow" to start the campaign</p>
          ) : (
            <div>
              {executionLog.map((log, index) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    marginBottom: '8px',
                    background: '#334155',
                    borderRadius: '6px',
                    fontSize: '14px',
                    animation: 'slideIn 0.3s ease-out'
                  }}
                >
                  {log}
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #334155' }}>
            <h3 style={{ color: '#f1f5f9', fontSize: '16px', marginBottom: '10px' }}>📊 Workflow Stats</h3>
            <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
              <div>📥 <strong>Total Contacts:</strong> 150</div>
              <div>✅ <strong>Valid Emails:</strong> 142</div>
              <div>📧 <strong>Emails Sent:</strong> 216</div>
              <div>📈 <strong>Open Rate:</strong> 47.9%</div>
              <div>🎯 <strong>Engaged:</strong> 68</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
