import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { env } from './env';
import { ApiError } from '../utils';
import streamifier from 'streamifier';

cloudinary.config({
    cloud_name: env.CLOUDINARY.CLOUD_NAME,
    api_key: env.CLOUDINARY.API_KEY,
    api_secret: env.CLOUDINARY.API_SECRET
})

const uploadOnCloudinary = async (imageBuffer: Buffer): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            resource_type: "auto"
        }, (err, result) => {
            if (err) return reject(err);
            resolve(result!);
        })
        streamifier.createReadStream(imageBuffer).pipe(uploadStream);
    });
}

const deleteOnCloudinary = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId)
        console.log("Image Deleted From Cloudinary With Public ID:", publicId);
    } catch (err) {
        throw new ApiError(500, "Failed to delete on cloudinary")
    }
}

const thumbnailForProduct = async (publicId: string) => {
    try {
        const response = cloudinary.url(publicId, {
            crop: "thumb",
            dpr: "auto"
        })
        console.log("Thumbnail Generated", response);
        return response
    } catch (error) {
        throw new ApiError(500, "Failed to get thumbnail")
    }
}

export {
    uploadOnCloudinary,
    deleteOnCloudinary,
    thumbnailForProduct
}