# Design System Portfolio Reflection

1. How did you balance design consistency with platform-native conventions?

Creating design tokens established a reusable reference library throughout my development process. This ensured consistency, even across different platforms and components. Defining tokens early streamlined development because I no longer had to decide on headings, colors, or spacing for each component. Having a predefined set of tokens and themes made referencing them seamless throughout the process.

2. What was most challenging about creating platform-adaptive components?

The most challenging part was recognizing how components behaved differently on each platform. Solving a bug or fixing a layout issue on one platform rarely resolved it on the other.

Tracking the interactions between components, utilities, and design tokens was the biggest challenge. Making small adjustments, like adding padding or centering text, was often trickier than expected. Bypassing responsive tokens or component styles could break the platform-adaptive design, so updating specific style properties within tokens or components was necessary for proper rendering on screens like the Modal or the Playground. Besides the Modal, I devoted significant time to refining the Playground page and ensuring layouts rendered correctly on each platform. Simple changes proved more complex than they appeared. Ultimately, understanding the layers and relationships of design elements expanded my skills and made successful real-time rendering rewarding.

3. Which component required the most different platform adaptations and why?

Modal for sure! So far, the Modal has been the most challenging because of the platform context. On mobile, I had to use React Native’s Modal component so it stacked/rendered correctly - that and the navigation bar. I had to look through multiple documents to see examples and wrap my mind around what seemed like an easy UI render.

On web/desktop, I needed a custom overlay for the Modal and container with absolute positioning — I couldn’t just pass a design token. It also required paying attention to smaller details like a semi-transparent overlay, responsive width for the container, and accessibility labels. Once I thought I was done, the real fun began, fine-tuning the layouts of each element within the Modal - Text and buttons - on each platform.

I would also add that just trying to render and display the different components at the same time in the Playground page was a bit of a challenge, platform to platform at first. But once I understood how each element (component, hook, design token) interacted and affected each other, it was easier to edit and troubleshoot platform-specific bugs.

4. What would you change about your approach if you had more time?

I would actually create smaller utility files from my Modal to handle platform-specific logic and platform-specific style separately. It felt a little overwhelming trying to keep track of all the different elements in a single file. It did feel a bit cluttered and harder to organize/manage.

I would also try to implement all the other enhanced features so that this Design System could seem and feel more interactive. I also would love to add a documentation page, which includes / renders visual examples of each Design token and component - like a dictionary or reference for future users- to understand the overall design. I would also try and fine fine-tune some design concepts to create a more cohesive theme and branding once I have more content in the app.
