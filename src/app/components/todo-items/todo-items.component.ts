import { Component } from '@angular/core';
import { Todo } from 'src/app/models/TodoItem';
import { TodosService } from 'src/app/services/api/todos.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent {

  // UserId
  userId: string = localStorage.getItem('userId') ?? '';
  // Default Todo Array
  todos: Todo[] = [];

  // Creating a new todo item
  newTodoTitle: string = "";
  newTodoContent: string = "";
  createdBy: string = "";

  // Todo obj
  todoItem: Todo = {
    title: this.newTodoTitle,
    content: this.newTodoContent,
    completed: false,
    createdBy: this.createdBy
  };

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  // Get todos
  getTodos() {
    this.todosService.getTodos(this.userId)
      .subscribe(response => {
       this.todos = response;
       if(this.todos.length > 0){
         return this.todos;
       }
       alert('No items have been created yet.');
       
       return this.todos;
      }),
      (error: string) => {
        alert('An error occured!');
        console.error(error);
      }
  }

  // Mark the todo item as complete onclick
  toggleComplete(id: string) {
    // Do a PUT to update the value
    this.todosService.completeTodo({"id": id, "completed": true})
    .subscribe(response => {
      this.getTodos();
      return alert('Well done mate =)');
    }),
    (error: string) => {
      alert('An error occured!');
      console.error(error);
    }
  }
  
  // Delete the todo item
  deleteTodo(id: string) {
    this.todosService.deleteTodo(id)
    .subscribe(response => {
      this.getTodos();
      return alert('Cheers to that one!');
    }),
    (error: string) => {
      alert('An error occured!');
      console.error(error);
    }
  }

  // Create new todo item
  addTodo() {
    if (this.newTodoTitle.trim().length > 0 && this.newTodoContent.trim().length > 0) {
      this.todoItem = {
        title: this.newTodoTitle,
        content: this.newTodoContent,
        completed: false,
        createdBy: this.userId
      }
      // Post the new todo item to api
      this.todosService.postTodo(this.todoItem)
        .subscribe(response => {
          // Clear the input fields
          this.newTodoTitle = "";
          this.newTodoContent = "";
          this.getTodos();
          return alert('New todo item has been created, Be sure to finish it!');
        }),
        (error: string) => {
          alert('An error occured!');
          console.error(error);
        }
    } else {
      return alert('Please fill out all of the input fields.');
    }
  }

}
