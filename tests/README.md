# Browser regression tests

These optional development tests are separate from the application dependencies.

Start the frontend on port 5173, then:
```sh
npm ci
npx playwright install chromium --with-deps
npm test
```

To test another running instance:
```sh
BASE_URL=https://your-preview-host npm test
```

Covers desktop/tablet/mobile layouts, scroll-linked scenes, project filters, accordion/process interactions, mobile menu, all five video players, contact validation, search, all six detail routes, missing projects and reduced-motion behavior. Tests don't submit data to a backend or contact external services.
