<template>
  <div>
    <div>
      <b-card>
        <b-form-file id="file_input1" v-model="file"></b-form-file>
          <br> Selected file: {{file && file.name}} <br>
         <span> <b-input type="text" placeholder="caption" v-model="caption"></b-input></span>
        <b-button @click="add">Submit</b-button>
      </b-card>
    </div>
    <div>
      <b-card v-for="list in mypost" :key="list._id" :list="list" class="rapihin">
         <b-card-group deck class="rapihin">
        <b-card :img-src="list.photoUrl"
                img-alt="Card image"
                img-top
                :title="list.caption">
                <span class="description"></span> <br>
            
        <b-input-group>

          <b-form-input v-model="comments"></b-form-input>

          <!-- Attach Right button Group via slot -->
          <b-input-group-button slot="right">
            <b-btn variant="info" @click="addcomments(list._id)">Comment</b-btn>
          </b-input-group-button>

  </b-input-group>
  <b-button variant="danger" @click="remove(list._id)">delete</b-button>
  <b-button variant="primary" @click="update(list._id)">update</b-button>
        </b-card>
    </b-card-group>
    <span>COMMENTS:</span> <br>
    <span v-for="comment in list.comments" :key="comment._id" :comment="comment">
          {{comment.creator.email}} : {{comment.commentText}}<br>
        </span>
      </b-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";

export default {
  name: "Myprofile",

  data() {
    return {
      mypost: [],
      file: null,
      caption: "",
    comments :''
    };
  },
  created() {
    this.getmypost();
  },
  methods: {
    add() {
      let token = localStorage.getItem("token");
      let formdata = new FormData();
      formdata.append("caption", this.caption);
      formdata.append("photoUrl", document.getElementById("file_input1").files[0]);
      axios
        .post(`http://localhost:3000/api/posts`, formdata, {
          headers: { authorization: token }
        })
        .then(response => {
          this.mypost.push(response.data.data);
          this.caption = ''
          this.caption = null
        })
        .catch(err => {
          console.log(err);
        });
    },
    getmypost() {
      let token = localStorage.getItem("token");
      axios
        .get(`http://localhost:3000/api/posts/mypost`, {
          headers: { authorization: token }
        })
        .then(response => {
          console.log(response.data.data);
          this.mypost = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    remove(id) {
      let token = localStorage.getItem("token");
      axios.delete(`http://localhost:3000/api/posts/${id}`,{headers :{authorization : token}})   
      .then(response=>{
        let i = this.mypost.findIndex(post=>post._id == id)
        return this.mypost.splice(i,1)
      }).catch(err=>{
        console.log(err);
      })   
    },
    update(id){
      router.push({name : 'Updatepost',params :{id:id}})
    },
     addcomments(id){
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/api/posts/comments/mypage/${id}`,{commentText : this.comments},{
        headers:{authorization : token}
      }).then(response=>{
        console.log(response);
        console.log('comment has been update')
        this.mypost = response.data.data
        this.comments=''
      }).catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>
<style scoped>
  .rapihin{
    margin:10px 50px 10px 50px
  }
  img {
  width: 100%;
  display: block;
}
</style>
