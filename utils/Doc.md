# Utils / folder

For REfernce:

This folder holds helper functions

- THey don’t belong to a single component, hook, or token file.

Typical files you might put here:

- String helpers
  - formatters: capitalizeFirstLetter, truncateText...
- Number/date helpers: auth utilities, date formatters...

- Cross-platform helpers: small functions that abstract platform differences (like picking iOS vs web defaults)

- shadows: - ios: shadowColor - web: shadowOffset
  keeping the if/then conditionals out of our main code

Rule of thumb: if it’s a small, reusable piece of logic and doesn’t need React state or context -> PLACE IN HERE

I like that

- Need to be aware of repetive small code snippets
- These exampes could be very helpful
- handle logic
