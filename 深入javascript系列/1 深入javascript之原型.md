### 构造函数创建对象

首先使用构造函数创建一个对象

```javascript
function Person() {
    
}
var person = new Person();
person.name = 'lisi';
console.log(person.name); // lisi
```

Person 就是一个构造函数。 使用new 创建了一个实例对象Person。

**每个javascript对象（出去null）在创建的时候就会与之关联另一个对象 每一个对象都会从原型继承属性**



#### prototype

每个**函数都一个prototype属性**，就是我们经常在各种例子中看到的那个prototype。



```javascript
function Person(){}

// prototype 是函数才会有的属性
Person.prototype.name = 'zhansgan';
var car1 = new Car();
var car2 = new Car();
console.log(car1, car2); // BMW BMW

```

这个函数的prototype属性指向了一个对象。 **这个对象正是调用该构造函数而创建的实例的原型** 也就是上面的car1 和 car2的原型。



![border](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype1.png)

## __proto__

它是每一个javascript对象都具有的一个属性。叫做__proto__ 。这个属性会指向该对象的原型。

**__ proto __ 的指向取决于对象创建的实现方式 **





car.__proto__ === Car.prototype; // true

所以就有这个关系图

![border](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype2.png)



#### constructor

一个函数可以生成多个实例，但是原型指向构造函数倒是有的。 每个原型都有一个constructor属性，这个属性指向构造函数本身。

```javascript
function Car(){}
Car === Car.prototype.constructor;

```

所以：

![border](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype3.png)

ES5里有一个对象的方法 可以获得对象的原型。 Object.getPrototypeOf(obj); 方法返回指定对象的原型

```javascript
Object.getPrototypeOf(car) === Car.prototype;

```



#### 实例与原型

当读取实例的属性时。 如果找不到 就会查找与对象关联的原型中的属性。 如果还查不到，就去找原型的原型 



#### 补充注意点:

* constructor 属性

  ```javascript
  function Car(){}
  var car = new Car();
  car.constructor === Car;
  car.constructor === Car.prototype.constructor;
  ```

  car 本身其实是没有constructor属性的。 当不能读取constructor属性就会从person的原型中 就是Car.prototype 中读取。 正好原型中有该属性。 

其次是 __proto__ ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 obj.__proto__ 时，可以理解成返回了 Object.getPrototypeOf(obj)。



```javascript
function Person() {}
var p = new Person();

p.__proto__ === Person.prototype;
p.constructor === Person.prototype.constructor === Person;

Person.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
Function.prototype.__proto === Object.prototype;

Person.__proto__ === Function.prototype;
Object.__proto__ === Function.prototype;
Function.__proto__ === Function.prototype;


```

