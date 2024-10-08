# Packing-Lines

[Packing-Lines.webm](https://github.com/user-attachments/assets/eee5a334-db18-4ced-8821-9789de0c70d6)

Original idea from [this post](https://www.reddit.com/r/generative/comments/qs1vws/lines_packing_p5js/) by [Estienne](https://www.reddit.com/user/stntoulouse/).

## Try it out

Hosted version: https://conwayjw97.github.io/Packing-Lines/


Change the following parameters in the url to customise the sketch:
- size: [1 - Inf]

    Size of the grid to fill with lines (100 = 100x100 grid). N.B. you should adjust speed along with this to smooth out the rendering animation

- speed: [1 - Inf]

    Number of lines to draw per frame

- vectors: [1 - size]

    Number of initial vectors that will explore the grid creating lines

- lineWidth: [1 - Inf]

    Width of rendered lines

- colours: [000000 - ffffff] 
    
    Dash separated list of hexadecimal RGB values of colours, each vector will be assigned a colour interpolated from between these colours

- start: [rand, circ, diag]

    rand = Vectors start in random positions
    
    circ = Vectors start along the radius of a circle in the centre of the grid
    
    diag = Vectors start along diagonals of the grid (this ignores the vectors param)

- fill: [true, false]

    Toggle whether to create cleanup vectors to fill the still empty spaces once all the initial vectors have traversed the grid

- loop: [true, false]

    Toggle animation looping


To run locally, clone and run "npm start" from the root directory.
