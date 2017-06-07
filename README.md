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
