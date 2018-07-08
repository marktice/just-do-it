const createTodo = () => {
  document.body.style.backgroundImage =
    "url('https://media1.tenor.com/images/79289939df4799564cff7175d222051e/tenor.gif?itemid=4939398')";

  const todoElements = document.getElementsByClassName('todos');
  const todoArray = Array.apply(null, todoElements);
  todoArray.forEach((element) => {
    element.style.opacity = 0.15;
  });

  setTimeout(
    () => (
      (document.body.style.backgroundImage = ''),
      todoArray.forEach((element) => {
        element.style.opacity = 1;
      })
    ),
    2200
  );
};

const deleteTodo = () => {
  document.body.style.backgroundImage =
    "url('https://media1.tenor.com/images/6f73766b1ce96ac1fb7aee33a8b3f3b5/tenor.gif?itemid=5129495')";

  const todoElements = document.getElementsByClassName('todos');
  const todoArray = Array.apply(null, todoElements);
  todoArray.forEach((element) => {
    element.style.opacity = 0.15;
  });

  setTimeout(
    () => (
      (document.body.style.backgroundImage = ''),
      todoArray.forEach((element) => {
        element.style.opacity = 1;
      })
    ),
    2000
  );
};

const completeTodo = () => {
  document.body.style.backgroundImage =
    "url('https://media1.tenor.com/images/3c83d2e511241c0f3b9f6fe5eb11f6b9/tenor.gif?itemid=5506619')";

  const todoElements = document.getElementsByClassName('todos');
  const todoArray = Array.apply(null, todoElements);
  todoArray.forEach((element) => {
    element.style.opacity = 0.15;
  });

  setTimeout(
    () => (
      (document.body.style.backgroundImage = ''),
      todoArray.forEach((element) => {
        element.style.opacity = 1;
      })
    ),
    1000
  );
};

export default { createTodo, deleteTodo, completeTodo };
