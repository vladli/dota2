import type { CodegenConfig } from "@graphql-codegen/cli";

const NEXT_PUBLIC_STRATZ_API =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiOGRjNWMwNmUtNjM4NC00MjY0LWJmZGYtNTRkNTVhZjFjODJkIiwiU3RlYW1JZCI6IjU3NTQwODI2IiwibmJmIjoxNzAyOTY5NzYwLCJleHAiOjE3MzQ1MDU3NjAsImlhdCI6MTcwMjk2OTc2MCwiaXNzIjoiaHR0cHM6Ly9hcGkuc3RyYXR6LmNvbSJ9.mwxdk82wozzKNZLiMk0fbwFoWEOXWgOom6jSMSUXCvE";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://api.stratz.com/graphql": {
        headers: {
          Authorization: `Bearer ${NEXT_PUBLIC_STRATZ_API}`,
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
