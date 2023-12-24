import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://api.stratz.com/graphql": {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API}`,
        },
      },
    },
  ],
  documents: ["./src/graphql/*.graphql"],
  generates: {
    "./src/types/types.generated.ts": {
      plugins: ["typescript"],
    },
    "./src/types/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".ts",
        baseTypesPath: "types.generated.ts",
      },
      plugins: ["typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
