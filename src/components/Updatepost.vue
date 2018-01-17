<template>
  <div v-if="content">
      <b-card>
        <b-form-file id="file_input1" v-model="file"></b-form-file>
          <br> Selected file: {{file && file.name}} <br>
         <span> <b-input type="text" placeholder="caption" v-model="caption"></b-input></span>
        <b-button @click="update">Submit</b-button>
      </b-card>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
export default {
  name : 'Updatepost',
  data(){
    return{
      content:null,
      caption:'',
      file:null
    }
  },
  created(){
    this.getone()
  },
  methods:{
    getone(){
      let id = this.$route.params.id
      
      axios.get(`http://localhost:3000/api/posts/${id}`)
      .then(response=>{
        this.caption = response.data.data.caption
        this.content = response.data.data
        this.file = response.data.data.photoUrl
      })
    },
    update(){
      let token = localStorage.getItem('token')
      let id = this.$route.params.id
      let formdata = new FormData();
      formdata.append("caption", this.caption);
      formdata.append("photoUrl", document.getElementById("file_input1").files[0]);
      axios.put(`http://localhost:3000/api/posts/${id}`,formdata,{
        headers : {authorization : token}
      })
      .then(response=>{
        console.log(response);
        router.push({name : 'Home'})
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>
<style scoped>

</style>
