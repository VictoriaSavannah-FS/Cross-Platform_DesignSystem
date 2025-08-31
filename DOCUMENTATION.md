# Desing System Documentation

A brief explanation and overview of the design tokens and components applied to this Design System project.

## Button Variants

There are three different Button variants throughout this project.

### Primary

- Useful for important or main action buttons on screens with color-filled background
- Props:
- `variant='primary'`

Example Uses: default action on screen

- Submit
- Save
- Login

Code snippet:

```bash
    <Button variant="primary">Save</Button>
```

### Secondary

- Useful for low-emphasis buttons on screens
- Has neutral surface background
- Props:
- `variant='secondary'`

Example Uses: Support actions and often paired wiht a Primary Action Button

- Edit
- View Details
- Settings
- Cancel

Code snippet:

```bash
    <Button variant="secondary">Edit</Button>
```

### Outline

- Useful for Medium-emphasis action buttons
- Transparent background and colored border
- Props:
- `variant='outline'`

Example Uses: Neutral or Cancel actions - but some visibility

- CAncel
- Back
- Preview

  Code snippet:

```bash
    <Button variant="outline">Cancel</Button>
```

### Ghost

- Text only button wiht transparent background
- Props:
- `variant='ghost'`

Example Uses: very sublte and low-emphasis actions

- toolbar actions
- filters
- links
  - Learn More
  - Dismis
  - Help

```bash
    <Button variant="ghost">Help</Button>
```

## Input Component

Input Component that provides a text field for user input. Adapts styling based on platform.

### Main Props

- label: small optional label above input
- helperText: small hint/messge under fiel
- errorText: shows / triggers red border and error message
- fullWidth: responsive style that stretches input to 100% of contaienr
- rules: fetches the actual validation rules for input
- size: responsive style taht adjusts font/size and padding according to platform

### Example Uses:

- Login forms
- Search bar

### Code Snippet

```bash
    <Input
     label="Email"
     placeholder="Enter your email"
     fullWidth
     helperText="We’ll never share your info"
    />
```

## Card Component

Card Component provides a theme-based surface/container that allows you groupd related content.

### Features

- Three Variants
- responsive padding and layout
- helps group content (forms, lists, previews)

### Main Props

- variants: elevated, outline, flat
- header: Optional Headers / top area
- footer: Optional footer / bottom actiosn
- padded: boolean value - padded or not
- style: can be overrider by the container it may be in

### Variants

- Elevated:elevates card with shadow effect
- Highlights content - pops out

```bash
    <Card variant="elevated">
    <Typography variant="body1">This card has a shadow (iOS).</Typography>
    </Card>
```

- Outline: applies a thin border but card has no elevation
- Forms | lists or areas you need seperation w/out shadow

```bash
        <Card variant="outline" header={<Typography variant="h4">Settings</Typography>} footer={<Button>Save</Button>}>
        <Typography variant="body1">Outlined card with header and footer.</Typography>
        </Card>
```

- Flat:removes card shadow
- minimal andn simple container w/ no extra emphasis

```bash
    <Card variant="flat">
    <Typography variant="body1">Clean surface with no shadow or border.</Typography>
    </Card>
```

## Modal Component

Modal Component will interrupt the current screen with important content. It's the "pop-up" that we sometimes see for promotion, email lists or other content. It adapts by showing a centered dialog on Web/Desktop and as a bottom sheet on iOS.

### Main Props

- `visible`: controls if the modal is open and visible

- `onClose`: function to close the modal
- `title`: optional title displayed at the top for extra info.
- `footer`: optional footer for actions (Cancel, Confirm)
- `fullScreen`: makes modal take up the entire screen (mobile/iOS only)

### Example Uses

- Confirmation dialogs (Are you sure... you want to cancel or save?)
- Form submissions
- Showing additional details when pressed

### Code Snippet

```bash
    <Button onPress={() => setModalVisible(true)}>Open Modal</Button>

    <Modal
    visible={modalVisible}
    onClose={() => setModalVisible(false)}
    title="Confirm Action"
    footer={
        <>
        <Button variant="ghost" onPress={() => setModalVisible(false)}>Cancel</Button>
        <Button onPress={() => console.log("Confirmed!")>Confirm</Button>
        </>

    >
    <Typography variant="body1">
        Are you sure you want to continue?
    </Typography>
    </Modal>
```

## Typography Component

These Typography Component ensure consistency across platforms with various text styles. It uses the design tokens (font size, weights, and line heights) to adapt to each platform screen.

### Variants

- h1: Main headings / Headers
- h2: Section headers
- h3: sub-section/medium size
- h4: small headings / can be used for card titles
- body 1: default body text
- body 2: smaller body text size
- caption: usually small subtle text - helper text
- overline: small uppercase text that sits about headings or sections. Like category or section labels.

### Main Props

Text/Font size Variants:

- `variant`: `"h1" | "h2" | "h3" | "h4" | "body1" | "body2" | "caption" | "overline"`

Color Theme Variants for semantics:

- `color`: `"primary" | "secondary" | "disabled" | "error" | "success"`

Text layout / position variants:

- `align`: `"left" | "center" | "right" | "justify"`

Text weight variants

- `weight`: `"normal" | "medium" | "semibold" | "bold"`

Code Snippet Example:

```bash
    <Typography variant="h1">Main Title</Typography>
    <Typography variant="h2">Section Header</Typography>
    <Typography variant="body1">This is regular body text.</Typography>
    <Typography variant="caption" color="secondary">Helper text here</Typography>
    <Typography variant="overline">CATEGORY</Typography>
```

## Color Tokens

The color tokens help maitain a consistent color palette across all components. The color tokens help adapt automatically for the light and dark themes while keeping brand consistency.

### Main Categories

- Primary: Brand pallete color used for main actions Primary Buttons, highlights.
- Secondary: Neutral text or accent areas, supports the primary color.
- Surface: Backgrounds for Cards, Inputs, and Modals.
- Border: Used for outlines, separators, and subtle dividers.
- Text: Semantic text colors for different states.
- Semantic: Universal meanings like status feedback colors; like success or error.

### Example Tokens

- `theme.colors.primary[500]`: Main brand color (Bellatrix Theme Red)
- `theme.colors.surface`: Card and modal backgrounds
- `theme.colors.border`: Outline and divider lines
- `theme.colors.text.primary`: Default body text
- `theme.colors.text.secondary`: Subtle/secondary text
- `theme.colors.semantic.error`: Error states
- `theme.colors.semantic.success`: Success states

### Example Usage

```bash
    <Button variant="primary" style={{
    # color Token---
    backgroundColor: theme.colors.primary[500] }}>
    Save
    </Button>

    <Card style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
    <Typography variant="body1" color="secondary">
        This is card content with secondary text.
    </Typography>
    </Card>

    <Typography variant="caption" color="error">
    Invalid email address
    </Typography>
```
