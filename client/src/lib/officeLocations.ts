export type OfficeLocation = {
  label: string;
  lines: string[];
};

export const officeLocations: OfficeLocation[] = [
  {
    label: "New Delhi Office",
    lines: [
      "C-104, Third Floor, Lajpat Nagar Part - I",
      "Opposite Defence Colony Flyover, New Delhi - 110024",
    ],
  },
  {
    label: "Noida Office",
    lines: ["Tower 1-1702, Aceparkway, Sector 150, Noida - 201306"],
  },
  {
    label: "Chandigarh Office",
    lines: ["Sector 18-D, Chandigarh"],
  },
];
