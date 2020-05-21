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

  // type: Sequelize.INTEGER // 0: text, 1: number, 2: date, 3: boolean, 4: list
  await db.health_parameter_category.create({
    id: 1,
    name: "category name"
  })

  await db.health_parameter.create({
    id: 1,
    code: "code text",
    label: "name text",
    type: 0,
    healthParameterCategoryId: 1
  })

  await db.health_parameter.create({
    id: 2,
    code: "code number",
    label: "name number",
    type: 1,
    healthParameterCategoryId: 1
  })

  await db.health_parameter.create({
    id: 3,
    code: "code date",
    label: "name date",
    type: 2,
    healthParameterCategoryId: 1
  })
  await db.health_parameter.create({
    id: 4,
    code: "code boolean",
    label: "name boolean",
    type: 3,
    healthParameterCategoryId: 1
  })

  await db.health_parameter.create({
    id: 5,
    code: "code list",
    label: "name list",
    type: 4,
    healthParameterCategoryId: 1
  })

  await db.health_parameter_option.create({
    name: "option for list",
    healthParameterId: 5
  })

  await db.medicament.create({
    name: "doliprane"
  })
}

seed()