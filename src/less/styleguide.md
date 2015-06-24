#A kss-node template

StyleSide is a template used with the KSS-NODE module, specifically for use within ThoughtWorks UI community. This allows us to create style guides for HTML components and modules using the node development environment without depending on `gem` packages like `hologram`.

##kss-node

`kss-node` is a node module that is built on top of the `KSS` implementation for generating style guides based on special comment blocks in `CSS`,`LESS` or `SASS` files.

###Here's an example KSS comment:
```css
// Button
//
// Your standard button suitable for clicking.
//
// :hover   - Highlights when hovering.
// .shiny   - Do not press this big, shiny, red button.
//
// Markup: button.html
//
// Style guide: components.button
.button {
  ...
}
.button.shiny {
  ...
}
```

Click [here](http://warpspire.com/kss/syntax/) for more information on KSS comment syntax.

###Intallation

`kss-node` is installed just like any other node module.

```bsh
npm install --save-dev kss
```

In case you do not have a verions of `kss-node` installed globally via the `-g` flag, you can access the command line tools via the node_modules `.bin` folder
```bsh
./node_modules/.bin/kss-node [options]
```
Click [here](https://github.com/kss-node/kss-node) for more information on `kss-node`.

__NOTE__ `kss-node` [quickstart quide](https://github.com/kss-node/kss-node/wiki/Quick-Start-Guide) will give you more information about how to work with kss-node.

###Using the StyleSide template

Once you are familiar with KSS, using the StyleSide template with `kss-node` is pretty straight forward as you will see below.

1. Download the [tw-styleguide](https://github.com/nisheedj/tw-styleguide/archive/master.zip)  file and copy the "template" folder into your working directory.

2. Run `kss-node` command with `--template` option, like below.

*For local kss-node CLI*
```bsh
./node_modules/.bin/kss-node --source path/to/css --destination path/to/styleguide/folder --template path/to/styleside/folder
```

*For global kss-node CLI*
```bsh
kss-node --source path/to/css --destination path/to/styleguide/folder --template path/to/styleside/folder
```

>Simplicity is the final achievement. After one has played a vast quantity of notes and more notes, it is simplicity that emerges as the crowning reward of art.

> - Frederic Chopin