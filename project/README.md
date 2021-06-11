# CGRA 2020/2021

## Group T07G06

Ana Beatriz Melo Aguiar - up201906230
Tiago Caldas da Silva - up201906045

## Project Notes

Underseas WebGL scene built using WebCGF that contains:
- Ocean environment 
    - SeaFloor
    - Surrounding waters
    - Ocean top(Pier) with water movement 
- Main fish, animated and controlled with the following commands
    - ``W`` -  move forward and increase horizontal speed
    - ``S`` -  decrease horizontal speed
    - ``D`` -  turn right
    - ``A`` -  turn left
    - ``L`` -  move upwards
    - ``P`` -  move downwards
    - ``C`` -  pick a rock, if sufficiently closer to a rock
            -  drop a rock, if sufficiently near nest
    - ``R`` -  reset the fish and rocks to its initial position 
    - ``T`` -  throw rock, from the upper position to the nest,  using       Hermite curves
    - Change texture in interface
- Set of animated fishes, with random textures
- Set of random displayed rocks
- Set of wooden pillars


Being generalitty and efficiency a main goal, it was decided by the group to create a Class [Utils](Utils.js) that incorporates the most commonly used functions:
- Class [Utils](Utils.js)
    - Distance calculations
    - Random generators
        - for e.g. in the [RandomFishSet.js](RandomFishSet.js), random functions are used to calculate the rotation period, number of fish, textures and colors.
    - Geometric transformations (e.g: [Translate()](Utils.js#L2))
        - transformations are essential and used in every displayed class object. This class was a successfull attempt to simplify and beautify our code, instead of creating random matrixes for every minimal transformation, Utils is used.




## Screenshots

### 1 - MyFish

![1.1](Screenshots/proj-t07g06-1.1.png)
![1.2](Screenshots/proj-t07g06-1.2.jpg)


### 2 - MySeaFloor
![2](Screenshots/proj-t07g06-2.png)

### 3 - MyPier
![3.1](Screenshots/proj-t07g06-3.1.png)
![3.2](Screenshots/proj-t07g06-3.2.png)


### 4 - MyRock
![4](Screenshots/proj-t07g06-4.png)


### 5 - MyPillar
![5.1](Screenshots/proj-t07g06-5.1.png)
![5.2](Screenshots/proj-t07g06-5.2.png)

### 6 - Overview
![6](Screenshots/proj-t07g06-6.png)


### 7 - Dropping Rocks
![7](Screenshots/proj-t07g06-7.png)

### 7 - Additional Features

![8.1](Screenshots/proj-t07g06-8.1.png)
![8.2](Screenshots/proj-t07g06-8.2.png)
![8.3](Screenshots/proj-t07g06-8.3.png)





