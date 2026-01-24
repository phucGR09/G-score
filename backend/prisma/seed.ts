import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

interface CsvRow {
  sbd: string;
  toan?: string;
  ngu_van?: string;
  ngoai_ngu?: string;
  vat_li?: string;
  hoa_hoc?: string;
  sinh_hoc?: string;
  lich_su?: string;
  dia_li?: string;
  gdcd?: string;
  ma_ngoai_ngu?: string;
}

function parseScore(value: string | undefined): number | null {
  if (!value || value.trim() === '') return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

async function main() {

  const csvPath = path.join(__dirname, '../../dataset/diem_thi_thpt_2024.csv');

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found at: ${csvPath}`);
    return;
  }

  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records: CsvRow[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ',',
  });

  await prisma.student.deleteMany();

  // Insert students in batches
  const batchSize = 1000;
  let inserted = 0;

  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    
    await prisma.student.createMany({
      data: batch.map(record => ({
        sbd: record.sbd,
        fullName: null,
        toan: parseScore(record.toan),
        ngu_van: parseScore(record.ngu_van),
        ngoai_ngu: parseScore(record.ngoai_ngu),
        vat_li: parseScore(record.vat_li),
        hoa_hoc: parseScore(record.hoa_hoc),
        sinh_hoc: parseScore(record.sinh_hoc),
        lich_su: parseScore(record.lich_su),
        dia_li: parseScore(record.dia_li),
        gdcd: parseScore(record.gdcd),
        ma_ngoai_ngu: record.ma_ngoai_ngu || null,
      })),
      skipDuplicates: true,
    });

    inserted += batch.length;
  }

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
