import { removeBackgroundFromImageFile } from 'remove.bg';
import { rootPath } from '../utils';
import * as path from 'path'
import fs from 'fs'


const tempDir = path.join(rootPath, 'temp');
const outputFile = path.join(tempDir, "removedBg.png");


if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

export const removeBg = async (path: string) => {
    try {
        const upload = await removeBackgroundFromImageFile({
            path,
            apiKey: '9cUsoKy596SL6X9go6KXtK7x',
            size: "auto",
            type: "auto",
        })

        return Buffer.from(upload.base64img, "base64");

    } catch (error: any) {
        console.log(error);
        return;
    }
}