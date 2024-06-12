import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

// Step 1: Define storage configuration
const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
        // Use path.resolve to ensure the path is correctly resolved
        const uploadPath = path.resolve(__dirname, '../../public/data/uploads');
        callback(null, uploadPath);
    },
    filename: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        const randomDigits = Math.floor(Math.random() * 1000); // Generate 3 random digits
        const timeStamp = Date.now().toString().slice(-4); // Get the last 4 digits of the current timestamp
        const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase(); // Generate 4 random characters
        const extension = path.extname(file.originalname); // Extract the file extension

        // Construct the filename
        const filename = `${randomChars}-${randomDigits}${timeStamp}${extension}`;
        callback(null, filename);
    },
});

// Step 2: Define file filter for validation
const fileFilter = function (req: Request, file: Express.Multer.File, callback: FileFilterCallback) {
    // Only allow these MIME types
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Invalid file type. Only .png, .jpg, .jpeg files are allowed.'));
    }
}

// Step 3: Define multer upload configuration
const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 30 * 1024 * 1024 // Limiting file size to 30MB
    },
    fileFilter: fileFilter
});

export default uploads;
