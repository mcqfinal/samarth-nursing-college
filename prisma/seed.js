const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@samarthnursing.edu.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
      name: 'Samarth Admin',
      role: 'superadmin',
    },
  });

  console.log(`✅ Admin account created: ${admin.email}`);

  // Seed default notices if none exist
  const noticesCount = await prisma.notice.count();
  if (noticesCount === 0) {
    await prisma.notice.createMany({
      data: [
        {
          title: 'Admissions Open for Academic Year 2026-27 (GNM, ANM & ADMLT)',
          content: 'Applications are invited for GNM (3 Years), ANM (2 Years) and ADMLT (1.5 Years) programs. Contact administration for prospectus and document verification.',
          category: 'Admission',
          isActive: true,
        },
        {
          title: 'Hostel & Scholarship Guidance Desk Active',
          content: 'Students eligible for state government scholarships can contact the scholarship guidance desk for free assistance with online portal registration.',
          category: 'Scholarship',
          isActive: true,
        },
      ],
    });
    console.log('✅ Default notices seeded');
  }

  // Seed gallery items if none exist
  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    const galleryItems = Array.from({ length: 11 }, (_, i) => ({
      title: `Campus & Clinical Training Session ${i + 1}`,
      imageUrl: `/gallery/gallery-${i + 1}.jpg`,
      category: 'Clinical Training',
      displayOrder: i + 1,
    }));

    await prisma.galleryItem.createMany({ data: galleryItems });
    console.log('✅ 11 Gallery items registered in database');
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
