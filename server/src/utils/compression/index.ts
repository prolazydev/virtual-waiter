import sharp from 'sharp';

/**
 * Compresses the image to webp format
 * @param buffer 
 * @returns The compressed image buffer
 */
export const compressImageWebp = async (buffer: Buffer, options: sharp.ResizeOptions = {}) => 
	await sharp(buffer).resize(options).webp().toBuffer();