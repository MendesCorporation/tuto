import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Recording } from '../types';
import DemoPlayer from '../components/DemoPlayer';

export default function DemoPage() {
  const { id } = useParams<{ id: string }>();
  const [recording, setRecording] = useState<Recording | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/demos/${id}`)
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setRecording)
      .catch(() => setError(true));
  }, [id]);

  if (error) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#555' }}>
      Demo not found
    </div>
  );

  if (!recording) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#555' }}>
      Loading...
    </div>
  );

  return <DemoPlayer data={recording} />;
}
