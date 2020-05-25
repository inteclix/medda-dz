const db = require("./app/models")
const bcrypt = require("bcryptjs");

async function seed() {
  await db.speciality.create({
    id: 1,
    name: "generale",
  });

  await db.user.create({
    id: 1,
    is: "doctor",
    permissions: "['clinic', 'doctor']",
    username: "doctor",
    password: bcrypt.hashSync("123456", 8),
    mobile: "0500000000",
    isActive: 1
  });

  // clinic
  const clinic = await db.clinic.create({
    id: 1,
    name: "clinic saada",
  });

  await db.doctor.create({
    id: 1,
    userId: 1,
    clinicId: 1,
    specialityId: 1,
    isAdmin: 1,
  });

}

seed()