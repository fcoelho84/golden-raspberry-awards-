import { Injectable } from '@nestjs/common';
import csvParser from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CsvParserService {
  async parseFile<ChunkType = any>(
    filePath: string,
    onRead: (chunk: ChunkType) => Promise<void>,
  ): Promise<void> {
    const csvFilePath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(csvFilePath.trim())) {
      console.warn('CsvParserService: Arquivo não encontrado.');
      return;
    }

    return new Promise((resolve, reject) => {
      const stream = fs
        .createReadStream(csvFilePath, 'utf-8')
        .pipe(csvParser({ separator: ';' }));

      stream.on('data', async (chunk: ChunkType) => {
        try {
          stream.pause();
          await onRead(chunk);
          stream.resume();
        } catch (error) {
          stream.destroy();
          reject(error);
        }
      });

      stream.on('end', () => resolve());
      stream.on('error', (error) => reject(error));
    });
  }

  splitLine(rawLine: string): string[] {
    if (!rawLine) return [];

    const filtered = rawLine
      .split(/,| and /gi)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    return Array.from(new Set(filtered));
  }
}
