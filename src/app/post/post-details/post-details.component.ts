import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: Post = {
    category: '',
    _id: '',
    postTitle: '',
    postAuthor: '',
    postDesc: '',
    postContent: '',
    postReference: '',
    postImgUrl: ''
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: PostService, private router: Router) { }

  ngOnInit() {
    this.getPostDetails(this.route.snapshot.params.id);
  }

  getPostDetails(id: any) {
    this.api.getPost(id)
      .subscribe((data: any) => {
        this.post = data;
        this.post._id = data._id;
        console.log(this.post);
        this.isLoadingResults = false;
      });
  }

  deletePost(id: any) {
    this.isLoadingResults = true;
    this.api.deletePost(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/post']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
