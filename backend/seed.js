const db = require("./app/models");
const bcrypt = require("bcryptjs");

async function seed() {
  await db.speciality.create({
    id: 1,
    name: "Medcin Generale",
  });

  await db.user.create({
    id: 1,
    is: "doctor",
    username: "doctor",
    password: bcrypt.hashSync("123456", 8),
    firstname: "doctor",
    lastname: "doctor",
    dateBirth: new Date(),
    placeBirth: "BBA",
    tel: "035353535",
    civilState: "single",
    mobile: "0500000000",
    isActive: 1,
  });

  // clinic
  const clinic = await db.clinic.create({
    id: 1,
    name: "clinic saada",
    mobile: "0500000000",
    tel: "035353535",
    wilaya: "BBA",
    town: "BBA",
    address: "1 November numero 46"

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
