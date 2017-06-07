# WS-Controller
An enterprise visualization solution

## Visualization JSON for the controller
The controller is basically going to be looking for this from each viz:

```
{
	title: "Your Visualization Name",

	// These can be strings if you want to get descriptive, or just int's
	scenes: [],

	// Array of strings is best here to describe what you're looking to do with each click/keypress
	triggers: [],
}
```

Additionally, the server should send a list of all visualizations by name so that the user can select new ones from a list in the menu overlay in the controller

## Using the Controller
There are 2 rows, labeled 'Scenes' and 'Triggers'. Scenes are used for sending messages to the visualization to change to a new scene/view, if applicable. Triggers are more for repeatable, short events, like a disruption to a particle cloud. Row 1 can be clicked as well as triggered with keys <kbd>1</kbd> through <kbd>9</kbd>, and Triggers currently work with clicks or keys <kbd>A</kbd> through <kbd>F</kbd>. Clicking the title in the top left or hitting <kbd>SPACE</kbd> will bring up the menu from which you can select a new visualization.
