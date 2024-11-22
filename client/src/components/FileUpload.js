import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onFileUploaded }) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/scans/upload', formData);
      if (response.data) {
        console.log('File uploaded successfully:', response.data);
        onFileUploaded(response.data.scan);
      }
    } catch (error) {
      setError('Error uploading file. Please try again.');
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        ...styles.uploadArea,
        ...(dragging && styles.uploadAreaDragging),
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleChange}
        style={styles.fileInput}
        disabled={uploading}
      />
      {error && <p style={styles.error}>{error}</p>}
      {uploading ? (
        <p style={styles.uploadingText}>Uploading...</p>
      ) : (
        <div style={styles.uploadContent}>
          <p style={styles.uploadText}>
            Drag and drop a file here, or click to select
          </p>
          <p style={styles.uploadSubtext}>
            Supported formats: PNG, JPG, PDF
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  uploadArea: {
    border: '2px dashed #cbd5e1',
    borderRadius: '8px',
    padding: '40px 20px',
    textAlign: 'center',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
  },
  uploadAreaDragging: {
    backgroundColor: '#f1f5f9',
    borderColor: '#94a3b8',
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  uploadContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  uploadText: {
    fontSize: '16px',
    color: '#475569',
    marginBottom: '4px',
  },
  uploadSubtext: {
    fontSize: '14px',
    color: '#94a3b8',
  },
  uploadingText: {
    fontSize: '16px',
    color: '#475569',
  },
  error: {
    color: '#dc2626',
    marginBottom: '8px',
    fontSize: '14px',
  },
};

export default FileUpload;