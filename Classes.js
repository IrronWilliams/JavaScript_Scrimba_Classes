/*
includes the core feature of classes: 
  1. create class instances
  2. create instance properties with constructor methods
  3. use methods on the class bodies
  4. extend parent classes 



WHAT ARE CONSTRUCTOR FUNCTIONS 

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

once app has been created and i've created multiple products, i learned that i need to add another property to the class. one approach
is to add the property to the class and update each of the individual existing products with the new property. this can become labor 
intensive if i had 1k products. 

instead of changing a class after i created one, i can create a new class and take the info i need from the old class. because of the 
shareable nature of prototypes, i can link one classes prototype to another classes prototype. i can create a new class with a name that 
is a modified variant of the initial class  Product and SalesProduct. the name of the new class implies a shared relationship between 
the two classes. 

the new class can inherit or borrow the classes from the original by using the extends keyword, such as SaleProduct extends Product.
this can be read as SalesProduct is using or extending properties from the Product class. */

class Product {
  constructor(name, price, discountable) {
    this.name = name 
    this.price = price 
    this.discountable = discountable   
  }  
}
const product1 = new Product("Coffee Maker", 99, true)  //creating a new product 

//Adding an additional class using extends. 
class SaleProduct extends Product {  //extends allows SaleProduct class to use the properties of Product class
  constructor(percentOff) {          //adding new property for the product % off. SaleProduct will include borrowed and new properties
     this.percentOff = percentOff  
  }  
}
/* based upon the additional class using extends, should return properties from Product + new property percentOff. instead get a ReferenceError:
ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor.

SaleProduct is the derived class. what the error is saying is that i am trying to create a new product by extending Product (parent class)
but not telling it to do so. meaning not calling the super constructor. super() is a function that is used in the constructor method
(derived constructor) that calls the constructor method of the class that is extending (parent class in this example). 

if i am extending a parent class but do not call super() in the derived constructor, the parent instance will not be created and will not
be able to use 'this' as a result. so call super() and pass along values that will be extended. pass all values (including new property) 
to constructor.  if i were to console log() this based upon existing extend statement, i will get the ReferenceError. */
const product1 = new SaleProduct("Coffee Maker", 99, true, 20)//return ReferenceError because derived constructor is not calling constructor method on parent class

//using super() to call the constructor method on the Product class. statements reuses/extends a Product class for its instance properties. 
class SaleProduct extends Product {
  constructor(name, price, discountable, percentOff) { //constructor() includes all properties  from parent class + new class 
     super(name, price, discountable)  //super() only includes properties from extended/parent class. passing values to Product constructor
     this.percentOff = percentOff  //using 'this' to access the new property
  }  
}
const product1 = new SaleProduct("Coffee Maker", 99, true, 20) 
console.log(product1) //now using super(), successfully returns an instance of SaleProduct

/*updating Product and SalesProduct classes by:  
  1. adding method to Product class to return true/false value for discountable.  
  2. adding method to SalesProduct class to execute the method in Product class and determine whether to calculate sales price. 

method isDiscountable() returns this.discountable (returns true or false). this value will determine whether to calculate sales price 
or not. this will be done by using a method in the SalesProduct class  method called getSalePrice() will include a conditional. 
based upon conditional, method will calculate price. if no price calculated, tell user product is not eligible. this means i need 
to execute the isDiscountable() method from within the SalesProduct class. 

use super() to execute the method from parent class  super.isDiscountable(). 
do not need to call super in this method. can use super like an object with isDiscountable() as a method  super.isDiscountable()

in this app, i am using multiple classes to add properties to existing classes as well as share methods between them. i am establishing 
a relationship between the parent and child classes. however, changing the behavior of the parent class can unknowingly cause problems
with the child class. so goal is to keep classes as small as i can and be aware of the relationships i set up between the classes. 
*/
class Product {
  constructor(name, price, discountable) {
    this.name = name 
    this.price = price 
    this.discountable = discountable   
  }  
  
  isDiscountable() {  //adding method to determine if product is discountable. evaluates as true or false
    return this.discountable   
  }
}

class SaleProduct extends Product {  //reusing/extending Product class for its instance properties and adding additional property
  constructor(name, price, discountable, percentOff) {
     super(name, price, discountable)  //calling super() and passing values to Product constructor
     this.percentOff = percentOff  
  }  
  
