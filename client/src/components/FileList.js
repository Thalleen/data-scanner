// import React from 'react';
// import axios from 'axios';

// const FileList = ({ files, onDeleteFile }) => {
//   const handleDelete = (id) => {
//     if (!id) {
//       console.error("No file id provided for deletion");
//       return;
//     }

//     axios.delete(`http://localhost:8000/api/scans/${id}`)
//       .then(() => {
//         onDeleteFile(id); // Notify parent to remove file from list
//       })
//       .catch((error) => {
//         console.error('Error deleting file:', error);
//       });
//   };

//   return (
//     <div style={styles.container}>
//       <h3 style={styles.title}>Uploaded Files</h3>
//       {files.length > 0 ? (
//         <div style={styles.cardContainer}>
//           {files.map((file) => (
//             <div key={file._id} style={styles.card}>
//               <img
//                 src={`data:image/png;base64,${file.base64Image}`} // Display Base64 image
//                 alt={file.fileName}
//                 style={styles.image}
//               />
//               <div style={styles.content}>
//                 <h4 style={styles.fileName}>{file.fileName}</h4>
//                 <p style={styles.text}>
//                   <strong>Classification:</strong> {file.classification || 'Unknown'}
//                 </p>
//                 <p style={styles.text}>
//                   <strong>Detected Fields:</strong>{' '}
//                   {file.detectedFields
//                     ? Object.entries(file.detectedFields)
//                         .map(([key, value]) => `${key}: ${value.join(', ')}`)
//                         .join('; ')
//                     : 'None'}
//                 </p>
//                 <p style={styles.text}>
//                   <strong>Uploaded At:</strong> {new Date(file.createdAt).toLocaleString()}
//                 </p>
//                 <button style={styles.deleteButton} onClick={() => handleDelete(file._id)}>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p style={styles.noFiles}>No files uploaded yet.</p>
//       )}
//     </div>
//   );
// };

// // Inline styles
// const styles = {
//   container: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//   },
//   title: {
//     fontSize: '24px',
//     marginBottom: '20px',
//     color: '#333',
//   },
//   cardContainer: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//     gap: '20px',
//   },
//   card: {
//     backgroundColor: '#fff',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     overflow: 'hidden',
//     display: 'flex',
//     flexDirection: 'column',
//     transition: 'transform 0.2s',
//   },
//   image: {
//     width: '100%',
//     height: '200px',
//     objectFit: 'cover',
//   },
//   content: {
//     padding: '15px',
//   },
//   fileName: {
//     fontSize: '18px',
//     marginBottom: '10px',
//     color: '#555',
//   },
//   text: {
//     fontSize: '14px',
//     margin: '5px 0',
//     color: '#666',
//   },
//   deleteButton: {
//     marginTop: '10px',
//     padding: '10px',
//     backgroundColor: '#e74c3c',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     transition: 'background-color 0.2s',
//   },
//   deleteButtonHover: {
//     backgroundColor: '#c0392b',
//   },
//   noFiles: {
//     fontSize: '16px',
//     color: '#777',
//   },
// };

// export default FileList;


import React from 'react';
import axios from 'axios';

const FileList = ({ files, onDeleteFile }) => {
    const handleDelete = (id) => {
      if (!id) {
        console.error("No file id provided for deletion");
        return;
      }
  
      axios.delete(`http://localhost:8000/api/scans/${id}`)
        .then(() => {
          onDeleteFile(id);
        })
        .catch((error) => {
          console.error('Error deleting file:', error);
        });
    };
  
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>Uploaded Files</h3>
        {files.length > 0 ? (
          <div style={styles.cardContainer}>
            {files.map((file, index) => (
              <div key={file._id || index} style={styles.card}>
                <img
                  src={`data:image/png;base64,${file.base64Image}`}
                  alt={file.fileName}
                  style={styles.image}
                />
                <div style={styles.content}>
                  <h4 style={styles.fileName}>{file.fileName}</h4>
                  <p style={styles.text}>
                    <strong>Classification:</strong> {file.classification || 'Unknown'}
                  </p>
                  <p style={styles.text}>
                    <strong>Detected Fields:</strong>{' '}
                    {file.detectedFields
                      ? Object.entries(file.detectedFields)
                          .map(([key, value]) => `${key}: ${value.join(', ')}`)
                          .join('; ')
                      : 'None'}
                  </p>
                  <p style={styles.text}>
                    <strong>Uploaded At:</strong> {new Date(file.createdAt).toLocaleString()}
                  </p>
                  <button 
                    style={styles.deleteButton} 
                    onClick={() => handleDelete(file._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noFiles}>No files uploaded yet.</p>
        )}
      </div>
    );
  };

// Inline styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  cardContainer: {
    display: 'flex',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    gap: '10px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    padding: '15px',
  },
  fileName: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#555',
  },
  text: {
    fontSize: '14px',
    margin: '5px 0',
    color: '#666',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  deleteButtonHover: {
    backgroundColor: '#c0392b',
  },
  noFiles: {
    fontSize: '16px',
    color: '#777',
  },
};

export default FileList;
