<template>
  <div >
    <b-card-group deck class="list rapihin">
        <b-card :img-src="list.photoUrl"
                img-alt="Card image"
                img-top
                :title="list.caption"
                >
                <span class="description">oleh : <div class="blue" @click="toOtherUserPage(list.creator._id)">{{list.creator.email}}</div></span> <br>
                <span class="description"><div  class="blue" @click="detail(list._id)">see more</div></span> <br>
                
              <a href="#"
                class="card-link">Like</a>
                <br></b-card>
        <b-card>
          <b-input-group>
    <b-form-input v-model="comments"></b-form-input>
    <!-- Attach Right button Group via slot -->
    <b-input-group-button slot="right">
      <b-btn variant="info" @click="addcomments(list._id)" >Comment</b-btn>
    </b-input-group-button>
    
  </b-input-group>
  <span v-for="comment in list.comments" :key="comment._id" :comment="comment">
          {{comment.creator.email}} : {{comment.commentText}}<br>
        </span>  
        <!-- {{list.comments}} -->
        </b-card>
        
    </b-card-group>
  </div>
</template>
<script>
import axios from "axios";
import router from "@/router";
export default {
  props: ["list"],
  data() {
    return {
      comments: "",
    };
  },
  methods: {
    toOtherUserPage(id) {
      console.log(id);
      let userid = localStorage.getItem("userid");
      let token = localStorage.getItem("token");
      if (token) {
        if (id === userid) {
          router.push({ name: "Myprofile" });
        } else {
          router.push({ name: "Otherprofile", params: { id: id } });
        }
      } else {
        alert("masuk dulu boss");
      }
    },
    addcomments(id) {
      let token = localStorage.getItem("token");
      axios
        .put(
          `http://localhost:3000/api/posts/comments/${id}`,
          { commentText: this.comments },
          {
            headers: { authorization: token }
          }
        )
        .then(response => {
          // console.log(response);
          console.log(response.data.data);
          this.$emit('pushcomment',response.data.data)
          this.comments=""
        })
        .catch(err => {
          console.log(err);
        });
    },
    detail(id) {
      router.push({ name: "Detailpost", params: { id: id } });
    }
  }
};
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
