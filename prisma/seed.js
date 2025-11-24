const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  
  try {
    // Check if we have any troops already
    const existingTroops = await prisma.troops.findMany();
    
    if (existingTroops.length === 0) {
      console.log('No troops found, adding sample data...');
      
      await prisma.troops.createMany({
        data: [
          {
            nama: 'Infantry',
            kekuatan: 50,
            desc: 'Basic ground troops with balanced stats'
          },
          {
            nama: 'Cavalry',
            kekuatan: 75,
            desc: 'Mounted soldiers with high mobility and charge damage'
          },
          {
            nama: 'Archers',
            kekuatan: 60,
            desc: 'Ranged units effective against infantry'
          },
          {
            nama: 'Siege Weapons',
            kekuatan: 90,
            desc: 'Heavy weapons for destroying fortifications'
          },
          {
            nama: 'Elite Guard',
            kekuatan: 85,
            desc: 'Highly trained professional soldiers'
          }
        ]
      });
      
      console.log('Sample troops data has been added successfully!');
    } else {
      console.log(`Database already contains ${existingTroops.length} troops`);
    }
    
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });