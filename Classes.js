/*WHAT ARE CONSTRUCTOR FUNCTIONS 

the application below is for a school to help manage their students. for each student, want to keep track of the student's id, name, 
and subjects they are taking. i want to dynamically add subjects to the subjects array. the school currently has 1 student and i have
expressed all of this data using an object with properties. the app will allow students to add subjects to the list of subjects they are 
currently taking. this can be accomplished with the addSubject method(). using the student1 object, call addSubject and pass in a string
'Math' for the class. the addSubject method() will:
    1. take the previous array of subjects and spread them into a new array
    2. add the 'Math' subject at end of array
    3. update the subjects property 
        
this approach works when managing a handful of students. but if a school has 1k students, i would have to manually add the addSubject() 
method to all of the student objects, as well as writing out the properties id, name and subjects for 1k students. this will be labor 
intensive  thus not the most efficient solution. 
*/
const student1 = {
    id: 1,
    name: "Reed",
    subjects: [],
    addSubject(subject) {
      this.subjects = [...this.subjects, subject]  //destructuring and spread operator takes previous array and add new subject to end of array
    }
  }
  student1.addSubject('Math') 
  console.log(student1.subjects)  //returns new array with subject Math in it. ["Math"]

/*
the constructor function is a better solution. constructor function allows me to construct objects on demand and share methods 
among the newly created objects.

convention for creating constructor functions is to begin name of function with capital letter. capital letter indicates that function 
is just not a normal function but one used to create objects. in addition, the constructor function represents the data/object it makes.

use the 'this' keyword to model the student data thats going to be on each student object. 'this' is going to represent the object thats 
going to be created by the constructor function. within the function body, i can directly set whatever properties i want to be on the 
created object using 'this'. based on the student1 object, the properties are going to be id, name and subjects. i will get each of these
values by passing them into the function as parameters (id, name, subjects). to put each of these values on 'this', create instance 
properties by saying 'this.id = id', 'this.name = name', 'this.subjects = subjects'. i am not returning the values, just putting the 
variables on the object i want to make represented by 'this'. 

with 'new',  the object instance represented by 'this' is implicitly returned from the function. its like i added at the very end of 
constructor function 'return this'

to create a student, i need to call the constructor function. to call the constructor function, need to use 'new' keyword along with 
arguments which are id, name, and subjects array: new Student(1, 'Reed', []). but setting array as default parameter in constructor 
function (= []). only need to provide 1st 2 arguments when calling constructor function:  revised to new Student(1, 'Reed'). 

this process instantiates or creates a new instance or object of Student using the constructor function of the same name. 
instantiate means to provide an instance of.  */

//constructor function
function Student(id, name, subjects = []) {//adding default parameter for the 3rd parameter which is an array
    this.id = id   // 'this' models/represents properties that will be on the new object.  
    this.name = name   //creates instance property by putting the parameter value name on this.name
    this.subjects = subjects  //creates instance property by putting the parameter value subjects on this.subjects
  }
  console.log(new Student(1, 'Reed'))  //adding new student. using new to call constructor function and passing arguments. returns Student
  //console.log(Student(1, 'Reed'))  /*code not needed. just checking the effect of keyword new. returns undefined because its the default behavior when not explicity returning something from function  */

/*
the constructor function also gives me the ability to share functionality thru a special property called the prototype. functions are just 
special javascript objects. as a result, functions can have properties just like any other javascript object type. to add the addSubject()
method to the new student, add a function with the same name to the prototype. to select prototype property off of it, chain on new 
function. in this example, giving new function name 'addSubject'  which creates addSubject as a property on the prototype: 
    Student.prototype.addSubject 
then write as a function expression by setting equal to a function declaration declared with function keyword. do not use arrow function:
    Student.prototype.addSubject = function() {}

arrow functions do not get access to 'this' in the current context but go a level up. therefore arrow functions would not refer to the 
object created by the constructor function but instead refers to the parent context. 

to complete rewriting addSubject, i know the method takes a subject string, so need to provide the string as a parameter. and also include
in the function body the previous array spread in with the subject added to the end of the new array: 
    this.subjects = [...this.subjects, subject]  

    Student.prototype.addSubject = function(subject) {
        this.subjects = [...this.subjects, subject]    }

now that i have added the addSubject method to the prototype what will happen?  once the function constructor prototype has been updated,
immediately, all of the created objects that i've made via new Student(1, 'Reed') will have access to the addSubject method directly on
them. 

if i put the results of the new object (new Student(1, 'Reed')) in a variable called student1, (const student1 = new Student(1, 'Reed'))
i can now take student1 and call addSubject on it (student1.addSubject('Math')). this will add Math to the new array for the new student.
to add another student, use constructor function and provide parameters of id and name:
     const student2 = new Student(2, 'Doug')   

to reiterate, the prototype property immediately passes properties or methods to all of the objects that were created by the 
constructor function. */

