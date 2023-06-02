declare namespace Express {
  interface UploadedFiles {
    image: any;
    avatar?: fileUpload.UploadedFile;
  }

  interface Request {
    files: UploadedFiles;
  }
}

//Para que no haya problemas con req.files
//ToDo: Probar la misma config de avatar en image, por el 
// momento funciona bien