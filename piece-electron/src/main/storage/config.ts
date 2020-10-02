import { app } from 'electron';

import * as fs from 'fs';
import * as path from 'path';

export const privateDataPath = path.join(app.getPath('userData'), 'private');
export const keyPieceFolder = 'keyPieces';
export const keyPieceFile = 'keyPiece';

if (!fs.existsSync(privateDataPath)) {
    fs.mkdirSync(privateDataPath);
}

export const autoUpdateInterval = 600000;