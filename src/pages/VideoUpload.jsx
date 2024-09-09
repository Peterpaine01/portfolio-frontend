// VideoUpload.js
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config"; // Importez le stockage depuis votre fichier de configuration

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [videoURL, setVideoURL] = useState("");

  // Gérer la sélection du fichier vidéo
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  // Gérer l'upload de la vidéo
  const handleUpload = () => {
    if (videoFile) {
      const storageRef = ref(storage, `videos/${videoFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, videoFile);

      // Surveiller l'état de l'upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress); // Met à jour le pourcentage d'avancement
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed", error);
        },
        () => {
          // Une fois l'upload terminé, obtenir l'URL de la vidéo
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Video available at", downloadURL);
            setVideoURL(downloadURL); // Enregistrer l'URL pour l'utiliser ou l'afficher
          });
        }
      );
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>

      <div>
        <p>Progress: {progress}%</p>
        {videoURL && (
          <p>
            Video URL:{" "}
            <a href={videoURL} target="_blank" rel="noopener noreferrer">
              {videoURL}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
