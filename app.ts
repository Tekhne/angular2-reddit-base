/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

@Component({
  selector: 'reddit',
  template: `
    <form class="ui large form segment">
      <h3 class="ui header">Add a Link</h3>

      <div class="field">
        <label for="title">Title:</label>
        <input name="title" #newtitle />
      </div>

      <div>
        <label for="link">Link:</label>
        <input name="link" #newlink />
      </div>

      <button (click)="addArticle(newtitle, newlink)"
              class="ui positive right floated button">
        Submit link
      </button>
    </form>

    <div class="ui grid posts">
      <reddit-article>
      </reddit-article>
    </div>
  `
})
class RedditApp {
  constructor() {
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
  }
}

bootstrap(RedditApp);
