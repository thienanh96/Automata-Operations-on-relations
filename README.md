# Automata-Operations-on-relations

## Operations on Relations: Implementations
Modeling with Automata , Hanoi University of Science and Technology  
Group 1:
  * Pham Van Tien
  * Nguyen Thien Anh
  * Vu Nhat Anh  
## Introduction
  ```Automata-Operations-on-relations``` is a project written in Javascript , using Nodejs which is a JavaScript runtime. Based on *Chapter 6* of the lecture notes: *Automata theory , an algorithmic approach - Javier Esparza*  released on August 26 , 2017 , this project is constructed, concentrating  on implementing some algorithms of operations on relations. We implemented 5 operations : *PROJECT ( on component 1 ) , PROJECT ( on component 2 ) , JOIN , POST, PRE*. We also implemented the NFA-to-DFA conversion , state minimization ( remove unreachable states , merge equivalent states ) to reduce the number of states.  
  In term of this project, we used examples in that above lecture notes to conveniently help you follow. 
## Installation
1. Download and install [Nodejs](https://nodejs.org/en/).  
2. Download this project and extract the zip file.  
## Usage  
1. The ```.jff``` input files are in ```input``` folder, they are examples so you can replace them by others.  
2. Go into project folder by command line , then type ```npm install xml2js``` to create ```node modules``` folder and download ```xml2js``` library
2. Go into project folder by command line , then type ```node buildxml```
3. The ```.jff``` output files will be created in ```result``` folder , they will be opened automatically with JFlap.  
## About algorithms
### Projection operation  
![GitHub Logo](https://github.com/thienanh96/Automata-Operations-on-relations/blob/master/markdown_images/project.PNG)  
### Join operation
![GitHub Logo](https://github.com/thienanh96/Automata-Operations-on-relations/blob/master/markdown_images/join.PNG)  
### Post operation
We only have to replace lines 7-8 of join's algorithm by this two line to get post's algorithm
![GitHub Logo](https://github.com/thienanh96/Automata-Operations-on-relations/blob/master/markdown_images/post.PNG)  
### Pre operation
We only have to replace lines 7-8 of join's algorithm by this two line to get post's algorithm
![GitHub Logo](https://github.com/thienanh96/Automata-Operations-on-relations/blob/master/markdown_images/pre.PNG)  
### Pad closure function
![GitHub Logo](https://github.com/thienanh96/Automata-Operations-on-relations/blob/master/markdown_images/padclosure.PNG)  
### State minimization  
1. Convert NFA to DFA
First we need to do this to implement the state minimization.  
Refer to this [link](https://www.tutorialspoint.com/automata_theory/ndfa_to_dfa_conversion.htm) for the algorithm.  
2. Remove unreachable states  
First, we need to identify the reachable states
Eventually, we remove the unreachable states  
3. Merge the equivalent states  
![GitHub Logo](https://github.com/thienanh96/Automata-Operations-on-relations/blob/master/markdown_images/lemma.PNG)  
![GitHub Logo](https://github.com/thienanh96/Automata-Operations-on-relations/blob/master/markdown_images/equivalentalgorithm.PNG)  