//constructor function
function Student(id, name, subjects = []) {{ //adding default parameter for the 3rd parameter which is an array 
    this.id = id                             //'this' models/represents properties that will be on the new object. 
    this.name = name                         //creates instance property by putting the parameter value name on this.name
    this.subjects = subjects                //creates instance property by putting the parameter value subjects on this.subjects
  }}
  
  /*sharing functionality via prototype property. adding addSubject as a property on the prototype. writing as a function expression by 
  setting equal to a function declaration declared with function keyword. providing subject as a parameter because addSubject() requires
  a parameter. in function body spread in previous array with the subject added to the end of the new array  */
  Student.prototype.addSubject = function(subject) {
    this.subjects = [...this.subjects, subject]    
  }
  
  //using new to call constructor function and pass arguments.
  const student1 = new Student(1, 'Reed')   //creating object for new student with id=1 and name=Reed and assigning to variable student1. 
  const student2 = new Student(2, 'Doug')   //creating object for new student with id=2 and name=Doug and assigning to variable student2.
  
  student1.addSubject('Math') 
  console.log(student1.subjects)  //returns ["Math"]
  student2.addSubject('Physics') 
  console.log(student2.subjects)  //returns ["Physics"]

/* CHALLENGE
1. create a new constructor function, Book, which logs books in the school library (id, title, author, themes[]), 
2. Add ids, titles and authors for your two favourite books. 
3. Use the prototype keyword to add a theme property to the  books. 
4. Add at least one theme to each of your books. 
*/

//creating constructor function:
function Book(id, title, author, themes = []) {
    this.id = id,
    this.title = title, 
    this.author = author, 
    this.themes = themes
}

//using prototype to add theme property to books
Book.prototype.addTheme = function(theme){
    this.themes = [...this.themes, theme] //spreading in current array for themes and adding theme to end of array}
}

//add id, titles, authors 
const fav1 = new Book(1, 'D3 Advanced Topics', 'Meeks')
const fav2 = new Book(2, 'Kindred', 'Octavia Bulter')

console.log(fav1)  //returns Book { id: 1, title: 'D3 Advanced Topics', author: 'Meeks', themes: [] } 
console.log(fav2) //returns Book { id: 2, title: 'Kindred', author: 'Octavia Bulter', themes: [] }  
console.log(fav1.author) //returns Meeks
console.log(fav2.title)  //returns Kindred
console.log(fav1.themes, fav2.themes) //returning [] [], did not pass parameter for theme at this time
fav1.addTheme('Programming') //sharing functionality via prototype, adding theme for fav1 
fav2.addTheme('Sci-Fi')
console.log(fav1.themes, fav2.themes)//returns [ 'Programming' ] [ 'Sci-Fi' ] 
console.log(fav1) //returns Book { id: 1, title: 'D3 Advanced Topics', author: 'Meeks', themes: ['Programming' ] } 
console.log(fav2) //returns Book { id: 2, title: 'Kindred', author: 'Octavia Bulter', themes: ['Sci-Fi'] }

//Another solution. 
function Book(id, title, author, themes = []) {
	this.id = id 
	this.title = title 
	this.author = author 
	this.themes = themes 
}
Book.prototype.addTheme = function(newTheme) {
	this.themes = [...this.themes, newTheme] 
}
const book1 = new Book(1, "Lord of the Rings", "JRR Tolkien") 
const book2 = new Book(2, "The Trial", "Franz Kafka") 
book1.addTheme("Fantasy") 
book2.addTheme("Corruption") 
console.log(book1.themes) 
console.log(book2.themes) 

/*UNDERSTAND THE PROTOTYPE CHAIN

the prototype property on construction functions enable me to immediately pass methods to all objects that were created by it. 
with the challenge above, added a function to the constructor function's prototype that made an object and immediately added a method
to all of the instantiated objects. this process is called prototypical inheritance. 

prototypical inheritance: each of the created objects from a constructor function inherits from its constructors prototype. 
a more concise way to explain: each instantiated object (from constructor function) inherits from prototype. 
every object has this prototype property.  

make sure to not modify the original Object() prototype. doing so will effectively change the language itself and will have untold
consequences on the operations of my program. instead of changing Object(), make a constructor function to instantiate a new object 
and add functionality to newly created object. all methods and properties comes from Object()*/

