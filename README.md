# Packing-Lines

Original idea from [this post](https://www.reddit.com/r/generative/comments/qs1vws/lines_packing_p5js/) by [Estienne](https://www.reddit.com/user/stntoulouse/).

[Packing-Lines.webm](https://github.com/user-attachments/assets/52790d4a-c2cf-484e-93ed-b4d090df3b00)

## Try it out

Hosted version: https://conwayjw97.github.io/Packing-Lines/


Change the parameters in the url to customise the sketch:
- size: [1 - Inf]
    Size of the grid to fill with lines (100 = 100x100 grid)
- speed: [1 - Inf]
    Number of lines to draw per frame
- vectors: [1 - size]
    Number of initial vectors that will explore the grid creating lines
- lineWidth: [1 - Inf]
    Width of rendered lines
- colour1/colour2: [000000 - ffffff] 
    Hexadecimal RGB values of two colours, each vector will be assigned a colour interpolated from between these two
- startAlgo: [rand, circ, diag]
    rand = Vectors start in random positions
    circ = Vectors start along the radius of a circle in the centre of the grid
    diag = Vectors start along diagonals of the grid
- loop: [true, false]
    Toggle animation looping
    

To run locally, clone and run "npm start" from the root directory.
