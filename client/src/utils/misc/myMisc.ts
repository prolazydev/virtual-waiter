export default () => {
    const shouldUseWhiteText =  (image: string) => {
        if (!image) return false;
        return new Promise((res, rej) => {
            const img = new Image();
            img.src = image;

            img.onload = () => {
                // Create a canvas element
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d')!;
    
                // Set canvas dimensions to the image's dimensions
                canvas.width = img.width;
                canvas.height = img.height;
    
                // Draw the image onto the canvas
                context.drawImage(img, 0, 0, img.width, img.height);
                // Get the pixel data from the canvas
                const imageData = context.getImageData(0, 0, img.width, img.height);
                const data = imageData.data;
    
                let totalLuminance = 0;
                const pixelCount = img.width * img.height;
    
                // Loop through each pixel and calculate the average luminance
                for (let i = 0; i < data.length; i += 4) {
                    // Extract RGB values
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
    
                    // Calculate luminance using the Rec. 709 formula
                    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                    totalLuminance += luminance;
                }
    
                // Calculate the average luminance
                const avgLuminance = totalLuminance / pixelCount;
                const isDark = avgLuminance < 128;
                // Return true for white text (dark background), false for black text (light background)
                res(isDark);
            }
        });
    }

    return {
        shouldUseWhiteText,
    }
}