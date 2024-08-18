---
name: "Create a new component"
root: "src/"
output: "**/components/"
questions:
  componentName: "Please input the component name."
---

# Variables

- PascalComponentName: `{{ inputs.componentName | pascal }}`
- camelComponentName: `{{ inputs.componentName | camel }}`

# {{ PascalComponentName }}/index.ts

```typescript
export * from "./{{ PascalComponentName }}";
```

# {{ PascalComponentName }}/{{ PascalComponentName }}.tsx

```typescript
import type { FC } from "react";
import { className } from "./{{ PascalComponentName }}.css";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type Props = {};

export const {{ PascalComponentName }}: FC<Props> = () => {
  return <></>;
};

```

# {{ PascalComponentName }}/{{ PascalComponentName }}.css.ts

```typescript
import { style } from "@vanilla-extract/css";

export const className = style({});
```

# {{ PascalComponentName }}/{{ PascalComponentName }}.stories.tsx

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { {{ PascalComponentName }} } from "./{{ PascalComponentName }}";

const meta: Meta<typeof {{ PascalComponentName }}> = {
  component: {{ PascalComponentName }},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof {{ PascalComponentName }}>;

export const Default: Story = {};

```

# {{ PascalComponentName }}/{{ PascalComponentName }}.test.tsx

```typescript
import { render } from "@testing-library/react";
import { {{ PascalComponentName }} } from "./{{ PascalComponentName }}";

describe("{{ PascalComponentName }}", () => {});

```