  getSalePrice() { //adding method to determine if whether to calculate discount or return message product is not eligible. 
     if (super.isDiscountable()) {      //using super to execute isDiscountable() method from parent Product class. not calling super here
       return this.price * ((100 - this.percentOff) / 100)   //if product discountable (evaluated as true), compute sales price
     } else {
        return `${this.name} is not eligible for a discount`  //if product not discountable(evaluated as false), return this
     }
  }
}

const saleProduct1 = new SaleProduct("Coffee Maker", 99, true, 20) 
console.log(saleProduct1.getSalePrice()) //invoking getSalePrice() function. product is discountable. returns 79.2

const saleProduct1 = new SaleProduct("Coffee Maker", 99, false, 20) 
console.log(saleProduct1.getSalePrice())  //invoking getSalePrice() function. product not discountable. returns 'Coffee Maker is not eligible for a discount'

/* HOW TO GET, SET AND SIMPLIFY CLASSES 

one of the major challenges with javascript is that there are no private properties by default. consequently, all object properties are 
accessible by anyone, which means they can be mutated at anytime. 

in the Product class below, there is property called price, that is initially set in the constructor. there is also a method that gets the
clearance price of a product (which is 50% off). a user of the class can access the property on an instance by saying: product1.price. 
this will return 99.95, which is the argument that was passed. 

because an instance of a class or constructor function is just an object, the price property can be changed at will. besides having a user
change the prices, methods of the class (getClearancePrice) can be broken if a non number is provided where developer intended a number. 
currently, javascript does not allow for marking classes/data private, but can use 2 special class features to as a workaround. these 
features are getters and setters. */

class Product {
  constructor(name, price, discountable) {
    this.name = name 
    this.price = price 
    this.discountable = discountable 
  }

  getClearancePrice() {
    return this.price * 0.5 
  }
}
const product1 = new Product("Coffee Maker", 99.95, false) //creating an instance of the class
console.log(product1.price) //accessing the property on an instance. returns 99.95

/*if i directly mutate the price property by providing it an empty object, this will be a problem when i invoke/execute the method
getClearancePrice(). this returns null (undefined) because i passed in an object but method was expecting a number for calculation */
product1.price = {} 
console.log(product1.getClearancePrice()) //accessing property and calling the getClearancePrice() method. returns null

/* USING A GETTER AND SETTER 

to execute a method, we take the instance (product1) and call the method getClearancePrice() with a set of () -> product1.getClearancePrice()
instead of invoking a method in this manner, can turn getClearancePrice to a getter. this approach will still operate as a method, but will
be used like a property  meaning remove the () in order to execute the method. 

to create a getter, add the keyword 'get' in front of the method. in this example, since get is repeated 2x, can remove the prefix from 
the method name. so i can run the method just like it is a property -> product1.clearancePrice. this makes the value easier to retrieve 
but does not fix the problem of a user setting a value that is an invalid type. to fix this, i need a corresponding setter. 

a setter works similar to a getter by using the same syntax. however, it does the opposite. it is a method that works like a property.
but a setter accepts a single argument and 'changes' a property rather than retrieves it. don't pass the argument using (). instead pass 
the value to the method using the '=' operator. 

to create a setter, add the keyword 'set' in front of the method. inside the method, i can change an instance properties value. 
since i am calling the setter newPrice(), i want to take the price that its passed and use it to update the price instance property. 
with setters, need to have a corresponding getter. otherwise, cannot retrieve the value that was set. its good practice to pair getters
and setters. they can both have the same method name. but cannot have an instance property available on 'this' with the same name as 
getter and/or setter (for example, could not name getter/setter price because it conflicts with the price instance property). doing so will 
likely freeze application and cause an infinite loop. 

can use another property that connects the getter and setter with a property that i want to get and update. do not want developers and users
to access this 'bridge property'. i want this bridge property to be for internal use only. a way to indicate to other developers that a 
property shouldn't be modified is by prefixing the property with an underscore. a class that has a property that begins with an 
underscore is a way for developers to communicate that it should not be used outside the class itself or be directly mutated. 
after i set an intermediate property, i can set use getters and setters with the same name but minus the underscore to access or update
the value. these are steps towards addressing the problem of price or other properties being directly mutated.

to create the bridge property to be able to create the appropriate getters and setters, change this.price in the constructor to
_this.price. changing this ensures that it doesn't conflict with getter/setter that will be changed to price.

getters and setters can be a double edged sword. they are helpful by preventing mutations from breaking application. but can be confusing 
because they are methods operating as if they were properties. 

on the client side, ultimately none of the data in javascript is secure or private. if i need to keep data private (such as user password)
this data needs cannot be managed or made unavailable on client side javascript. 

the goal of getters/setters and these pseudo private properties prefixed with underscores is a way to signal to other developers that 
certain properties are important and should not be used outside of the class. 
*/

//updating Product class with getters and setters
class Product {
  constructor(name, price, discountable) {
    this.name = name 
    this.price = price 
    this.discountable = discountable 
  }

  get clearancePrice() {       //creating getter. 
    return this.price * 0.5   //returning number which is 50% of the price that was passed when creating instance of class
  }

  set newPrice(price) {      //creating setter. its a method that works like a property. accepts an argument, and changes a property
    this.price = price      //passing value to the method using the = operator. changing the instance property value
 }

}
const product1 = new Product("Coffee Maker", 99.95, false) 
console.log(product1.clearancePrice)  //no longer calling method. now accessing method like a property. returns correct value of 49.975

product1.newPrice = 20 
console.log(product1.newPrice)       //returns null because there is no intermediate property that connects the getter and setter

//updated Product class with bridge property connecting getter and setter. 
class Product {
  constructor(name, price, discountable) {
    this.name = name 
    this._price = price           //updated from price to _price
    this.discountable = discountable 
  }

  get price() {                 //updated name of getter
    return this._price          //removed functionality that got clearance price. now returning this._price
  }

  set price(price) {          //updated name of setter. accepts price that is passed to it, will reject value if type not a valid number.
    if (typeof price !== "number") {  //if value passed not equal to the string 'number', then return previous value from this._price
      return this._price 
    } else {                         //otherwise set the price that was passed in as an argument.
      this._price = price           //accepts the price that was passed in and use it to update the price instance property
    }
  }
}
const product1 = new Product("Coffee Maker", 99.95, false)  //instantiating/creating instance of class. can now access its properties. 
product1.price = 'aslfdjkas' //update the price by mutating it/using the price setter with an invalid type (not a number) 
console.log(product1.price)  //returns the original price of 99.95

product1.price = 30   //updating price with a valid number. price update will be successful
console.log(product1.price)  //returns 30

/**FIX CONTENT PROBLEMS WITH BIND
 revising e-commerce app to allow users to 'favorite' a product, store it in their account for review later. users can only do 
 this if they are signed into their account. if not, tell user to sign into account. 
 
 still have a Product class but also some user data. for each product, have name and price properties. also have a handleFavoriteProduct
 method which checks to see if a user is authenticated via an isAuth boolean. if user is authenticated, the product will be 'favorited'
 and will add product to user's array of favorites and alert user that favorite was successful. 
 
 creating an new Product for a coaster and putting it in a variable entitled product1. to simulate user 'favoriting' the product, call 
 method handleFavoriteProduct. this method can run in response to a user click (learn how to do later). when run code, returns 
 the product name Coaster followed by favorited! (Coaster favorited!). 
 
 i can delay the response by a second after user adds product to their favorites. to do that, i can use SetTimeout() and pass it
 this.favoriteProduct(). this will delay the execution of the favoriteProduct() method by 1000 milliseconds or 1 second. however, 
 when running method, returns favorited!. this is a problem because now missing the products name. what's happening is the value of 'this' 
 in favoriteProduct() method  console.log(`${this.name} favorited!`) no longer refers to Product class. it is being lost. 
 
 functions create their own context which can change what 'this' refers to, causing unexpected results. since classes are merely functions
 and can also include functions in the form of methods, have to be aware of problems with binding 'this' correctly in relation to classes. 

 when i used SetTimeOut(), it accepted the favoriteProduct method as a function, but it changed what 'this' was bound to within the method.
 this is similar to code when i have a function that accepts a callback function and when using the callback function it implicitly changes
 the 'this' context of it. for example array methods such as map(), filter() and reduce():
    take an array and use the map method of it and execute a callback and pass a reference to it  -> [].map(callback)
    for the callback function, can do something with the array elements:

      function callback() {
   // do something with array elements 
    }

    combined together: 

    function callback() {
   // do something with array elements 
      }

    [].map(callback) 

 arrow functions are helpful when referring to the proper 'this' context. arrow functions do not create a new 'this' binding. instead, 
 arrow functions refer to the 'this' binding one level above (in the context above). if i were to write this.favoriteProduct within
 setTimeout() as an inline arrow function, instead of passing it as a reference to setTimeout(), and calling this.favoriteProduct:
      setTimeout(() => this.favoriteProduct(), 1000) 

 this will result in correct binding and return Coaster favorited!  the binding now works because 'this' within the function now refers 
 to 1 level up from the SetTimeOut()  which is the Product class. 

 another way to leverage arrow functions to fix the binding issue is to make favoriteProduct a property within the instructor  and take 
 all of the functionality in the method. remove the arrow function i wrote in setTimeout(). this still bounds correctly and returns
 Coaster favorited!

 arrow functions will be able to fix the 'this' binding problems with classes the majority of the time. but do not want to stuff all of 
 the methods into the constructor as properties. an arguably better more expressive solution is to explicity set the 'this' context that 
 the function refers to. can explicity set the 'this' context thru the bind() method. the bind() method binds the 'this' keyword the 
 function uses to whatever i need it to be. the favoriteProduct() method always needs to be bound to the Product class in order to get the
 name (this.name) instance property off of it. to accomplish this, can use bind() where i am executing the favoriteProduct() method 
 within setTimeout(), i can chain on the bind method() and pass in 'this': 
      setTimeout(this.favoriteProduct.bind(this), 1000) 
      
      this code is saying that the favoriteProduct() method that is within the Product class should always refer to the class and nothing
      else. 
 
 after i attach bind() to a function, it is bound to the provided 'this' context forever whenever the function is used and cannot be lost.
 bound() method works and will only be bound correctly to 1 method (ie favoriteProduct). if i want to use favoriteProduct in another method, 
 i will need to bind it again. basically need to bind a method multiple times. this can be accomplished by making all references to the 
 method bound properly with bind() by over-riding the method in the constructor. this will ensure that every time i reference 
 this.favoriteProducts in the class, it is using the bound version of the function. this approach is similar to creating the arrow function
 in the constructor. the benefit of this approach is that i am leaving methods exactly where they should live, within the class body. they are 
 merely bound to the correct context in the constructor -> this.favoriteProduct = this.favoriteProduct.bind(this).
 so ive defined all of the methods in the right place, which is the class body (not the constructor) and declared the properties in the 
 right place as well, within the constructor. so the constructor is where i can bind the properties. 
 
 all the approaches below are valid, but recommend using the final approach where binding occurs in the constructor. this approach is 
 the most explicitly binds to the appropriate context.

 might wonder why we can't declare all methods directly on the class body as arrow functions to avoid the problems with 'this'. in the 
 future, its likely javascript may revise syntax to rewrite classes with methods as arrow functions and remove need for a constructor 
 method. this syntax is called the 'class fields proposal' and maybe released in future versions of javascript. 

 example of class fields proposal:

      const isAuth = true 
      const user = {
        favorites: []
    } 

class Product {}

  handleFavoriteProduct = () => {
    if (isAuth) {
      setTimeout(this.favoriteProduct, 1000) 
    } else {
      console.log("You must be signed in to favorite products!") 
    }
  }

  favoriteProduct = () => {
    user.favorites.push(this.name) 
    console.log(`${this.name} favorited!`) 
  }
}  */

/*
  revising e-commerce app to allow users to 'favorite' a product, store product in their account for review later. users can only do 
  this if they are signed into their account. if not, tell user to sign into account.

  SetTimeOut() accepts the favoriteProduct method as a function, but it changes what 'this' was bound to within the method. 
*/
 const isAuth = true 
 const user = {
   favorites: []
 } 
 
 class Product {
   constructor(name, price) {
     this.name = name 
     this.price = price 
   }
 
   handleFavoriteProduct() {
     if (isAuth) { 
       //this.favoriteProduct()  //running method will return Coaster favorited!
       setTimeout(this.favoriteProduct, 1000)  //passing favoriteProduct as a reference to setTimeout() to delay favoriteProduct() 
                                              //method by 1 sec.  this causes a binding issue.  returns favorited! 
     } else {
       console.log("You must be signed in to favorite products!") 
     }
   }
 
   favoriteProduct() {
     user.favorites.push(this.name) 
     console.log(`${this.name} favorited!`) 
   }
 }
 const product1 = new Product('Coaster', 89.99) //creating new product/instance of class and assigning it to a variable. 
 product1.handleFavoriteProduct() //running code with setTimeout() returns favorited!

