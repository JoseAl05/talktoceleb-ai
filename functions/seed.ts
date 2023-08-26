const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
        data:[
            {name:'Famous People'},
            {name:'Actors and Actresses'},
            {name:'Musicians'},
            {name:'Developers'},
            {name:'Animals'},
            {name:'Scientists'},
            {name:'Games'},
        ]
    })

    console.log('Database seeded!')

  } catch (error) {
    console.log('Error seeding categories', error);
  } finally {
    await db.$disconnect();
  }
}

main();
