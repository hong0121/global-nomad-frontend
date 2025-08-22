import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "32",
            "24",
            "20",
            "18",
            "16",
            "14",
            "13",
            "12",
            "11",
            "20-body",
            "18-body",
            "16-body",
            "14-body",
          ],
        },
      ],
    },
  },
});

export default twMerge;
