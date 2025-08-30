# Design System Portfolio Reflection

1. How did you balance design consistency with platform-native conventions?

- Creating design tokens really helped create a kind of “library” I could go back and reference throughout other parts of my dev process.
  roughout other parts of my dev process.

2. What was most challenging about creating platform-adaptive components?

3. Which component required the most different platform adaptations and why?

- Modal for sure! So far, the Modal has been the most challenging because of the platform context. On mobile, I had to use React Native’s Modal component so it stacked/rendered correctly with navigation and the back button (which I still need to troubleshoot). I had to look through multiple docs to see examples and wrap my mind around what seemed like an easy UI render.

- On web/desktop, I needed a custom overlay and container with absolute positioning — I couldn’t just pass a design token. It also required paying attention to smaller details like a semi-transparent overlay, responsive width for the container, and accessibility labels (still need to go back and troubleshoot a few things…).

4. What would you change about your approach if you had more time?

- I would actually create smaller utility files from my Modal to handle platform-specific logic and platform-specific style separately. It felt a little overwhelming trying to keep track of all the different elements in a single file. It did feel a bit cluttered and harder to organize.
