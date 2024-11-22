import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileList from './FileList';
import FileUpload from './FileUpload';

const FileManagement = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    axios.get('https://data-scanner-r1to.vercel.app/api/scans')
      .then((response) => {
        setFiles(response.data);
        setError(null);
      })
      .catch((error) => {
        setError('Error fetching files. Please try again later.');
        console.error('Error fetching files:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileUploaded = (newFile) => {
    if (!newFile || !newFile._id) {
      console.error('Invalid file data received:', newFile);
      return;
    }
  
    setFiles((prevFiles) => {
      // Check for duplicates using the file's `_id`
      const isDuplicate = prevFiles.some((file) => file._id === newFile._id);
      if (isDuplicate) {
        console.warn('Duplicate file detected:', newFile._id);
        return prevFiles; // Don't add duplicates
      }
      return [...prevFiles, newFile]; // Add the new file
    });
  };
  


  const handleDeleteFile = (id) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
  };

  return (
    <div style={styles.container}>
      {error && (
        <div style={styles.error}>
          <p>{error}</p>
        </div>
      )}
      <FileUpload onFileUploaded={handleFileUploaded} />
      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <FileList files={files} onDeleteFile={handleDeleteFile} />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '16px',
  },
  loading: {
    textAlign: 'center',
    padding: '24px',
    color: '#666',
  },
};

export default FileManagement;