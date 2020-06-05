import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import "./styles.css";

interface Props {
  onFileUpload: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUpload }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Thumbnail do ponto de coleta" />
      ) : isDragActive ? (
        <React.Fragment>
          <FiUpload />
          <p>Solte a imagem aqui ...</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <FiUpload />
          <p>Arraste e solte o arquivo aqui ou clique para procurá-lo</p>
        </React.Fragment>
      )}
    </div>
  );
};

export default Dropzone;
