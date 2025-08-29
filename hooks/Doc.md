# hooks

Quick review on Hooks [https://www.w3schools.com/react/react_hooks.asp] - example

- Hooks allow functions to have access to state and other React features without using classes.
- They provide a more direct API to React concepts like props, state, context, refs, and lifecycle.

useState → lets you store and update values inside a component.

useEffect → lets you run side effects (like fetching data or reacting to changes).

--> Custom hooks → your own functions that combine these (and maybe other hooks) to solve a specific problem.

### IN SHORT: allows us to use reusable logic

## useResponsive.ts

Will watch the screen-size and return a "break-point" label based om size (xs,sm,md,lg)

- will help components adjust autmaotically [mobile vs desktop layout]

```bash
const { bp, width } = useResponsive();

 if (bp === "xs") { /_ stack items vertically or Horiz??  _/ }

```

## useTheme.ts

Will provide access to the theme context (dark/light)

- will retun [ACTIVE/CURRENT] theme choose and toggle on/off
- Will pass corresponding design tokens
  - colors/spacing/fonts

```bash
const { theme, colors, toggleTheme } = useThemeContext();
```

## usePlatform.ts

Detect which platform we're on / using - ios or web

- Boolean value (true.false) -> pass function so componenet will appy platform specific styles and behaviors/responsiveness

```bash
const { isIOS, isWeb } = usePlatform();

```
