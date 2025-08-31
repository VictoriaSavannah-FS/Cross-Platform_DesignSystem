# Desing System Documentation

A brief explanation and overview of the design tokens and components applied to this Design System project.

## Button Variants

There are three different Button variants throght this project.

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

## Card Component

## Color Tokens

## Modal Component

## Typography Token
