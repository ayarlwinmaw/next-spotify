import React, { useState, useEffect } from 'react';
import { google } from 'googleapis';

const ImageList = ({ accessToken, folderName }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImagesInFolder = async () => {
      try {
        const drive = google.drive({
          version: 'v3',
          auth: accessToken,
        });

        // Get folder ID by name
        const folderQueryResponse = await drive.files.list({
          q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
          fields: 'files(id)',
        });

        const folderId = folderQueryResponse.data.files[0]?.id;

        if (folderId) {
          // List images in the specified folder
          const imageQueryResponse = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/'`,
            fields: 'files(id, name, thumbnailLink)',
          });

          setImages(imageQueryResponse.data.files);
        } else {
          console.error(`Folder '${folderName}' not found.`);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (accessToken) {
      fetchImagesInFolder();
    }
  }, [accessToken, folderName]);

  return (
    <div>
      <h2>Images in {folderName}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map(image => (
          <div key={image.id} style={{ margin: '10px' }}>
            <img src={image.thumbnailLink} alt={image.name} />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
