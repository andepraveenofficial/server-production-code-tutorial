# Validation

- Install zod : `npm install zod`
- Install zod types : Zod is written in TypeScript and already includes its type definitions.

```ts zod
import { z } from 'zod';

const User = z.object({
  username: z.string(),
});

User.parse({ username: 'Ludwig' });

// extract the inferred type
type User = z.infer<typeof User>;
// { username: string }
```
