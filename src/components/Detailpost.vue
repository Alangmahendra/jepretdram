<template>
  <div v-if="list">
    <b-card-group deck class="list rapihin">
        <b-card :img-src="list.photoUrl"
                img-alt="Card image"
                img-top
                :title="list.caption">
                <span class="description">oleh : <div class="blue" @click="toOtheUserPage(list.creator._id)">{{list.creator.email}}</div></span> <br>
              <a href="#"
                class="card-link">Like</a>
                <br>
        <b-input-group>

    <b-form-input v-model="comments"></b-form-input>

    <!-- Attach Right button Group via slot -->
    <b-input-group-button slot="right">
      <b-btn variant="info" @click="addcomments(list._id)" >Comment</b-btn>
    </b-input-group-button>
  </b-input-group>
  <br>
    <span>COMMENTS:</span> <br>
    <span v-for="comment in list.comments" :key="comment._id" :comment="comment">
          {{comment.creator.email}} : {{comment.commentText}}<br>
        </span>
        </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name : 'Detailpost',
  data(){
    return{
      list:null,
      comments : ''
    }
  },
  created(){
    this.getdetail()
  },
  methods:{
    getdetail(){
     let id = this.$route.params.id
      
      axios.get(`http://localhost:3000/api/posts/${id}`)
      .then(response=>{
        this.list = response.data.data
        console.log(response.data.data)
      })
    },
     addcomments(id){
      let token = localStorage.getItem('token')
      // let id = this.$route.params.id
      axios.put(`http://localhost:3000/api/posts/comments/single/${id}`,{commentText : this.comments},{
        headers:{authorization : token}
      }).then(response=>{
        // console.log(response);
        console.log(response.data.data)
        this.list = response.data.data
        this.comments=""
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .rapihin {
  margin: 10px 50px 70px 50px;
}
img {
  width: 100%;
  display: block;
}
.blue{
  color:blue;
  cursor: pointer;
}
</style>
