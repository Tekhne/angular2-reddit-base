/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

class Article {
  title: string;
  link: string;
  votes: number;

  constructor(title: string, link: string, votes?: number) {
    this.title = title;
    this.link = link;
    this.votes = votes || 0;
  }

  voteUp(): void {
    this.votes += 1;
  }

  voteDown(): void {
    this.votes -= 1;
  }
}

@Component({
  selector: 'reddit-article',
  inputs: ['article'],
  host: {
    class: 'row'
  },
  template: `
    <div class="four wide column center aligned votes">
      <div class="ui statistic">
        <div class="value">
          {{ article.votes }}
        </div>
        <div class="label">
          Points
        </div>
      </div>
    </div>
    <div class="twelve wide column">
      <a class="ui large header" href="{{ article.link }}">
        {{ article.title }}
      </a>
      <ul class="ui big horizaontal list voters">
        <li class="item">
          <a href (click)="voteUp()">
            <i class="arrow up icon"></i>
            upvote
          </a>
        </li>
        <li class="item">
          <a href (click)="voteDown()">
            <i class="arrow down icon"></i>
            downvote
          </a>
        </li>
      </ul>
    </div>
  `
})
class ArticleComponent {
  article: Article;

  voteUp(): boolean {
    this.article.voteUp();
    return false;
  }

  voteDown(): boolean {
    this.article.voteDown();
    return false;
  }
}

@Component({
  selector: 'reddit',
  directives: [ArticleComponent],
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
      <reddit-article *ngFor="#article of articles" [article]="article">
      </reddit-article>
    </div>
  `
})
class RedditApp {
  articles: Article[];

  constructor() {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1)
    ];
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
  }
}

bootstrap(RedditApp);
