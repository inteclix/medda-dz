const db = require("../app/models");

async function seed() {
  await db.clinic.sync().then(() => {
    db.clinic.create({
      id: 1,
      name: "clinic saada",
      mobile: "0500000000",
      tel: "035353535",
      wilaya: "BBA",
      town: "BBA",
      address: "1 November numero 46",
      codePostalId: 1,
    });
  });

  await db.doctor.create({
    id: 1,
    userId: 1,
    clinicId: 1,
    specialityId: 1,
    isAdmin: 1,
  });
}

seed();
