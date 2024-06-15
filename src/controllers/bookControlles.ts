import { Request, Response, NextFunction } from "express";

import bookModel from "../models/bookModels";
import path from "path";
import fs from "node:fs";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, genre } = req.body;
    // console.log("files", req.files);
    const files = req.files as { [filename: string]: Express.Multer.File[] };

    // step: 1.  coverImage set up
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    // console.log(coverImageMimeType); // like: jpeg, jpg, png etc.
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        fileName
    );

    // step: 2. pdf file set up.
    const bookFileName = files.file[0].filename;
    const bookMimeType = files.file[0].mimetype.split("/").at(-1);
    const bookFilePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        bookFileName
    );

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "coverImage",
            format: coverImageMimeType,
        });

        const bookFileUploadResult = await cloudinary.uploader.upload(
            bookFilePath,
            {
                filename_override: fileName,
                folder: "book-Pdfs",
                format: bookMimeType,
            }
        );

        // console.log(uploadResult);
        // console.log(bookFileUploadResult);

        // 1. Create Book.
        const newBook = await bookModel.create({
            title,
            author: "66672fd95e3979899d98affd",
            genre,
            coverImage: uploadResult.secure_url,
            file: bookFileUploadResult.secure_url,
        });

        // 2. delete the file from temporary file path locaion, both coverImage and pdf.
        try {
            await fs.promises.unlink(filePath);
            await fs.promises.unlink(bookFilePath);
        } catch (error) {
            return next(createHttpError(500, { message: error }));
        }

        res.status(201).json({ id: newBook._id });
    } catch (error) {
        return next(createHttpError(500, { message: error }));
    }
};

export { createBook };
