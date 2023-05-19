import React from 'react';
import { useDropzone } from 'react-dropzone';

function FileDropper(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: true, // Allow multiple files to be dropped
    directory: true, // Allow folders to be dropped
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files or folders here, or click to select</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default FileDropper;