console.log(Object.getPrototypeOf({}))  //returns {}

//after getting prototype, can chain on property constructor. this tells me what the constructor function was for the created object.  
console.log(Object.getPrototypeOf({}).constructor)  // returns Object()

//if i use Object() as a constructor function, it returns an object {}
console.log(new Object())  //returns {}

/*to look at the prototype of one of the students i created (student1), its constructor function is Student:
    Student(id, name, subjects = [])

considering the nature of objects as reference types, can understand why this happens. by way of prototypical inheritance, objects refer 
to their constructor functions prototype and therefore can access any of its methods. this is why i was able to add a method to the 
prototype for the Student object, example = Student.prototype.addStudent = (). as a result, methods will be immediately available 
to any instantiated object. 

prototypes form a chain leading back to the original object  which gives all of the objects methods. this can be seen visually using an 
alternate way of accessing the objects prototype. this alternate way is the dunder prototype property  shortened to the 'dunder proto' 
or __proto__.  */

function Student(id, name, subjects = []) {
    this.id = id 
    this.name = name 
    this.subjects = subjects 
  }
  const student1 = new Student(1, 'Reed') 
  console.log(Object.getPrototypeOf(student1).constructor)   //returns Student(id, name, subjects = [])

//using 'dunder proto' to show the immediate prototype student1 is pointing to
console.log(student1.__proto__)  //returns Student  which is the Student function constructor

//confirm its pointing to the Student prototype by making following comparison. 
console.log(student1.__proto__ === Student.prototype)  //returns true

/*to see that prototypes perform a chain, can add another 'dunder proto' after the student prototype. this = the original Object prototype. 
Object.prototype forms the end of the chain  since all of the objects methods and properties come from it. 
*/
console.log(student1.__proto__.__proto__ === Object.prototype)  //returns true.

//to get the prototype of Object.prototype, chain on another 'dunder proto'. 
console.log(student1.__proto__.__proto__.__proto__)  //returns null


/*EASY PROTOTYPICAL INHERITANCE WITH CLASSES 

many javascript developers do not understand classes because they do not understand the prototype chain and how it works. 

classes and construction functions operate in the same way. classes are just a cleaner way to work with the construction 
functions and the prototype. 

console.log(typeof class Student {}) //classes are function. returns function

to declare a class us the 'class' keyword and uses the same naming convention as constructors where the 1st letter should be capitalized.
like a constructor function, it has a body of curly braces {}. unlike a constructor function, it does not have parenthesis () for 
parameters. classes and functions are not different. classes are functions. the purpose of classes are the same as constructor functions
which is to share create objects with shared behavior or methods.  

with constructor functions, i declare methods on the prototype property such as Student.prototype.method. with classes, i write the
methods that i want to add to each instantiated object directly on the class body (within the function body {}) using the same syntax
used for objects. to create properties, use a special method called the constructor. the constructor method should always be the 1st i
declare in my class if i need to create any properties:  
    
class Student {
  constructor() {}    -> method to create properties 
    
  addSubject() {}     -> methods for each instantiated object 
}

to create a new student, call the class/instantiate the class as did with the constructor function using 'new' keyword.

instantiating classes come with improvements over constructors. 1st is i will get an error if i do not use the keyword 'new' when 
instantiating or calling the function. this will result in a type error: 
there are also no commas after methods, as used when working with an object literal. class methods are not properties unlike object methods, 
so commas are not needed. 

any methods included in the class body are not going to be immediate properties of the class. will not be able to say Student.addSubject.
the methods will be declared and available on the prototype: Student.prototype.addSubject. 

once i have an instance of the class, an instantiated object, i can access anything off of it using the dot syntax. this includes the 
properties made in the constructor, the instance properties such as 'this.id = id'. as well as any methods declared in the body:  
    student1.id

all data on javascript classes are public. some languages provides option to mark public or private. 

also have full access to the 'this' context in the methods on the class body if i call them directly on an instance of a class. */

class Student {} //classes are written w/o parameters 

class Student {
    constructor(id, name, subjects = []) {
      this.id = id     //use 'this' to create instance properties of the same parameter names.
      this.name = name 
      this.subjects = subjects       
    }   
      
