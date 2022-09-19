<template>
  <div class="home">

  </div>
</template>

<script>
import axios from "axios"
import {onlogin} from '../utlis/api'
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      
    }
  },
  created() {
    onlogin({username:'admin',password:'admin'}).then(res=>{
      console.log(res);
    })
  },
};
</script>
