import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { afterEach, describe, expect, it } from 'vitest';
import { AppModule } from '@/app.module.js';
import { CsvParserService } from '@/shared/csv-parser/csv-parser.service.js';

describe('ProducerController', () => {
  let app: INestApplication;

  async function setupTestAppWithCsvContent(
    csvContent: string,
  ): Promise<INestApplication> {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0] ? lines[0].split(';').map((h) => h.trim()) : [];

    const mockChunks = lines.slice(1).map((line) => {
      const values = line.split(';');
      return headers.reduce<Record<string, string>>((acc, header, index) => {
        acc[header] = values[index]?.trim() || '';
        return acc;
      }, {});
    });

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CsvParserService)
      .useValue({
        parseFile: async (
          filePath: string,
          onRead: (chunk: any) => Promise<void>,
        ): Promise<void> => {
          for (const chunk of mockChunks) {
            await onRead(chunk);
          }
          return;
        },
        splitLine: (rawLine: string): string[] => {
          if (!rawLine) return [];
          const filtered = rawLine
            .split(/,| and /gi)
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
          return Array.from(new Set(filtered));
        },
      })
      .compile();

    const testApp = moduleRef.createNestApplication();
    await testApp.init();
    return testApp;
  }

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('Teste com dados padrões', () => {
    it('deve respeitar a estrutura do contrato da API e validar as tipagens', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleRef.createNestApplication();
      await app.init();

      const response = await request(app.getHttpServer())
        .get('/producers/awards-interval')
        .expect(200);

      expect(Array.isArray(response.body.min)).toBe(true);
      expect(Array.isArray(response.body.max)).toBe(true);

      const allRecords = [...response.body.min, ...response.body.max];
      allRecords.forEach((record) => {
        expect(typeof record.producer).toBe('string');
        expect(typeof record.interval).toBe('number');
        expect(typeof record.previousWin).toBe('number');
        expect(typeof record.followingWin).toBe('number');
        expect(record.followingWin - record.previousWin).toBe(record.interval);
      });
    });
  });

  describe('Testes com dados mockados', () => {
    it('deve calcular múltiplos intervalos para um mesmo produtor com 3 ou mais vitórias', async () => {
      const mockMultipleWinsCsv = [
        'year;title;studios;producers;winner',
        '1980;Movie 1;Studio A;Producer A;yes',
        '1981;Movie 2;Studio B;Producer A;yes',
        '2000;Movie 3;Studio C;Producer A;yes',
      ].join('\n');

      app = await setupTestAppWithCsvContent(mockMultipleWinsCsv);

      const response = await request(app.getHttpServer())
        .get('/producers/awards-interval')
        .expect(200);

      expect(response.body.min).toEqual([
        {
          producer: 'Producer A',
          interval: 1,
          previousWin: 1980,
          followingWin: 1981,
        },
      ]);

      expect(response.body.max).toEqual([
        {
          producer: 'Producer A',
          interval: 19,
          previousWin: 1981,
          followingWin: 2000,
        },
      ]);
    });

    it('deve calcular corretamente os intervalos quando os anos no CSV estiverem fora de ordem', async () => {
      const unorderedCsv = [
        'year;title;studios;producers;winner',
        '2015;Movie 2;Studio B;Producer C;yes',
        '2005;Movie 1;Studio A;Producer C;yes',
      ].join('\n');

      app = await setupTestAppWithCsvContent(unorderedCsv);

      const response = await request(app.getHttpServer())
        .get('/producers/awards-interval')
        .expect(200);

      expect(response.body.min).toEqual([
        {
          producer: 'Producer C',
          interval: 10,
          previousWin: 2005,
          followingWin: 2015,
        },
      ]);
    });

    it('deve retornar múltiplos produtores nos arrays "min" e "max" quando houver empates de intervalo', async () => {
      const mockCsvWithTies = [
        'year;title;studios;producers;winner',
        '1980;Movie 1;Studio A;Producer A;yes',
        '1981;Movie 2;Studio B;Producer A;yes',
        '1990;Movie 3;Studio C;Producer B;yes',
        '1991;Movie 4;Studio D;Producer B;yes',
        '2000;Movie 5;Studio E;Producer C;yes',
        '2020;Movie 6;Studio F;Producer C;yes',
        '2001;Movie 7;Studio G;Producer D;yes',
        '2021;Movie 8;Studio H;Producer D;yes',
      ].join('\n');

      app = await setupTestAppWithCsvContent(mockCsvWithTies);

      const response = await request(app.getHttpServer())
        .get('/producers/awards-interval')
        .expect(200);

      expect(response.body.min).toHaveLength(2);
      expect(response.body.min).toEqual(
        expect.arrayContaining([
          {
            producer: 'Producer A',
            interval: 1,
            previousWin: 1980,
            followingWin: 1981,
          },
          {
            producer: 'Producer B',
            interval: 1,
            previousWin: 1990,
            followingWin: 1991,
          },
        ]),
      );

      expect(response.body.max).toHaveLength(2);
      expect(response.body.max).toEqual(
        expect.arrayContaining([
          {
            producer: 'Producer C',
            interval: 20,
            previousWin: 2000,
            followingWin: 2020,
          },
          {
            producer: 'Producer D',
            interval: 20,
            previousWin: 2001,
            followingWin: 2021,
          },
        ]),
      );
    });

    it('deve realizar o parse correto de múltiplos produtores listados na mesma célula separados por vírgula e "and"', async () => {
      const mockMultipleProducersCsv = [
        'year;title;studios;producers;winner',
        '1995;Movie 1;Studio A;Producer 1, Producer 2 and Producer 3;yes',
        '1996;Movie 2;Studio B;Producer 1 and Producer 2;yes',
      ].join('\n');

      app = await setupTestAppWithCsvContent(mockMultipleProducersCsv);

      const response = await request(app.getHttpServer())
        .get('/producers/awards-interval')
        .expect(200);

      expect(response.body.min).toHaveLength(2);
      expect(response.body.min).toEqual(
        expect.arrayContaining([
          {
            producer: 'Producer 1',
            interval: 1,
            previousWin: 1995,
            followingWin: 1996,
          },
          {
            producer: 'Producer 2',
            interval: 1,
            previousWin: 1995,
            followingWin: 1996,
          },
        ]),
      );
    });
  });

  describe('Tratamento de dados incompletos e/ou não normalizados', () => {
    it('deve aceitar variações de caixa e espaços no campo "winner"', async () => {
      const csvWinnerVariations = [
        'year;title;studios;producers;winner',
        '1990;Movie 1;Studio A        ;Producer Test    ;YES      ',
        '1992        ;Movie 2      ;Studio B;Producer Test; yes ',
      ].join('\n');

      app = await setupTestAppWithCsvContent(csvWinnerVariations);

      const response = await request(app.getHttpServer())
        .get('/producers/awards-interval')
        .expect(200);

      expect(response.body.min).toEqual([
        {
          producer: 'Producer Test',
          interval: 2,
          previousWin: 1990,
          followingWin: 1992,
        },
      ]);
    });

    it('deve retornar listas vazias quando o arquivo CSV contiver apenas o cabeçalho', async () => {
      const emptyCsv = 'year;title;studios;producers;winner\n';

      app = await setupTestAppWithCsvContent(emptyCsv);

      const response = await request(app.getHttpServer())
        .get('/producers/awards-interval')
        .expect(200);

      expect(response.body.min).toEqual([]);
      expect(response.body.max).toEqual([]);
    });

    it('deve desconsiderar filmes onde o indicador de vitória não seja estritamente "yes"', async () => {
      const csvWithoutWinners = [
        'year;title;studios;producers;winner',
        '1980;Movie 1;Studio A;Producer A;no',
        '1981;Movie 2;Studio B;Producer A;no',
        '1990;Movie 3;Studio C;Producer B;',
      ].join('\n');

      app = await setupTestAppWithCsvContent(csvWithoutWinners);

      const response = await request(app.getHttpServer())
        .get('/producers/awards-interval')
        .expect(200);

      expect(response.body.min).toEqual([]);
      expect(response.body.max).toEqual([]);
    });

    it('deve ignorar produtores que possuem apenas 1 vitória acumulada na história', async () => {
      const csvSingleWins = [
        'year;title;studios;producers;winner',
        '1980;Movie 1;Studio A;Producer Solo 1;yes',
        '1985;Movie 2;Studio B;Producer Solo 2;yes',
      ].join('\n');

      app = await setupTestAppWithCsvContent(csvSingleWins);

      const response = await request(app.getHttpServer())
        .get('/producers/awards-interval')
        .expect(200);

      expect(response.body.min).toEqual([]);
      expect(response.body.max).toEqual([]);
    });

    it('deve ignorar registros contendo anos inválidos ou colunas essenciais nulas', async () => {
      const malformedCsv = [
        'year;title;studios;producers;winner',
        'INVALID_YEAR;Movie 1;Studio A;Producer Broken;yes',
        '1980;;Studio B;Producer Broken;yes',
        ';Movie 3;;;yes',
      ].join('\n');

      app = await setupTestAppWithCsvContent(malformedCsv);

      const response = await request(app.getHttpServer())
        .get('/producers/awards-interval')
        .expect(200);

      expect(response.body.min).toEqual([]);
      expect(response.body.max).toEqual([]);
    });
  });
});