/* 
  revised app to use arrow functions to properly bind 'this'.

  arrow functions are helpful when referring to the proper 'this' context because they do not create a new 'this' binding. instead, 
  arrow functions refer to the 'this' binding one level above (in the context above). meaning 'this' within the function now refers 
  to 1 level up from setTimeout() which is the Product class.
*/ 
const isAuth = true 
const user = {
  favorites: []
} 

class Product {
  constructor(name, price) {
    this.name = name 
    this.price = price 
  }

  handleFavoriteProduct() {
    if (isAuth) {
      setTimeout(() => this.favoriteProduct(), 1000)  //using arrow functions to write this.favoriteProduct within setTimeout() 
                                                      //as an inline statement and calling favoriteProduct() method. 
    } else {
      console.log("You must be signed in to favorite products!") 
    }
  }

  favoriteProduct() {
    user.favorites.push(this.name) 
    console.log(`${this.name} favorited!`) 
  }
}
const product1 = new Product('Coaster', 89.99)
product1.handleFavoriteProduct() //returns Coaster favorited!

/* 
  revised app by making favoriteProduct a property within the instructor and update with all of the functionality from favoriteProduct()
  method.
*/
const isAuth = true 
const user = {
  favorites: []
} 

class Product {
  constructor(name, price) {
    this.name = name 
    this.price = price 
    this.favoriteProduct = () => {        //favoriteProduct is now a property within the instructor. using arrow functions. 
        user.favorites.push(this.name)    //moved all functionality from favoriteProduct() method here. 
        console.log(`${this.name} favorited!`)  
    }
  }

  handleFavoriteProduct() {
    if (isAuth) {
      setTimeout(this.favoriteProduct, 1000) 
    } else {
      console.log("You must be signed in to favorite products!") 
    }
  }

}
const product1 = new Product('Coaster', 89.99)
product1.handleFavoriteProduct() //returns Coaster favorited!

/* 
 revising app to use bind() to bind the favoriteProduct() method to the Product class in order to get the name (this.name) instance 
 property off of it.  this approach binds a single method to a class. 
*/
const isAuth = true 
const user = {
  favorites: []
} 

class Product {
  constructor(name, price) {
    this.name = name 
    this.price = price 
  }

  handleFavoriteProduct() {
    if (isAuth) {
      setTimeout(this.favoriteProduct.bind(this), 1000) //chain bind() to favoriteProduct. ensures method will refer to Product class. 
    } else {
      console.log("You must be signed in to favorite products!") 
    }
  }

  favoriteProduct() {
    user.favorites.push(this.name) 
    console.log(`${this.name} favorited!`) 
  }
}
const product1 = new Product('Coaster', 89.99)
product1.handleFavoriteProduct() //returns Coaster favorited!

/* 
 revising app to bind the favoriteProduct() method multiple times. 

 making all references to the method bound properly with bind() by over-riding the method in the constructor. 
 this will ensure that every time i reference this.favoriteProducts in the class, it is using the bound version of the function. 
 
 this is preferred approach because:
  1. declared the properties within the constructor. 
  2. the methods are bound to the correct context in the constructor. 
  3. defined methods within the class body.  
*/
const isAuth = true 
const user = {
  favorites: []
} 

class Product {
  constructor(name, price) {
    this.name = name 
    this.price = price 
    this.favoriteProduct = this.favoriteProduct.bind(this) //overriding method. binding favoriteProduct method to be used multiple times. 
  }

  handleFavoriteProduct() {
    if (isAuth) {
      setTimeout(this.favoriteProduct, 1000)  //removed reference to 'this' 
    } else {
      console.log("You must be signed in to favorite products!") 
    }
  }

  favoriteProduct() {
    user.favorites.push(this.name) 
    console.log(`${this.name} favorited!`) 
  }
}
const product1 = new Product('Coaster', 89.99)
product1.handleFavoriteProduct()  //returns Coaster favorited!