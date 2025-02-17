import  { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export const TaskSaveImg = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    onDrop: (acceptedFiles) => {
    
      const readFiles = acceptedFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              ...file,
              preview: reader.result, 
              base64: reader.result, 
              name: file.name, 
            });
          };
          reader.readAsDataURL(file);
        });
      });

      // Esperar a que todos los archivos se conviertan antes de actualizar el estado
      Promise.all(readFiles).then((newFiles) => {
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...newFiles];
          onFilesChange(updatedFiles); // Pasar los archivos actualizados
          return updatedFiles;
        });
      });
    },
  });

  // Limpiar URLs al desmontar el componente
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview); // Liberar memoria
        }
      });
    };
  }, [files]);

  return (
    <div>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className="border-2 border-gray-700 p-4 text-center"
      >
        <input {...getInputProps()} />
        <p>Save pictures of your memories</p>
      </div>

     
    </div>
  );
};
