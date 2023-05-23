declare namespace Express {
  interface UploadedFiles {
    avatar?: fileUpload.UploadedFile;
  }

  interface Request {
    files: UploadedFiles;
  }
}

//Para que no haya problemas con req.files