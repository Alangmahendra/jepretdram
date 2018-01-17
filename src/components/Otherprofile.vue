<template>
  <b-card>
    <allgram v-for="list in thisUserPost" :key="list._id" :list="list" @pushcomment="addcomment"/>
  </b-card>
</template>
<script>
import axios from 'axios'
import allgram from '@/components/AllgramOther'
export default {
  name : 'Otherprofile',
  components : {allgram},
  data(){
    return {
      thisUserPost:[]
    }
  },
  created(){
    console.log(this.$route)
    this.getdata()
  },
   methods:{
     getdata(){
       let id = this.$route.params.id
       let token = localStorage.getItem('token')
       axios.get(`http://localhost:3000/api/posts/user/${id}`,{headers:{authorization : token}})
       .then(response=>{
         console.log(response.data.data);
         
         this.thisUserPost = response.data.data
       }).catch(err=>{
         console.log(err);
       })
     },
     addcomment(payload){
       this.thisUserPost = payload
     }
  }
}
</script>
<style scoped>

</style>
