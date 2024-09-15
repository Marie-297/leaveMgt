import { Balances } from "@prisma/client";

export default async function calculateAndUpdateBalances(
  email: string,
  year: string,
  type: string,
  days: number
): Promise<void> {
  const balance = await prisma.balances.findFirst({
    where: {
      email,
      year,
    },
  });

  if (!balance) {
    throw new Error("Balance not found for the specified user and year");
  }

  let balanceUpdate: Partial<Balances> = {};

  switch (type) {
    case "Annual":
      balanceUpdate = {
        annualUsed: (balance.annualUsed as number) + days,
        annualAvailable:
          (balance.annualCredit as number) -
          ((balance.annualUsed as number) + days),
      };
      break;
    case "Casual":
      balanceUpdate = {
        casualUsed: (balance.casualUsed as number) + days,
        casualAvailable:
          (balance.casualCredit as number) -
          ((balance.casualUsed as number) + days),
      };
      break;
    case "Sick":
      balanceUpdate = {
        sickUsed: (balance.sickUsed as number) + days,
        sickAvailable:
          (balance.sickCredit as number) -
          ((balance.sickUsed as number) + days),
      };
      break;
    case "Maternity":
      balanceUpdate = {
        maternityUsed: (balance.maternityUsed as number) + days,
        maternityAvailable:
          (balance.maternityCredit as number) -
          ((balance.maternityUsed as number) + days),
      };
      break;
    case "paternity":
      balanceUpdate = {
        paternityUsed: (balance.paternityUsed as number) + days,
        paternityAvailable:
          (balance.paternityCredit as number) -
          ((balance.paternityUsed as number) + days),
      };
      break;
    case "Study":
      balanceUpdate = {
        studyUsed: (balance.studyUsed as number) + days,
        studyAvailable:
          (balance.studyCredit as number) -
          ((balance.studyUsed as number) + days),
      };
      break;
    case "unpaid":
      balanceUpdate = {
        unpaidUsed: (balance.unpaidUsed as number) + days,
      };
      break;
    default:
      throw new Error(`Unsupported leave type: ${type}`);
  }

  await prisma.balances.update({
    where: { id: balance.id },
    data: balanceUpdate,
  });
}
