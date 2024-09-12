# Packing-Lines

Original idea from [this post](https://www.reddit.com/r/generative/comments/qs1vws/lines_packing_p5js/) by [Estienne](https://www.reddit.com/user/stntoulouse/).

## Try it out

Hosted version: https://conwayjw97.github.io/Packing-Lines/


Change the parameters in the url to customise the sketch:
- size: size of the grid to fill with lines (100 = 100x100 grid)
- speed: animation draw speed
- vectors: number of vectors that will create the lines by traversing the grid
- lineWidth: width of rendered lines
- colour1/colour2: hex values of two colours, each vector will be assigned a colour interpolated from between these two
- startAlgo: vectors start in random positions ("rand") or along the radius of a circle in the centre of the grid ("circ")
- loop: true/false value to toggle animation looping


To run locally, clone and run "npm start" from the root directory.