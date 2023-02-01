import { Component } from '@angular/core';
import { Todo } from 'src/app/models/TodoItem';
import { TodosService } from 'src/app/services/api/todos.service';
import { TranslateService } from 'src/app/services/api/translate.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent {

  userId: string = localStorage.getItem('userId') ?? '';
  todos: Todo[] = [];

  // Creating a new todo item
  newTodoTitle: string = "";
  newTodoContent: string = "";
  createdBy: string = "";

  // Todo object
  todoItem: Todo = {
    title: this.newTodoTitle,
    content: this.newTodoContent,
    completed: false,
    createdBy: this.createdBy
  };

  // Translate Object
  translateTodoText: Object = {};

  constructor(private todosService: TodosService, private translateSerice: TranslateService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  // Get todos
  getTodos() {
    this.todosService.getTodos(this.userId)
      .subscribe(response => {
        this.todos = response;
        if (this.todos.length > 0) {
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
    this.todosService.updateTodo({ "id": id, "completed": true })
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

  // Translate Todo
  translateTodo(data: Todo) {
    const translateButtonNames = [
      'TRANSLATE',
      'COMPLETE',
      'REMOVE'
    ];
    // Model the data
    this.translateTodoText = {
      'q': [data.title, data.content, ...translateButtonNames],
      'target': "fr"
    }
    // Post the todo item to api for translation
    this.translateSerice.postTranslateTodo(this.translateTodoText)
      .subscribe(response => {
        const translatedData: any = response;
        if (response) {
          // Update the database 
          this.todosService.updateTodo({ "id": data.id!, "translated": true })
            .subscribe(response => {
              // Translate the title
              document.querySelector(`#${data.id} .todo-header`)!.innerHTML = translatedData.data.translations[0].translatedText;

              // Translate the content
              document.querySelector(`#${data.id} .mat-mdc-card-content`)!.innerHTML = translatedData.data.translations[1].translatedText;

              // Translate the button in order from left to right
              // Translate button
              document.querySelector(`#${data.id} #translateBtn`)!.innerHTML = translatedData.data.translations[2].translatedText;
              
              // Complete button
              if( document.querySelector(`#${data.id} #completeBtn`)){
                document.querySelector(`#${data.id} #completeBtn`)!.innerHTML = translatedData.data.translations[3].translatedText;
              }

              // Remove button
              document.querySelector(`#${data.id} #deleteBtn`)!.innerHTML = translatedData.data.translations[4].translatedText;

              return alert('The todo item has been translated.');
            })
        };
      }),
      (error: string) => {
        alert('An error occured!');
        console.error(error);
      }
  }
}