    addSubject() {}  
  }
  const student1 = new Student(1, 'Reed')  //calling function/passing arguments to the constructor. creates an instantiated student. 
  console.log(student1)  //returns Student. 
  //const student1 = Student(1, 'Reed')  //did not use 'new'. will result in TypeError: Class constructor Student cannot be invoked without 'new' 
 console.log(Student.addSubject) //returns null. addSubject is not an immediate property of the class. this is undefined. 
 console.log(Student.prototype.addSubject) //returns ƒ(), a function. instantiated methods are declared/available on prototype. 

//once i have an instance of the class, an instantiated object, i can access anything off of it using the dot syntax.
console.log(student1.id)  //accessing instance properties. returns 1
console.log(student1.addSubject())  //accessing method. returns null because currently method is not doing anything. 

/*have full access to the 'this' context in the methods on the class body if i call them directly on an instance of a class. 
for example, method getStudentName returns the text Student: and the interpolated (means to insert) student name from this.name
using student1, call getStudentName to get the appropriate value for the instance property name for that student. 
*/
class Student {
    constructor(id, name, subjects = []) {
      this.id = id 
      this.name = name 
      this.subjects = subjects       
    }  
      
    getStudentName() {
      return `Student: ${this.name}`  
    }
      
    addSubject() {}  
  }
  const student1 = new Student(1, 'Reed') 
  console.log(student1.getStudentName())  //returns Student: Reed


/*Challenge

1. A school's film club wants to store details of the films it has studied so far this year. 
Create a new class to do this. We want to store the following data about each film: id, title, director, releaseYear and genres[].

2. Create two methods on the class: one for adding multiple genres to the films - addGenre(genre) 
and one to get the title of the film - getFilmTitle().

3. Instantiate a new instance of the class using data from your favourite film. 
Add at least 1 genre to your film using addGenre(), and get the title using getFilmTitle()
*/

//creating class and methods
class Film {
    constructor(id, title, director, releaseYear, genres=[]){  //pass data when constructing new instances of Film class
        this.id = id     //ensures arguments passed to class when instantiating new classes are available using 'this' keyword
        this.title = title
        this.director = director
        this.releaseYear = releaseYear
        this.genres = genres
    }

    addGenre(genre) {  //creating method. method accepts parameter and is updating the this.genres array.
        this.genres = [...this.genres, genre ]  //using array spread to get current array and adding new genre to end of array
    }

    getFilmTitle() {  //creating method. using a temperal literal to return Title and the interpolated title name from this.title
        return `Title: ${this.title}`
    }
	
}
//instantiating new instance of class/creating an instance
const film1 = new Film(1, 'Days Of Future Past', 'Bryan Singer', 2014)
const film2 = new Film(2, 'Avengers Endgame', 'Joe Russo, Anthony Russo', 2019)

console.log(film1)  //returns Film { id: 1, title: 'Days Of Future Past', director: 'Bryan Singer', releaseYear: 2014, genres: [] } 
console.log(film2) //returns Film { id: 2, title: 'Avengers Endgame', director: 'Joe Russo, Anthony Russo', releaseYear: 2019, genres: [] }  
film2.addGenre('SciFi')
console.log(film2) //returns Film { id: 2, title: 'Avengers Endgame', director: 'Joe Russo, Anthony Russo', releaseYear: 2019, genres: ['SciFi'] }
console.log(film2.genres) // accessing genres property directly. returns [ 'SciFi' ]
console.log(film2.getFilmTitle()) //invoking the getFimTitle() function. returns Title: Avengers Endgame


//Another Solution
class Film {
	constructor(id, title,director, releaseYear, genres = []) {
		this.id = id 
		this.title = title 
		this.director = director 
		this.releaseYear = releaseYear 
		this.genres = genres 
	}
	addGenre(genre) {
		this.genres = [...this.genres, genre] 
	}	
	getFilmTitle() {
		return `Film: ${this.title}`
	}
}
const myFavouriteFilm = new Film(1, "Rear Window", "Afred Hitchcock", "1954") 
console.log(myFavouriteFilm.director) //returns Afred Hitchcock
myFavouriteFilm.addGenre("Thriller") 
console.log(myFavouriteFilm.genres)  //returns ["Thriller"]
console.log(myFavouriteFilm.getFilmTitle())   //returns Film: Rear Window


/*SHARE CLASS FEATURES WITH EXTENDS 

developing an app for home retail store

*/