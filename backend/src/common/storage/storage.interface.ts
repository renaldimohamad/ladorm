export interface IStorageService {
  uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
  deleteFile(publicId: string): Promise<void>;
}
